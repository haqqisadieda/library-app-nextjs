import Layout from '@/components/user/Layout';
import Link from 'next/link';
import { useState } from 'react';
import Cookie from 'js-cookie';
import Router from 'next/router';

export default function Login() {
    const [ fields, setFields ] = useState({
        email: '',
        password: '',
    });

    async function loginHandler(e) {
        e.preventDefault();

        const loginReq = await fetch('/api/admin/auth/login', {
            method: 'POST',
            body: JSON.stringify(fields),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const loginRes = await loginReq.json();

        Cookie.set('token', loginRes.token);

        Router.push('/dashboard');
    }

    function fieldsHandler(e) {
        e.preventDefault();

        const name = e.target.getAttribute('name');

        setFields({
            ...fields,
            [name]: e.target.value
        });
    }
    return (
        <Layout>
            <div className='bg-white shadow-md rounded px-8 pt-6 mb-4 flex flex-col'>
                <h1 className='text-2xl text-slate-600 font-semibold mb-5 text-center uppercase space-x-8'>Login</h1>
                <form onSubmit={loginHandler.bind(this)}>
                    <div className='mb-4'>
                        <label className='block text-gray-600 text-sm font-bold mb-2' htmlFor='email'>
                            Email
                        </label>
                        <input onChange={fieldsHandler.bind(this)} type='email' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-600' id='email' name='email' placeholder='Email'  />
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-600 text-sm font-bold mb-2' htmlFor='password'>
                            Password
                        </label>
                        <input onChange={fieldsHandler.bind(this)} type='password' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-600' id='password' name='password' placeholder='****************'  />
                    </div>
                    <div className='flex items-center justify-between mt-5 mb-6'>
                        <div className='w-6/12'>
                            <button className='bg-slate-600 hover:bg-opacity-60 text-white font-bold py-2 px-4 rounded' type='submit'>Login</button>
                        </div>
                        <div className='w-6/12 text-right'>
                            <Link href='/dashboard/auth/register'><a className='text-blue-500 underline'>Register</a></Link>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
