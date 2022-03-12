import authorization from '@/middlewares/authorization';
import db from '@/utils/db';

export default async function handler(req, res) {
    if(req.method !== 'POST') return res.status(405).end();

    const { name, surname } = req.body;

    const auth = authorization(req, res);

    const createQuery = await db('authors').insert({
        name,
        surname,
    });

    const createData = await db('authors').where('id', createQuery).first();

    res.status(200);
    res.json({
        message: 'Add data author successfully',
        data: createData
    });
}
