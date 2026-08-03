import React from 'react';

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  size?: 'sm' | 'md';
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  enabled,
  onChange,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-5 w-9',
    md: 'h-6 w-11'
  };

  const thumbSizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4'
  };

  const translateClasses = {
    sm: enabled ? 'translate-x-5' : 'translate-x-1',
    md: enabled ? 'translate-x-6' : 'translate-x-1'
  };

  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex ${sizeClasses[size]} items-center rounded-full transition-colors ${
        enabled ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
      } ${className}`}
    >
      <span
        className={`inline-block ${thumbSizeClasses[size]} transform rounded-full bg-white transition-transform ${translateClasses[size]}`}
      />
    </button>
  );
};
