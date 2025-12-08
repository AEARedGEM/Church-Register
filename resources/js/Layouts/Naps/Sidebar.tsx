// components/Layout/Sidebar.tsx
import React from 'react';
import { X, Trophy, LucideIcon } from 'lucide-react';
import { Button } from '@headlessui/react';

interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  navigationItems: NavigationItem[];
  onNavigate: (page: string) => void;
  enrollmentCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  currentPage,
  navigationItems,
  onNavigate,
  enrollmentCount
}) => {
  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out sidebar ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}>

      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">NYP</span>
          </div>
          <div>
            <span className="font-semibold text-sm text-gray-900 dark:text-white">
              NYP Training
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Industrialization Program
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                  currentPage === item.id
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Quick Stats */}
      <div className="mt-8 px-4">
        <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
          <div className="flex items-center space-x-3 mb-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="font-medium text-sm text-gray-900 dark:text-white">
              Learning Progress
            </span>
          </div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {enrollmentCount}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Courses enrolled
          </div>
        </div>
      </div>
    </div>
  );
};


