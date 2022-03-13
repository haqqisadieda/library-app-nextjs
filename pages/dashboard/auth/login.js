import Layout from '@/components/user/Layout';
import Link from 'next/link';
import { useState } from 'react';
import Cookie from 'js-cookie';
import Router from 'next/router';
import bcrypt from 'bcryptjs';

export async function getServerSideProps(ctx) {
    const dataReq = await fetch('http://localhost:3000/api/admin/data');

    const data = await dataReq.json();

    return {
        props: data,
    };
}

export default function Login(props) {
    const [fields, setFields] = useState({
        email: '',
        password: '',
        error: '',
    });

    async function loginHandler(e) {
        e.preventDefault();

        if (fields.email === '' || fields.password === '') {
            setFields({
                ...fields,
                error: 'Please fill the form to login!',
            });
        } else if (!props.data.some((data) => data['email'] === fields.email)) {
            setFields({
                ...fields,
                error: 'Your email is not regitered!',
            });
        } else if (props.data.some((data) => data['email'] === fields.email)) {
            const password = props.data.filter(
                (data) => data['email'] === fields.email
            );
            const checkPassword = await bcrypt.compare(
                fields.password,
                password[0].password
            );

            if (!checkPassword) {
                setFields({
                    ...fields,
                    error: "Passwords don't match your email!.",
                });
            } else {
                const loginReq = await fetch('/api/admin/auth/login', {
                    method: 'POST',
                    body: JSON.stringify(fields),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const loginRes = await loginReq.json();

                Cookie.set('token', loginRes.token);

                Router.push('/dashboard');
            }
        }
    }

    function fieldsHandler(e) {
        e.preventDefault();

        const name = e.target.getAttribute('name');

        setFields({
            ...fields,
            [name]: e.target.value,
        });
    }
    return (
        <Layout>
            <div className="bg-white shadow-md rounded px-8 pt-6 mb-4 flex flex-col">
                <h1 className="text-2xl text-slate-600 font-semibold mb-5 text-center uppercase space-x-8">
                    Login
                </h1>
                <form onSubmit={loginHandler.bind(this)}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-600 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            onChange={fieldsHandler.bind(this)}
                            type="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600"
                            id="email"
                            name="email"
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-600 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            onChange={fieldsHandler.bind(this)}
                            type="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600"
                            id="password"
                            name="password"
                            placeholder="****************"
                        />
                        <p className="text-sm mt-1 px-2 text-red-500">
                            {fields.error}
                        </p>
                    </div>
                    <div className="flex items-center justify-between mt-5 mb-6">
                        <div className="w-6/12">
                            <button
                                className="bg-slate-600 hover:bg-opacity-60 text-white font-bold py-2 px-4 rounded"
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
                        <div className="w-6/12 text-right">
                            <Link href="/dashboard/auth/register">
                                <a className="text-blue-500 underline">
                                    Register
                                </a>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
