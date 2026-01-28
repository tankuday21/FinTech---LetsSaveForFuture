import React, { useState, useEffect } from 'react';
import { HiTrophy, HiStar, HiCheckCircle } from 'react-icons/hi2';
import CelebrationModal from './CelebrationModal';

const QuizResults = ({ score, totalQuestions, onContinue, pointsEarned = 100 }) => {
  const [showCelebration, setShowCelebration] = useState(false);
  const percentage = (score / totalQuestions) * 100;
  const passed = percentage >= 70;

  useEffect(() => {
    if (passed) {
      // Show celebration after a brief delay
      const timer = setTimeout(() => {
        setShowCelebration(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [passed]);

  const getMessage = () => {
    if (percentage === 100) return "Perfect Score!";
    if (percentage >= 80) return "Excellent Work!";
    if (percentage >= 70) return "Great Job!";
    return "Keep Learning!";
  };

  const getEmoji = () => {
    if (percentage === 100) return "🏆";
    if (percentage >= 80) return "🌟";
    if (percentage >= 70) return "👏";
    return "💪";
  };

  const getEncouragement = () => {
    if (percentage === 100) {
      return "You've mastered this module! Your understanding is outstanding.";
    }
    if (percentage >= 80) {
      return "You have a strong grasp of the concepts. Keep up the great work!";
    }
    if (percentage >= 70) {
      return "You've passed! Consider reviewing to strengthen your understanding.";
    }
    return "Don't worry! Learning takes time. Review the module and try again.";
  };

  return (
    <>
      <CelebrationModal
        show={showCelebration}
        onClose={() => {
          setShowCelebration(false);
          onContinue();
        }}
        title={getMessage()}
        message="Module completed! You're one step closer to financial mastery!"
        points={pointsEarned}
        emoji={getEmoji()}
      />

      <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100 text-center transform transition-all">
        {/* Animated Trophy/Star */}
        <div className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center ${
          passed ? 'bg-gradient-to-br from-green-400 to-green-600 animate-bounce' : 'bg-gradient-to-br from-yellow-400 to-yellow-600'
        }`}>
          {passed ? (
            <HiTrophy className="w-16 h-16 text-white" />
          ) : (
            <HiStar className="w-16 h-16 text-white" />
          )}
        </div>

        {/* Title with Emoji */}
        <h2 className="text-4xl font-display font-bold text-gray-900 mb-2">
          {getMessage()} {getEmoji()}
        </h2>

        {/* Score Display */}
        <div className="mb-6">
          <div className="text-7xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {score}/{totalQuestions}
          </div>
          <div className="text-2xl text-gray-600 font-semibold">
            {percentage.toFixed(0)}% Correct
          </div>
        </div>

        {/* Encouragement */}
        <p className="text-lg text-gray-700 mb-8 max-w-md mx-auto">
          {getEncouragement()}
        </p>

        {/* Stats */}
        {passed && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <HiCheckCircle className="w-8 h-8 text-green-600" />
              <span className="text-xl font-bold text-green-900">Module Completed!</span>
            </div>
            <p className="text-green-700 font-medium">
              You've earned <span className="text-2xl font-bold text-green-600">{pointsEarned}</span> points! 🎉
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!passed && (
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 border-3 border-primary-600 text-primary-600 hover:bg-primary-50 font-bold rounded-2xl transition-all transform hover:scale-105"
            >
              Try Again 🔄
            </button>
          )}
          <button
            onClick={onContinue}
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-bold rounded-2xl transition-all transform hover:scale-105 shadow-lg"
          >
            {passed ? 'Continue Learning! 🚀' : 'Review Module 📚'}
          </button>
        </div>
      </div>
    </>
  );
};

export default QuizResults;
