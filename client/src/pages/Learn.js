import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { learningModules, getLevelColor, getModuleIcon } from '../data/modules';
import { HiLockClosed, HiClock, HiStar, HiCheckCircle } from 'react-icons/hi2';
import { useAuth } from '../context/AuthContext';
import { getUserProgress, getModuleCompletions, canAccessModule } from '../services/progressService';

const Learn = () => {
  const { user } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [userProgress, setUserProgress] = useState({ total_points: 0, modules_completed: 0 });
  const [completedModules, setCompletedModules] = useState([]);
  const [moduleAccess, setModuleAccess] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      if (!user) return;

      try {
        // Load user progress and module completions
        const [progress, completions] = await Promise.all([
          getUserProgress(user.id),
          getModuleCompletions(user.id)
        ]);

        setUserProgress(progress);
        setCompletedModules(completions.map(c => c.module_id));

        // Check access for all modules
        const allModules = learningModules.flatMap(level => level.modules);
        const accessMap = {};
        
        for (const module of allModules) {
          accessMap[module.id] = await canAccessModule(user.id, module.id);
        }
        
        setModuleAccess(accessMap);
      } catch (error) {
        console.error('Error loading progress:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [user]);

  const totalModules = learningModules.reduce((sum, level) => sum + level.modules.length, 0);
  const progressPercentage = totalModules > 0 ? (userProgress.modules_completed / totalModules) * 100 : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your progress...</p>
        </div>
      </div>
    );
  }

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
              <div className="text-3xl font-bold text-primary-600">
                {userProgress.modules_completed}/{totalModules}
              </div>
              <div className="text-sm text-gray-600">Modules Completed</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-primary-600 h-3 rounded-full transition-all duration-500" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-600">{userProgress.total_points} Points Earned</span>
            <span className="text-gray-600">5,000 Total Points</span>
          </div>
        </div>

        {/* Levels Grid */}
        <div className="space-y-8">
          {learningModules.map((level) => {
            const colors = getLevelColor(level.color);
            const isExpanded = selectedLevel === level.level;
            const levelCompletedModules = level.modules.filter(m => completedModules.includes(m.id)).length;
            const levelTotalModules = level.modules.length;

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
                          <span>{levelCompletedModules}/{levelTotalModules} Modules</span>
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
                        <ModuleCard 
                          key={module.id} 
                          module={module} 
                          colors={colors}
                          isCompleted={completedModules.includes(module.id)}
                          isLocked={!moduleAccess[module.id]}
                        />
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

const ModuleCard = ({ module, colors, isCompleted, isLocked }) => {
  const IconComponent = getModuleIcon(module.icon);
  
  return (
    <Link
      to={isLocked ? '#' : `/learn/module/${module.id}`}
      className={`block relative border ${colors.border} rounded-lg p-5 hover:shadow-md transition-all ${isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:border-primary-300'} ${isCompleted ? 'bg-green-50' : ''}`}
      onClick={(e) => isLocked && e.preventDefault()}
    >
      {/* Lock or Completed Badge */}
      <div className="absolute top-3 right-3">
        {isCompleted ? (
          <HiCheckCircle className="w-6 h-6 text-green-600" />
        ) : isLocked ? (
          <HiLockClosed className="w-5 h-5 text-gray-400" />
        ) : null}
      </div>

      {/* Module Icon */}
      <div className={`w-12 h-12 ${colors.icon} rounded-lg flex items-center justify-center mb-3`}>
        <IconComponent className="w-6 h-6" />
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

      {/* Start/Continue Button */}
      {!isLocked && (
        <div className="mt-4 w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center">
          {isCompleted ? 'Review Module' : 'Start Learning'}
        </div>
      )}
    </Link>
  );
};

export default Learn;
