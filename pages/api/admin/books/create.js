import authorization from '@/middlewares/authorization';
import db from '@/utils/db';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const auth = await authorization(req, res);

    const { title, page, synopsis, author, category, image } = req.body;

    const createQuery = await db('books').insert({
        title,
        page,
        synopsis,
        authors_id: author,
        categories_id: category,
        image_path: image,
    });

    const createData = await db('books').where('id', createQuery).first();

    res.status(200);
    res.json({
        message: 'Add data book successfully',
    });
}
