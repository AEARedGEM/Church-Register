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
    <div className="rounded-lg p-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-gray-800 dark:to-gray-700 text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            Welcome back, {userName}!
          </h1>
          <p className="opacity-90">Continue your learning journey. You're doing great!</p>
        </div>
        <Button
          variant="secondary"
          className="mt-4 md:mt-0 bg-white text-blue-600 hover:bg-blue-50"
          onClick={onContinueLearning}
        >
          Continue Learning
        </Button>
      </div>
    </div>
  );
};
