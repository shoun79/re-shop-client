import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { getUserRole } from "../api/user";
import Spinner from "../components/Spinner/Spinner";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [role, setRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        getUserRole(user?.email)
            .then(data => {
                setRole(data)
                setRoleLoading(false)
            })
    }, [user?.email])

    if (loading || roleLoading) {
        return (
            <div className='h-screen'>
                <Spinner />
            </div>
        )
    }

    if (user && user?.uid && role === 'admin') {
        return children;
    }
    return <Navigate to='/dashboard' state={{ from: location }} replace />
};

export default AdminRoute;