import React, { useState } from 'react';
import { useSimulation } from '../../../context/SimulationContext';
import FingoCard from '../../../components/FingoCard';
import FingoButton from '../../../components/FingoButton';
import { sideHustles, educationOptions } from '../data/jobs';
import { HiLightningBolt, HiBriefcase, HiCurrencyRupee, HiAcademicCap } from 'react-icons/hi';

const CareerPhase = () => {
    const { stats, advancePhase, performAction } = useSimulation();

    return (
        <div className="space-y-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">After Hours 🌙</h2>
                <p className="text-gray-600">You have finished your day job. How will you spend your free time?</p>

                <div className="flex justify-center gap-6 mt-6">
                    <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-100">
                        <HiLightningBolt className="text-yellow-500 w-6 h-6" />
                        <div className="text-left leading-tight">
                            <span className="text-xs text-yellow-700 font-bold uppercase tracking-wider block">Energy Left</span>
                            <span className="text-xl font-bold text-yellow-900">{stats.energy}/100</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Section 1: Side Hustles (Cash) */}
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="bg-green-100 p-2 rounded-lg text-green-600"><HiCurrencyRupee /></span>
                        Side Hustles (Make Cash)
                    </h3>
                    <div className="space-y-4">
                        {sideHustles.map(job => (
                            <FingoCard key={job.id} className="relative overflow-hidden group hover:border-green-200 transition-all">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-800">{job.title}</h4>
                                        <p className="text-sm text-gray-500 mb-2">{job.description}</p>
                                        <div className="flex gap-2 text-xs font-bold">
                                            <span className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded">-{job.energyCost} Energy</span>
                                            <span className="text-green-600 bg-green-50 px-2 py-1 rounded">+₹{job.cashReward}</span>
                                        </div>
                                    </div>
                                    <FingoButton
                                        disabled={stats.energy < job.energyCost}
                                        onClick={() => performAction('hustle', job)}
                                        className={stats.energy < job.energyCost ? 'opacity-50 cursor-not-allowed bg-gray-400' : 'bg-green-600 hover:bg-green-700'}
                                    >
                                        Do It
                                    </FingoButton>
                                </div>
                            </FingoCard>
                        ))}
                    </div>
                </div>

                {/* Section 2: Upskilling (XP) */}
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="bg-blue-100 p-2 rounded-lg text-blue-600"><HiAcademicCap /></span>
                        Upskilling (Career Growth)
                    </h3>
                    <div className="space-y-4">
                        {educationOptions.map(edu => (
                            <FingoCard key={edu.id} className="relative overflow-hidden group hover:border-blue-200 transition-all">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-800">{edu.title}</h4>
                                        <p className="text-sm text-gray-500 mb-2">{edu.description}</p>
                                        <div className="flex gap-2 text-xs font-bold">
                                            <span className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded">-{edu.energyCost} Energy</span>
                                            <span className="text-red-600 bg-red-50 px-2 py-1 rounded">-₹{edu.cashCost}</span>
                                            <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded">+{edu.xpReward} XP</span>
                                        </div>
                                    </div>
                                    <FingoButton
                                        disabled={stats.energy < edu.energyCost || stats.cash < edu.cashCost}
                                        onClick={() => performAction('learn', edu)}
                                        className={stats.energy < edu.energyCost || stats.cash < edu.cashCost ? 'opacity-50 cursor-not-allowed bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}
                                    >
                                        Enroll
                                    </FingoButton>
                                </div>
                            </FingoCard>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-12">
                <FingoButton size="lg" onClick={advancePhase} variant="outline">
                    End Day (Go to Market) →
                </FingoButton>
            </div>
        </div>
    );
};

export default CareerPhase;
