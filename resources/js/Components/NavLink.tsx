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
                    ? 'border-emerald-300 text-emerald-800 focus:border-emerald-600 dark:border-emerald-600 dark:text-emerald-100'
                    : 'border-transparent text-emerald-600 hover:border-emerald-300 hover:text-emerald-700 focus:border-emerald-300 focus:text-emerald-700 dark:text-emerald-400 dark:hover:border-emerald-700 dark:hover:text-emerald-200 dark:focus:border-emerald-700 dark:focus:text-emerald-200') +
                className
            }
        >
            {children}
        </Link>
    );
}
