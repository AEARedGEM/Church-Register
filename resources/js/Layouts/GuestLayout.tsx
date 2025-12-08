import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex  h-[100%] items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0 dark:bg-gray-900">
            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:rounded-lg dark:bg-gray-800">
                {children}
            </div>
        </div>
    );
}
