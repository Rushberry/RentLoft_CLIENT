import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root';
import ErrorPage from './components/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthProvider from './providers/AuthProvider';
import Apartments from './pages/Apartments';
import Dashboard from './pages/dashboard';
import AccessProvider from './providers/AccessProvider.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import UserDashboard from './pages/Dashboards/UserDashboard.jsx';
import AdminDashboard from './pages/Dashboards/AdminDashboard.jsx';
import MemberDashboard from './pages/Dashboards/MemberDashboard.jsx';
import DashboardAccessProvider from './providers/DashboardAccessProvider.jsx';
import Announcement from './pages/Dashboards/User Dashboard/Announcement.jsx';
import MyProfile from './pages/Dashboards/User Dashboard/MyProfile.jsx';
import AdminProfile from './pages/Dashboards/Admin Dashboard/AdminProfile.jsx';
import MakeAnnouncement from './pages/Dashboards/Admin Dashboard/MakeAnnouncement.jsx';
import ManageMembers from './pages/Dashboards/Admin Dashboard/ManageMembers.jsx';
import AgreementRequests from './pages/Dashboards/Admin Dashboard/AgreementRequests.jsx';
import ManageCoupons from './pages/Dashboards/Admin Dashboard/ManageCoupons.jsx';

const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/home',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/apartments',
        element: <Apartments></Apartments>
      },
    ]
  },
  {
    path: '/dashboard',
    element: <AccessProvider><Dashboard></Dashboard></AccessProvider>,
    errorElement: <ErrorPage />,
    children: [
      // Users
      {
        path: 'announcements',
        element:  <Announcement></Announcement>
      },
      {
        path: 'myProfile',
        element: <MyProfile></MyProfile>
      },
      // Members
      // Admins
      {
        path: 'adminProfile',
        element: <AdminProfile></AdminProfile>
      },
      {
        path: 'manageMembers',
        element: <ManageMembers></ManageMembers>
      },
      {
        path: 'makeAnnouncement',
        element: <MakeAnnouncement></MakeAnnouncement>
      },
      {
        path: 'agreementRequests',
        element: <AgreementRequests></AgreementRequests>
      },
      {
        path: 'manageCoupons',
        element: <ManageCoupons></ManageCoupons>
      }
    ]
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
