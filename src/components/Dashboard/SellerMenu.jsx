import { FingerPrintIcon, UserPlusIcon } from '@heroicons/react/24/solid'
import { NavLink } from 'react-router-dom'
const SellerMenu = () => {
    return (
        <>
            <NavLink
                to='my-products'
                className={({ isActive }) =>
                    `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                    }`
                }
            >
                <FingerPrintIcon className='w-5 h-5' />

                <span className='mx-4 font-medium'>My Products</span>
            </NavLink>

            <NavLink
                to='add-product'
                className={({ isActive }) =>
                    `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                    }`
                }
            >

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

                <span className='mx-4 font-medium'>Add A product</span>
            </NavLink>
            <NavLink
                to='apply-verify'
                className={({ isActive }) =>
                    `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                    }`
                }
            >
                <UserPlusIcon className='w-5 h-5' />

                <span className='mx-4 font-medium'>Apply for verify</span>
            </NavLink>
        </>
    );
};

export default SellerMenu;