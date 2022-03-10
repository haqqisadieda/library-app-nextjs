import Layout from '@/components/admin/Layout';

export async function getServerSideProps(ctx) {
    const dataReq = await fetch('http://localhost:3000/api/admin');

    const data = dataReq.json();

    return {
        props: data
    };
}

export default function Home(props) {
    return (
        <Layout>
            <div className='w-full h-full items-center justify-center text-center'>
                <h1 className='text-2xl'>Hello, Admin.</h1>
                <p>Serve summary of every data</p>
            </div>
        </Layout>
    );
}
