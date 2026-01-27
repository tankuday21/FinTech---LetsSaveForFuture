import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { learningModules, getModuleIcon } from '../data/modules';
import { moduleContent } from '../data/moduleContent';
import { HiArrowLeft, HiArrowRight, HiCheckCircle } from 'react-icons/hi2';

const ModuleContent = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);

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
  const progress = ((currentSection + 1) / totalSections) * 100;

  const handleNext = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo(0, 0);
    } else {
      // Module completed
      navigate('/learn');
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    }
  };

  const currentSectionData = content.sections[currentSection];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
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
              Section {currentSection + 1} of {totalSections}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Module Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <IconComponent className="w-8 h-8 text-primary-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                {module.title}
              </h1>
              <p className="text-gray-600">{module.description}</p>
            </div>
          </div>
        </div>

        {/* Section Content */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6 border border-gray-200">
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
            {currentSectionData.title}
          </h2>

          {currentSectionData.content.map((block, index) => (
            <ContentBlock key={index} block={block} />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentSection === 0}
            className="flex items-center space-x-2 px-6 py-3 text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <HiArrowLeft className="w-5 h-5" />
            <span className="font-medium">Previous</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            <span>{currentSection === totalSections - 1 ? 'Complete Module' : 'Next Section'}</span>
            {currentSection === totalSections - 1 ? (
              <HiCheckCircle className="w-5 h-5" />
            ) : (
              <HiArrowRight className="w-5 h-5" />
            )}
          </button>
        </div>
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
        <div className="bg-primary-50 border-l-4 border-primary-600 p-4 mb-4 rounded-r-lg">
          <p className="text-primary-900 font-medium">{block.text}</p>
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
