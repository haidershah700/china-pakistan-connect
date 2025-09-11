// Netlify Function: create-attachment-url
// - Accepts a base64-encoded file (data, filename, mimeType) in the request body
// - Proxies the payload to a Google Apps Script Web App (URL in env GAS_WEB_APP_URL)
// - Returns the resulting JSON from Apps Script (e.g., { fileUrl, fileId }) back to the client

/**
 * @param {import('@netlify/functions').HandlerEvent} event
 * @returns {Promise<import('@netlify/functions').HandlerResponse>}
 */
exports.handler = async function (event) {
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

  const appsScriptUrl = process.env.GAS_WEB_APP_URL;
  if (!appsScriptUrl) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, error: 'Missing GAS_WEB_APP_URL env var' }),
    };
  }

  try {
    const body = event.body ? JSON.parse(event.body) : {};

    // Expecting { data: base64String, filename: string, mimeType: string }
    const data = body && (body.data || (body.file && body.file.data));
    const filename = body && (body.filename || (body.file && body.file.filename) || 'upload');
    const mimeType = body && (body.mimeType || (body.file && body.file.mimeType) || 'application/octet-stream');

    if (!data) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ success: false, error: 'Missing file data. Provide { data, filename, mimeType }.' }),
      };
    }

    const payload = { data, filename, mimeType };

    const resp = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const json = await resp.json().catch(() => null);
    if (!resp.ok || !json) {
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ success: false, error: 'Failed to reach Apps Script' }),
      };
    }

    // Ensure success flag for clients
    const bodyOut = { success: true, ...json };
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify(bodyOut),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, error: String(error && error.message ? error.message : error) }),
    };
  }
};

