import Cards from '@/components/items/Cards';
import Router from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

export default function BookList({ filtered }) {
    function clickHandler(id, e) {
        e.preventDefault();

        Router.push('/detail/' + id);
    }

    return (
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
                                    onClick={clickHandler.bind(this, data.id)}
                                />
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
