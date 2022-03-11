import cookies from 'next-cookies';
import Layout from '@/components/admin/Layout';
import Link from 'next/link';

export async function getServerSideProps(ctx) {
    const { token } = cookies(ctx);
    const dataReq = await fetch('http://localhost:3000/api/admin/categories', {
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    });

    const data = await dataReq.json();

    return {
        props: data
    };
}

export default function Home(props) {
    return (
        <Layout>
            <div>
                <h1 className='text-2xl'>Categories Data</h1>
            </div>
            <div className='mt-4'>
                <Link href='/dashboard/categories/create'>
                    <button type="button" className="inline-block px-6 py-2 border-2 border-gray-800 text-gray-800 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                    Add Data
                    </button>
                </Link>
            </div>
            <div className='w-full'>
                <div className='flex flex-col'>
                    <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
                        <div className='py-4 inline-block min-w-full sm:px-6 lg-px-8'>
                            <div className='overflow-hidden'>
                                <table className='min-w-full text-center'>
                                    <thead className='border-b bg-slate-700'>
                                        <tr>
                                            <th scope='col' className='text-sm font-medium text-white px-6 py-4'>
                                                #
                                            </th>
                                            <th scope='col' className='text-sm font-medium text-white px-6 py-4'>
                                                Name
                                            </th>
                                            <th scope='col' className='text-sm font-medium text-white px-6 py-4'>
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { props.data.map(data => {
                                            return (
                                                <>
                                                    <tr className='bg-white border-b'>
                                                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{ data.id }</td>
                                                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{ data.name }</td>
                                                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                                                            <div className='space-x-3'>
                                                                <a href='#' className='text-lg'>
                                                                    ✏️
                                                                </a>
                                                                <a href='#' className='text-lg'>
                                                                     ✂️
                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </>
                                            );
                                        }) }
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