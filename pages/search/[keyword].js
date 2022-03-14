import Layout from '@/components/user/Layout';
import Cards from '@/components/items/Cards';

export async function getServerSideProps(ctx) {
    const { keyword } = ctx.query;

    const dataReq = await fetch(
        'http://localhost:3000/api/user/search/' + keyword
    );

    const data = await dataReq.json();

    return {
        props: {
            book: data.data,
        },
    };
}

export default function Search(props) {
    function clickHandler(id, e) {
        e.preventDefault();

        Router.push('/detail/' + id);
    }

    return (
        <Layout>
            <section className="overflow-hidden text-slate-600">
                <div className="container px-5 py-2 mx-auto">
                    <div className="flex flex-wrap  -m-1">
                        {props.book.map((data) => {
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
                                    onClick={clickHandler.bind(this, data.id)}
                                />
                            );
                        })}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
