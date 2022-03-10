import db from '@/utils/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if(req.method !== 'POST') return res.status(405).end();

    const { email, password, confirmPassword } = req.body;

    if(confirmPassword !== password ) return res.status(406).end();

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const registerQuery = await db('users').insert({
        email,
        password: passwordHash,
    });

    const data = await db('users').where('id', registerQuery).first();

    res.status(200);
    res.json({
        message: 'Registred user successfully',
        data
    });
}