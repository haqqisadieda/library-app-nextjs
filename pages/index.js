import Layout from '@/components/user/Layout';
import Search from '@/components/user/Search';
import BookList from '@/components/user/BookList';
import { useState } from 'react';

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

    return (
        <Layout>
            <Search
                props={props}
                setKeyword={setKeyword}
                keyword={keyword}
                setSubmit={setSubmit}
                submit={submit}
                setFiltered={setFiltered}
                filtered={filtered}
            />
            <BookList filtered={filtered} />
        </Layout>
    );
}
