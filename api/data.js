// api/data.js - Vercel API Route
let latestData = {
    temperature: 26.5,
    ph: 7.2,
    oxygen: 6.8,
    density: 92,
    latitude: 22.5,
    longitude: 114.2,
    timestamp: new Date().toISOString()
};

export default function handler(req, res) {
    if (req.method === 'GET') {
        return res.status(200).json(latestData);
    }

    if (req.method === 'POST') {
        const { key } = req.query;
        if (key !== 'your-secret-key') {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        latestData = { ...req.body, timestamp: new Date().toISOString() };
        return res.status(200).json({ success: true });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end();
}