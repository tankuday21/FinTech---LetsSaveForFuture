import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../services/supabase';
import { HiArrowLeft } from 'react-icons/hi2';
import FingoButton from '../components/FingoButton';
import FingoLogo from '../assets/logo.jpg';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await signUp(formData.email, formData.password, formData.username);
      // Supabase handles auth state automatically
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 bg-white relative z-10 shadow-2xl rounded-r-[3rem]">

        <div className="absolute top-8 left-8">
          <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors font-bold">
            <HiArrowLeft className="w-5 h-5" />
            Back
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto space-y-8">
          <div>
            <div className="flex justify-center mb-4">
              <img src={FingoLogo} alt="Fingo Logo" className="h-28 w-auto rounded-2xl shadow-lg" />
            </div>
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-2">
              Start Your Journey 🚀
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              Join thousands of others mastering their money.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-2 border-red-100 text-red-700 px-4 py-3 rounded-2xl text-sm font-medium">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-bold text-gray-700 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-5 py-4 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all font-medium"
                  placeholder="CoolInvestor123"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-5 py-4 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all font-medium"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-5 py-4 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-5 py-4 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <FingoButton
              type="submit"
              disabled={loading}
              className="w-full text-lg"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </FingoButton>

            <div className="text-center mt-6">
              <p className="text-gray-600 font-medium">
                Already have an account?{' '}
                <Link to="/login" className="font-bold text-green-600 hover:text-green-500 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex flex-1 bg-green-50 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>

        {/* Decorative blobs */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-200 rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-green-200 rounded-full blur-3xl opacity-60 animate-pulse delay-1000"></div>

        <div className="max-w-xl text-center relative z-10">
          <img
            src="/assets/signup_illustration.png"
            alt="Race to Success"
            className="w-full h-auto drop-shadow-2xl mb-8 transform hover:scale-105 transition-transform duration-500"
          />
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
            Race to Financial Freedom
          </h2>
          <p className="text-lg text-gray-600 font-medium">
            Start small, dream big, and watch your wealth grow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
