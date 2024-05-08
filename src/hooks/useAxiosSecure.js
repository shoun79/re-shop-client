import axios from "axios";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {


        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    // Logout user
                    await logOut()
                        .then(() => {
                            // Redirect to login page
                            navigate('/login');
                        })
                        .catch(err => {
                            console.log(err.message);
                        })


                }
                return Promise.reject(error);
            }
        );

        // Cleanup interceptors on unmount
        return () => {
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [logOut, navigate]);


    return axiosSecure
};

export default useAxiosSecure;