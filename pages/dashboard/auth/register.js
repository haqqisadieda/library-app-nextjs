import Layout from '@/components/user/Layout';

export default function Register() {
    return (
        <Layout>
            <div className='bg-white shadow-md rounded px-8 pt-6 mb-4 flex flex-col'>
                <h1 className='text-2xl text-slate-600 font-semibold mb-5 text-center uppercase space-x-8'>Register</h1>
                <form>
                    <div className='mb-4'>
                        <label className='block text-gray-600 text-sm font-bold mb-2' htmlFor='email'>
                        Email
                        </label>
                        <input type='text' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-600' id='email' name='email' placeholder='Email'  />
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-600 text-sm font-bold mb-2' htmlFor='password'>
                        Password
                        </label>
                        <input type='text' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-600' id='password' name='password' placeholder='****************'  />
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-600 text-sm font-bold mb-2' htmlFor='confirmPassword'>
                        Confirm Password
                        </label>
                        <input type='text' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-600' id='confirmPassword' name='confirmPassword' placeholder='****************'  />
                    </div>
                    <div className='flex items-center justify-between mt-5 mb-6'>
                        <button className='bg-slate-600 hover:bg-opacity-60 text-white font-bold py-2 px-4 rounded' type='submit'>Login</button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}