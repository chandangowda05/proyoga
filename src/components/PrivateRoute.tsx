import { Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  // Authentication bypassed for demo mode
  return <Outlet />;
}
