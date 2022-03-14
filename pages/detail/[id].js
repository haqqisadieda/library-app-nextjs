import Layout from '@/components/user/Layout';

export async function getServerSideProps(ctx) {
    const { id } = ctx.query;

    const dataReq = await fetch('http://localhost:3000/api/user/detail/' + id);

    const data = await dataReq.json();

    return {
        props: {
            book: data.data,
        },
    };
}

export default function Detail(props) {
    return (
        <Layout>
            <div className="flex justify-center w-full">
                <img
                    className="w-4/12 xl:h-80 object-cover rounded-t-lg"
                    src={`/upload/${props.book.image_path}`}
                    alt="image"
                />
                <div className="p-6 w-6/12">
                    <h5 className="text-slate-600 text-base font-medium mb-2">
                        {props.book.title}
                    </h5>
                    <p className="text-slate-500 text-xs mb-2">
                        {props.book.category}
                    </p>
                    <p className="text-slate-500 text-xs mb-2">
                        {props.book.page} Pages
                    </p>
                    <p className="text-slate-600 text-sm font-medium mb-2">
                        {props.book.authorName.concat(
                            ' ' + props.book.authorSurname
                        )}
                    </p>
                    <p className="text-slate-500 text-base">
                        {props.book.synopsis}
                    </p>
                </div>
            </div>
        </Layout>
    );
}
