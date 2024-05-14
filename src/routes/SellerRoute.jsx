import { Navigate } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import { useEffect, useState } from "react";
import { getUserRole } from "../api/user";
import { useAuth } from "../hooks/useAuth";

const SellerRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [role, setRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        setRoleLoading(true)

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

    if (user && user?.uid && role === 'seller') {
        return children;
    }
    return <Navigate to='/dashboard' state={{ from: location }} replace />
};

export default SellerRoute;