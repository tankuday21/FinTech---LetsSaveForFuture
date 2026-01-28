import React, { createContext, useContext, useState } from 'react';
import { initialScenarios } from '../pages/simulation/data/scenarios';

const SimulationContext = createContext();

export const useSimulation = () => useContext(SimulationContext);

export const SimulationProvider = ({ children }) => {
    // --- Game State ---
    const [gameState, setGameState] = useState('welcome'); // welcome, playing, summary, gameover, win
    const [currentMonth, setCurrentMonth] = useState(1);
    const [year, setYear] = useState(2025);
    const [phase, setPhase] = useState('budget'); // budget, investment, market, event, summary

    // --- Player Stats ---
    const [stats, setStats] = useState({
        cash: 50000,
        happiness: 80, // 0-100
        energy: 100,   // 0-100 (New Resource)
        careerXP: 0,   // 0-100
        creditScore: 700,
        financialHealth: 50
    });

    // --- Financial Portfolio ---
    const [portfolio, setPortfolio] = useState({
        savings: 0, // Cash in bank
        gold: 0,    // Grams
        nifty: 0,   // Units
        crypto: 0,  // Coins
        fd: 0       // Fixed Deposit
    });

    // --- Market Data (Prices) ---
    const [marketPrices, setMarketPrices] = useState({
        gold: 5000,   // per gram
        nifty: 20000, // per unit
        crypto: 1000  // per coin
    });

    // --- History for Charts ---
    const [netWorthHistory, setNetWorthHistory] = useState([]);

    // --- Inventory & Flags ---
    const [inventory, setInventory] = useState([]);
    const [flags, setFlags] = useState({});
    const [history, setHistory] = useState([]);

    // --- Current Turn Data ---
    const [monthlyAllocator, setMonthlyAllocator] = useState({
        needs: 50,
        wants: 30,
        savings: 20
    });

    const [currentScenario, setCurrentScenario] = useState(null);

    // --- Constants ---
    const MAX_MONTHS = 12;
    const SALARY_BASE = 50000;

    // --- Actions ---

    const startGame = (character) => {
        setGameState('playing');
        setCurrentMonth(1);
        setYear(2025);
        setPhase('budget');
        setStats({
            cash: SALARY_BASE,
            happiness: 80,
            energy: 100,
            careerXP: 0,
            creditScore: 700,
            financialHealth: 50
        });
        setPortfolio({ savings: 0, gold: 0, nifty: 0, crypto: 0, fd: 0 });
        setNetWorthHistory([]);
        setInventory([]);
        setFlags({ character: character.id });
        setHistory([]);
    };

    const advancePhase = () => {
        if (phase === 'budget') {
            // 1. Budget Phase -> Investment Phase
            const salary = calculateSalary();
            const needsAmt = (salary * monthlyAllocator.needs) / 100;
            const wantsAmt = (salary * monthlyAllocator.wants) / 100;
            // Apply Budget Effects
            setStats(prev => ({
                ...prev,
                cash: prev.cash - needsAmt - wantsAmt, // Needs/Wants spent
                happiness: Math.min(100, prev.happiness + calculateHappinessGain(wantsAmt))
            }));

            // Savings move to cash pool for investment
            // cash += savingsAmt? No, cash is already there. Budgeting simply allocates "spending".
            // Let's say Needs/Wants are deducted. The rest (Savings allocation) remains in Cash
            // for the user to invest manually in the next phase.

            setPhase('investment');

        } else if (phase === 'investment') {
            // 2. Investment Phase -> Career Phase
            setPhase('career');
        } else if (phase === 'career') {
            // 3. Career Phase -> Market Phase
            setPhase('market');
        } else if (phase === 'market') {
            // 4. Market Phase -> Event Phase
            const scenario = pickScenario();
            setCurrentScenario(scenario);
            setPhase('event');

        } else if (phase === 'event') {
            // 5. Event Phase -> Next Month / Summary
            endMonthLogic();
        }
    };

    const performAction = (type, payload) => {
        if (type === 'hustle') {
            // Side Hustle
            const job = payload;
            if (stats.energy >= job.energyCost) {
                setStats(prev => ({
                    ...prev,
                    energy: prev.energy - job.energyCost,
                    cash: prev.cash + job.cashReward,
                    happiness: Math.max(0, prev.happiness - job.happinessCost)
                }));
            }
        } else if (type === 'learn') {
            // Upskilling
            const edu = payload;
            if (stats.energy >= edu.energyCost && stats.cash >= edu.cashCost) {
                setStats(prev => ({
                    ...prev,
                    energy: prev.energy - edu.energyCost,
                    cash: prev.cash - edu.cashCost,
                    careerXP: Math.min(100, prev.careerXP + edu.xpReward),
                    happiness: Math.min(100, prev.happiness + (edu.happinessReward || 0))
                }));
            }
        }
    };

    const endMonthLogic = () => {
        // Record History
        const currentNetWorth = calculateNetWorth();
        setNetWorthHistory(prev => [...prev, { month: currentMonth, netWorth: currentNetWorth }]);

        // Market Fluctuation Logic
        fluctuateMarket();

        if (currentMonth >= MAX_MONTHS) {
            setGameState('win');
        } else {
            setCurrentMonth(prev => prev + 1);
            setPhase('budget');

            // --- INFLATION & ECONOMY LOGIC ---
            // 1. Inflation: Expenses rise by 15% every 6 months
            if (currentMonth % 6 === 0) {
                setMonthlyAllocator(prev => ({
                    ...prev,
                    needs: Math.min(80, prev.needs + 5) // "Needs" allocation forced up
                }));
            }

            // Add Salary
            setStats(prev => ({
                ...prev,
                cash: prev.cash + calculateSalary(),
                energy: 100 // Reset energy monthly
            }));
        }
    };

    const calculateNetWorth = () => {
        return stats.cash +
            portfolio.fd +
            (portfolio.gold * marketPrices.gold) +
            (portfolio.nifty * marketPrices.nifty) +
            (portfolio.crypto * marketPrices.crypto);
    };

    const fluctuateMarket = () => {
        setMarketPrices(prev => ({
            gold: prev.gold * (1 + (Math.random() * 0.04 - 0.01)), // -1% to +3% (Stable)
            nifty: prev.nifty * (1 + (Math.random() * 0.10 - 0.03)), // -3% to +7% (Volatile)
            crypto: prev.crypto * (1 + (Math.random() * 0.40 - 0.20)) // -20% to +20% (Wild)
        }));
    };

    const calculateSalary = () => {
        let multiplier = 1;
        if (flags.promotion) multiplier += 0.2;
        if (flags.startup_success) multiplier += 0.5;
        return SALARY_BASE * multiplier;
    };

    const calculateHappinessGain = (wantsAmount) => {
        if (wantsAmount > 20000) return 15;
        if (wantsAmount > 10000) return 10;
        if (wantsAmount > 5000) return 5;
        return -5;
    };

    const pickScenario = () => {
        const validScenarios = initialScenarios.filter(s => {
            if (s.condition) return s.condition(stats, flags);
            return true;
        });
        const randomIndex = Math.floor(Math.random() * validScenarios.length);
        return validScenarios[randomIndex];
    };

    const handleChoice = (choice) => {
        const effects = choice.outcome;
        setStats(prev => ({
            ...prev,
            cash: prev.cash + (effects.cash || 0),
            happiness: Math.min(100, Math.max(0, prev.happiness + (effects.happiness || 0))),
            careerXP: Math.min(100, prev.careerXP + (effects.careerXP || 0)),
            energy: Math.min(100, Math.max(0, prev.energy + (effects.energy || 0)))
        }));

        if (effects.flag) setFlags(prev => ({ ...prev, [effects.flag]: true }));
        if (effects.item) setInventory(prev => [...prev, effects.item]);

        advancePhase();
    };

    const buyItem = (item) => {
        if (stats.cash >= item.price) {
            setStats(prev => ({ ...prev, cash: prev.cash - item.price }));
            setInventory(prev => [...prev, item.id]);
            if (item.effects) {
                setStats(prev => ({
                    ...prev,
                    happiness: Math.min(100, prev.happiness + (item.effects.happiness || 0))
                }));
            }
        }
    };

    const invest = (type, amount) => {
        if (stats.cash >= amount) {
            setStats(prev => ({ ...prev, cash: prev.cash - amount }));

            if (type === 'gold') {
                setPortfolio(prev => ({ ...prev, gold: prev.gold + (amount / marketPrices.gold) }));
            } else if (type === 'nifty') {
                setPortfolio(prev => ({ ...prev, nifty: prev.nifty + (amount / marketPrices.nifty) }));
            } else if (type === 'crypto') {
                setPortfolio(prev => ({ ...prev, crypto: prev.crypto + (amount / marketPrices.crypto) }));
            } else if (type === 'fd') {
                setPortfolio(prev => ({ ...prev, fd: prev.fd + amount }));
            }
        }
    };

    return (
        <SimulationContext.Provider value={{
            gameState, currentMonth, year, phase,
            stats, portfolio, marketPrices, netWorthHistory,
            inventory, flags, monthlyAllocator, setMonthlyAllocator, history,
            startGame, advancePhase, handleChoice, currentScenario,
            buyItem, invest, performAction, calculateSalary, calculateNetWorth
        }}>
            {children}
        </SimulationContext.Provider>
    );
};
