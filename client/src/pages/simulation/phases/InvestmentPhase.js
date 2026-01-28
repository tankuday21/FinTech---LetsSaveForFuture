import React, { useState } from 'react';
import { useSimulation } from '../../../context/SimulationContext';
import FingoCard from '../../../components/FingoCard';
import FingoButton from '../../../components/FingoButton';
import { HiArrowTrendingUp, HiArrowTrendingDown, HiCurrencyRupee, HiLockClosed } from 'react-icons/hi2';

const AssetCard = ({ title, price, held, type, trend, onInvest }) => {
    const [amount, setAmount] = useState('');

    const handleInvest = () => {
        if (!amount || isNaN(amount) || amount <= 0) return;
        onInvest(type, parseInt(amount));
        setAmount('');
    };

    return (
        <FingoCard className="flex flex-col h-full bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all border-green-100">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                    <div className="text-sm text-gray-500">Price: ₹{price.toLocaleString()}</div>
                </div>
                <div className={`p-2 rounded-full ${trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {trend === 'up' ? <HiArrowTrendingUp /> : <HiArrowTrendingDown />}
                </div>
            </div>

            <div className="mb-4 space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">You Own:</span>
                    <span className="font-bold">{held.toFixed(2)} units</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Value:</span>
                    <span className="font-bold text-green-600">₹{(held * price).toLocaleString()}</span>
                </div>
            </div>

            <div className="mt-auto space-y-2">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount (₹)"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80"
                />
                <FingoButton onClick={handleInvest} className="w-full text-sm py-2">
                    Invest
                </FingoButton>
            </div>
        </FingoCard>
    );
};

const InvestmentPhase = () => {
    const { stats, portfolio, marketPrices, invest, advancePhase } = useSimulation();

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Investment Portfolio 📈</h2>
                <p className="text-gray-600">Allocate your remaining cash to grow your wealth.</p>
                <div className="mt-4 text-2xl font-bold text-green-600 bg-green-50 inline-block px-6 py-2 rounded-full border border-green-100">
                    Available Cash: ₹{stats.cash.toLocaleString()}
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AssetCard
                    title="Gold (SGB)"
                    price={marketPrices.gold}
                    held={portfolio.gold}
                    type="gold"
                    trend={Math.random() > 0.5 ? 'up' : 'down'}
                    onInvest={invest}
                />
                <AssetCard
                    title="Nifty 50 Index"
                    price={marketPrices.nifty}
                    held={portfolio.nifty}
                    type="nifty"
                    trend={Math.random() > 0.4 ? 'up' : 'down'}
                    onInvest={invest}
                />
                <AssetCard
                    title="Crypto (Bitcoin)"
                    price={marketPrices.crypto}
                    held={portfolio.crypto}
                    type="crypto"
                    trend={Math.random() > 0.6 ? 'up' : 'down'}
                    onInvest={invest}
                />
                <FingoCard className="flex flex-col h-full bg-blue-50/50 border-blue-100">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">Fixed Deposit</h3>
                            <div className="text-sm text-gray-500">Return: 7% p.a.</div>
                        </div>
                        <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                            <HiLockClosed />
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Total FD:</span>
                            <span className="font-bold">₹{portfolio.fd.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="mt-auto">
                        <input
                            type="number"
                            placeholder="Amount (₹)"
                            className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white mb-2"
                            id="fd-input"
                        />
                        <FingoButton
                            className="w-full text-sm py-2 bg-blue-600 hover:bg-blue-700"
                            onClick={() => {
                                const el = document.getElementById('fd-input');
                                if (el.value) {
                                    invest('fd', parseInt(el.value));
                                    el.value = '';
                                }
                            }}
                        >
                            Lock in FD
                        </FingoButton>
                    </div>
                </FingoCard>
            </div>

            <div className="flex justify-center mt-12">
                <FingoButton size="lg" onClick={advancePhase}>
                    Done Investing →
                </FingoButton>
            </div>
        </div>
    );
};

export default InvestmentPhase;
