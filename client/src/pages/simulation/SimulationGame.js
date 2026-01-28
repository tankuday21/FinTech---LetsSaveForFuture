import React, { useState } from 'react';
import { SimulationProvider, useSimulation } from '../../context/SimulationContext';
import BudgetPhase from './phases/BudgetPhase';
import InvestmentPhase from './phases/InvestmentPhase';
import CareerPhase from './phases/CareerPhase';
import MarketPhase from './phases/MarketPhase';
import EventPhase from './phases/EventPhase';
import DashboardHeader from './components/DashboardHeader';
import FingoButton from '../../components/FingoButton';
import FingoCard from '../../components/FingoCard';
import { Link } from 'react-router-dom';

const GameContent = () => {
    const { gameState, phase, startGame } = useSimulation();
    const [selectedChar, setSelectedChar] = useState(null);

    const characters = [
        { id: 'dev', name: 'Rohan', role: 'Developer', salary: '50k', emoji: '👨‍💻' },
        { id: 'artist', name: 'Priya', role: 'Designer', salary: '45k', emoji: '🎨' },
        { id: 'grad', name: 'Arjun', role: 'Grad', salary: '30k', emoji: '🎓' },
    ];

    if (gameState === 'welcome') {
        return (
            <div className="min-h-screen bg-[#F9FDFC] flex items-center justify-center p-4">
                <div className="max-w-4xl w-full text-center">
                    <h1 className="text-6xl font-display font-bold text-green-600 mb-4 animate-bounce">
                        Financial Life 2.0
                    </h1>
                    <p className="text-2xl text-gray-600 mb-12 font-medium">
                        Can you survive one year of adulting? 🏠💸
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {characters.map(char => (
                            <FingoCard
                                key={char.id}
                                className={`cursor-pointer transition-all hover:-translate-y-2 ${selectedChar?.id === char.id ? 'border-green-500 ring-4 ring-green-100' : ''}`}
                                onClick={() => setSelectedChar(char)}
                            >
                                <div className="text-6xl mb-4">{char.emoji}</div>
                                <h3 className="text-xl font-bold text-gray-900">{char.name}</h3>
                                <p className="text-gray-500">{char.role}</p>
                                <div className="mt-4 bg-green-50 text-green-700 font-bold py-2 rounded-lg">
                                    ₹{char.salary}/mo
                                </div>
                            </FingoCard>
                        ))}
                    </div>

                    <FingoButton
                        size="lg"
                        disabled={!selectedChar}
                        onClick={() => startGame(selectedChar)}
                    >
                        Start New Life 🚀
                    </FingoButton>
                </div>
            </div>
        );
    }

    if (gameState === 'win') {
        return (
            <div className="min-h-screen bg-[#F9FDFC] flex items-center justify-center p-4 text-center">
                <FingoCard className="max-w-2xl w-full p-12">
                    <div className="text-8xl mb-6">🏆</div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">You Did It!</h1>
                    <p className="text-xl text-gray-600 mb-8">
                        You survived the year with your sanity (mostly) intact.
                    </p>
                    <Link to="/dashboard">
                        <FingoButton>Back to Dashboard</FingoButton>
                    </Link>
                </FingoCard>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9FDFC] pb-20">
            <DashboardHeader />

            <div className="max-w-7xl mx-auto px-4 py-8">
                {phase === 'budget' && <BudgetPhase />}
                {phase === 'investment' && <InvestmentPhase />}
                {phase === 'career' && <CareerPhase />}
                {phase === 'market' && <MarketPhase />}
                {phase === 'event' && <EventPhase />}
            </div>
        </div>
    );
};

const SimulationGame = () => (
    <SimulationProvider>
        <GameContent />
    </SimulationProvider>
);

export default SimulationGame;
