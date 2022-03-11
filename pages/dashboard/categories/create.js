import Layout from '@/components/admin/Layout';

export default function Create() {
    return (
        <Layout>
            <div className='bg-white shadow-md rounded px-8 pt-6 mb-4 flex flex-col'>
                <h1 className='text-2xl text-slate-600 font-semibold mb-5 text-center uppercase space-x-8'>Add Category Data</h1>
                <form onSubmit=''>
                    <div className='mb-4'>
                        <label className='block text-gray-600 text-sm font-bold mb-2' htmlFor='name'>
                            Name
                        </label>
                        <input onChange='' type='text' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-600' id='name' name='name' placeholder='Name'  />
                    </div>
                    <div className='flex items-center justify-between mt-5 mb-6'>
                        <div className='w-6/12'>
                            <button className='bg-slate-600 hover:bg-opacity-60 text-white font-bold py-2 px-4 rounded' type='submit'>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
}