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
    <div className="rounded-lg p-6 bg-white/80 dark:bg-red-900/80 border border-red-200 dark:border-red-800 text-red-800">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2 text-red-800 dark:text-red-200">
            Welcome back, {userName}!
          </h1>
          <p className="text-red-600 dark:text-red-300">Continue your learning journey. You're doing great!</p>
        </div>
        <Button
          variant="secondary"
          className="mt-4 md:mt-0 bg-red-600 hover:bg-red-700 text-white"
          onClick={onContinueLearning}
        >
          Continue Learning
        </Button>
      </div>
    </div>
  );
};
