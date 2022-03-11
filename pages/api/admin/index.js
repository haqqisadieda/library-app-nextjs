import authorization from '@/middlewares/authorization';
import db from '@/utils/db';

export default async function handler(req, res) {
    if(req.method !== 'GET') return res.status(405).end();

    const auth = await authorization(req, res);
    
    const dataBooks = await db('books');
    const dataAuthors = await db('authors');
    const dataCategories = await db('categories');
    
    res.status(200);
    res.json({
        message: 'Data books',
        data: {
            book: dataBooks,
            author: dataAuthors,
            category: dataCategories,
        }
    });
    
}