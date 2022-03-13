import Link from 'next/link';

export default function Sidebar(props) {
    return (
        <div className="flex">
            <div className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto border-r">
                <Link href="/">
                    <a>
                        <h2 className="text-3xl font-semibold text-center text-slate-500">
                            Library App
                        </h2>
                    </a>
                </Link>
                <div className="flex flex-col justify-between mt-6">
                    <aside>
                        <ul>
                            <li>
                                <Link href="/">
                                    <a className="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200">
                                        <span className="mx-4 font-medium">
                                            Books
                                        </span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/auth/login">
                                    <a className="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200">
                                        <span className="mx-4 font-medium">
                                            Login
                                        </span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </aside>
                </div>
            </div>
            <div className="w-full h-full p-4 m-8 overflow-y-auto">
                <div className="items-center justify-center p-10 border-4 border-dotted">
                    {props.children}
                </div>
            </div>
        </div>
    );
}
