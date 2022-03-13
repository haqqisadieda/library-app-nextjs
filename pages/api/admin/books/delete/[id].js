import authorization from '@/middlewares/authorization';
import db from '@/utils/db';
import fs from 'fs';

export default async function handler(req, res) {
    if (req.method !== 'DELETE') return res.status(405).end();

    const auth = authorization(req, res);

    const { id } = req.query;

    const dataId = id.split('&')[0];

    const dataImg = id.split('&')[1];

    const path = './public/upload/';

    fs.unlinkSync(path.concat(dataImg));

    const deleteQuery = await db('books').where({ id: dataId }).del();

    res.status(200);
    res.json({
        message: 'Data books deleted successfully',
    });
}
