/* eslint-disable react/prop-types */
import Footer from '@/components/user/Footer';
import Sidebar from './Sidebar';

export default function Layout(props) {
    return (
        <div>
            <Sidebar>
                { props.children }
            </Sidebar>
            <Footer />
        </div>
    );
}
