import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomSlider from '../components/CustomSlider';
import VersionBadge from '../components/VersionBadge';
import { 
  HiArrowLeft,
  HiCalculator,
  HiCurrencyRupee,
  HiChartBar,
  HiShieldCheck
} from 'react-icons/hi2';

const Calculators = () => {
  const [activeCalculator, setActiveCalculator] = useState('emi');

  return (
    <div className="min-h-screen bg-gray-50">
      <VersionBadge />
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <HiArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Back to Dashboard</span>
          </Link>
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
            Financial Calculators
          </h1>
          <p className="text-gray-600">
            Plan your finances with our easy-to-use calculators
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calculator Menu */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Calculators</h2>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveCalculator('emi')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeCalculator === 'emi'
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <HiCalculator className="w-5 h-5" />
                    <span>EMI Calculator</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveCalculator('sip')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeCalculator === 'sip'
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <HiChartBar className="w-5 h-5" />
                    <span>SIP Calculator</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveCalculator('emergency')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeCalculator === 'emergency'
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <HiShieldCheck className="w-5 h-5" />
                    <span>Emergency Fund</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveCalculator('compound')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeCalculator === 'compound'
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <HiCurrencyRupee className="w-5 h-5" />
                    <span>Compound Interest</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Calculator Content */}
          <div className="lg:col-span-3 calculator-content">
            {activeCalculator === 'emi' && <EMICalculator />}
            {activeCalculator === 'sip' && <SIPCalculator />}
            {activeCalculator === 'emergency' && <EmergencyFundCalculator />}
            {activeCalculator === 'compound' && <CompoundInterestCalculator />}
          </div>
        </div>
      </div>
    </div>
  );
};

// EMI Calculator Component
const EMICalculator = () => {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(5);
  const [result, setResult] = useState(null);

  const calculateEMI = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100;
    const n = parseFloat(tenure) * 12;

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - P;

    setResult({
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      principal: P
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">EMI Calculator</h2>
      
      <div className="space-y-6">
        <CustomSlider
          label="Loan Amount"
          value={principal}
          onChange={setPrincipal}
          min={10000}
          max={10000000}
          step={10000}
          formatValue={(val) => `₹${val.toLocaleString('en-IN')}`}
          color="primary"
        />

        <CustomSlider
          label="Interest Rate (% per annum)"
          value={rate}
          onChange={setRate}
          min={1}
          max={20}
          step={0.1}
          formatValue={(val) => `${val}%`}
          color="green"
        />

        <CustomSlider
          label="Loan Tenure (Years)"
          value={tenure}
          onChange={setTenure}
          min={1}
          max={30}
          step={1}
          formatValue={(val) => `${val} years`}
          color="blue"
        />

        <button
          onClick={calculateEMI}
          className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
        >
          Calculate EMI
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
              <p className="text-sm text-primary-700 mb-2">Monthly EMI</p>
              <p className="text-4xl font-bold text-primary-900">₹{result.emi.toLocaleString('en-IN')}</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-600 mb-1">Principal</p>
                <p className="text-lg font-semibold text-gray-900">₹{result.principal.toLocaleString('en-IN')}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-600 mb-1">Interest</p>
                <p className="text-lg font-semibold text-gray-900">₹{result.totalInterest.toLocaleString('en-IN')}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-600 mb-1">Total Amount</p>
                <p className="text-lg font-semibold text-gray-900">₹{result.totalAmount.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// SIP Calculator Component
const SIPCalculator = () => {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [result, setResult] = useState(null);

  const calculateSIP = () => {
    const P = parseFloat(monthly);
    const r = parseFloat(rate) / 12 / 100;
    const n = parseFloat(years) * 12;

    const futureValue = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    const invested = P * n;
    const returns = futureValue - invested;

    setResult({
      futureValue: Math.round(futureValue),
      invested: Math.round(invested),
      returns: Math.round(returns)
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">SIP Calculator</h2>
      
      <div className="space-y-6">
        <CustomSlider
          label="Monthly Investment"
          value={monthly}
          onChange={setMonthly}
          min={500}
          max={100000}
          step={500}
          formatValue={(val) => `₹${val.toLocaleString('en-IN')}`}
          color="primary"
        />

        <CustomSlider
          label="Expected Return Rate (% per annum)"
          value={rate}
          onChange={setRate}
          min={1}
          max={30}
          step={0.5}
          formatValue={(val) => `${val}%`}
          color="green"
        />

        <CustomSlider
          label="Investment Period (Years)"
          value={years}
          onChange={setYears}
          min={1}
          max={40}
          step={1}
          formatValue={(val) => `${val} years`}
          color="blue"
        />

        <button
          onClick={calculateSIP}
          className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
        >
          Calculate Returns
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <p className="text-sm text-green-700 mb-2">Future Value</p>
              <p className="text-4xl font-bold text-green-900">₹{result.futureValue.toLocaleString('en-IN')}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-600 mb-1">Total Invested</p>
                <p className="text-lg font-semibold text-gray-900">₹{result.invested.toLocaleString('en-IN')}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-600 mb-1">Estimated Returns</p>
                <p className="text-lg font-semibold text-green-600">₹{result.returns.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Emergency Fund Calculator Component
const EmergencyFundCalculator = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState(30000);
  const [months, setMonths] = useState(6);
  const [currentSavings, setCurrentSavings] = useState(50000);

  const targetFund = monthlyExpenses * months;
  const remaining = Math.max(0, targetFund - currentSavings);
  const progress = Math.min(100, (currentSavings / targetFund) * 100);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Emergency Fund Calculator</h2>
      
      <div className="space-y-6">
        <CustomSlider
          label="Monthly Expenses"
          value={monthlyExpenses}
          onChange={setMonthlyExpenses}
          min={5000}
          max={200000}
          step={1000}
          formatValue={(val) => `₹${val.toLocaleString('en-IN')}`}
          color="primary"
        />

        <CustomSlider
          label="Months of Coverage"
          value={months}
          onChange={setMonths}
          min={3}
          max={12}
          step={1}
          formatValue={(val) => `${val} months`}
          color="blue"
        />

        <CustomSlider
          label="Current Savings"
          value={currentSavings}
          onChange={setCurrentSavings}
          min={0}
          max={500000}
          step={5000}
          formatValue={(val) => `₹${val.toLocaleString('en-IN')}`}
          color="green"
        />

        <div className="mt-6 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-sm text-blue-700 mb-2">Target Emergency Fund</p>
            <p className="text-4xl font-bold text-blue-900">₹{targetFund.toLocaleString('en-IN')}</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm font-semibold text-primary-600">{progress.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-primary-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Current Savings</p>
              <p className="text-lg font-semibold text-gray-900">₹{currentSavings.toLocaleString('en-IN')}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Still Needed</p>
              <p className="text-lg font-semibold text-orange-600">₹{remaining.toLocaleString('en-IN')}</p>
            </div>
          </div>

          {progress >= 100 ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-green-700 font-medium">🎉 Congratulations! You've reached your emergency fund goal!</p>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <p className="text-yellow-700 font-medium">Keep saving! You're {progress.toFixed(0)}% there.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Compound Interest Calculator Component
const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(10);
  const [frequency, setFrequency] = useState(12); // Monthly
  const [result, setResult] = useState(null);

  const calculateCompound = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);
    const n = parseFloat(frequency);

    const amount = P * Math.pow((1 + r / n), n * t);
    const interest = amount - P;

    setResult({
      amount: Math.round(amount),
      interest: Math.round(interest),
      principal: P
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Compound Interest Calculator</h2>
      
      <div className="space-y-6">
        <CustomSlider
          label="Principal Amount"
          value={principal}
          onChange={setPrincipal}
          min={10000}
          max={10000000}
          step={10000}
          formatValue={(val) => `₹${val.toLocaleString('en-IN')}`}
          color="primary"
        />

        <CustomSlider
          label="Annual Interest Rate"
          value={rate}
          onChange={setRate}
          min={1}
          max={20}
          step={0.1}
          formatValue={(val) => `${val}%`}
          color="purple"
        />

        <CustomSlider
          label="Time Period (Years)"
          value={years}
          onChange={setYears}
          min={1}
          max={30}
          step={1}
          formatValue={(val) => `${val} years`}
          color="blue"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Compounding Frequency
          </label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="1">Annually</option>
            <option value="2">Semi-Annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="365">Daily</option>
          </select>
        </div>

        <button
          onClick={calculateCompound}
          className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
        >
          Calculate
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <p className="text-sm text-purple-700 mb-2">Final Amount</p>
              <p className="text-4xl font-bold text-purple-900">₹{result.amount.toLocaleString('en-IN')}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-600 mb-1">Principal</p>
                <p className="text-lg font-semibold text-gray-900">₹{result.principal.toLocaleString('en-IN')}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-600 mb-1">Interest Earned</p>
                <p className="text-lg font-semibold text-green-600">₹{result.interest.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculators;
