import authorization from '@/middlewares/authorization';
import db from '@/utils/db';

export default async function handler(req, res) {
    if(req.method !== 'DELETE') return res.status(405).end();

    const auth = authorization(req, res);
  
    const { id } = req.query;

    const deleteQuery = await db('categories').where({ id }).del();

    res.status(200);
    res.json({
        message: 'Data category deleted successfully'
    });
}