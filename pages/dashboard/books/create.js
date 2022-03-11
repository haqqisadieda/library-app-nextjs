import cookies from 'next-cookies';
import { useState } from 'react';
import Layout from '@/components/admin/Layout';
import Router from 'next/router';

export async function getServerSideProps(ctx) {
    const { token } = cookies(ctx);
    const dataReq = await fetch('http://localhost:3000/api/admin', {
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    });

    const data = await dataReq.json();

    return {
        props: data
    };
}

export default function Create(props) {
    let setDefaultSelect = 0;
    const [ fields, setFields ] = useState({
        title: '',
        author: '',
        category: '',
        page: '',
        synopsis: '',
        image: '',
        error: ''
    });

    const [file, setFile] = useState(null);

    const [url, setUrl] = useState('');
    
    async function submitHandler(e) {
        e.preventDefault();

        if(fields.title === '' || fields.author === '' || fields.category === '' || fields.page === '' || fields.synopsis === '' || fields.image === ''){
            setFields({
                ...fields,
                'error': 'Please fill the form to add the data!',
            });
        }else if(props.data.book.some(data => data['title'] === fields.title) === true) {
            setFields({
                ...fields,
                'error': 'The book is on the lists, please check the lists again!',
            });
        }else {

            const body = new FormData();
            body.append('file', file, fields.image);

            const uploadReq = await fetch('/api/admin/books/upload', {
                method: 'POST',
                body,
            });

            const createReq = await fetch('/api/admin/books/create', {
                method: 'POST',
                body: JSON.stringify(fields),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if(createReq.ok && uploadReq.ok) alert('Successfully Add Book Data');

            Router.push('/dashboard/books');
        }
    }

    function fieldsHandler(e) {
        e.preventDefault();

        const name = e.target.getAttribute('name');

        setFields({
            ...fields,
            [name]: e.target.value
        });
    }

    function imageHandler(e) {
        e.preventDefault();

        const image = e.target.files[0];
        const imageName = image.name;

        setFields({
            ...fields,
            image: fields.title.toLowerCase().replace(/\s/g, '-') + '.' +imageName.split('.')[1],
        });

        setFile(image);

        setUrl(URL.createObjectURL(image));
    }
    return (
        <Layout>
            <div>
                <div className='bg-white shadow-md rounded px-8 pt-6 mb-4 flex flex-col'>
                    <h1 className='text-2xl text-slate-600 font-semibold mb-5 text-center uppercase space-x-8'>Add Book Data</h1>
                    <form onSubmit={submitHandler.bind(this)}>
                        <div className='mb-4'>
                            <label className='block text-gray-600 text-sm font-bold mb-2' htmlFor='title'>
                                Title
                            </label>
                            <input onChange={fieldsHandler.bind(this)} type='text' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-600' id='title' name='title' placeholder='Title'  />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-600 text-sm font-bold mb-2' htmlFor='author'>
                                Author
                            </label>
                            <select onChange={fieldsHandler.bind(this)} defaultValue={setDefaultSelect} className='form-select appearance-none
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding bg-no-repeat
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none' 
                            aria-label='Default select example' id='author' name='author'>
                                <option value='0' disabled>Select your option...</option>
                                { props.data.author.map(data => {
                                    return (
                                        <option key={data.id} value={data.id}>{ data.name.concat(' ' + data.surname) }</option>
                                    );
                                }) }
                            </select>
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-600 text-sm font-bold mb-2' htmlFor='category'>
                                Category
                            </label>
                            <select onChange={fieldsHandler.bind(this)} defaultValue={setDefaultSelect} className='form-select appearance-none
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding bg-no-repeat
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none' 
                            aria-label='Default select example' id='category' name='category'>
                                <option value='0' disabled>Select your option...</option>
                                { props.data.category.map(data => {
                                    return (
                                        <option key={data.id} value={data.id}>{ data.name }</option>
                                    );
                                }) }
                            </select>
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-600 text-sm font-bold mb-2' htmlFor='image'>
                                Image
                            </label>
                            <img className='block ml-auto mr-auto my-4' src={url}></img>
                            <input onChange={imageHandler.bind(this)} className="form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none" type="file" id="image" name='image' 
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-600 text-sm font-bold mb-2' htmlFor='page'>
                                Page
                            </label>
                            <input onChange={fieldsHandler.bind(this)} type='text' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-600' id='page' name='page' placeholder='Page'  />
                        </div>
                        <div className='mb-6'>
                            <label className='block text-gray-600 text-sm font-bold mb-2' htmlFor='synopsis'>
                                Synopsis
                            </label>
                            <textarea
                                onChange={fieldsHandler.bind(this)}
                                className="
                                    form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    shadow
                                    focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none
                                "
                                id="synopsis"
                                name="synopsis"
                                rows="5"
                                placeholder="Synopsis of the book..."
                            ></textarea>
                            <p className='text-sm mt-1 px-2 text-red-500'>{ fields.error }</p>
                        </div>
                        <div className='flex items-center justify-between mt-5 mb-6'>
                            <div className='w-6/12'>
                                <button className='bg-slate-600 hover:bg-opacity-60 text-white font-bold py-2 px-4 rounded' type='submit'>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}