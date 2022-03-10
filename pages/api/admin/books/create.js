import db from '@/utils/db';

export default async function handler(req, res) {
    if(req.method !== 'POST') return res.status(405).end();

    const { title, page, synopsis, authors_id, categories_id, image_path } = req.body;

    const createQuery = await db('books').insert({
        title,
        page,
        synopsis,
        authors_id,
        categories_id,
        image_path
    });

    const createData = await db('books').where('id', createQuery).first();

    res.status(200);
    res.json({
        message: 'Add data book successfully',
        data: createData
    });
}