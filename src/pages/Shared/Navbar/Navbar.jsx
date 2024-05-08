import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
    const { user, logout } = useAuth();
    const [dropDownState, setDropDownState] = useState(false);
    const [dropDownMenu, setDropDownMenu] = useState(false);

    const dropDownMenuRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const closeDropDown = (e) => {
            if (!dropDownMenuRef?.current?.contains(e?.target)) {
                setDropDownState(false);
            }
        };

        document.addEventListener('mousedown', closeDropDown);

        return () => {
            document.removeEventListener('mousedown', closeDropDown);
        };
    }, []);

    const navMenu = <>
        <NavLink to='/' className={({ isActive }) =>
            ` ${isActive ? ' text-black font-bold' : ''
            }`
        }>
            <li className="group flex  cursor-pointer flex-col">
                Home<span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-black transition-all duration-300 group-hover:w-full"></span>
            </li>
        </NavLink>
        <NavLink to='/shop/all' className={({ isActive }) =>
            ` ${isActive ? ' text-black font-bold' : ''
            }`
        }>
            <li className="group flex  cursor-pointer flex-col">
                Shop<span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-black transition-all duration-300 group-hover:w-full"></span>
            </li>
        </NavLink>

        <NavLink to='/blog' className={({ isActive }) =>
            ` ${isActive ? ' text-black font-bold' : ''
            }`
        }>
            <li className="group flex  cursor-pointer flex-col">
                Blog<span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-black transition-all duration-300 group-hover:w-full"></span>
            </li>
        </NavLink>
        {
            !user && <NavLink to='/login' className={({ isActive }) =>
                ` ${isActive ? ' text-black font-bold' : ''
                }`
            }>
                <li className="group flex  cursor-pointer flex-col">
                    Login<span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-black transition-all duration-300 group-hover:w-full"></span>
                </li>
            </NavLink>
        }



    </>

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
        <nav className="flex items-center justify-between bg-[#D1793E] px-4 py-2 text-white">
            <div className="scale-100 cursor-pointer rounded-2xl px-3 py-2 text-xl font-semibold text-white transition-all duration-200 hover:scale-110">
                <Link to='/'><h2>Re Shop</h2></Link>
            </div>
            <div className="flex ">
                <ul className="hidden items-center justify-between gap-10 md:flex">
                    {navMenu}
                </ul>

                {
                    user && <div className="ml-3 flex-end" onClick={() => setDropDownMenu(!dropDownMenu)}>
                        <div className="pointer group relative">
                            {user?.photoURL ?
                                <img className="size-[40px] bg-slate-500 object-cover rounded-lg hover:blur-[2px] duration-500 ml-3 mr-4 cursor-pointer" src={user?.photoURL} alt="user avatar" /> : <svg fill="currentColor" className="text-gray-800 cursor-pointer ml-3  mr-5 size-[35px] " viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z">
                                    </path>
                                </svg>
                            }
                            {/* Hover Text */}
                            <div className="absolute -bottom-6 cursor-pointer whitespace-nowrap opacity-0 duration-500 hover:hidden group-hover:-bottom-10 group-hover:opacity-100  ">
                                <p className="rounded-md bg-[#0EA5E9] px-3 py-2 text-white shadow-[0px_0px_10px_0px_#0EA5E9]">{user?.displayName?.length > 6 ? user?.displayName?.slice(0, 5) + '..' : user?.displayName}</p>
                                <span className="absolute -top-2 left-[50%] h-0 w-0 -translate-x-1/2 -rotate-[45deg] border-b-[20px] border-r-[20px] border-b-transparent border-r-[#0EA5E9] shadow-[0px_0px_10px_0px_#0EA5E9]"></span>
                            </div>
                            {/* Hover button */}
                        </div>




                        {dropDownMenu && (
                            <ul className="absolute top-14 z-10 space-y-2 rounded-lg bg-gray-700 p-[6px] text-gray-100 ">
                                <li className="text-md hover:underline ">
                                    <Link to='/dashboard'>Dashboard</Link>
                                </li>
                                <li className="text-md hover:underline ">
                                    <Link to='/profile-update'>Profile</Link>
                                </li>
                                <li onClick={hendleLogout} className="text-md hover:underline ">
                                    <Link >Logout</Link>
                                </li>

                            </ul>
                        )}
                    </div>
                }

            </div>
            <div ref={dropDownMenuRef} onClick={() => setDropDownState(!dropDownState)} className="relative flex transition-transform md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer" > <line x1="4" x2="20" y1="12" y2="12" /> <line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /> </svg>
                {dropDownState && (
                    <ul className=" z-10  gap-2  bg-[#D1793E]  absolute right-0 top-11 flex w-[200px] flex-col  rounded-lg   text-base p-4">
                        {navMenu}
                    </ul>
                )}
            </div>

        </nav>
    );
};

export default Navbar;