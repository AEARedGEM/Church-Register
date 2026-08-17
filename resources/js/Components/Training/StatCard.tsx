import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './Card';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: LucideIcon;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  trend = 'neutral',
  icon: Icon,
  className = ''
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-red-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;

  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </p>
        {Icon && <Icon className="w-5 h-5 text-gray-400" />}
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
        {value}
      </p>
      {change && (
        <div className="flex items-center">
          <TrendIcon className={`w-4 h-4 mr-1 ${getTrendColor()}`} />
          <span className={`text-sm ${getTrendColor()}`}>{change}</span>
        </div>
      )}
    </Card>
  );
};
