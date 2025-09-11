import Busboy from 'busboy';
import { google } from 'googleapis';
import { Readable } from 'stream';

export const handler = async (event) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, error: 'Method Not Allowed' }),
    };
  }

  try {
    const contentType = event.headers['content-type'] || event.headers['Content-Type'] || '';
    if (!contentType.toLowerCase().startsWith('multipart/form-data')) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ success: false, error: 'Content-Type must be multipart/form-data' }),
      };
    }

    const bodyBuffer = event.isBase64Encoded
      ? Buffer.from(event.body || '', 'base64')
      : Buffer.from(event.body || '', 'utf8');

    const files = [];
    await new Promise((resolve, reject) => {
      const bb = Busboy({ headers: { 'content-type': contentType }, limits: { files: 5, fileSize: 10 * 1024 * 1024 } });

      bb.on('file', (_name, file, info) => {
        const { filename, mimeType } = info;
        const chunks = [];
        file.on('data', (data) => chunks.push(data));
        file.on('limit', () => reject(new Error('File too large')));
        file.on('end', () => files.push({ filename, mimeType, buffer: Buffer.concat(chunks) }));
      });

      bb.on('error', reject);
      bb.on('finish', resolve);
      bb.end(bodyBuffer);
    });

    if (files.length === 0) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ success: false, error: 'No files received' }),
      };
    }

    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const serviceAccountPrivateKeyRaw = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
    const driveFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    if (!serviceAccountEmail || !serviceAccountPrivateKeyRaw || !driveFolderId) {
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ success: false, error: 'Missing Google Drive env vars' }),
      };
    }

    const serviceAccountPrivateKey = serviceAccountPrivateKeyRaw.replace(/\\n/g, '\n');

    const auth = new google.auth.JWT({
      email: serviceAccountEmail,
      key: serviceAccountPrivateKey,
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    const drive = google.drive({ version: 'v3', auth });

    const uploadedLinks = [];
    for (const file of files) {
      const createRes = await drive.files.create({
        requestBody: { name: file.filename, parents: [driveFolderId] },
        media: { mimeType: file.mimeType, body: Readable.from(file.buffer) },
        fields: 'id',
      });

      const fileId = createRes.data.id;
      if (!fileId) continue;

      // Make file readable by anyone with the link
      await drive.permissions.create({
        fileId,
        requestBody: { role: 'reader', type: 'anyone' },
      });

      const meta = await drive.files.get({ fileId, fields: 'id, webViewLink, webContentLink' });
      const link = meta.data.webViewLink || meta.data.webContentLink || `https://drive.google.com/file/d/${fileId}/view`;
      uploadedLinks.push(link);
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ success: true, links: uploadedLinks }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, error: String(error && error.message ? error.message : error) }),
    };
  }
};

