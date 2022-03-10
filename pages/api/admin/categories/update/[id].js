import db from '@/utils/db';

export default async function handler(req, res) {
    if(req.method !== 'PUT') return res.status(405).end();

    const { id } = req.query;

    const { name } = req.body;

    const updateQuery = await db('categories').where({ id }).update({
        name
    });

    const updateData = await db('categories').where({ id }).first();

    res.status(200);
    res.json({
        message: 'Update data category successfully',
        data: updateData
    });
}