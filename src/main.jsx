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
import Announcement from './pages/Dashboards/User Dashboard/Announcement.jsx';
import MyProfile from './pages/Dashboards/User Dashboard/MyProfile.jsx';
import AdminProfile from './pages/Dashboards/Admin Dashboard/AdminProfile.jsx';
import MakeAnnouncement from './pages/Dashboards/Admin Dashboard/MakeAnnouncement.jsx';
import ManageMembers from './pages/Dashboards/Admin Dashboard/ManageMembers.jsx';
import AgreementRequests from './pages/Dashboards/Admin Dashboard/AgreementRequests.jsx';
import ManageCoupons from './pages/Dashboards/Admin Dashboard/ManageCoupons.jsx';
import MakePayment from './pages/Dashboards/Member Dashboard/MakePayment.jsx';
import Payment from './pages/Dashboards/Member Dashboard/Payment.jsx';
import PaymentHistory from './pages/Dashboards/Member Dashboard/PaymentHistory.jsx';

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
      {
        path: 'makePayment',
        element: <MemberDashboard><MakePayment></MakePayment></MemberDashboard>
      },
      {
        path: 'makePayment/payment',
        element: <MemberDashboard><Payment></Payment></MemberDashboard>
      },
      {
        path: 'paymentHistory',
        element: <MemberDashboard><PaymentHistory></PaymentHistory></MemberDashboard>
      },
      // Admins
      {
        path: 'adminProfile',
        element: <AdminDashboard><AdminProfile></AdminProfile></AdminDashboard>
      },
      {
        path: 'manageMembers',
        element: <AdminDashboard><ManageMembers></ManageMembers></AdminDashboard>
      },
      {
        path: 'makeAnnouncement',
        element: <AdminDashboard><MakeAnnouncement></MakeAnnouncement></AdminDashboard>
      },
      {
        path: 'agreementRequests',
        element: <AdminDashboard><AgreementRequests></AgreementRequests></AdminDashboard>
      },
      {
        path: 'manageCoupons',
        element: <AdminDashboard><ManageCoupons></ManageCoupons></AdminDashboard>
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
