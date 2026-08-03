// components/Dashboard/WelcomeBanner.tsx
import React from 'react';
import { Button } from '../Training/Button';

interface WelcomeBannerProps {
  userName: string;
  onContinueLearning: () => void;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  userName,
  onContinueLearning
}) => {
  return (
    <div className="rounded-lg p-6 bg-white/80 dark:bg-emerald-900/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2 text-emerald-800 dark:text-emerald-200">
            Welcome back, {userName}!
          </h1>
          <p className="text-emerald-600 dark:text-emerald-300">Continue your learning journey. You're doing great!</p>
        </div>
        <Button
          variant="secondary"
          className="mt-4 md:mt-0 bg-emerald-600 hover:bg-emerald-700 text-white"
          onClick={onContinueLearning}
        >
          Continue Learning
        </Button>
      </div>
    </div>
  );
};
