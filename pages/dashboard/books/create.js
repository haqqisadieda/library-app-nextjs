import Layout from '@/components/admin/Layout';

export default function Create() {
    return (
        <Layout>
            <div>
                <div className='bg-white shadow-md rounded px-8 pt-6 mb-4 flex flex-col'>
                    <h1 className='text-2xl text-slate-600 font-semibold mb-5 text-center uppercase space-x-8'>Add Book Data</h1>
                    <form onSubmit=''>
                        <div className='mb-4'>
                            <label className='block text-gray-600 text-sm font-bold mb-2' htmlFor='title'>
                                Title
                            </label>
                            <input onChange='' type='text' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-600' id='title' name='title' placeholder='Title'  />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-600 text-sm font-bold mb-2' htmlFor='author'>
                                Author
                            </label>
                            <select className='form-select appearance-none
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
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' 
                            aria-label='Default select example' id='author' name='author'>
                                <option value='' disabled selected>Select your option...</option>
                                <option>Author 1</option>
                                <option>Author 2</option>
                                <option>Author 3</option>
                            </select>
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-600 text-sm font-bold mb-2' htmlFor='category'>
                                Category
                            </label>
                            <select className='form-select appearance-none
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
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' 
                            aria-label='Default select example' id='category' name='category'>
                                <option value='' disabled selected>Select your option...</option>
                                <option>Category 1</option>
                                <option>Category 2</option>
                                <option>Category 3</option>
                            </select>
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-600 text-sm font-bold mb-2' htmlFor='image'>
                                Image
                            </label>
                            <input className="form-control
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
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="image" name='image' 
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-600 text-sm font-bold mb-2' htmlFor='page'>
                                Page
                            </label>
                            <input onChange='' type='text' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-600' id='page' name='page' placeholder='Page'  />
                        </div>
                        <div className='mb-6'>
                            <label className='block text-gray-600 text-sm font-bold mb-2' htmlFor='synopsis'>
                                Synopsis
                            </label>
                            <textarea
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
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                "
                                id="synopsis"
                                name="synopsis"
                                rows="5"
                                placeholder="Synopsis of the book..."
                            ></textarea>
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