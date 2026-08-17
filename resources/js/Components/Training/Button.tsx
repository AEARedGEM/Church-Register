import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: LucideIcon;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon: Icon,
  className = ''
}) => {
  const baseClasses = 'font-medium rounded-lg transition-colors flex items-center justify-center';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const variantClasses = {
    primary: 'bg-red-600 hover:bg-red-700 text-white disabled:bg-red-400',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white disabled:bg-gray-300 dark:disabled:bg-gray-600',
    danger: 'bg-red-600 hover:bg-red-700 text-white disabled:bg-red-400',
    success: 'bg-red-600 hover:bg-red-700 text-white disabled:bg-red-400'
  };

  const widthClasses = fullWidth ? 'w-full' : '';
  const disabledClasses = (disabled || loading) ? 'cursor-not-allowed opacity-75' : '';

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClasses} ${disabledClasses} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
};
