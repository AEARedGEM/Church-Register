import React, { useState, ReactNode } from 'react';
import { useTheme } from '@/context/ThemeContext';
import {
  Home, BookOpen, Search, Bell, Settings,
  ChevronDown, ChevronRight, Menu, X, Award, User, LogOut,
  Moon, Sun, CreditCard, Wallet, Users, TrendingUp, DollarSign,
  Brain, BrainCircuit, Shield
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { Link, router, usePage } from '@inertiajs/react';
import { NairaIcon } from '@/Components/NairaIcon';

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
          route: 'training.dashboard',
          badge: null
        },
      ]
    }
  ];


  return baseNavigation;
};

const secondaryNavigation: SecondaryNavigationItem[] = [
  { id: 'profile', label: 'Profile', icon: User, route: 'profile.edit' },
];

// Color mapping for stats (keeping for potential future use)
const colorClasses = {
  red: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-600 dark:text-red-400'
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

export default function NapsLayout({ children }: ModernLayoutProps): JSX.Element {
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
                  ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }
                ${depth > 0 ? 'ml-4' : ''}
              `}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 text-xs font-semibold bg-red-500 text-white rounded-full">
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
                  ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }
                ${depth > 0 ? 'ml-4' : ''}
              `}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 text-xs font-semibold bg-red-500 text-white rounded-full">
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
                      ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 flex-shrink-0"></span>
                  <span className="flex-1 text-left">{subItem.label}</span>
                  {subItem.badge && (
                    <span className="px-2 py-0.5 text-xs font-semibold bg-red-500 text-white rounded-full">
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
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-50 to-red-50 dark:from-yellow-900/20 dark:to-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <CreditCard className="w-4 h-4 text-red-600 dark:text-red-400" />
                  {/* <span className="text-sm font-semibold text-red-700 dark:text-red-300">
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
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
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
      <aside className="hidden lg:block">
        <div className="fixed top-16 left-0 bottom-0 z-30 h-[calc(100vh-4rem)] w-[260px] overflow-auto border-r border-slate-800/70 bg-slate-950 text-slate-300 shadow-lg">
          <div className="px-4 pt-8 pb-3" />
          <nav className="space-y-2 px-4 pb-4 pt-2">
            {[
                { id: 'overview', label: 'Overview', type: 'route', route: 'dashboard', icon: 'M3 7V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V7M3 7L12 12L21 7M3 7V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V7' },
              { id: 'startup-tokenization', label: 'Startup Tokenization', type: 'route', route: 'funding', icon: 'M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4L13.5 7H7V9H13.5L15 12L21 9ZM7 12V22H9V18H11V22H13V12H7Z' },
              { id: 'tradefi-tokenization', label: 'TradeFi Tokenization', type: 'route', route: 'funding', icon: 'M3 3H21V21H3V3Z' },
              { id: 'training', label: 'Training', type: 'route', route: 'training.dashboard', icon: 'M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3Z' },
              { id: 'community', label: 'Community', type: 'route', route: 'community', icon: 'M16 4C18.2 4 20 5.8 20 8S18.2 12 16 12 12 10.2 12 8 13.8 4 16 4M16 14C18.7 14 24 15.3 24 18V20H8V18C8 15.3 13.3 14 16 14M8 6C9.1 6 10 6.9 10 8S9.1 10 8 10 6 9.1 6 8 6.9 6 8 6M8 12C10.7 12 16 13.3 16 16V18H0V16C0 13.3 5.3 12 8 12Z' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if ((item as any).type === 'route' && (item as any).route) {
                    const target = (item as any).route;
                    if (route().current(target)) {
                      router.reload();
                    } else {
                      router.visit(route(target));
                    }
                  }
                }}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition text-slate-300 hover:bg-slate-900/80 hover:text-white`}
              >
                <svg className={`w-5 h-5 shrink-0 text-slate-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={(item as any).icon} />
                </svg>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-900/50 lg:hidden top-16"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="pt-16 min-h-screen lg:ml-[calc(260px+2rem)] px-4 lg:px-6">
        <div>
          {children}
        </div>
      </main>
    </div>
  );
}
