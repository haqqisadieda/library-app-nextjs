import Layout from '@/components/admin/Layout';

export default function Home() {
    return (
        <Layout>
            <div className='w-full h-full items-center justify-center text-center'>
                <h1 className='text-2xl'>Hello, Admin.</h1>
                <p>Serve summary of every data</p>
            </div>
        </Layout>
    );
}
