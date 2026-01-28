import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HiCheckCircle,
  HiXCircle,
  HiArrowRight,
  HiPlay,
  HiFaceFrown,
  HiMagnifyingGlass,
  HiQuestionMarkCircle,
  HiMoon
} from 'react-icons/hi2';

// Theme Colors matching the reference
const colors = {
  bg: 'bg-[#F9FDFC]',
  primary: 'bg-[#22C55E]', // Green for buttons
  primaryDark: 'bg-[#15803D]',
  secondary: 'bg-[#FFFFFF]', // White for buttons
  textDark: 'text-[#0F172A]',
  textGreen: 'text-[#22C55E]',
  dot: '#E2E8F0' // color for the dotted background
};

const WarningCard = ({ color, rotate, title, image, icon: Icon, highlight, description }) => (
  <div
    className={`relative bg-white p-6 rounded-2xl border-2 ${color} shadow-[0_8px_0_0_rgba(0,0,0,0.05)] w-80 flex-shrink-0 transition-transform hover:-translate-y-2 duration-300`}
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    <div className="text-base font-bold text-gray-800 mb-4 leading-relaxed">
      {title}
    </div>
    <div className="relative h-40 flex items-center justify-center mb-4">
      {/* Placeholder for the image */}
      <img src={image} alt="Warning" className="h-full object-contain" />
      {/* Floating Icon */}
      {Icon && <div className="absolute top-0 right-0 text-gray-400 animate-bounce"><Icon className="w-8 h-8" /></div>}
    </div>
    <div className="text-sm text-gray-600 leading-relaxed font-medium">
      {description}
      {highlight && <span className="text-green-500 font-bold block mt-1">{highlight}</span>}
    </div>
  </div>
);

const TopicBadge = ({ label, color }) => (
  <div className={`px-4 py-2 ${color} rounded-lg text-sm font-bold text-gray-700 shadow-sm border border-gray-100 flex-shrink-0 whitespace-nowrap cursor-pointer hover:scale-105 transition-transform`}>
    {label}
  </div>
);

const Landing = () => {
  // Dotted Background Style
  const bgStyle = {
    backgroundColor: '#F9FDFC',
    backgroundImage: 'radial-gradient(#E2E8F0 2px, transparent 2px)',
    backgroundSize: '30px 30px'
  };

  return (
    <div style={bgStyle} className="min-h-screen font-sans selection:bg-green-100 selection:text-green-800 overflow-x-hidden">

      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-[#F9FDFC]/90 backdrop-blur-sm pt-6 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-1">
            <span className="text-3xl font-display font-extrabold text-green-500 tracking-tight">FinLearn</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="font-bold text-gray-700 hover:text-green-600 transition-colors">Contact Us</button>
            <Link
              to="/signup"
              className="bg-green-600 text-white px-6 py-2 rounded-xl font-bold shadow-[0_4px_0_0_#15803D] hover:shadow-[0_2px_0_0_#15803D] hover:translate-y-[2px] transition-all"
            >
              Try Now!
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-40 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-[#22C55E] mb-6 leading-tight">
            learn finance the fun way! 😎
          </h1>
          <p className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4">
            say goodbye to boring finance lessons.
          </p>
          <p className="text-sm text-gray-500 mb-8 font-medium">(No signup required.)</p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link
              to="/signup"
              className="bg-green-600 text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-[0_6px_0_0_#15803D] hover:shadow-[0_3px_0_0_#15803D] hover:translate-y-[3px] transition-all active:shadow-none active:translate-y-[6px]"
            >
              Try Now!
            </Link>
            <Link
              to="/login"
              className="bg-white text-green-600 border-2 border-gray-100 px-12 py-4 rounded-2xl font-bold text-lg shadow-[0_6px_0_0_#E2E8F0] hover:shadow-[0_3px_0_0_#E2E8F0] hover:translate-y-[3px] transition-all active:shadow-none active:translate-y-[6px]"
            >
              LOGIN
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Arrow */}
      <div className="flex justify-center mb-20 animate-bounce">
        <div className="w-6 h-6 border-b-4 border-r-4 border-green-500 transform rotate-45 rounded-sm"></div>
      </div>

      {/* Trusted By (Static for now) */}
      <div className="text-center mb-32">
        <h3 className="text-green-500 font-bold mb-8 text-lg">trusted by people who watch</h3>
        <div className="flex justify-center gap-8 items-center opacity-50 grayscale">
          <span className="text-3xl font-bold text-gray-800">NETFLIX</span>
          <span className="text-3xl font-bold text-gray-800">prime video</span>
          <span className="text-3xl font-bold text-gray-800">YouTube</span>
        </div>
      </div>

      {/* Timeline / How it works */}
      <div className="max-w-5xl mx-auto px-4 mb-40 relative">
        {/* Center Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-green-400 -ml-0.5 hidden md:block"></div>

        {/* Item 1: Lesson */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0 mb-20">
          <div className="flex-1 text-right md:pr-12">
            <div className="bg-white p-8 rounded-3xl border-2 border-gray-100 shadow-xl inline-block text-left w-full max-w-md transform hover:scale-105 transition-transform duration-300">
              <h4 className="font-bold text-xl text-gray-800 mb-3">What is a Stock?</h4>
              <p className="text-base text-gray-600 mb-6 leading-relaxed">
                When you buy a stock, you are buying a small piece of ownership in a company.
              </p>
              <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-xl mb-6 leading-relaxed">
                If you buy one stock of Tesla, you own 0.000001% of it. Elon Musk and you are basically partners! 🤯
              </div>
              <div className="text-right">
                <button className="bg-green-500 text-white text-sm font-bold px-6 py-3 rounded-xl shadow-[0_4px_0_0_#15803D]">Next</button>
              </div>
            </div>
          </div>

          <div className="relative z-10 w-12 h-12 rounded-full bg-green-400 border-4 border-white shadow-lg flex items-center justify-center text-white">
            <HiCheckCircle className="w-8 h-8" />
          </div>

          <div className="flex-1 md:pl-12 text-center md:text-left">
            <h3 className="text-4xl font-display font-medium text-green-500 mb-4">learn new topics</h3>
            <p className="text-xl text-gray-700 max-w-md mx-auto md:mx-0 font-medium leading-relaxed">
              short, easy-to-read chapters. choose from over 600 chapters, each only 3-4 minutes long.
            </p>
          </div>
        </div>

        {/* Item 2: Quiz */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-0">
          <div className="flex-1 text-left md:pl-12">
            <div className="bg-white p-8 rounded-3xl border-2 border-green-400 shadow-xl inline-block w-full max-w-md relative overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="absolute top-0 left-0 w-full h-2 bg-green-400"></div>
              <h4 className="font-bold text-xl text-gray-800 mb-4">Question 3</h4>
              <p className="text-lg text-gray-700 mb-6 font-medium">What does IPO stand for?</p>

              <div className="space-y-4">
                <div className="p-4 rounded-xl border-2 border-gray-100 text-sm font-bold text-gray-500 cursor-pointer hover:bg-gray-50">
                  Initial Private Offering
                </div>
                <div className="p-4 rounded-xl border-2 border-red-100 bg-red-50 text-sm font-bold text-gray-700 flex justify-between items-center cursor-pointer">
                  Instant Public Offering
                  <HiXCircle className="text-red-500 w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 w-12 h-12 rounded-full bg-green-400 border-4 border-white shadow-lg flex items-center justify-center text-white">
            <HiCheckCircle className="w-8 h-8" />
          </div>

          <div className="flex-1 md:pr-12 text-center md:text-right">
            <h3 className="text-4xl font-display font-medium text-green-500 mb-4">answer quizzes</h3>
            <p className="text-xl text-gray-700 max-w-md mx-auto md:ml-auto md:mr-0 font-medium leading-relaxed">
              practice what you learned and challenge yourself.
            </p>
          </div>
        </div>
      </div>

      {/* Warning Section */}
      <div className="mb-40 px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">
            <span className="text-orange-500">WARNING:</span> You will hate FinLearn if...
          </h2>
        </div>

        {/* Horizontal Scrolling Cards */}
        <div className="flex overflow-x-auto pb-12 gap-8 px-8 no-scrollbar justify-start lg:justify-center">
          <WarningCard
            color="border-yellow-200"
            rotate={-2}
            title="reading lonngggg blogs filled with jargons is your thing"
            description="Sadly, we only have"
            highlight="short, jargon-free chapters."
            image="/assets/warning_brain.jpg"
            icon={HiFaceFrown}
          />
          <WarningCard
            color="border-green-400"
            rotate={1}
            title="you are a sherlock fan and love searching for topics to learn"
            description="Unfortunately, you will find"
            highlight="everything you need to learn about a topic on FinLearn."
            image="/assets/warning_dog.jpg"
            icon={HiMagnifyingGlass}
          />
          <WarningCard
            color="border-purple-400"
            rotate={-1}
            title="you are at peace when you forget what you learned"
            description="Uh oh! The fun quizzes make sure that you"
            highlight="understand new topics properly."
            image="/assets/warning_dino.jpg"
            icon={HiQuestionMarkCircle}
          />
          <WarningCard
            color="border-orange-200"
            rotate={2}
            title="you enjoy sitting through 20 minute videos"
            description="We have only"
            highlight="4-minute-long chapters. Sorry! 😐"
            image="/assets/warning_cat.jpg"
            icon={HiMoon}
          />
        </div>
      </div>

      {/* Topics Cloud */}
      <div className="max-w-6xl mx-auto px-4 mb-32 text-center">
        <h2 className="text-3xl font-display font-medium text-green-500 mb-12">
          choose from a wide range of topics
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <TopicBadge label="Investment" color="bg-red-100" />
          <TopicBadge label="Fixed Income" color="bg-blue-100" />
          <TopicBadge label="Economics" color="bg-green-100" />
          <TopicBadge label="Personal Finance" color="bg-orange-100" />
          <TopicBadge label="Trading" color="bg-red-100" />
          <TopicBadge label="Sector Analysis" color="bg-cyan-100" />
          <TopicBadge label="Cryptocurrency" color="bg-yellow-100" />
          <TopicBadge label="Psychology" color="bg-purple-100" />
          <TopicBadge label="Retirement" color="bg-pink-100" />
          <TopicBadge label="Taxes" color="bg-gray-100" />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-6 text-sm font-bold text-gray-700">
            <span className="cursor-pointer hover:text-green-600">Terms</span>
            <span className="cursor-pointer hover:text-green-600">Privacy</span>
          </div>

          <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
            Made with <span className="text-red-500">❤️</span> in 🇮🇳
          </div>
        </div>
      </div>

    </div>
  );
};

export default Landing;
