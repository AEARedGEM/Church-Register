import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-lg border border-transparent bg-gradient-to-r from-red-600 to-red-700 px-4 py-2 text-sm font-semibold text-white transition duration-150 ease-in-out hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 shadow-sm active:opacity-95 disabled:opacity-50 ${
                    disabled ? 'cursor-not-allowed' : ''
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
