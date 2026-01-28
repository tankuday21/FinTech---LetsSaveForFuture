import React from 'react';
import { useSimulation } from '../../../context/SimulationContext';
import FingoCard from '../../../components/FingoCard';
import FingoButton from '../../../components/FingoButton';

const BudgetPhase = () => {
    const { stats, monthlyAllocator, setMonthlyAllocator, advancePhase, calculateSalary } = useSimulation();

    const salary = calculateSalary();

    const handleSliderChange = (type, value) => {
        // Simple logic: Adjust the other two sliders to maintain 100% total
        // intricate logic can be added later, for now just force setting
        setMonthlyAllocator(prev => ({
            ...prev,
            [type]: parseInt(value)
        }));
    };

    const needsAmt = (salary * monthlyAllocator.needs) / 100;
    const wantsAmt = (salary * monthlyAllocator.wants) / 100;
    const savingsAmt = (salary * monthlyAllocator.savings) / 100;

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in-up">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-display font-bold text-gray-900">Payday! 💸</h2>
                <p className="text-gray-600">You earned <span className="text-green-600 font-bold">₹{salary.toLocaleString()}</span> this month.</p>
                <p className="text-sm text-gray-400">Allocate your budget wisely.</p>
            </div>

            <FingoCard>
                <div className="space-y-8">

                    {/* Needs Slider */}
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="font-bold text-gray-700">Needs (Rent, Bills) 🏠</span>
                            <span className="text-red-500 font-bold">₹{needsAmt.toLocaleString()} ({monthlyAllocator.needs}%)</span>
                        </div>
                        <input
                            type="range"
                            min="0" max="100"
                            value={monthlyAllocator.needs}
                            onChange={(e) => handleSliderChange('needs', e.target.value)}
                            className="w-full h-3 bg-red-100 rounded-lg appearance-none cursor-pointer accent-red-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Must be paid to survive.</p>
                    </div>

                    {/* Wants Slider */}
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="font-bold text-gray-700">Wants (Fun, Shopping) 🎉</span>
                            <span className="text-purple-500 font-bold">₹{wantsAmt.toLocaleString()} ({monthlyAllocator.wants}%)</span>
                        </div>
                        <input
                            type="range"
                            min="0" max="100"
                            value={monthlyAllocator.wants}
                            onChange={(e) => handleSliderChange('wants', e.target.value)}
                            className="w-full h-3 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-purple-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Boosts Happiness. Be careful not to overspend.</p>
                    </div>

                    {/* Savings Slider */}
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="font-bold text-gray-700">Savings & Investments 📈</span>
                            <span className="text-green-500 font-bold">₹{savingsAmt.toLocaleString()} ({monthlyAllocator.savings}%)</span>
                        </div>
                        <input
                            type="range"
                            min="0" max="100"
                            value={monthlyAllocator.savings}
                            onChange={(e) => handleSliderChange('savings', e.target.value)}
                            className="w-full h-3 bg-green-100 rounded-lg appearance-none cursor-pointer accent-green-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Builds your future wealth.</p>
                    </div>

                </div>
            </FingoCard>

            <div className="text-center pt-4">
                <FingoButton size="lg" onClick={advancePhase}>
                    Confirm Budget ✅
                </FingoButton>
            </div>
        </div>
    );
};

export default BudgetPhase;
