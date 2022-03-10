import Layout from '@/components/user/Layout';
import Cards from '@/components/items/cards';

export async function getServerSideProps(ctx) {
    const dataReq = await fetch('http://localhost:3000/api/user');

    const data = await dataReq.json();

    return {
        props: data
    };
}

export default function Home(props) {
    return (
        <>
            <Layout>
                <section>
                    <div className='flex justify-center'>
                        <div className='mb-3 w-full'>
                            <div className='input-group relative flex items-stretch w-full mb-4'>
                                <input type='search' className='form-control relative flex-auto min-w-0 w-full px-3 py-1.5 text-base font-normal text-slate-600 bg-white bg-clip-padding border border-solid border-slate-300 rounded transition ease-in-out m-0 focus:text-slate-700 focus:bg-white focus:border-slate-600 focus:outline-none' placeholder='Search' aria-label='Search' aria-describedby='button-addon3' />
                                <button className='btn inline-block px-6 py-2 border-2 border-slate-300 text-slate-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out' type='button' id='button-addon3'>
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='overflow-hidden text-slate-600'>
                    <div className='container px-5 py-2 mx-auto'>
                        <div className='flex flex-wrap  -m-1'>
                            { props.data.map(data => {
                                return (
                                    <Cards 
                                        key= { data.id }
                                        title={ data.title } 
                                        author={ data.authorName.concat(' ' + data.authorSurname) } 
                                        category={ data.category } 
                                        synopsis={ data.synopsis.slice(0,150).concat('.....') } 
                                        image={ data.image_path }
                                    />
                                );
                            }) }
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}
