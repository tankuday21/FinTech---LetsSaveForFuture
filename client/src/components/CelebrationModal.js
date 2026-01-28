import React from 'react';
import Confetti from './Confetti';

const CelebrationModal = ({ show, onClose, title, message, points, emoji = '🎉' }) => {
  if (!show) return null;

  return (
    <>
      <Confetti show={show} />
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center transform animate-bounceIn shadow-2xl">
          {/* Emoji Animation */}
          <div className="text-8xl mb-4 animate-bounce">
            {emoji}
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {title}
          </h2>

          {/* Message */}
          <p className="text-lg text-gray-600 mb-6">
            {message}
          </p>

          {/* Points Badge */}
          {points && (
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full mb-6 shadow-lg">
              <span className="text-2xl">⭐</span>
              <span className="text-xl font-bold">+{points} Points</span>
            </div>
          )}

          {/* Continue Button */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-4 px-8 rounded-2xl transition-all transform hover:scale-105 shadow-lg"
          >
            Continue Learning! 🚀
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-bounceIn {
          animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
    </>
  );
};

export default CelebrationModal;
