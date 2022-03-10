import { NextResponse } from 'next/server';

export default function middleware(req) {
    const { token } = req.cookies;
    const url = req.url;

    if(!token && url != 'http://localhost:3000/dashboard/auth/login') {
        return NextResponse.redirect('http://localhost:3000/dashboard/auth/login');
    }
}