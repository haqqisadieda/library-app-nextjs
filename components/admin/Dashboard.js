import Link from 'next/link';

export default function Dashboard({ props }) {
    return (
        <div className='flex mt-5'>
            <div className='w-4/12'>
                <div className='flex justify-center'>
                    <div className='rounded-lg shadow-lg bg-white max-w-sm'>
                        <Link href='/dashboard/books'>
                            <a
                                data-mdb-ripple='true'
                                data-mdb-ripple-color='light'>
                                <img
                                    className='rounded-t-lg w-48 h-48'
                                    src='https://source.unsplash.com/300x300?book'
                                    alt='book'
                                />
                            </a>
                        </Link>
                        <div className='p-6 text-center'>
                            <h5 className='text-gray-900 text-xl font-medium mb-2 tracking-wider'>
                                BOOKS
                            </h5>
                            <h1 className='text-gray-700 text-3xl font-bold mb-4'>
                                {props.data.book.length}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-4/12'>
                <div className='flex justify-center'>
                    <div className='rounded-lg shadow-lg bg-white max-w-sm'>
                        <Link href='/dashboard/authors'>
                            <a
                                data-mdb-ripple='true'
                                data-mdb-ripple-color='light'>
                                <img
                                    className='rounded-t-lg w-48 h-48'
                                    src='https://source.unsplash.com/300x300?writer'
                                    alt='author'
                                />
                            </a>
                        </Link>
                        <div className='p-6 text-center'>
                            <h5 className='text-gray-900 text-xl font-medium mb-2 tracking-wider'>
                                AUTHORS
                            </h5>
                            <h1 className='text-gray-700 text-3xl font-bold mb-4'>
                                {props.data.author.length}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-4/12'>
                <div className='flex justify-center'>
                    <div className='rounded-lg shadow-lg bg-white max-w-sm'>
                        <Link href='/dashboard/categories'>
                            <a
                                data-mdb-ripple='true'
                                data-mdb-ripple-color='light'>
                                <img
                                    className='rounded-t-lg w-48 h-48'
                                    src='https://source.unsplash.com/300x300?alphabet'
                                    alt='category'
                                />
                            </a>
                        </Link>
                        <div className='p-6 text-center'>
                            <h5 className='text-gray-900 text-xl font-medium mb-2 tracking-wider'>
                                CATEGORIES
                            </h5>
                            <h1 className='text-gray-700 text-3xl font-bold mb-4'>
                                {props.data.category.length}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
