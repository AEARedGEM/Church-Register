import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-red-300 text-red-800 focus:border-red-600 dark:border-red-600 dark:text-red-100'
                    : 'border-transparent text-red-600 hover:border-red-300 hover:text-red-700 focus:border-red-300 focus:text-red-700 dark:text-red-400 dark:hover:border-red-700 dark:hover:text-red-200 dark:focus:border-red-700 dark:focus:text-red-200') +
                className
            }
        >
            {children}
        </Link>
    );
}
