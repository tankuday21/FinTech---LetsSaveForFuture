import React from 'react';
import { useSimulation } from '../../../context/SimulationContext';
import FingoCard from '../../../components/FingoCard';
import FingoButton from '../../../components/FingoButton';
import { items } from '../data/items';

const MarketPhase = () => {
    const { stats, inventory, buyItem, advancePhase } = useSimulation();

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-display font-bold text-gray-900">Life Market 🛒</h2>
                    <p className="text-gray-600">Invest in yourself or buy cool stuff.</p>
                </div>
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold border border-green-200">
                    Cash Available: ₹{stats.cash.toLocaleString()}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => {
                    const isOwned = inventory.includes(item.id);
                    const canAfford = stats.cash >= item.price;

                    return (
                        <FingoCard key={item.id} className="relative overflow-hidden group">
                            <div className="flex justify-center text-6xl mb-4 group-hover:scale-110 transition-transform">
                                {item.emoji}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{item.name}</h3>
                            <p className="text-sm text-gray-500 text-center mb-4 h-10">{item.description}</p>

                            <div className="text-center space-y-3">
                                <div className="text-lg font-bold text-gray-800">₹{item.price.toLocaleString()}</div>

                                {isOwned ? (
                                    <button disabled className="w-full py-2 bg-gray-100 text-gray-400 rounded-lg font-bold">
                                        Owned ✅
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => buyItem(item)}
                                        disabled={!canAfford}
                                        className={`w-full py-2 rounded-xl font-bold transition-all shadow-md active:scale-95 ${canAfford
                                            ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-blue-200'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        {canAfford ? 'Buy Now' : 'Too Expensive'}
                                    </button>
                                )}
                            </div>

                            {/* Stat badges */}
                            <div className="absolute top-2 right-2 flex flex-col gap-1">
                                {item.effects.happiness && <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full font-bold">+{item.effects.happiness} Happy</span>}
                                {item.effects.careerXP && <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold">+{item.effects.careerXP} XP</span>}
                            </div>
                        </FingoCard>
                    );
                })}
            </div>

            <div className="flex justify-center pt-8">
                <FingoButton size="lg" onClick={advancePhase} variant="secondary">
                    Done Shopping →
                </FingoButton>
            </div>
        </div>
    );
};

export default MarketPhase;
