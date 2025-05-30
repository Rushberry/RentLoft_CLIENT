import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";

const rolePaths = {
  admin: ['/dashboard/admin', '/dashboard/admin/user-management', '/dashboard/admin/payment-collection', '/dashboard/admin/members'],
  member: ['/dashboard/member', '/dashboard/member/make-payment', '/dashboard/member/my-payments'],
  user: ['/dashboard/user', '/dashboard/user/profile', '/dashboard/user/announcement']
};

const DashboardAccessProvider = ({ children }) => {
  const { user, loader } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [loadingRole, setLoadingRole] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (user?.email) {
      setLoadingRole(true);
      axios.post(`${import.meta.env.VITE_serverApiLink}/checkRole`, { email: user.email })
        .then(res => setRole(res.data?.role))
        .catch(() => setRole(null))
        .finally(() => setLoadingRole(false));
    } else {
      setLoadingRole(false); // no user, so stop loading
    }
  }, [user]);

  if (loader || loadingRole) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <img
          src="/src/assets/favicon.png"
          alt="Loading..."
          className="w-36 h-36 border border-white rounded-3xl animate-ping"
        />
      </div>
    );
  }

  // If no user or no role after loading, redirect to login
  if (!user || !role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const allowedPaths = rolePaths[role] || [];
  const currentPath = location.pathname;

  const isAllowed = allowedPaths.some(p => currentPath === p || currentPath.startsWith(p + '/'));

  if (isAllowed) {
    return children;
  }

};

export default DashboardAccessProvider;
