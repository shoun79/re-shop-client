import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import PrimaryBtn from "../PrimaryBtn/PrimaryBtn";
import { ArrowRightOnRectangleIcon, Bars3Icon } from '@heroicons/react/24/solid'
import AdminMenu from "./AdminMenu";
import SellerMenu from "./SellerMenu";
import UserMenu from "./UserMenu";
import Swal from "sweetalert2";
const Sidebar = ({ role }) => {
    const { user, logout } = useAuth();
    const [isActive, setActive] = useState('false');
    const navigate = useNavigate();

    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive)
    }

    const hendleLogout = () => {
        logout()
            .then(() => {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Logout Successfully",
                    showConfirmButton: false,
                    timer: 2500
                })
                navigate('/login')
            })
    }
    return (
        <>
            {/* Small Screen Navbar */}
            <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold '>
                        <Link to='/'>Re Shop</Link>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-700'
                >
                    <Bars3Icon className='h-5 w-5' />
                </button>
            </div>
            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    {/* Branding & Profile Info */}
                    <span onClick={() => setActive(true)} className=" md:hidden absolute right-5 top-2 text-xl">X</span>
                    <div>

                        <h2 className='text-3xl cursor-pointer font-semibold text-center text-gray-800 '>
                            <Link to='/'> Re Shop</Link>
                        </h2>
                        <div className='flex flex-col items-center mt-6 -mx-2'>
                            <Link to='/dashboard'>
                                {user?.photoURL ?
                                    <img
                                        className='object-cover w-24 h-24 mx-2 rounded-full'
                                        src={user?.photoURL}
                                        alt='avatar'
                                        referrerPolicy='no-referrer'
                                    /> : <svg width="30" fill="currentColor" height="30" className="text-gray-800 cursor-pointer ml-3" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z">
                                        </path>
                                    </svg>
                                }
                            </Link>
                            <Link to='/dashboard'>
                                <h4 className='mx-2 mt-2 font-medium text-gray-800  hover:underline'>
                                    {user?.displayName}
                                </h4>
                            </Link>
                            <Link to='/dashboard'>
                                <p className='mx-2 mt-1 text-sm font-medium text-gray-600  hover:underline'>
                                    {user?.email}
                                </p>
                            </Link>
                        </div>
                    </div>

                    {/* Nav Items */}
                    <div className='flex flex-col justify-between flex-1 mt-6'>
                        <nav>
                            {!role || role === undefined || role === '' ? (<UserMenu />) : (
                                <>{role === 'admin' ? <AdminMenu /> : <SellerMenu />} </>
                            )}
                        </nav>
                    </div>
                </div>

                <div>
                    <hr />
                    <div onClick={hendleLogout} className="group relative mx-auto flex  cursor-pointer justify-center">
                        <PrimaryBtn
                            handler={logout}
                            classes='flex block w-full rounded-full items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform'
                        >
                            <ArrowRightOnRectangleIcon className='w-5 h-5' />
                        </PrimaryBtn>
                        {/* Hover Text */}
                        <div className="absolute -top-12 cursor-pointer whitespace-nowrap opacity-0 duration-500 hover:hidden group-hover:-top-16 group-hover:opacity-100  ">
                            <p className="h-fit shadow-[0px_0px_10px_0px_#0EA5E9] rounded-md bg-[#0EA5E9] px-3 py-2 text-white"> Logout</p>
                            <span className="absolute shadow-[0px_0px_10px_0px_#0EA5E9] -bottom-2 left-[50%] h-0 w-0 -translate-x-1/2 rotate-[135deg] border-b-[20px] border-r-[20px] border-b-transparent border-r-[#0EA5E9]"></span>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;