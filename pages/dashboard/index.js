import Layout from '@/components/admin/Layout';
import cookies from 'next-cookies';
import Link from 'next/link';

export async function getServerSideProps(ctx) {
    const { token } = cookies(ctx);
    const dataReq = await fetch('http://localhost:3000/api/admin', {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });

    const data = await dataReq.json();

    return {
        props: data,
    };
}

export default function Home(props) {
    return (
        <Layout>
            <div className="w-full h-full items-center justify-center text-center">
                <h1 className="text-2xl">Hello, Admin.</h1>
            </div>
            <div className="flex mt-5">
                <div className="w-4/12">
                    <div className="flex justify-center">
                        <div className="rounded-lg shadow-lg bg-white max-w-sm">
                            <Link href="/dashboard/books">
                                <a
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    <img
                                        className="rounded-t-lg w-48 h-48"
                                        src="https://source.unsplash.com/300x300?book"
                                        alt="book"
                                    />
                                </a>
                            </Link>
                            <div className="p-6 text-center">
                                <h5 className="text-gray-900 text-xl font-medium mb-2 tracking-wider">
                                    BOOKS
                                </h5>
                                <h1 className="text-gray-700 text-3xl font-bold mb-4">
                                    {props.data.book.length}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-4/12">
                    <div className="flex justify-center">
                        <div className="rounded-lg shadow-lg bg-white max-w-sm">
                            <Link href="/dashboard/authors">
                                <a
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    <img
                                        className="rounded-t-lg w-48 h-48"
                                        src="https://source.unsplash.com/300x300?writer"
                                        alt="author"
                                    />
                                </a>
                            </Link>
                            <div className="p-6 text-center">
                                <h5 className="text-gray-900 text-xl font-medium mb-2 tracking-wider">
                                    AUTHORS
                                </h5>
                                <h1 className="text-gray-700 text-3xl font-bold mb-4">
                                    {props.data.author.length}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-4/12">
                    <div className="flex justify-center">
                        <div className="rounded-lg shadow-lg bg-white max-w-sm">
                            <Link href="/dashboard/categories">
                                <a
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    <img
                                        className="rounded-t-lg w-48 h-48"
                                        src="https://source.unsplash.com/300x300?alphabet"
                                        alt="category"
                                    />
                                </a>
                            </Link>
                            <div className="p-6 text-center">
                                <h5 className="text-gray-900 text-xl font-medium mb-2 tracking-wider">
                                    CATEGORIES
                                </h5>
                                <h1 className="text-gray-700 text-3xl font-bold mb-4">
                                    {props.data.category.length}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
