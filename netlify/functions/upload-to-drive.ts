/// <reference types="node" />
import type { Handler } from "@netlify/functions";
import { google } from "googleapis";
import Busboy from "busboy";

// Utility to build an authenticated Google Drive client using a service account
function getDriveClient() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL as string | undefined;
  const privateKeyRaw = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY as string | undefined;
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID as string | undefined;

  if (!clientEmail || !privateKeyRaw || !folderId) {
    throw new Error("Missing Google Drive environment variables");
  }

  const privateKey = privateKeyRaw.replace(/\\n/g, "\n");

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/drive"],
  });

  const drive = google.drive({ version: "v3", auth });
  return { drive, folderId };
}

// Parse multipart/form-data from Netlify function event
async function parseMultipart(event: any): Promise<{ filename: string; contentType: string; buffer: Buffer }[]> {
  const contentType = event.headers["content-type"] || event.headers["Content-Type"];
  if (!contentType || !contentType.startsWith("multipart/form-data")) {
    throw new Error("Content-Type must be multipart/form-data");
  }

  return await new Promise((resolve, reject) => {
    const bb = Busboy({ headers: { "content-type": contentType } });
    const files: { filename: string; contentType: string; buffer: Buffer }[] = [];

    bb.on("file", (_name: string, file: any, info: any) => {
      const { filename, mimeType } = info;
      const chunks: Buffer[] = [];
      file.on("data", (data: Buffer) => chunks.push(data));
      file.on("end", () => {
        files.push({ filename, contentType: mimeType, buffer: Buffer.concat(chunks) });
      });
    });

    bb.on("error", reject);
    bb.on("finish", () => resolve(files));

    const isBase64 = event.isBase64Encoded;
    const body = isBase64 ? Buffer.from(event.body, "base64") : Buffer.from(event.body);
    bb.end(body);
  });
}

const commonHeaders: { [header: string]: string } = {
  "content-type": "application/json",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "POST, OPTIONS",
  "access-control-allow-headers": "content-type",
};

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: commonHeaders,
      body: "",
    };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: commonHeaders, body: JSON.stringify({ error: "Method Not Allowed" }) };
  }

  try {
    const { drive, folderId } = getDriveClient();

    const files = await parseMultipart(event);
    if (!files.length) {
      return { statusCode: 400, headers: commonHeaders, body: JSON.stringify({ error: "No files uploaded" }) };
    }

    const results: { id: string; name: string; webViewLink?: string; webContentLink?: string }[] = [];

    for (const file of files) {
      const createRes = await drive.files.create({
        requestBody: {
          name: file.filename,
          parents: [folderId],
        },
        media: {
          mimeType: file.contentType,
          body: Buffer.from(file.buffer),
        },
        fields: "id,name,webViewLink,webContentLink",
      });

      const fileId = createRes.data.id!;

      // Make file readable by anyone with the link
      await drive.permissions.create({
        fileId,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });

      // Get links
      const getRes = await drive.files.get({ fileId, fields: "id,name,webViewLink,webContentLink" });
      results.push({
        id: fileId,
        name: getRes.data.name!,
        webViewLink: getRes.data.webViewLink!,
        webContentLink: getRes.data.webContentLink!,
      });
    }

    return {
      statusCode: 200,
      headers: commonHeaders,
      body: JSON.stringify({ files: results }),
    };
  } catch (error: any) {
    console.error("Upload error", error);
    return {
      statusCode: 500,
      headers: commonHeaders,
      body: JSON.stringify({ error: error.message || "Internal Server Error" }),
    };
  }
};

