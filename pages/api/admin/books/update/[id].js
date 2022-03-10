import db from '@/utils/db';

export default async function handler(req, res) {
    if(req.method !== 'PUT') return res.status(405).end();

    const { id } = req.query;

    const { title, page, synopsis, authors_id, categories_id, image_path } = req.body;

    const updateQuery = await db('books').where({ id }).update({
        title,
        page,
        synopsis,
        authors_id,
        categories_id,
        image_path
    });

    const updateData = await db('books').where({ id }).first();

    res.status(200);
    res.json({
        message: 'Update data book successfully',
        data: updateData
    });
}