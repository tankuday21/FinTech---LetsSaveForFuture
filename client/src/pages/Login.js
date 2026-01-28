import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../services/supabase';
import { HiArrowLeft } from 'react-icons/hi2';
import FingoButton from '../components/FingoButton';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

    try {
      await signIn(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to login. Please check your credentials.');
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
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-2">
              Welcome back! 👋
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              Ready to continue your financial adventure?
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-2 border-red-100 text-red-700 px-4 py-3 rounded-2xl text-sm font-medium">
                {error}
              </div>
            )}

            <div className="space-y-5">
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
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-5 py-4 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded-lg cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 font-medium cursor-pointer">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-bold text-green-600 hover:text-green-500">
                  Forgot password?
                </Link>
              </div>
            </div>

            <FingoButton
              type="submit"
              disabled={loading}
              className="w-full text-lg"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </FingoButton>

            <div className="text-center mt-6">
              <p className="text-gray-600 font-medium">
                Don't have an account?{' '}
                <Link to="/signup" className="font-bold text-green-600 hover:text-green-500 hover:underline">
                  Sign up for free
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
        <div className="absolute top-20 right-20 w-32 h-32 bg-green-200 rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-green-200 rounded-full blur-3xl opacity-60 animate-pulse delay-1000"></div>

        <div className="max-w-xl text-center relative z-10">
          <img
            src="/assets/login_illustration.png"
            alt="Secure Login"
            className="w-full h-auto drop-shadow-2xl mb-8 transform hover:scale-105 transition-transform duration-500"
          />
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
            Your Vault is Waiting
          </h2>
          <p className="text-lg text-gray-600 font-medium">
            Secure, reliable, and always ready for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
