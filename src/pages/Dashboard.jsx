import React, { useContext, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import SideBar from './Dashboards/SideBar';

const Dashboard = () => {
  const { user, loader } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only redirect if user is at base /dashboard
    if (loader || !user?.email || location.pathname !== '/dashboard') return;

    const data = { email: user.email };

    axios.post(`${import.meta.env.VITE_serverApiLink}/checkRole`, data)
      .then(res => {
        const role = res.data?.role;
        const redirectMap = {
          admin: '/dashboard/adminProfile',
          member: '/dashboard/myProfile',
          user: '/dashboard/myProfile',
        };
        if (redirectMap[role]) {
          navigate(redirectMap[role]);
        }
      })
      .catch(err => {
        console.error("Error checking role:", err);
      });
  }, [user, loader, navigate, location.pathname]);

  if (loader) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <img
          src="/assets/favicon.png"
          alt="Loading..."
          className="w-36 h-36 border border-white rounded-3xl animate-ping"
        />
      </div>
    );
  }

  return (
    <div className='flex w-full h-screen justify-between'>
        <SideBar></SideBar>
      <Outlet/>
    </div>
  );
};

export default Dashboard;
