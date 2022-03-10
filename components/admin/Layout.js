import Sidebar from '@/components/admin/Sidebar';

export default function Layout(props) {
    return (
        <>
            <Sidebar>
                { props.children }
            </Sidebar>
        </>
    );
}
