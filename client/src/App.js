import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Learn from './pages/Learn';
import ModuleContent from './pages/ModuleContent';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Calculators from './pages/Calculators';
import { AuthProvider, useAuth } from './context/AuthContext';
import { testSupabaseConnection } from './utils/testSupabase';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" />;
};

function AnimatedRoutes() {
  const location = useLocation();
  
  useEffect(() => {
    // Test Supabase connection on app load
    testSupabaseConnection();
  }, []);
  
  return (
    <div className="transition-wrapper">
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={300}
          classNames="page"
        >
          <Routes location={location}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/learn" 
              element={
                <PrivateRoute>
                  <Learn />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/learn/module/:moduleId" 
              element={
                <PrivateRoute>
                  <ModuleContent />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/leaderboard" 
              element={
                <PrivateRoute>
                  <Leaderboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/calculators" 
              element={
                <PrivateRoute>
                  <Calculators />
                </PrivateRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AnimatedRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
