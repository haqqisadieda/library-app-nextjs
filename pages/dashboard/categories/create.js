import Layout from '@/components/admin/Layout';
import cookies from 'next-cookies';
import { useState } from 'react';
import Router from 'next/router';

export async function getServerSideProps(ctx) {
    const { token } = cookies(ctx);
    const dataReq = await fetch('http://localhost:3000/api/admin', {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });

    const data = await dataReq.json();

    return {
        props: {
            data,
            token,
        },
    };
}

export default function Create(props) {
    const [fields, setFields] = useState({
        name: '',
        error: '',
    });

    async function submitHandler(e) {
        e.preventDefault();

        if (fields.title === '') {
            setFields({
                ...fields,
                error: 'Please fill the form to add the data!',
            });
        } else if (
            props.data.data.category.some(
                (data) =>
                    data['name'].toLowerCase() === fields.name.toLowerCase()
            ) === true
        ) {
            setFields({
                ...fields,
                error: 'The name of category is on the lists, please check the lists again!',
            });
        } else {
            const createReq = await fetch('/api/admin/categories/create', {
                method: 'POST',
                body: JSON.stringify(fields),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + props.token,
                },
            });

            if (createReq.ok) {
                alert('Successfully Add Category Data');

                Router.push('/dashboard/categories');
            }
        }
    }

    function fieldsHandler(e) {
        e.preventDefault();

        const name = e.target.getAttribute('name');

        setFields({
            fields,
            [name]: e.target.value,
        });
    }

    return (
        <Layout>
            <div className="bg-white shadow-md rounded px-8 pt-6 mb-4 flex flex-col">
                <h1 className="text-2xl text-slate-600 font-semibold mb-5 text-center uppercase space-x-8">
                    Add Category Data
                </h1>
                <form onSubmit={submitHandler.bind(this)}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-600 text-sm font-bold mb-2"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            onChange={fieldsHandler.bind(this)}
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600"
                            id="name"
                            name="name"
                            placeholder="Name"
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
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
