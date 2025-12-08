// components/Dashboard/StatsOverview.tsx
import React from 'react';
import { StatCard } from '../Training/StatCard';

interface UserStat {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

interface StatsOverviewProps {
  stats: UserStat[];
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          trend={stat.trend}
        />
      ))}
    </div>
  );
};
