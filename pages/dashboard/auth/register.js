import Layout from '@/components/user/Layout';
import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';

export async function getServerSideProps(ctx) {
    const dataReq = await fetch('http://localhost:3000/api/admin/data');

    const data = dataReq.json();

    return {
        props: data
    };
}

export default function Register(props) {
    const [ fields, setFields] = useState({
        email: '',
        password: '',
        confirmPassword:'',
        error: ''
    });

    async function registerHandler(e) {
        e.preventDefault();

        if(fields.email === '' || fields.password === '' || fields.confirmPassword === ''){
            setFields({
                ...fields,
                'error': 'Please fill the form to register!',
            });
        }else if(fields.confirmPassword !== fields.password) {
            setFields({
                ...fields,
                'error': 'Passwords don\'t match.',
            });
        }else if(props.data.some(data => data['email'] === fields.email) === true) {
            setFields({
                ...fields,
                'error': 'Email has registered!',
            });
        }else {
            setFields({
                ...fields,
                'error': '',
            });

            const registerReq = await fetch('/api/admin/auth/register', {
                method: 'POST',
                body: JSON.stringify(fields),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            const registerRes = await registerReq.json();

            if(registerRes) alert('Successfully Registered');

            Router.push('/dashboard/auth/login');
        }
    }

    function fieldsHandler(e) {
        const name = e.target.getAttribute('name');

        setFields({
            ...fields,
            [name]: e.target.value
        });
    }
    return (
        <Layout>
            <div className='bg-white shadow-md rounded px-8 pt-6 mb-4 flex flex-col'>
                <h1 className='text-2xl text-slate-600 font-semibold mb-5 text-center uppercase space-x-8'>Register</h1>
                <form onSubmit={registerHandler.bind(this)}>
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
                        <input onChange={fieldsHandler.bind(this)}  type='password' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-600' id='password' name='password' placeholder='****************'  />
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-600 text-sm font-bold mb-2' htmlFor='confirmPassword'>
                            Confirm Password
                        </label>
                        <input onChange={fieldsHandler.bind(this)}  type='password' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-600' id='confirmPassword' name='confirmPassword' placeholder='****************'  />
                        <p className='text-sm mt-1 px-2 text-red-500'>{ fields.error }</p>
                    </div>
                    <div className='flex items-center justify-between mt-5 mb-6'>
                        <div className='w-6/12'>
                            <button className='bg-slate-600 hover:bg-opacity-60 text-white font-bold py-2 px-4 rounded' type='submit'>Register</button>
                        </div>
                        <div className='w-6/12 text-right'>
                            <Link href='/dashboard/auth/login'><a className='text-blue-500 underline'>Login</a></Link>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
}