import authorization from '@/middlewares/authorization';
import db from '@/utils/db';

export default async function handler(req, res) {
    if(req.method !== 'GET') return res.status(405).end();

    const auth = authorization(req, res);

    const data = await db('categories');

    res.status(200);
    res.json({
        message: 'Data categories',
        data
    });
}