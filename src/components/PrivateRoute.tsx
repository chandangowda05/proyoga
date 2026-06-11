import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute() {
  // Authentication bypassed for demo mode
  return <Outlet />;
}
