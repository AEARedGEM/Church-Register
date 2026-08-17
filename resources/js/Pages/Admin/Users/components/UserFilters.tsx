import React, { useState, useCallback } from 'react';
import {
  XMarkIcon,
  CalendarIcon,
  UserGroupIcon,
  CheckBadgeIcon,
  MapPinIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';
import { UserFilterParams, UserFilterOptions, Role } from '@/types/user';

interface UserFiltersProps {
  filters: UserFilterParams;
  filterOptions: UserFilterOptions;
  roles: Role[];
  onFilterChange: (filters: Partial<UserFilterParams>) => void;
  onClearFilters: () => void;
}

export const UserFilters: React.FC<UserFiltersProps> = ({
  filters,
  filterOptions,
  roles,
  onFilterChange,
  onClearFilters,
}) => {
  const [localFilters, setLocalFilters] = useState<UserFilterParams>(filters);

  const handleInputChange = useCallback((field: keyof UserFilterParams, value: string | undefined) => {
    const newFilters = { ...localFilters, [field]: value || undefined };
    setLocalFilters(newFilters);
  }, [localFilters]);

  const handleApplyFilters = useCallback(() => {
    onFilterChange(localFilters);
  }, [localFilters, onFilterChange]);

  const handleReset = useCallback(() => {
    const resetFilters: UserFilterParams = {
      per_page: filters.per_page || 10
    };
    setLocalFilters(resetFilters);
    onClearFilters();
  }, [filters.per_page, onClearFilters]);

  const hasActiveFilters = Object.entries(localFilters).some(([key, value]) =>
    key !== 'per_page' && key !== 'page' && value !== undefined && value !== ''
  );

  const getActiveFilterLabel = (key: string, value: string): string => {
    switch (key) {
      case 'role':
        return `Role: ${roles.find(r => r.id.toString() === value)?.name || value}`;
      case 'status':
        return `Status: ${filterOptions.statuses.find(s => s.value === value)?.label || value}`;
      case 'registration_status':
        return `Registration: ${filterOptions.registrationStatuses.find(s => s.value === value)?.label || value}`;
      case 'sector':
        return `Sector: ${value}`;
      case 'state':
        return `State: ${value}`;
      case 'date_from':
        return `From: ${value}`;
      case 'date_to':
        return `To: ${value}`;
      default:
        return `${key}: ${value}`;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
          Filter Users
        </h3>
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium whitespace-nowrap"
          >
            Clear All Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        {/* Role Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <UserGroupIcon className="inline w-4 h-4 mr-1" />
            Role
          </label>
          <select
            value={localFilters.role || ''}
            onChange={(e) => handleInputChange('role', e.target.value || undefined)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="">All Roles</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name.replace('_', ' ').toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Email Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <CheckBadgeIcon className="inline w-4 h-4 mr-1" />
            Email Status
          </label>
          <select
            value={localFilters.status || ''}
            onChange={(e) => handleInputChange('status', e.target.value || undefined)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="">All Statuses</option>
            {filterOptions.statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        {/* Registration Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Registration Status
          </label>
          <select
            value={localFilters.registration_status || ''}
            onChange={(e) => handleInputChange('registration_status', e.target.value || undefined)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="">All Registration Status</option>
            {filterOptions.registrationStatuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sector Filter */}
        {filterOptions.sectors.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <BriefcaseIcon className="inline w-4 h-4 mr-1" />
              Sector
            </label>
            <select
              value={localFilters.sector || ''}
              onChange={(e) => handleInputChange('sector', e.target.value || undefined)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">All Sectors</option>
              {filterOptions.sectors.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* State Filter */}
        {filterOptions.states.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <MapPinIcon className="inline w-4 h-4 mr-1" />
              State
            </label>
            <select
              value={localFilters.state || ''}
              onChange={(e) => handleInputChange('state', e.target.value || undefined)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">All States</option>
              {filterOptions.states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Date From */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <CalendarIcon className="inline w-4 h-4 mr-1" />
            Joined From
          </label>
          <input
            type="date"
            value={localFilters.date_from || ''}
            onChange={(e) => handleInputChange('date_from', e.target.value || undefined)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Date To */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <CalendarIcon className="inline w-4 h-4 mr-1" />
            Joined To
          </label>
          <input
            type="date"
            value={localFilters.date_to || ''}
            onChange={(e) => handleInputChange('date_to', e.target.value || undefined)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-red-800 dark:text-red-300 mr-2">
              Active filters:
            </span>

            {Object.entries(localFilters).map(([key, value]) => {
              if (key === 'per_page' || key === 'page' || !value) return null;

              return (
                <span
                  key={key}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 text-xs font-medium rounded-full"
                >
                  {getActiveFilterLabel(key, value.toString())}
                  <button
                    onClick={() => handleInputChange(key as keyof UserFilterParams, undefined)}
                    className="hover:text-red-600 dark:hover:text-red-300"
                  >
                    <XMarkIcon className="w-3.5 h-3.5" />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleApplyFilters}
          className="flex-1 sm:flex-none px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
        >
          Apply Filters
        </button>

        <button
          onClick={handleReset}
          className="flex-1 sm:flex-none px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium text-sm"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default UserFilters;
