import React from 'react';
import { useSimulation } from '../../../context/SimulationContext';
import { HiHeart, HiBriefcase, HiCurrencyRupee, HiLightningBolt, HiChartBar } from 'react-icons/hi';
import logo from '../../../assets/logo.jpg';

const DashboardHeader = () => {
    const { stats, currentMonth, year, calculateNetWorth } = useSimulation();

    const netWorth = calculateNetWorth();

    return (
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm py-3 px-4 transition-all duration-300">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

                {/* Date & Title */}
                <div className="flex items-center gap-4">
                    <img src={logo} alt="FinLearn" className="h-20 w-auto rounded-lg shadow-md hover:scale-105 transition-transform" />
                    <div className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm">
                        {year} • Month {currentMonth}
                    </div>
                    <h1 className="text-xl font-display font-bold text-gray-900 hidden md:block">
                        Financial Life
                    </h1>
                </div>

                {/* Stats Grid */}
                <div className="flex gap-4 md:gap-8 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto no-scrollbar items-center">

                    {/* Cash */}
                    <div className="flex items-center gap-2 min-w-fit">
                        <div className="p-2 bg-green-50 rounded-full text-green-600">
                            <HiCurrencyRupee className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Cash</p>
                            <p className="font-bold text-gray-900">₹{stats.cash.toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Net Worth */}
                    <div className="flex items-center gap-2 min-w-fit border-l pl-4 border-gray-200">
                        <div className="p-2 bg-purple-50 rounded-full text-purple-600">
                            <HiChartBar className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Net Worth</p>
                            <p className="font-bold text-purple-900">₹{netWorth.toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Energy */}
                    <div className="flex items-center gap-2 min-w-fit border-l pl-4 border-gray-200">
                        <div className="p-2 bg-yellow-50 rounded-full text-yellow-600">
                            <HiLightningBolt className="w-5 h-5" />
                        </div>
                        <div className="w-24">
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-gray-500 font-bold">Energy</span>
                                <span className="font-bold text-yellow-700">{stats.energy}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-yellow-400 transition-all duration-500 rounded-full"
                                    style={{ width: `${stats.energy}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Happiness */}
                    <div className="flex items-center gap-2 min-w-fit">
                        <div className="p-2 bg-pink-50 rounded-full text-pink-500">
                            <HiHeart className="w-5 h-5" />
                        </div>
                        <div className="w-24 mr-4">
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-gray-500 font-bold">Happiness</span>
                                <span className="font-bold text-gray-900">{stats.happiness}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-pink-500 transition-all duration-500 rounded-full"
                                    style={{ width: `${stats.happiness}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Career XP (Progress Bar) */}
                    <div className="flex items-center gap-2 min-w-max">
                        <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                            <HiBriefcase className="w-5 h-5" />
                        </div>
                        <div className="w-24">
                            <div className="flex justify-between text-xs mb-1">
                                <span className="font-bold text-blue-600">Career</span>
                                <span className="font-bold text-gray-500">{stats.careerXP}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${stats.careerXP}%` }}></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;
