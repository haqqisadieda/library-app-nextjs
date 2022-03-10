import db from '@/utils/db';

export default async function handler(req, res) {
    if(req.method !== 'DELETE') return res.status(405).end();
  
    const { id } = req.query;

    const deleteQuery = await db('books').where({ id }).del();

    res.status(200);
    res.json({
        message: 'Data books deleted successfully'
    });
}