/* eslint-disable react/prop-types */
import Sidebar from './Sidebar';

export default function Layout(props) {
    return (
        <div>
            <Sidebar>
                { props.children }
            </Sidebar>
        </div>
    );
}
