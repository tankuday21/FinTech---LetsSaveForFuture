export const initialScenarios = [
    // --- CAREER EVENTS ---
    {
        id: 'monday_blues',
        title: 'The Monday Blues 😴',
        description: 'You wake up feeling absolutely drained. Your bed is too comfortable, and work seems like a distant nightmare.',
        type: 'career',
        emoji: '😴',
        condition: () => true,
        choices: [
            {
                text: 'Call in Sick 🤒',
                description: 'Take a mental health day.',
                outcome: {
                    happiness: 10,
                    careerXP: -5,
                    cash: 0
                }
            },
            {
                text: 'Power Through ☕',
                description: 'Chug coffee and get to work.',
                outcome: {
                    happiness: -5,
                    careerXP: 5,
                    cash: 0
                }
            },
            {
                text: 'Work Late 💼',
                description: 'Impress the boss by staying extra hours.',
                outcome: {
                    happiness: -15,
                    careerXP: 10,
                    cash: 1000 // Overtime?
                }
            }
        ]
    },
    {
        id: 'startup_idea',
        title: 'Million Dollar Idea? 💡',
        description: 'Your friend Arjun pitches a "revolutionary" app idea. He needs seed money.',
        type: 'social',
        emoji: '💡',
        condition: (stats) => stats.cash > 10000,
        choices: [
            {
                text: 'Invest ₹10k 💸',
                description: 'High risk, maybe high reward?',
                outcome: {
                    cash: -10000,
                    flag: 'invested_in_arjun'
                }
            },
            {
                text: 'Polite Pass 🙅',
                description: 'Keep your money safe.',
                outcome: {
                    happiness: 0
                }
            },
            {
                text: 'Join as Co-founder 🤝',
                description: 'Quit your job to join him! (EXTREME RISK)',
                outcome: {
                    flag: 'joined_startup',
                    happiness: 20,
                    careerXP: 20
                }
            }
        ]
    },

    // --- LIFE EVENTS ---
    {
        id: 'ac_breakdown',
        title: 'Heat Wave Hazard ☀️',
        description: 'It is 45°C outside and your AC unit just exploded. It is meltingly hot.',
        type: 'life',
        emoji: '🥵',
        condition: () => true,
        choices: [
            {
                text: 'Buy New Premium AC ❄️',
                description: 'Cost: ₹35,000. Guaranteed comfort.',
                outcome: {
                    cash: -35000,
                    happiness: 15,
                    item: 'premium_ac'
                }
            },
            {
                text: 'Repair It 🔧',
                description: 'Cost: ₹5,000. Might break again.',
                outcome: {
                    cash: -5000,
                    happiness: 0
                }
            },
            {
                text: 'Buy a Fan 🌀',
                description: 'Cost: ₹2,000. Sweaty nights ahead.',
                outcome: {
                    cash: -2000,
                    happiness: -10
                }
            }
        ]
    },

    // --- CHAINED EVENTS (Depend on flags) ---
    {
        id: 'arjun_success',
        title: 'Arjun called! 📱',
        description: 'Remember that startup you invested in? A big VC just bought it!',
        type: 'special',
        emoji: '💰',
        condition: (stats, flags) => flags.invested_in_arjun,
        choices: [
            {
                text: 'Collect Returns 🤑',
                description: 'You get 5x your investment!',
                outcome: {
                    cash: 50000,
                    happiness: 30,
                    flag: 'arjun_exit'
                }
            }
        ]
    },
    {
        id: 'startup_crash',
        title: 'Startup Crash 📉',
        description: 'The startup ran out of money. It was a Ponzi scheme all along.',
        type: 'special',
        emoji: '📉',
        condition: (stats, flags) => flags.joined_startup,
        choices: [
            {
                text: 'Panic! 😱',
                description: 'You are unemployed.',
                outcome: {
                    happiness: -50,
                    careerXP: -20,
                    flag: 'unemployed'
                }
            }
        ]
    },

    // --- MARKET EVENTS ---
    {
        id: 'crypto_boom',
        title: 'Crypto Mooning 🚀',
        description: 'Your tech friends are making thousands on DogeCoin.',
        type: 'market',
        emoji: '🚀',
        condition: () => true,
        choices: [
            {
                text: 'FOMO In (₹20k) 🐕',
                description: 'Buy high!',
                outcome: {
                    cash: -20000,
                    flag: 'crypto_bagholder'
                }
            },
            {
                text: 'Ignore the Hype 🧘',
                description: 'Slow and steady.',
                outcome: {
                    happiness: 5
                }
            }
        ]
    },
    // --- MEGA EVENTS (Financial Life 3.0) ---
    {
        id: 'inflation_hit',
        title: 'The Inflation Monster 🦕',
        description: 'Prices of groceries and fuel have skyrocketed! Your monthly "Needs" expenses have increased.',
        type: 'market',
        emoji: '💸',
        condition: (stats, flags) => Math.random() > 0.7, // 30% chance monthly
        choices: [
            {
                text: 'Darn it! (Pay up)',
                outcome: {
                    happiness: -5,
                    cash: -2000 // Direct hit
                }
            },
            {
                text: 'Cut back on veggies',
                outcome: {
                    happiness: -10,
                    health: -5
                }
            }
        ]
    },
    {
        id: 'wedding_invite',
        title: 'Keep Up With The Kapoors 💍',
        description: 'Your cousin is getting married in Goa. It is a 3-day lavish affair.',
        type: 'social',
        emoji: '💃',
        condition: (stats) => stats.cash > 30000,
        choices: [
            {
                text: 'Attend in Style (Buy new outfit)',
                outcome: {
                    cash: -15000,
                    happiness: 20,
                    flag: 'attended_wedding'
                }
            },
            {
                text: 'Attend Budget (Reuse old clothes)',
                outcome: {
                    cash: -5000,
                    happiness: 5
                }
            },
            {
                text: 'Skip it (Make an excuse)',
                outcome: {
                    happiness: -10,
                    social: -10
                }
            }
        ]
    },
    {
        id: 'crypto_moonshot', // Changed ID to avoid conflict with existing 'crypto_boom'
        title: 'Crypto Moonshot 🚀',
        description: 'Your crypto portfolio has doubled overnight! Do you sell or HODL?',
        type: 'market',
        emoji: '🌕',
        condition: (stats, flags) => Math.random() > 0.9,
        choices: [
            {
                text: 'HODL! (Diamond Hands)',
                outcome: {
                    happiness: 10,
                    flag: 'crypto_bull'
                }
            },
            {
                text: 'Sell Half (Take Profit)',
                outcome: {
                    cash: 10000,
                    happiness: 5
                }
            }
        ]
    },
    {
        id: 'medical_emergency',
        title: 'Sudden Health Scare 🚑',
        description: 'You faced a sudden medical issue. Do you have insurance?',
        type: 'health',
        emoji: '🏥',
        condition: (stats) => Math.random() > 0.95, // Rare event
        choices: [
            {
                text: 'Pay from Savings',
                outcome: {
                    cash: -25000,
                    happiness: -20
                }
            },
            {
                text: 'Use Credit Card (High Interest)',
                outcome: {
                    cash: -5000, // Immediate payment
                    creditScore: -50,
                    happiness: -10
                }
            }
        ]
    }
];
