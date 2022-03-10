import db from '@/utils/db';

export default async function handler(req, res) {
    if(req.method !== 'DELETE') return res.status(405).end();
  
    const { id } = req.query;

    const deleteQuery = await db('categories').where({ id }).del();

    res.status(200);
    res.json({
        message: 'Data category deleted successfully'
    });
}