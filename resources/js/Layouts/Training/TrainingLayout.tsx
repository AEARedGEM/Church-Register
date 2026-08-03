import React, { useState, ReactNode } from 'react';
import { useTheme } from '@/context/ThemeContext';
import {
  Home, BookOpen, Search, Bell, Settings,
  ChevronDown, ChevronRight, Menu, X, Award, User, LogOut,
  Moon, Sun, CreditCard, Wallet, Users, TrendingUp, DollarSign,
  Brain, BrainCircuit, Shield, Calendar
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { Link, router, usePage } from '@inertiajs/react';
import { NairaIcon } from '@/Components/NairaIcon';

// Types matching Laravel backend structure
interface User {
  id: number;
  name: string;
  email: string;
  credit: number;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  permissions: string[];
  roles: string[];
}

interface ZiggyConfig {
  url: string;
  port: number | null;
  defaults: Record<string, any>;
  routes: Record<string, any>;
  location: string;
}

interface NavigationSubItem {
  id: string;
  label: string;
  route: string;
  badge?: string | null;
}

interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
  route: string;
  badge?: string | null;
  subItems?: NavigationSubItem[];
}

interface NavigationGroup {
  label: string | null;
  items: NavigationItem[];
}

interface SecondaryNavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
  route: string;
}

interface ModernLayoutProps {
  children?: ReactNode;
}

interface NavItemProps {
  item: NavigationItem;
  depth?: number;
}

// Inertia page props interface
interface PageProps extends Record<string, any> {
  auth: {
    user: User | null;
  };
  ziggy: ZiggyConfig;
}

// Type guard for user role
type UserRole = 'super_admin' | 'admin' | 'individual' | string;

// Function to get navigation groups based on user role
const getNavigationGroups = (userRole: UserRole): NavigationGroup[] => {
  const baseNavigation: NavigationGroup[] = [
    {
      label: null,
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: Home,
          route: 'dashboard',
          badge: null
        },
      ]
    },
        {
          label: 'Training',
          items: [
            {
              id: 'training.dashboard',
              label: 'Dashboard',
              icon: BookOpen,
              route: 'training.dashboard',
              badge: null,
            },
            {
              id: 'training.courses',
              label: 'Browse Courses',
              icon: Search,
              route: 'training.courses',
              badge: null,
            },
            {
              id: 'training.events',
              label: 'Events',
              icon: Calendar,
              route: 'training.events',
              badge: null,
            },
            {
              id: 'training.certificates',
              label: 'My Certificates',
              icon: Award,
              route: 'training.certificates',
              badge: null,
            },
          ]
        },
  ];

  // Admin-specific navigation
  const adminNavigation: NavigationGroup = {
    label: 'Administration',
    items: [
      {
        id: 'admin',
        label: 'Admin Panel',
        icon: Shield,
        route: 'training',
        badge: null,
        subItems: [
          { id: 'admin.training', label: 'Training Management', route: 'admin.training.index' },
          { id: 'admin.users', label: 'User Management', route: 'users.index' },
        ]
      }
    ]
  };

  // Check if user has admin role
  if (userRole === 'super_admin' || userRole === 'admin') {
    return [...baseNavigation, adminNavigation];
  }

  return baseNavigation;
};

const secondaryNavigation: SecondaryNavigationItem[] = [
  { id: 'profile', label: 'Profile', icon: User, route: 'profile.edit' },
];

// Color mapping for stats (keeping for potential future use)
const colorClasses = {
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    text: 'text-emerald-600 dark:text-emerald-400'
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    text: 'text-green-600 dark:text-green-400'
  },
  yellow: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    text: 'text-yellow-600 dark:text-yellow-400'
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    text: 'text-purple-600 dark:text-purple-400'
  },
};

export default function ModernLayout({ children }: ModernLayoutProps): JSX.Element {
  const { auth, ziggy } = usePage().props;
  const user = auth.user;

  // Get user role with proper fallback - roles is an array of strings
  const userRole: UserRole = user?.roles?.[0] || 'individual';

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === 'dark';
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // Get navigation based on user role
  const navigationGroups = getNavigationGroups(userRole);

  const toggleDarkMode = (): void => toggleTheme();

  const toggleItem = (itemId: string): void => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const isActive = (routeName: string): boolean => {
    return route().current(routeName);
  };

  const isActiveGroup = (itemId: string): boolean => {
    const currentRoute = route().current() || '';
    return currentRoute.startsWith(itemId);
  };

  const handleLogout = (): void => {
    router.post(route('logout'));
  };

  const NavItem = ({ item, depth = 0 }: NavItemProps): JSX.Element => {
    const Icon = item.icon;
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = expandedItems[item.id];
    const active = isActive(item.route) || isActiveGroup(item.id);

    return (
      <li>
        <div className="flex items-center">
          {hasSubItems ? (
            <button
              onClick={() => toggleItem(item.id)}
              className={`
                flex-1 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-all duration-200
                ${active
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }
                ${depth > 0 ? 'ml-4' : ''}
              `}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-500 text-white rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ) : (
            <Link
              href={route(item.route)}
              className={`
                flex-1 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-all duration-200
                ${active
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }
                ${depth > 0 ? 'ml-4' : ''}
              `}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-500 text-white rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          )}
          {hasSubItems && (
            <button
              onClick={() => toggleItem(item.id)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              )}
            </button>
          )}
        </div>

        {hasSubItems && isExpanded && (
          <ul className="mt-1 space-y-1 ml-4">
            {item.subItems?.map((subItem) => (
              <li key={subItem.id}>
                <Link
                  href={route(subItem.route)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${isActive(subItem.route)
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 flex-shrink-0"></span>
                  <span className="flex-1 text-left">{subItem.label}</span>
                  {subItem.badge && (
                    <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-500 text-white rounded-full">
                      {subItem.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 z-50 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {sidebarOpen ? (
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>

              <Link href={route('dashboard')} className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
                  NYP-IP Dashboard
                </span>
              </Link>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* Credits */}
              {user && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-50 to-green-50 dark:from-yellow-900/20 dark:to-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <CreditCard className="w-4 h-4 text-green-600 dark:text-green-400" />
                  {/* <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                    {user.credit || 0}
                  </span> */}
                </div>
              )}

              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>

              {/* User Menu */}
              {user && (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {user.name.split(' ').map((n: string) => n[0]).join('')}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300 hidden sm:block" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {user.email}
                        </p>
                      </div>
                      {secondaryNavigation.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.id}
                            href={route(item.route)}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                          >
                            <Icon className="w-4 h-4" />
                            {item.label}
                          </Link>
                        );
                      })}
                      <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          Log out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64
        bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <nav className="h-full overflow-y-auto p-4">
          {navigationGroups.map((group, idx) => (
            <div key={idx} className={idx > 0 ? 'mt-8 pt-8 border-t border-gray-200 dark:border-gray-700' : ''}>
              {group.label && (
                <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  {group.label}
                </h3>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <NavItem key={item.id} item={item} />
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-900/50 lg:hidden top-16"
          onClick={() => setSidebarOpen(false)}
        />
      )}


      {/* Main Content */}
      <main className="pt-16 lg:pl-64 min-h-screen">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
