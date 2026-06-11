import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import AppLayout from './components/layout/AppLayout';
import PrivateRoute from './components/PrivateRoute';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import PoseDetection from './pages/PoseDetection';
import Pressure from './pages/Pressure';
import Balance from './pages/Balance';
import Feedback from './pages/Feedback';
import Analytics from './pages/Analytics';
import Guided from './pages/Guided';
import Community from './pages/Community';
import Sensors from './pages/Sensors';
import Profile from './pages/Profile';
import SessionDetail from './pages/SessionDetail';
import Onboarding from './pages/Onboarding';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <Toaster position="top-right" toastOptions={{
        className: 'bg-bg-elevated text-text-primary border border-border',
        style: { background: '#141C2E', color: '#E8F0FE', borderColor: '#1E2D45' }
      }} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pose-detection" element={<PoseDetection />} />
            <Route path="/pressure" element={<Pressure />} />
            <Route path="/balance" element={<Balance />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/guided" element={<Guided />} />
            <Route path="/community" element={<Community />} />
            <Route path="/sensors" element={<Sensors />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/session/:id" element={<SessionDetail />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
