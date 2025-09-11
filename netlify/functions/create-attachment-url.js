// Netlify Function: create-attachment-url
// - Reads form data from the request body
// - Posts it to a Google Apps Script Web App (URL in env GAS_WEB_APP_URL)
// - Returns the resulting JSON (including downloadUrl) back to the client

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

    // Build a consolidated message expected by the Apps Script
    const lines = [];
    if (body.name) lines.push(`Name: ${body.name}`);
    if (body.email) lines.push(`Email: ${body.email}`);
    if (body.whatsapp) lines.push(`WhatsApp: ${body.whatsapp}`);
    if (body.productDescription) lines.push(`Product: ${body.productDescription}`);
    if (body.quantity) lines.push(`Quantity: ${body.quantity}`);
    if (body.notes) lines.push(`Notes: ${body.notes}`);
    const consolidatedMessage = lines.join('\n');

    const payload = {
      name: body.name || 'Quotation Request',
      email: body.email || 'no-email@local',
      message: consolidatedMessage || 'Quotation request details attached.',
      subject: 'New Quotation Request',
      phone: body.whatsapp || '',
      // Also pass all raw fields so the Apps Script can include them if desired
      ...body,
    };

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

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
      body: JSON.stringify(json),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, error: String(error && error.message ? error.message : error) }),
    };
  }
};

