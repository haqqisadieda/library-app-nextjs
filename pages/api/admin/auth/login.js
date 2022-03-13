import db from '@/utils/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { email, password } = req.body;

    const checkUserQuery = await db('users').where({ email }).first();

    if (!checkUserQuery) return res.status(401).end();

    const checkPasswordQuery = await bcrypt.compare(
        password,
        checkUserQuery.password
    );

    if (!checkPasswordQuery) return res.status(401).end();

    const token = jwt.sign(
        {
            id: checkUserQuery.id,
            email: checkUserQuery.email,
        },
        'forbiddenString',
        {
            expiresIn: '7d',
        }
    );

    res.status(200);
    res.json({
        message: 'Login user successfully',
        token,
    });
}
