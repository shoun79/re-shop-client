import { FingerPrintIcon, UserPlusIcon } from '@heroicons/react/24/solid'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
            <NavLink
                to='all-users'
                className={({ isActive }) =>
                    `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                    }`
                }
            >
                <FingerPrintIcon className='w-5 h-5' />

                <span className='mx-4 font-medium'>All Users</span>
            </NavLink>

            <NavLink
                to='all-bookings'
                className={({ isActive }) =>
                    `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                    }`
                }
            >
                <UserPlusIcon className='w-5 h-5' />

                <span className='mx-4 font-medium'>All Bookings</span>
            </NavLink>
            <NavLink
                to='reported-products'
                className={({ isActive }) =>
                    `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                    }`
                }
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                </svg>

                <span className='mx-4 font-medium'>Reported Products</span>
            </NavLink>
        </>
    )
}

export default AdminMenu
