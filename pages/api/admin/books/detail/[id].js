import authorization from '@/middlewares/authorization';
import db from '@/utils/db';

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).end();

    const { id } = req.query;

    const dataId = id.split('&')[0];

    const auth = await authorization(req, res);

    const data = await db('books')
        .join('authors', 'books.authors_id', 'authors.id')
        .join('categories', 'books.categories_id', 'categories.id')
        .select(
            'books.id',
            'books.title',
            'books.synopsis',
            'books.page',
            'books.image_path',
            'authors.name as authorName',
            'authors.surname as authorSurname',
            'categories.name as category'
        )
        .where('books.id', dataId)
        .first();

    if (!data) return res.status(404).end();

    res.status(200);
    res.json({
        message: 'Data books',
        data,
    });
}
