import { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useCallback, useMemo } from 'react';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  UserIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import UserTable from './components/UserTable';
import UserFilters from './components/UserFilters';
import UserStats from './components/UserStats';
import { PaginatedUsers, UserFilterParams, UserFilterOptions, UserStatistics, Role } from '@/types/user';
import ModernLayout from '@/Layouts/Training/TrainingLayout';

interface UsersIndexProps extends PageProps {
  users: PaginatedUsers;
  roles: Role[];
  filters: UserFilterParams;
  filterOptions: UserFilterOptions;
  statistics: UserStatistics;
}

const UsersIndex: React.FC<UsersIndexProps> = ({
  users,
  roles,
  filters: initialFilters,
  filterOptions,
  statistics
}) => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(initialFilters.search || '');
  const [filters, setFilters] = useState<UserFilterParams>(initialFilters);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    const newFilters = { ...filters, search: term || undefined, page: 1 };
    setFilters(newFilters);

    router.get(route('users.index'), newFilters, {
      preserveState: true,
      replace: true,
    });
  }, [filters]);

  const handleFilterChange = useCallback((newFilters: Partial<UserFilterParams>) => {
    const updatedFilters = { ...filters, ...newFilters, page: 1 };
    setFilters(updatedFilters);

    router.get(route('users.index'), updatedFilters, {
      preserveState: true,
      replace: true,
    });
  }, [filters]);

  const handleClearFilters = useCallback(() => {
    const clearedFilters: UserFilterParams = {
      search: '',
      per_page: filters.per_page || 10,
      page: 1
    };
    setFilters(clearedFilters);
    setSearchTerm('');

    router.get(route('users.index'), clearedFilters, {
      preserveState: true,
      replace: true,
    });
  }, [filters.per_page]);

  const handleExport = useCallback(async () => {
    setIsExporting(true);
    try {
      const response = await fetch(route('users.export'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify(filters),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `users_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  }, [filters]);

  const hasActiveFilters = useMemo(() => {
    return Object.entries(filters).some(([key, value]) =>
      key !== 'per_page' && key !== 'page' && value !== undefined && value !== ''
    );
  }, [filters]);

  const isEmpty = users.data.length === 0 && !hasActiveFilters;

  if (isEmpty) {
    return (
      <AuthenticatedLayout>
        <Head title="Users" />
        <div className="min-h-screen flex flex-col justify-center items-center px-4 text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 sm:mb-8">
            <UserIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 dark:text-gray-500" />
          </div>
          <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 text-gray-900 dark:text-white">
            No Users Yet
          </h2>
          <p className="text-sm sm:text-base lg:text-lg mb-8 max-w-md text-gray-600 dark:text-gray-400">
            You haven't added any users yet. Start building your team by adding your first user.
          </p>
          <button
            onClick={() => router.visit(route('users.create'))}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm hover:shadow-md"
          >
            <PlusIcon className="w-5 h-5" />
            Add First User
          </button>
        </div>
      </AuthenticatedLayout>
    );
  }

  return (
      <ModernLayout>
         <Head title="Users" />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Header Section */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col gap-4 sm:gap-6 mb-6">
              {/* Page Title and Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="w-full sm:w-auto">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    User Management
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Manage system users and their permissions
                  </p>
                </div>

                {/* Search and Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                  {/* Search Bar */}
                  <div className="relative w-full sm:w-64 lg:w-80">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm dark:text-white"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 sm:gap-3">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border transition-colors font-medium whitespace-nowrap text-sm ${
                        showFilters || hasActiveFilters
                          ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <FunnelIcon className="w-4 h-4" />
                      <span className="hidden sm:inline">Filters</span>
                      {hasActiveFilters && (
                        <span className="bg-white text-emerald-600 text-xs px-2 py-0.5 rounded-full font-semibold">
                          {Object.values(filters).filter(v => v && v !== '' && v !== 10).length}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={handleExport}
                      disabled={isExporting}
                      className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      <ArrowDownTrayIcon className="w-4 h-4" />
                      <span className="hidden sm:inline">{isExporting ? 'Exporting...' : 'Export'}</span>
                    </button>

                    <button
                      onClick={() => router.visit(route('users.create'))}
                      className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors font-medium whitespace-nowrap text-sm shadow-sm hover:shadow-md"
                    >
                      <PlusIcon className="w-4 h-4" />
                      <span className="hidden sm:inline">Add User</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Cards */}
            <UserStats statistics={statistics} />
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mb-6">
              <UserFilters
                filters={filters}
                filterOptions={filterOptions}
                roles={roles}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          )}

          {/* Empty State for Filtered Results */}
          {users.data.length === 0 && hasActiveFilters ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 sm:p-12 min-h-[400px] flex items-center justify-center">
              <div className="text-center max-w-md">
                <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No users found
                </h3>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6">
                  No users match your current filters. Try adjusting your search criteria.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm sm:text-base font-medium"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
              <UserTable
                users={users}
                onFilterChange={handleFilterChange}
                currentFilters={filters}
              />
            </div>
          )}
        </div>
      </div>
      </ModernLayout>

  );
};

export default UsersIndex;
