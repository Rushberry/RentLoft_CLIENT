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
  useQuery,
} from '@tanstack/react-query'

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
      {
        path: '/dashboard',
        element: <AccessProvider><Dashboard></Dashboard></AccessProvider>
      }
    ]
  },
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
