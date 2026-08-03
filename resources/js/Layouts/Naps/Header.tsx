// components/Layout/Header.tsx
import React from 'react';
import { Menu, Sun, Moon, Bell, ChevronDown } from 'lucide-react';
import { SearchInput } from '@/Components/Training/SearchInput';
import { Dropdown } from '@/Components/Training/Dropdown';
import { router } from '@inertiajs/react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface HeaderProps {
  user: User;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  darkMode,
  onToggleDarkMode,
  onToggleSidebar
}) => {
  const userDropdownItems = [
    {
      id: 'profile',
      label: 'My Profile',
      onClick: () => console.log('Profile clicked')
    },
    {
      id: 'progress',
      label: 'Learning Progress',
      onClick: () => console.log('Progress clicked')
    },
    {
      id: 'certificates',
      label: 'Certificates',
      onClick: () => console.log('Certificates clicked')
    },
    {
      id: 'logout',
      label: 'Sign out',
      onClick: () => router.post('/logout'),
      divider: true
    }
  ];

  const userTrigger = (
    <div className="flex items-center space-x-2 p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700">
      <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-purple-600 rounded-full flex items-center justify-center">
        <span className="text-white text-sm font-medium">
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </span>
      </div>
      <div className="hidden sm:block text-left">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {user?.name || 'User'}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {user?.email || ''}
        </p>
      </div>
      <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
    </div>
  );

  return (
    <header className="sticky top-0 z-40 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 backdrop-blur-sm">
      <div className="flex items-center justify-between h-full px-4 sm:px-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 mobile-menu-btn"
          >
            <Menu className="w-5 h-5" />
          </button>

          <SearchInput
            placeholder="Search courses, instructors..."
            className="max-w-xs w-full"
          />
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button className="p-2 rounded-lg transition-colors relative hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <Dropdown trigger={userTrigger} items={userDropdownItems} />
        </div>
      </div>
    </header>
  );
};
