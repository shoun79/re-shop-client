import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getUserRole } from "../../api/user";
import Spinner from "../../components/Spinner/Spinner";
import { useTitle } from "../../hooks/useTitle";

const Welcome = () => {
    const { user } = useAuth();
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    useTitle('Dashboard') //for page title

    useEffect(() => {
        getUserRole(user?.email)
            .then(data => {

                setRole(data)
                setLoading(false);
            })
    }, [user?.email]);
    return (
        <>
            {
                loading ? <Spinner></Spinner> : <div className='h-screen text-gray-700 flex flex-col justify-center items-center pb-16'>
                    <div className='flex justify-center items-center'>
                        <p className='text-3xl md:text-6xl font-bold'>Welc</p>
                        <div className='w-9 h-9 border-8 border-dashed rounded-full animate-spin mt-4 border-[#D1793E]'></div>
                        <p className='text-3xl md:text-6xl font-bold mr-2'>me</p>
                        <p className='text-3xl md:text-6xl font-bold'>To</p>
                    </div >
                    <div className='flex justify-center text-gray-500 items-center mt-4'>
                        <p className='text-3xl font-medium'>{!loading && !role || role === undefined || role === '' ? 'User' : role === 'seller' ? 'Seller' : 'Admin'} Dashboard</p>
                    </div>
                </div >
            }
        </>
    );
};

export default Welcome;