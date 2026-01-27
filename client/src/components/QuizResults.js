import React from 'react';
import { HiTrophy, HiStar, HiCheckCircle } from 'react-icons/hi2';

const QuizResults = ({ score, totalQuestions, onContinue }) => {
  const percentage = (score / totalQuestions) * 100;
  const passed = percentage >= 70;

  const getMessage = () => {
    if (percentage === 100) return "Perfect Score! 🎉";
    if (percentage >= 80) return "Excellent Work! 🌟";
    if (percentage >= 70) return "Great Job! 👏";
    return "Keep Learning! 💪";
  };

  const getEncouragement = () => {
    if (percentage === 100) {
      return "You've mastered this module! Your understanding of financial goals is outstanding.";
    }
    if (percentage >= 80) {
      return "You have a strong grasp of the concepts. You're well on your way to financial literacy!";
    }
    if (percentage >= 70) {
      return "You've passed! Consider reviewing the material to strengthen your understanding.";
    }
    return "Don't worry! Learning takes time. Review the module and try again.";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 text-center">
      {/* Trophy Icon */}
      <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
        passed ? 'bg-green-100' : 'bg-yellow-100'
      }`}>
        {passed ? (
          <HiTrophy className="w-12 h-12 text-green-600" />
        ) : (
          <HiStar className="w-12 h-12 text-yellow-600" />
        )}
      </div>

      {/* Title */}
      <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">
        {getMessage()}
      </h2>

      {/* Score */}
      <div className="mb-6">
        <div className="text-6xl font-bold text-primary-600 mb-2">
          {score}/{totalQuestions}
        </div>
        <div className="text-xl text-gray-600">
          {percentage.toFixed(0)}% Correct
        </div>
      </div>

      {/* Encouragement */}
      <p className="text-gray-700 mb-8 max-w-md mx-auto">
        {getEncouragement()}
      </p>

      {/* Stats */}
      {passed && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <HiCheckCircle className="w-6 h-6 text-green-600" />
            <span className="font-semibold text-green-900">Module Completed!</span>
          </div>
          <p className="text-sm text-green-700">
            You've earned <span className="font-bold">100 points</span> and unlocked the next module!
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {!passed && (
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-medium rounded-lg transition-colors"
          >
            Retake Quiz
          </button>
        )}
        <button
          onClick={onContinue}
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
        >
          {passed ? 'Continue Learning' : 'Review Module'}
        </button>
      </div>
    </div>
  );
};

export default QuizResults;
