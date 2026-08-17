
import React from 'react';
import {
  UserIcon,
  UsersIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { UserStatistics } from '@/types/user';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  subtitle?: string;
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, subtitle, trend }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
          {trend && (
            <div className={`inline-flex items-center gap-1 text-xs font-medium mt-2 ${
              trend.isPositive ? 'text-red-600 dark:text-red-400' : 'text-red-600 dark:text-red-400'
            }`}>
              <span>{trend.isPositive ? '↑' : '↓'} {trend.value}%</span>
              <span className="text-gray-500 dark:text-gray-400">{trend.label}</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
};

interface UserStatsProps {
  statistics: UserStatistics;
}

export const UserStats: React.FC<UserStatsProps> = ({ statistics }) => {
  const formatNumber = (number: number): string => {
    return new Intl.NumberFormat('en-US').format(number);
  };

  const getVerificationRate = (): number => {
    if (statistics.total_users === 0) return 0;
    return Math.round((statistics.verified_users / statistics.total_users) * 100);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      <StatCard
        title="Total Users"
        value={formatNumber(statistics.total_users)}
        icon={<UsersIcon className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 dark:text-red-400" />}
        subtitle="All registered users"
      />

      <StatCard
        title="Email Verified"
        value={formatNumber(statistics.verified_users)}
        icon={<CheckBadgeIcon className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 dark:text-red-400" />}
        subtitle={`${getVerificationRate()}% verification rate`}
      />

      <StatCard
        title="Unverified"
        value={formatNumber(statistics.unverified_users)}
        icon={<ExclamationTriangleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 dark:text-yellow-400" />}
        subtitle="Need email verification"
      />

      <StatCard
        title="Pending Review"
        value={formatNumber(statistics.pending_users)}
        icon={<ClockIcon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 dark:text-orange-400" />}
        subtitle="Awaiting approval"
      />

      <StatCard
        title="New Today"
        value={formatNumber(statistics.today_users)}
        icon={<UserIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />}
        subtitle="Registered today"
      />

      <StatCard
        title="Total Roles"
        value={formatNumber(statistics.total_roles)}
        icon={<UserGroupIcon className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 dark:text-red-400" />}
        subtitle="Available system roles"
      />
    </div>
  );
};

export default UserStats;
