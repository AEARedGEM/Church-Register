import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage, router } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

interface MobileNavItem {
    id: string;
    label: string;
    type: string;
    route?: string;
}

export default function Authenticated({
    header,
    children,
    mobileNavItems,
}: PropsWithChildren<{ header?: ReactNode; mobileNavItems?: MobileNavItem[] }>) {
    const user = usePage().props.auth.user as any;
    const canAccessChurchAdmin = true;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-[#f5efe9] pt-[132px] lg:pt-[132px]">
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-red-300/40 bg-gradient-to-r from-[#081423] via-[#1f243d] to-[#8d1126] shadow-[0_12px_30px_rgba(86,7,17,0.28)] backdrop-blur">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-white" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                    className="text-red-50/90 hover:text-white"
                                >
                                    Dashboard
                                </NavLink>

                                {canAccessChurchAdmin && (
                                    <NavLink
                                        href={route('church-admin.index')}
                                        active={route().current('church-admin.index')}
                                        className="text-red-50/90 hover:text-white"
                                    >
                                        Church Admin
                                    </NavLink>
                                )}
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-lg border border-red-200/20 bg-white/6 px-3 py-2 text-sm font-medium leading-4 text-red-50 shadow-sm transition duration-150 ease-in-out hover:border-red-100/40 hover:bg-white/10 focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-slate-500 transition duration-150 ease-in-out hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 focus:outline-none dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-white dark:focus:bg-slate-900 dark:focus:text-white"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                    {mobileNavItems ? (
                        mobileNavItems.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                    if (item.type === 'route' && item.route) {
                                        router.visit(route(item.route));
                                    } else {
                                        router.visit(route('dashboard'));
                                    }
                                }}
                                className="block w-full text-left rounded-lg px-4 py-3 text-sm font-medium text-red-700 transition hover:bg-red-100 dark:text-red-200 dark:hover:bg-red-900"
                            >
                                {item.label}
                            </button>
                        ))
                    ) : (
                        <>
                            <ResponsiveNavLink
                                href={route('dashboard')}
                                active={route().current('dashboard')}
                            >
                                Dashboard
                            </ResponsiveNavLink>
                            {canAccessChurchAdmin && (
                                <ResponsiveNavLink
                                    href={route('church-admin.index')}
                                    active={route().current('church-admin.index')}
                                >
                                    Church Admin
                                </ResponsiveNavLink>
                            )}
                        </>
                    )}
                </div>

                    <div className="border-t border-slate-100 pb-1 pt-4 dark:border-slate-800">
                        <div className="px-4">
                            <div className="text-base font-medium text-slate-900 dark:text-white">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-slate-600 dark:text-slate-200">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="fixed top-16 left-0 right-0 z-40 border-b border-red-200/60 bg-gradient-to-r from-[#f3efe9] via-[#f5e7e8] to-[#f8f0ef] shadow-[0_8px_20px_rgba(149,27,47,0.08)] backdrop-blur">
                    <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
