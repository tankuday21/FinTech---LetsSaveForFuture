import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { learningModules, getModuleIcon } from '../data/modules';
import { moduleContent } from '../data/moduleContent';
import Quiz from '../components/Quiz';
import QuizResults from '../components/QuizResults';
import { HiArrowLeft, HiArrowRight, HiCheckCircle } from 'react-icons/hi2';
import FingoButton from '../components/FingoButton';
import FingoCard from '../components/FingoCard';
import { useAuth } from '../context/AuthContext';
import { completeModule } from '../services/progressService';

const ModuleContent = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentSection, setCurrentSection] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [saving, setSaving] = useState(false);

  // Find the module
  const module = learningModules
    .flatMap(level => level.modules)
    .find(m => m.id === parseInt(moduleId));

  const content = moduleContent[moduleId];

  if (!module || !content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Module not found</h2>
          <Link to="/learn" className="text-primary-600 hover:text-primary-700">
            Back to Learning
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = getModuleIcon(module.icon);
  const totalSections = content.sections.length;
  const hasQuiz = content.quiz && content.quiz.questions;

  // Calculate progress including quiz
  const totalSteps = hasQuiz ? totalSections + 1 : totalSections;
  const currentStep = showQuiz ? totalSections : (quizScore !== null ? totalSteps : currentSection);
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo(0, 0);
    } else if (hasQuiz && !showQuiz && quizScore === null) {
      // Show quiz after last section
      setShowQuiz(true);
      window.scrollTo(0, 0);
    } else {
      // Module completed
      navigate('/learn');
    }
  };

  const handlePrevious = () => {
    if (showQuiz) {
      setShowQuiz(false);
      window.scrollTo(0, 0);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleQuizComplete = async (score, total) => {
    setQuizScore({ score, total });
    window.scrollTo(0, 0);

    // Save progress if quiz passed (70% or higher)
    const percentage = (score / total) * 100;
    if (percentage >= 70 && user) {
      setSaving(true);
      try {
        await completeModule(user.id, parseInt(moduleId), score, total, module.points);
        console.log('Module completion saved successfully!');
      } catch (error) {
        console.error('Error saving module completion:', error);
      } finally {
        setSaving(false);
      }
    }
  };

  const handleContinue = () => {
    navigate('/learn');
  };

  const currentSectionData = content.sections[currentSection];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b-2 border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link
              to="/learn"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <HiArrowLeft className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Back to Learning</span>
            </Link>
            <div className="text-sm text-gray-600">
              {quizScore !== null ? (
                'Quiz Complete'
              ) : showQuiz ? (
                'Quiz Time!'
              ) : (
                `Section ${currentSection + 1} of ${totalSections}`
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-100 rounded-full h-3 border-2 border-gray-100">
            <div
              className="bg-green-500 h-full rounded-full transition-all duration-300 shadow-[0_2px_0_0_#15803D]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Module Header */}
        <FingoCard className="mb-8">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0 border-2 border-green-200">
              <IconComponent className="w-8 h-8 text-green-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                {module.title}
              </h1>
              <p className="text-gray-600 font-medium">{module.description}</p>
            </div>
          </div>
        </FingoCard>

        {/* Quiz Results */}
        {quizScore !== null ? (
          <>
            {saving && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 flex items-center space-x-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-blue-700">Saving your progress...</span>
              </div>
            )}
            <QuizResults
              score={quizScore.score}
              totalQuestions={quizScore.total}
              onContinue={handleContinue}
              pointsEarned={module.points}
            />
          </>
        ) : showQuiz ? (
          /* Quiz */
          <Quiz
            questions={content.quiz.questions}
            onComplete={handleQuizComplete}
          />
        ) : (
          /* Section Content */
          <>
            <FingoCard className="mb-8 p-8">
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                {currentSectionData.title}
              </h2>

              {currentSectionData.content.map((block, index) => (
                <ContentBlock key={index} block={block} />
              ))}
            </FingoCard>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentSection === 0}
                className="flex items-center space-x-2 px-6 py-3 font-bold text-gray-500 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-xl hover:bg-gray-100"
              >
                <HiArrowLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>

              <FingoButton
                onClick={handleNext}
                className="flex items-center space-x-2"
              >
                <span>
                  {currentSection === totalSections - 1 && hasQuiz
                    ? 'Take Quiz'
                    : currentSection === totalSections - 1
                      ? 'Complete Module'
                      : 'Next Section'}
                </span>
                {currentSection === totalSections - 1 ? (
                  <HiCheckCircle className="w-5 h-5" />
                ) : (
                  <HiArrowRight className="w-5 h-5" />
                )}
              </FingoButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const ContentBlock = ({ block }) => {
  switch (block.type) {
    case 'paragraph':
      return <p className="text-gray-700 leading-relaxed mb-4">{block.text}</p>;

    case 'heading':
      return <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{block.text}</h3>;

    case 'list':
      return (
        <ul className="space-y-2 mb-4">
          {block.items.map((item, idx) => (
            <li key={idx} className="flex items-start space-x-3">
              <HiCheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      );

    case 'highlight':
      return (
        <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-4 rounded-r-xl">
          <p className="text-green-900 font-bold text-lg">{block.text}</p>
        </div>
      );

    case 'example':
      return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Example
            </span>
          </div>
          <p className="text-gray-700">{block.text}</p>
        </div>
      );

    case 'quote':
      return (
        <blockquote className="border-l-4 border-gray-300 pl-4 py-2 mb-4 italic text-gray-600">
          "{block.text}"
        </blockquote>
      );

    case 'keypoint':
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Key Point</h4>
              <p className="text-gray-700">{block.text}</p>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default ModuleContent;
