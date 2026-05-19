import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ServiceDashboard from './pages/ServiceDashboard';

// Subpages
import DomainsPage from './pages/DomainsPage';
import HostingPage from './pages/HostingPage';
import PricingPage from './pages/PricingPage';
import WhyUsPage from './pages/WhyUsPage';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified, check them
  if (allowedRoles && !allowedRoles.includes(user.type)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Subpages */}
            <Route path="/domains" element={<DomainsPage />} />
            <Route path="/hosting" element={<HostingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/why-us" element={<WhyUsPage />} />

            {/* Protected Dashboard Routes */}
            <Route 
              path="/dashboard/user" 
              element={
                <ProtectedRoute allowedRoles={['individual', 'business']}>
                  <UserDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/admin" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/service" 
              element={
                <ProtectedRoute allowedRoles={['service']}>
                  <ServiceDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
