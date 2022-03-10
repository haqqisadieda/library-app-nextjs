import db from '@/utils/db';

export default async function handler(req, res) {
    if(req.method !== 'GET') return res.status(405).end();

    const data = await db('users');

    res.status(200);
    res.json({
        message: 'Data users',
        data
    });
}