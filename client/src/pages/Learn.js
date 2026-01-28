import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import { learningModules, getLevelColor, getModuleIcon } from '../data/modules';
import { HiLockClosed, HiClock, HiStar, HiCheckCircle, HiUser } from 'react-icons/hi2';
import { useAuth } from '../context/AuthContext';
import { getUserProgress, getModuleCompletions, canAccessModule } from '../services/progressService';

const Learn = () => {
  const { user } = useAuth();
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
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b-2 border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/dashboard" className="flex items-center">
                <img src={logo} alt="FinLearn" className="h-14 w-auto rounded-lg shadow-sm" />
              </Link>
              <div className="hidden md:flex space-x-4">
                <Link
                  to="/dashboard"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/learn"
                  className="px-4 py-2 text-sm font-bold text-gray-900 bg-green-50 rounded-xl border-2 border-green-100 transition-colors"
                >
                  Learn
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/profile"
                className="flex items-center space-x-2 px-4 py-2 text-sm font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl border-2 border-transparent hover:border-gray-100 transition-all"
              >
                <HiUser className="w-5 h-5 text-gray-400" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="border-b-2 border-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-5xl font-display font-bold text-gray-900 mb-2">
            Learning Path
          </h1>
          <p className="text-xl text-gray-600 font-medium">
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

        {/* All Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningModules.flatMap(level =>
            level.modules.map(module => ({
              ...module,
              levelColor: level.color,
              levelName: level.title,
              levelNumber: level.level
            }))
          ).map((module) => {
            const colors = getLevelColor(module.levelColor);

            return (
              <ModuleCard
                key={module.id}
                module={module}
                colors={colors}
                isCompleted={completedModules.includes(module.id)}
                isLocked={!moduleAccess[module.id]}
                levelName={module.levelName}
                levelNumber={module.levelNumber}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ModuleCard = ({ module, colors, isCompleted, isLocked, levelName, levelNumber }) => {
  const IconComponent = getModuleIcon(module.icon);

  return (
    <Link
      to={isLocked ? '#' : `/learn/module/${module.id}`}
      className={`block relative border-2 ${colors.border} rounded-2xl p-6 hover:shadow-[0_4px_0_0_#E2E8F0] hover:-translate-y-1 transition-all flex flex-col h-full ${isLocked ? 'opacity-60 cursor-not-allowed bg-gray-50' : 'cursor-pointer hover:border-green-300 bg-white'} ${isCompleted ? 'bg-green-50' : ''}`}
      onClick={(e) => isLocked && e.preventDefault()}
    >
      {/* Header Badge */}
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${colors.badge}`}>
          Level {levelNumber}
        </span>
        {isCompleted ? (
          <HiCheckCircle className="w-6 h-6 text-green-600" />
        ) : isLocked ? (
          <HiLockClosed className="w-5 h-5 text-gray-400" />
        ) : null}
      </div>

      {/* Module Icon */}
      <div className={`w-12 h-12 ${colors.icon} rounded-lg flex items-center justify-center mb-4`}>
        <IconComponent className="w-6 h-6" />
      </div>

      {/* Module Info */}
      <div className="flex-grow">
        <h4 className="font-semibold text-gray-900 mb-2 leading-tight">
          {module.title}
        </h4>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {module.description}
        </p>
      </div>

      {/* Topics */}
      <div className="mb-4 flex flex-wrap gap-2">
        {module.topics.slice(0, 2).map((topic, idx) => (
          <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
            {topic}
          </span>
        ))}
        {module.topics.length > 2 && (
          <span className="text-xs text-gray-500 self-center">+{module.topics.length - 2}</span>
        )}
      </div>

      {/* Module Meta */}
      <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-100 mt-auto">
        <div className="flex items-center space-x-1 text-gray-600">
          <HiClock className="w-4 h-4" />
          <span>{module.duration}</span>
        </div>
        <div className="flex items-center space-x-1 text-primary-600">
          <HiStar className="w-4 h-4" />
          <span className="font-semibold">{module.points} pts</span>
        </div>
      </div>

      {/* Start/Continue Button */}
      {!isLocked && (
        <div className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-[0_4px_0_0_#15803D] active:shadow-none active:translate-y-1 text-center text-sm">
          {isCompleted ? 'Review' : 'Start'}
        </div>
      )}
    </Link>
  );
};

export default Learn;
