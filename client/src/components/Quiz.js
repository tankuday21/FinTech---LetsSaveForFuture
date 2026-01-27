import React, { useState } from 'react';
import { HiCheckCircle, HiXCircle, HiArrowRight } from 'react-icons/hi2';

const Quiz = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === question.correctAnswer;
    const newAnswers = [...answers, { questionIndex: currentQuestion, selectedAnswer, isCorrect }];
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore(score + 1);
    }

    setShowResult(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Score was already updated in handleSubmit, just pass it
      onComplete(score, questions.length);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const getAnswerClass = (index) => {
    if (!showResult) {
      return selectedAnswer === index
        ? 'border-primary-500 bg-primary-50'
        : 'border-gray-300 hover:border-primary-300';
    }

    if (index === question.correctAnswer) {
      return 'border-green-500 bg-green-50';
    }

    if (index === selectedAnswer && index !== question.correctAnswer) {
      return 'border-red-500 bg-red-50';
    }

    return 'border-gray-300 opacity-50';
  };

  const getAnswerIcon = (index) => {
    if (!showResult) return null;

    if (index === question.correctAnswer) {
      return <HiCheckCircle className="w-6 h-6 text-green-600" />;
    }

    if (index === selectedAnswer && index !== question.correctAnswer) {
      return <HiXCircle className="w-6 h-6 text-red-600" />;
    }

    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-primary-600">
            Score: {score}/{questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          {question.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full text-left p-4 border-2 rounded-lg transition-all ${getAnswerClass(index)} ${
                showResult ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-900">{option}</span>
                {getAnswerIcon(index)}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Explanation */}
      {showResult && (
        <div className={`mb-6 p-4 rounded-lg ${
          selectedAnswer === question.correctAnswer
            ? 'bg-green-50 border border-green-200'
            : 'bg-blue-50 border border-blue-200'
        }`}>
          <p className="text-sm font-medium text-gray-900 mb-2">
            {selectedAnswer === question.correctAnswer ? '✓ Correct!' : 'Not quite right'}
          </p>
          <p className="text-sm text-gray-700">{question.explanation}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end">
        {!showResult ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Check Answer</span>
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
          >
            <span>{isLastQuestion ? 'See Results' : 'Next Question'}</span>
            <HiArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
