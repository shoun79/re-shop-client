import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Outlet } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import Sidebar from "../components/Dashboard/Sidebar";
import { getUserRole } from "../api/user";

const DashboardLayout = () => {
    const { user } = useAuth();
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserRole(user?.email)
            .then(data => {
                console.log(data);
                setRole(data)
                setLoading(false);
            })
    }, [user?.email]);


    return (
        <div className="md:flex relative min-h-screen">
            {
                loading ? <Spinner></Spinner> :
                    <>
                        <Sidebar role={role}></Sidebar>

                        <div className="flex-1 md:ml-64">
                            <div className="p-4">
                                <Outlet></Outlet>
                            </div>
                        </div>
                    </>

            }
        </div>
    );
};

export default DashboardLayout;