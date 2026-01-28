import React from 'react';
import { useSimulation } from '../../../context/SimulationContext';
import FingoCard from '../../../components/FingoCard';

const EventPhase = () => {
    const { currentScenario, handleChoice } = useSimulation();

    if (!currentScenario) return <div className="text-center">Loading event...</div>;

    return (
        <div className="max-w-3xl mx-auto animate-fade-in-up py-8">
            <div className="text-center mb-8">
                <span className="inline-block px-4 py-1 rounded-full bg-gray-100 text-gray-600 text-sm font-bold mb-4 uppercase tracking-wider">
                    Life Event 🎲
                </span>
                <div className="text-8xl mb-6 animate-bounce">{currentScenario.emoji}</div>
                <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
                    {currentScenario.title}
                </h2>
                <p className="text-xl text-gray-600 max-w-xl mx-auto leading-relaxed">
                    {currentScenario.description}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                {currentScenario.choices.map((choice, idx) => (
                    <FingoCard
                        key={idx}
                        className="cursor-pointer hover:border-green-400 hover:shadow-xl transition-all hover:-translate-y-2 group h-full flex flex-col"
                        onClick={() => handleChoice(choice)}
                    >
                        <div className="font-bold text-xl text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                            {choice.text}
                        </div>
                        <p className="text-sm text-gray-500 mb-4 flex-grow">
                            {choice.description}
                        </p>

                        <div className="pt-4 border-t border-gray-100 mt-auto">
                            <div className="text-xs font-mono text-gray-400">
                                OUTCOME PREVIEW:
                            </div>
                            {choice.outcome.cash && (
                                <div className={`text-sm font-bold ${choice.outcome.cash > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {choice.outcome.cash > 0 ? '+' : ''}₹{choice.outcome.cash.toLocaleString()}
                                </div>
                            )}
                            {choice.outcome.happiness && (
                                <div className={`text-sm font-bold ${choice.outcome.happiness > 0 ? 'text-pink-500' : 'text-gray-500'}`}>
                                    {choice.outcome.happiness > 0 ? '+' : ''}{choice.outcome.happiness} Happiness
                                </div>
                            )}
                        </div>
                    </FingoCard>
                ))}
            </div>
        </div>
    );
};

export default EventPhase;
