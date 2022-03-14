import cookies from 'next-cookies';
import Layout from '@/components/admin/Layout';
import Link from 'next/link';
import { useState } from 'react';

export async function getServerSideProps(ctx) {
    const { token } = cookies(ctx);
    const dataReq = await fetch('http://localhost:3000/api/admin/books', {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });

    const data = await dataReq.json();

    return {
        props: {
            books: data.data,
            token,
        },
    };
}

export default function Home(props) {
    let i = 1;

    const [books, setBooks] = useState(props.books);

    async function deleteHandler(id, image, title, e) {
        e.preventDefault();

        const ask = confirm('Are you sure to delete this data?');

        if (ask) {
            const booksFiltered = books.filter((book) => {
                return book.id !== id && book;
            });

            const deleteReq = await fetch(
                '/api/admin/books/delete/' + id + '&' + image,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: 'Bearer ' + props.token,
                    },
                }
            );

            setBooks(booksFiltered);

            if (deleteReq.ok) {
                alert(`Book data with title: ${title} successfully deleted`);
            }
        }
    }
    return (
        <Layout>
            <div>
                <h1 className="text-2xl">Books Data</h1>
            </div>
            <div className="mt-4">
                <Link href="/dashboard/books/create">
                    <button
                        type="button"
                        className="inline-block px-6 py-2 border-2 border-gray-800 text-gray-800 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    >
                        Add Data
                    </button>
                </Link>
            </div>
            <div className="w-full">
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-4 inline-block min-w-full sm:px-6 lg-px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="border-b bg-slate-700">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-white px-6 py-4"
                                            >
                                                #
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-white px-6 py-4"
                                            >
                                                Title
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-white px-6 py-4"
                                            >
                                                Author
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-white px-6 py-4"
                                            >
                                                Category
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-white px-6 py-4"
                                            >
                                                Pages
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-white px-6 py-4"
                                            >
                                                Synopsis
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium text-white px-6 py-4"
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {books.map((data) => {
                                            return (
                                                <tr
                                                    className="bg-white border-b"
                                                    key={data.id}
                                                >
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                        {i++}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                        {data.title}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 text-center w-2/12">
                                                        {data.authorName.concat(
                                                            ' ' +
                                                                data.authorSurname
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 text-center">
                                                        {data.category}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 text-center">
                                                        {data.page}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 w-4/12">
                                                        {data.synopsis}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        <div className="space-x-2">
                                                            <a
                                                                href="#"
                                                                className="text-lg"
                                                            >
                                                                ✏️
                                                            </a>
                                                            <a
                                                                href="#"
                                                                onClick={deleteHandler.bind(
                                                                    this,
                                                                    data.id,
                                                                    data.image_path,
                                                                    data.title
                                                                )}
                                                                className="text-lg"
                                                            >
                                                                ✂️
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
