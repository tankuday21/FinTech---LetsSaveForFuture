import React from 'react';
import { HiFire } from 'react-icons/hi2';

const StreakDisplay = ({ currentStreak, longestStreak, size = 'normal' }) => {
  const getStreakMessage = () => {
    if (currentStreak === 0) return "Start your streak today!";
    if (currentStreak === 1) return "Great start! Keep it going!";
    if (currentStreak < 7) return "You're on fire! 🔥";
    if (currentStreak < 30) return "Amazing streak! Keep learning!";
    if (currentStreak < 100) return "Incredible dedication! 🌟";
    return "Legendary streak! You're unstoppable! 👑";
  };

  const getStreakColor = () => {
    if (currentStreak === 0) return 'text-gray-400';
    if (currentStreak < 7) return 'text-orange-500';
    if (currentStreak < 30) return 'text-orange-600';
    return 'text-red-600';
  };

  const isLarge = size === 'large';

  return (
    <div className={`bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl ${isLarge ? 'p-6' : 'p-4'}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <HiFire className={`${getStreakColor()} ${isLarge ? 'w-8 h-8' : 'w-6 h-6'}`} />
          <span className={`font-semibold text-gray-900 ${isLarge ? 'text-lg' : 'text-base'}`}>
            Daily Streak
          </span>
        </div>
        {longestStreak > 0 && (
          <div className="text-right">
            <p className="text-xs text-gray-600">Best</p>
            <p className="text-sm font-bold text-gray-900">{longestStreak} days</p>
          </div>
        )}
      </div>

      <div className="text-center mb-3">
        <div className={`${isLarge ? 'text-6xl' : 'text-5xl'} font-bold ${getStreakColor()}`}>
          {currentStreak}
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {currentStreak === 1 ? 'day' : 'days'}
        </p>
      </div>

      <p className={`text-center ${isLarge ? 'text-base' : 'text-sm'} text-gray-700 font-medium`}>
        {getStreakMessage()}
      </p>

      {currentStreak > 0 && (
        <div className="mt-4 bg-white/50 rounded-lg p-3">
          <p className="text-xs text-gray-600 text-center">
            Complete a module today to keep your streak alive!
          </p>
        </div>
      )}

      {/* Streak Milestones */}
      {isLarge && (
        <div className="mt-4 grid grid-cols-4 gap-2">
          <div className={`text-center p-2 rounded-lg ${currentStreak >= 7 ? 'bg-green-100' : 'bg-gray-100'}`}>
            <p className="text-xs font-semibold text-gray-700">7 days</p>
            <p className="text-lg">{currentStreak >= 7 ? '✅' : '🔒'}</p>
          </div>
          <div className={`text-center p-2 rounded-lg ${currentStreak >= 30 ? 'bg-green-100' : 'bg-gray-100'}`}>
            <p className="text-xs font-semibold text-gray-700">30 days</p>
            <p className="text-lg">{currentStreak >= 30 ? '✅' : '🔒'}</p>
          </div>
          <div className={`text-center p-2 rounded-lg ${currentStreak >= 100 ? 'bg-green-100' : 'bg-gray-100'}`}>
            <p className="text-xs font-semibold text-gray-700">100 days</p>
            <p className="text-lg">{currentStreak >= 100 ? '✅' : '🔒'}</p>
          </div>
          <div className={`text-center p-2 rounded-lg ${currentStreak >= 365 ? 'bg-green-100' : 'bg-gray-100'}`}>
            <p className="text-xs font-semibold text-gray-700">365 days</p>
            <p className="text-lg">{currentStreak >= 365 ? '✅' : '🔒'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StreakDisplay;
