import db from '@/utils/db';

export default async function handler(req, res) {
    if(req.method !== 'PUT') return res.status(405).end();

    const { id } = req.query;

    const { name, surname } = req.body;

    const updateQuery = await db('authors').where({ id }).update({
        name,
        surname
    });

    const updateData = await db('authors').where({ id }).first();

    res.status(200);
    res.json({
        message: 'Update data author successfully',
        data: updateData
    });
}
