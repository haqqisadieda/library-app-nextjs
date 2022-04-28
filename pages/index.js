import Layout from '@/components/user/Layout';
import Cards from '@/components/items/Cards';
import Router from 'next/router';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export async function getServerSideProps(ctx) {
    const dataReq = await fetch('http://localhost:3000/api/user');

    const data = await dataReq.json();

    return {
        props: data,
    };
}

export default function Home(props) {
    const [keyword, setKeyword] = useState('');
    const [submit, setSubmit] = useState(false);
    const [filtered, setFiltered] = useState(props);

    async function searchHandler(keyword) {
        const dataReq = await fetch(
            'http://localhost:3000/api/user/search/' + keyword
        );

        const data = await dataReq.json();

        return data;
    }

    function clickHandler(id, e) {
        e.preventDefault();

        Router.push('/detail/' + id);
    }

    async function submitHandler(e) {
        e.preventDefault();
        setSubmit(true);

        if (keyword === '') {
            setFiltered(props);
            setKeyword('');
            setSubmit(false);
            return;
        }

        if (keyword === ' ') {
            setFiltered(props);
            setKeyword('');
            setSubmit(false);
            return;
        }

        setFiltered(await searchHandler(keyword));

        if (filtered !== null) {
            setKeyword('');
            setSubmit(false);
        }
    }

    function fieldsHandler(e) {
        e.preventDefault();
        setKeyword(e.target.value);
    }

    function keyDownHandler(e) {
        if (e.key === 'Enter') {
            submitHandler(e);
        }
    }

    return (
        <Layout>
            <section>
                <div className='flex justify-center'>
                    <div className='mb-3 w-full'>
                        <div className='input-group relative flex items-stretch w-full mb-4'>
                            <input
                                type='search'
                                value={keyword}
                                className='form-control relative flex-auto min-w-0 w-full px-3 py-1.5 text-base font-normal text-slate-600 bg-white bg-clip-padding border border-solid border-slate-300 rounded transition ease-in-out m-0 focus:text-slate-700 focus:bg-white focus:border-slate-600 focus:outline-none'
                                placeholder="Search Title or Atuhor's First Name or Author's Last Name or Categoy's Name"
                                aria-label='Search'
                                onKeyPress={keyDownHandler.bind(this)}
                                aria-describedby='button-addon3'
                                onChange={fieldsHandler.bind(this)}
                            />
                            <button
                                className='btn inline-block px-6 py-2 border-2 border-slate-300 text-slate-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
                                type='button'
                                id='button-addon3'
                                onClick={submitHandler.bind(this)}>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className='overflow-hidden text-slate-600'>
                <div className='container px-5 py-2 mx-auto'>
                    <motion.div layout className='flex flex-wrap  -m-1'>
                        <AnimatePresence>
                            {filtered.data.map((data) => {
                                return (
                                    <Cards
                                        key={data.id}
                                        title={data.title}
                                        author={data.authorName.concat(
                                            ' ' + data.authorSurname
                                        )}
                                        category={data.category}
                                        synopsis={data.synopsis
                                            .slice(0, 150)
                                            .concat('.....')}
                                        image={'/upload/' + data.image_path}
                                        onClick={clickHandler.bind(
                                            this,
                                            data.id
                                        )}
                                    />
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}
