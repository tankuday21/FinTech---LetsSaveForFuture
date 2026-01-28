import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiHome, HiHeart } from 'react-icons/hi2';
import { getRandomEvent, monthlyExpenses, getTotalRequiredExpenses } from '../data/simulationEvents';
import VersionBadge from '../components/VersionBadge';
import CelebrationModal from '../components/CelebrationModal';
import FingoButton from '../components/FingoButton';
import FingoCard from '../components/FingoCard';

const Simulation = () => {
  // Game state
  const [gameState, setGameState] = useState('welcome'); // welcome, playing, monthSummary, finalResults
  const [currentMonth, setCurrentMonth] = useState(1);
  const [balance, setBalance] = useState(10000);
  const [savings, setSavings] = useState(0);
  const [emergencyFund, setEmergencyFund] = useState(0);
  const [financialHealth, setFinancialHealth] = useState(50);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationData, setCelebrationData] = useState({});

  // Character selection
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const characters = [
    { id: 1, emoji: '👨‍💼', name: 'Rahul', description: 'Young Professional' },
    { id: 2, emoji: '👩‍💻', name: 'Priya', description: 'Tech Enthusiast' },
    { id: 3, emoji: '👨‍🎓', name: 'Arjun', description: 'Fresh Graduate' },
    { id: 4, emoji: '👩‍🏫', name: 'Sneha', description: 'Teacher' }
  ];

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Start game
  const startGame = () => {
    if (!selectedCharacter) return;
    setGameState('playing');
    startNewMonth();
  };

  // Start new month
  const startNewMonth = () => {
    const salary = 50000;
    // Add salary
    setBalance(prev => prev + salary);

    // Generate random event
    const event = getRandomEvent(currentMonth);
    setCurrentEvent(event);
  };

  // Handle event decision
  const handleEventDecision = (choice) => {
    if (!currentEvent) return;

    let newBalance = balance;

    if (currentEvent.type === 'temptation') {
      if (choice === 'spend') {
        newBalance -= currentEvent.amount;
      }
    } else if (currentEvent.type === 'bad') {
      if (emergencyFund >= currentEvent.amount) {
        setEmergencyFund(prev => prev - currentEvent.amount);
      } else {
        newBalance -= currentEvent.amount;
      }
    } else if (currentEvent.type === 'good') {
      newBalance += currentEvent.amount;
    }

    setBalance(newBalance);
    setCurrentEvent(null);
  };

  // Pay expenses and end month
  const endMonth = () => {
    const requiredExpenses = getTotalRequiredExpenses();
    const newBalance = balance - requiredExpenses;

    // Calculate savings (10% of remaining)
    const monthlySavings = Math.max(0, Math.floor(newBalance * 0.1));

    setBalance(newBalance - monthlySavings);
    setSavings(prev => prev + monthlySavings);
    setEmergencyFund(prev => prev + monthlySavings);

    // Update financial health
    const healthScore = calculateFinancialHealth(newBalance, emergencyFund + monthlySavings);
    setFinancialHealth(healthScore);

    // Check achievements
    checkAchievements(emergencyFund + monthlySavings, currentMonth);

    setGameState('monthSummary');
  };

  // Calculate financial health score
  const calculateFinancialHealth = (currentBalance, currentEmergencyFund) => {
    let score = 50;

    // Balance factor
    if (currentBalance > 50000) score += 20;
    else if (currentBalance > 20000) score += 10;
    else if (currentBalance < 0) score -= 30;

    // Emergency fund factor
    if (currentEmergencyFund > 100000) score += 30;
    else if (currentEmergencyFund > 50000) score += 20;
    else if (currentEmergencyFund > 20000) score += 10;

    return Math.max(0, Math.min(100, score));
  };

  // Check achievements
  const checkAchievements = (currentEmergencyFund, month) => {
    const newAchievements = [];

    if (month === 3 && !achievements.includes('first_quarter')) {
      newAchievements.push({ id: 'first_quarter', title: 'First Quarter!', emoji: '🎯' });
    }

    if (currentEmergencyFund >= 50000 && !achievements.includes('saver')) {
      newAchievements.push({ id: 'saver', title: 'Smart Saver!', emoji: '💰' });
    }

    if (currentEmergencyFund >= 100000 && !achievements.includes('emergency_master')) {
      newAchievements.push({ id: 'emergency_master', title: 'Emergency Fund Master!', emoji: '🛡️' });
    }

    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements.map(a => a.id)]);
      setCelebrationData({
        title: 'Achievement Unlocked!',
        message: newAchievements[0].title,
        emoji: newAchievements[0].emoji
      });
      setShowCelebration(true);
    }
  };

  // Continue to next month
  const continueToNextMonth = () => {
    if (currentMonth >= 12) {
      setGameState('finalResults');
    } else {
      setCurrentMonth(prev => prev + 1);
      setGameState('playing');
      startNewMonth();
    }
  };

  // Restart game
  const restartGame = () => {
    setGameState('welcome');
    setCurrentMonth(1);
    setBalance(10000);
    setSavings(0);
    setEmergencyFund(0);
    setFinancialHealth(50);
    setCurrentEvent(null);
    setAchievements([]);
    setSelectedCharacter(null);
  };

  // Welcome Screen
  const renderWelcome = () => (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce">🎮</div>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Your Financial Life
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Live through 12 months and make smart money decisions!
          </p>
          <p className="text-gray-500">
            Handle surprises, manage expenses, and build your emergency fund
          </p>
        </div>

        {/* Character Selection */}
        <FingoCard className="p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Choose Your Character
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {characters.map(char => (
              <button
                key={char.id}
                onClick={() => setSelectedCharacter(char)}
                className={`p-6 rounded-2xl border-4 transition-all transform hover:scale-105 ${selectedCharacter?.id === char.id
                    ? 'border-purple-500 bg-purple-50 shadow-lg'
                    : 'border-gray-200 hover:border-purple-300'
                  }`}
              >
                <div className="text-6xl mb-3">{char.emoji}</div>
                <div className="font-bold text-gray-900">{char.name}</div>
                <div className="text-sm text-gray-500">{char.description}</div>
              </button>
            ))}
          </div>
        </FingoCard>

        {/* Game Info */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Game Rules:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">💰</span>
              <div>
                <div className="font-bold">Starting Salary</div>
                <div className="text-blue-100">₹50,000 per month</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🎲</span>
              <div>
                <div className="font-bold">Random Events</div>
                <div className="text-blue-100">Good, bad, and temptations</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🏠</span>
              <div>
                <div className="font-bold">Monthly Expenses</div>
                <div className="text-blue-100">₹31,500 required bills</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🛡️</span>
              <div>
                <div className="font-bold">Emergency Fund</div>
                <div className="text-blue-100">Build your safety net</div>
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center mt-8">
          <FingoButton
            onClick={startGame}
            disabled={!selectedCharacter}
            size="lg"
            className="px-12 py-4"
          >
            {selectedCharacter ? "Let's Start! 🚀" : 'Select a Character First'}
          </FingoButton>
        </div>

        <div className="text-center mt-6">
          <Link to="/dashboard" className="text-purple-600 hover:text-purple-700 font-medium">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );

  // Playing Screen
  const renderPlaying = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <VersionBadge />

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b-2 border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{selectedCharacter?.emoji}</div>
              <div>
                <div className="text-sm text-gray-500">Month {currentMonth}/12</div>
                <div className="text-2xl font-bold text-gray-900">{monthNames[currentMonth - 1]} 2024</div>
              </div>
            </div>
            <Link to="/dashboard" className="text-purple-600 hover:text-purple-700 font-medium">
              <HiHome className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl p-4 text-white shadow-lg">
            <div className="text-sm font-semibold mb-1">Balance</div>
            <div className="text-2xl font-bold">₹{balance.toLocaleString()}</div>
          </div>
          <div className="bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl p-4 text-white shadow-lg">
            <div className="text-sm font-semibold mb-1">Emergency Fund</div>
            <div className="text-2xl font-bold">₹{emergencyFund.toLocaleString()}</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-400 to-orange-600 rounded-2xl p-4 text-white shadow-lg">
            <div className="text-sm font-semibold mb-1">Savings</div>
            <div className="text-2xl font-bold">₹{savings.toLocaleString()}</div>
          </div>
          <div className="bg-gradient-to-br from-pink-400 to-red-600 rounded-2xl p-4 text-white shadow-lg">
            <div className="text-sm font-semibold mb-1">Health Score</div>
            <div className="text-2xl font-bold flex items-center">
              {financialHealth}
              <HiHeart className="w-6 h-6 ml-2" />
            </div>
          </div>
        </div>

        {/* Event Card */}
        {currentEvent ? (
          <FingoCard className="p-8 mb-8 border-4 border-purple-200">
            <div className="text-center">
              <div className="text-7xl mb-4 animate-bounce">{currentEvent.emoji}</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">{currentEvent.title}</h2>
              <p className="text-xl text-gray-600 mb-6">{currentEvent.description}</p>
              <div className={`text-3xl font-bold mb-8 ${currentEvent.type === 'good' ? 'text-green-600' :
                  currentEvent.type === 'bad' ? 'text-red-600' : 'text-yellow-600'
                }`}>
                {currentEvent.type === 'good' ? '+' : currentEvent.type === 'bad' ? '-' : ''}₹{currentEvent.amount.toLocaleString()}
              </div>

              {/* Decision Buttons */}
              {currentEvent.type === 'temptation' ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {currentEvent.choices.map((choice, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleEventDecision(choice.impact)}
                      className={`p-6 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg ${choice.impact === 'spend'
                          ? 'bg-gradient-to-r from-red-400 to-pink-600 text-white'
                          : 'bg-gradient-to-r from-green-400 to-emerald-600 text-white'
                        }`}
                    >
                      {choice.text}
                    </button>
                  ))}
                </div>
              ) : (
                <FingoButton
                  onClick={() => handleEventDecision('accept')}
                  size="lg"
                  className="w-full"
                >
                  Continue →
                </FingoButton>
              )}
            </div>
          </FingoCard>
        ) : (
          /* Monthly Expenses */
          <FingoCard className="p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Monthly Expenses
            </h2>

            <div className="space-y-3 mb-8">
              {Object.values(monthlyExpenses).map((expense, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{expense.emoji}</span>
                    <span className="font-semibold text-gray-900">{expense.name}</span>
                    {expense.required && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold">
                        Required
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-gray-900">₹{expense.amount.toLocaleString()}</span>
                </div>
              ))}

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border-2 border-purple-300">
                <span className="font-bold text-gray-900 text-lg">Total</span>
                <span className="font-bold text-purple-600 text-xl">
                  ₹{Object.values(monthlyExpenses).reduce((sum, e) => sum + e.amount, 0).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="text-center">
              <FingoButton
                onClick={endMonth}
                size="lg"
                className="w-full"
              >
                End Month & Save 💰
              </FingoButton>
            </div>
          </FingoCard>
        )}
      </div>
    </div>
  );

  // Month Summary Screen
  const renderMonthSummary = () => (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <FingoCard className="p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              {monthNames[currentMonth - 1]} Summary
            </h2>
            <p className="text-gray-600">Month {currentMonth} of 12 completed!</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm font-semibold text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round((currentMonth / 12) * 100)}%</span>
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-emerald-600 transition-all duration-500"
                style={{ width: `${(currentMonth / 12) * 100}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-2xl border-2 border-green-200">
              <div className="text-sm text-green-700 font-semibold mb-1">Current Balance</div>
              <div className="text-2xl font-bold text-green-600">₹{balance.toLocaleString()}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-2xl border-2 border-blue-200">
              <div className="text-sm text-blue-700 font-semibold mb-1">Emergency Fund</div>
              <div className="text-2xl font-bold text-blue-600">₹{emergencyFund.toLocaleString()}</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-2xl border-2 border-yellow-200">
              <div className="text-sm text-yellow-700 font-semibold mb-1">Total Savings</div>
              <div className="text-2xl font-bold text-yellow-600">₹{savings.toLocaleString()}</div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-red-50 p-4 rounded-2xl border-2 border-pink-200">
              <div className="text-sm text-pink-700 font-semibold mb-1">Health Score</div>
              <div className="text-2xl font-bold text-pink-600">{financialHealth}/100</div>
            </div>
          </div>

          {/* Motivational Message */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl mb-8 text-center">
            <p className="text-lg font-semibold text-gray-900">
              {financialHealth >= 80 ? "🌟 Excellent! You're crushing it!" :
                financialHealth >= 60 ? "👍 Good job! Keep it up!" :
                  financialHealth >= 40 ? "💪 You're learning! Stay focused!" :
                    "🎯 Don't give up! Every decision matters!"}
            </p>
          </div>

          {/* Continue Button */}
          <FingoButton
            onClick={continueToNextMonth}
            size="lg"
            className="w-full"
          >
            {currentMonth < 12 ? `Continue to ${monthNames[currentMonth]} →` : 'See Final Results 🎉'}
          </FingoButton>
        </FingoCard>
      </div>
    </div>
  );

  // Final Results Screen
  const renderFinalResults = () => {
    const grade = financialHealth >= 80 ? 'A+' :
      financialHealth >= 70 ? 'A' :
        financialHealth >= 60 ? 'B' :
          financialHealth >= 50 ? 'C' : 'D';

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-3xl w-full">
          <FingoCard className="p-8">
            <div className="text-center mb-8">
              <div className="text-8xl mb-4 animate-bounce">🏆</div>
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mb-4">
                Journey Complete!
              </h1>
              <p className="text-xl text-gray-600">
                You survived 12 months of financial decisions!
              </p>
            </div>

            {/* Final Grade */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl p-8 text-white text-center mb-8">
              <div className="text-sm font-semibold mb-2">Your Financial Grade</div>
              <div className="text-8xl font-bold mb-2">{grade}</div>
              <div className="text-2xl font-bold">Health Score: {financialHealth}/100</div>
            </div>

            {/* Final Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200 text-center">
                <div className="text-3xl mb-2">💰</div>
                <div className="text-sm text-green-700 font-semibold mb-1">Final Balance</div>
                <div className="text-2xl font-bold text-green-600">₹{balance.toLocaleString()}</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-200 text-center">
                <div className="text-3xl mb-2">🛡️</div>
                <div className="text-sm text-blue-700 font-semibold mb-1">Emergency Fund</div>
                <div className="text-2xl font-bold text-blue-600">₹{emergencyFund.toLocaleString()}</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200 text-center">
                <div className="text-3xl mb-2">📈</div>
                <div className="text-sm text-yellow-700 font-semibold mb-1">Total Savings</div>
                <div className="text-2xl font-bold text-yellow-600">₹{savings.toLocaleString()}</div>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-red-50 p-6 rounded-2xl border-2 border-pink-200 text-center">
                <div className="text-3xl mb-2">🏅</div>
                <div className="text-sm text-pink-700 font-semibold mb-1">Achievements</div>
                <div className="text-2xl font-bold text-pink-600">{achievements.length}</div>
              </div>
            </div>

            {/* Achievements */}
            {achievements.length > 0 && (
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-2xl mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  🎉 Achievements Unlocked
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {achievements.map((achievement, idx) => (
                    <div key={idx} className="bg-white px-4 py-2 rounded-full shadow-md">
                      <span className="font-semibold text-gray-900">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid md:grid-cols-2 gap-4">
              <FingoButton
                onClick={restartGame}
                size="lg"
              >
                Play Again 🔄
              </FingoButton>
              <Link
                to="/dashboard"
              >
                <FingoButton size="lg" variant="secondary" className="w-full h-full">
                  Back to Dashboard 🏠
                </FingoButton>
              </Link>
            </div>
          </FingoCard>
        </div>
      </div>
    );
  };

  return (
    <>
      {gameState === 'welcome' && renderWelcome()}
      {gameState === 'playing' && renderPlaying()}
      {gameState === 'monthSummary' && renderMonthSummary()}
      {gameState === 'finalResults' && renderFinalResults()}

      <CelebrationModal
        show={showCelebration}
        onClose={() => setShowCelebration(false)}
        title={celebrationData.title}
        message={celebrationData.message}
        emoji={celebrationData.emoji}
      />
    </>
  );
};

export default Simulation;
