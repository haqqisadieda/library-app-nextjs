export default function Search({
    props,
    setKeyword,
    keyword,
    setSubmit,
    submit,
    setFiltered,
    filtered,
}) {
    async function searchHandler(keyword) {
        const dataReq = await fetch(
            'http://localhost:3000/api/user/search/' + keyword
        );

        const data = await dataReq.json();

        return data;
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
    );
}
