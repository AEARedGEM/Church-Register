import { InputHTMLAttributes } from 'react';

export default function Checkbox({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-emerald-600 shadow-sm focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:ring-emerald-400 dark:focus:ring-offset-emerald-900 ' +
                className
            }
        />
    );
}
