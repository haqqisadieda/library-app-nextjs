import Link from 'next/link';
import Cookie from 'js-cookie';
import Router from 'next/router';

export default function Sidebar(props) {
    function logoutHandler(e) {
        e.preventDefault();

        Cookie.remove('token');

        Router.replace('/');
    }
    return (
        <div className="flex">
            <div className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto border-r">
                <Link href='/dashboard'>
                    <a>
                        <h2 className="text-3xl font-semibold text-center text-slate-500">Dashboard</h2>
                    </a>
                </Link>
                <div className="flex flex-col justify-between mt-6">
                    <aside>
                        <ul>
                            <li>
                                <Link href='/dashboard/books/'>
                                    <a className="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200">
                                        <span className="mx-4 font-medium">Books</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href='/dashboard/authors/'>
                                    <a className="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200">
                                        <span className="mx-4 font-medium">Authors</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href='/dashboard/categories/'>
                                    <a className="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200">
                                        <span className="mx-4 font-medium">Categories</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href='#'>
                                    <a className="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200" onClick={logoutHandler.bind(this)}>
                                        <span className="mx-4 font-medium">Logout</span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </aside>
                </div>
            </div>
            <div className="w-full h-full p-4 m-8 overflow-y-auto">
                <div className="items-center justify-center p-10 border-4 border-dotted">
                    { props.children }
                </div>
            </div>
        </div>

    );
}
