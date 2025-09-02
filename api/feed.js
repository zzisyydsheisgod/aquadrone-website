// api/feed.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { key } = req.body;
    if (key !== 'your-secret-key') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    console.log('Feed command received at:', new Date().toISOString());
    return res.status(200).json({ success: true, message: 'Feeding started' });
  }
  res.status(405).end();
}