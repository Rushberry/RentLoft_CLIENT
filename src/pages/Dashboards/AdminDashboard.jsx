import { useContext, useEffect, useRef, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../providers/AuthProvider";

const AdminDashboard = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const [role, setRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);
    const toastShownRef = useRef(false);

    useEffect(() => {
        const fetchRole = async () => {
            if (user?.email) {
                try {
                    const { data } = await axios.post(
                        `${import.meta.env.VITE_serverApiLink}/checkRole`,
                        { email: user.email }
                    );
                    const userRole = data?.role?.charAt(0).toUpperCase() + data?.role?.slice(1);
                    setRole(userRole);

                    if (!toastShownRef.current) {
                        toast.success(`Welcome ${userRole}`, {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: false,
                            theme: "light",
                        });
                        toastShownRef.current = true;
                    }
                } catch (err) {
                    console.error("Failed to fetch user role:", err);
                } finally {
                    setRoleLoading(false);
                }
            }
        };

        fetchRole();
    }, [user]);

    if (loading || roleLoading) {
        return <>
            <div className="fixed inset-0 bg-black  flex items-center justify-center z-50">
                <img
                    src="/assets/favicon.png" 
                    alt="Loading..."
                    className="w-36 h-36 border border-white rounded-3xl animate-ping"
                />
            </div>
        </>
    }

    if (user && role === "Admin") {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminDashboard;
