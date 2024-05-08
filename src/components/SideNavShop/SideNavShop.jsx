
// import { FingerPrintIcon, UserPlusIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'

const SideNavShop = () => {
    const [categorys, setCategorys] = useState([]);



    useEffect(() => {
        fetch('/categorys.json')
            .then(res => res.json())
            .then(data => {
                setCategorys(data)
            })
    }, []);



    console.log(categorys);

    return (
        <div >
            <div>
                <div>

                    <h2 className='text-xl cursor-pointer font-bold text-center text-gray-800 mt-10'>
                        {/* <Link to='/'> Re Shop</Link> */}Product categories
                    </h2>

                </div>

                {/* Nav Items */}
                <div className='flex flex-col justify-between flex-1 mt-6 '>
                    <nav>
                        <>
                            {
                                categorys?.map((category, i) => <NavLink
                                    key={i}
                                    to={`/shop/${category?.categoryName.toLowerCase()}`}
                                    // onClick={() => setCategory(category?.categoryName)}
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 mt-2  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                                        }`
                                    }
                                >


                                    <span className='mx-4 font-medium'>{category?.categoryName}</span>
                                </NavLink>)
                            }
                            {/* <NavLink
                                to='my-bookings'
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                                    }`
                                }
                            >


                                <span className='mx-4 font-medium'>My Orders</span>
                            </NavLink>

                            <NavLink
                                to='become-host'
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2   transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                                    }`
                                }
                            >
                                <UserPlusIcon className='w-5 h-5' />

                                <span className='mx-4 font-medium'>Become A Host</span>
                            </NavLink> */}
                        </>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default SideNavShop;