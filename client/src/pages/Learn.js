import React, { useState } from 'react';
import { learningModules, getLevelColor } from '../data/modules';
import { HiLockClosed, HiClock, HiStar, HiCheckCircle } from 'react-icons/hi2';

const Learn = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
            Learning Path
          </h1>
          <p className="text-lg text-gray-600">
            Master personal finance through our structured curriculum
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Overview */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Your Progress</h2>
              <p className="text-sm text-gray-600">Keep learning to unlock new modules</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary-600">0/24</div>
              <div className="text-sm text-gray-600">Modules Completed</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-primary-600 h-3 rounded-full" style={{ width: '0%' }}></div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-600">0 Points Earned</span>
            <span className="text-gray-600">5,000 Total Points</span>
          </div>
        </div>

        {/* Levels Grid */}
        <div className="space-y-8">
          {learningModules.map((level) => {
            const colors = getLevelColor(level.color);
            const isExpanded = selectedLevel === level.level;
            const completedModules = level.modules.filter(m => !m.locked).length;
            const totalModules = level.modules.length;

            return (
              <div key={level.level} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Level Header */}
                <div 
                  className={`${colors.bg} border-b ${colors.border} p-6 cursor-pointer hover:opacity-90 transition-opacity`}
                  onClick={() => setSelectedLevel(isExpanded ? null : level.level)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${colors.badge}`}>
                          Level {level.level}
                        </span>
                        <span className="text-sm text-gray-600">{level.subtitle}</span>
                      </div>
                      <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
                        {level.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{level.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <HiClock className="w-4 h-4" />
                          <span>{level.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <HiCheckCircle className="w-4 h-4" />
                          <span>{completedModules}/{totalModules} Modules</span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg 
                          className={`w-6 h-6 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Modules Grid */}
                {isExpanded && (
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {level.modules.map((module) => (
                        <ModuleCard key={module.id} module={module} colors={colors} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ModuleCard = ({ module, colors }) => {
  return (
    <div className={`relative border ${colors.border} rounded-lg p-5 hover:shadow-md transition-all ${module.locked ? 'opacity-60' : 'cursor-pointer hover:border-primary-300'}`}>
      {/* Lock Overlay */}
      {module.locked && (
        <div className="absolute top-3 right-3">
          <HiLockClosed className="w-5 h-5 text-gray-400" />
        </div>
      )}

      {/* Module Icon */}
      <div className={`w-12 h-12 ${colors.icon} rounded-lg flex items-center justify-center text-2xl mb-3`}>
        {module.icon}
      </div>

      {/* Module Info */}
      <h4 className="font-semibold text-gray-900 mb-2 pr-8">
        {module.title}
      </h4>
      <p className="text-sm text-gray-600 mb-3">
        {module.description}
      </p>

      {/* Module Meta */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-1 text-gray-600">
          <HiClock className="w-4 h-4" />
          <span>{module.duration}</span>
        </div>
        <div className="flex items-center space-x-1 text-primary-600">
          <HiStar className="w-4 h-4" />
          <span className="font-semibold">{module.points} pts</span>
        </div>
      </div>

      {/* Topics */}
      <div className="mt-3 flex flex-wrap gap-2">
        {module.topics.slice(0, 2).map((topic, idx) => (
          <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
            {topic}
          </span>
        ))}
        {module.topics.length > 2 && (
          <span className="text-xs text-gray-500">+{module.topics.length - 2} more</span>
        )}
      </div>

      {/* Start Button */}
      {!module.locked && (
        <button className="mt-4 w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
          Start Learning
        </button>
      )}
    </div>
  );
};

export default Learn;
