import db from '@/utils/db';
import fs from 'fs';

export default async function handler(req, res) {
    if (req.method !== 'PUT') return res.status(405).end();

    const { id } = req.query;

    const dataId = id.split('&')[0];

    const dataImg = id.split('&')[1];

    const path = './public/upload/';

    fs.unlinkSync(path.concat(dataImg));

    const { title, page, synopsis, author, category, image } = req.body;

    const updateQuery = await db('books').where({ id: dataId }).update({
        title,
        page,
        synopsis,
        authors_id: author,
        categories_id: category,
        image_path: image,
    });

    const updateData = await db('books').where({ id }).first();

    res.status(200);
    res.json({
        message: 'Update data book successfully',
        data: updateData,
    });
}
