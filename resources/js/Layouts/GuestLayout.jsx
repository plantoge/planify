import { Head } from '@inertiajs/react';

export default function GuestLayout({ children, title }) {
    return (
        <div>
            <Head title={title} />
            {children}
        </div> 
    );
}
