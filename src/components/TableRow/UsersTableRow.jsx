
import SmallSpinner from '../Spinner/SmallSpinner';

const UsersTableRow = ({ user, i, handleRequest, loading, handleDelete }) => {
    return (
        <tr>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p>{i + 1}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    {user.email}
                </p>
            </td>

            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    {user?.role ? user.role : 'User'}
                </p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                {user?.verify && user.verify === 'requested' ? (
                    <span
                        onClick={() => handleRequest(user)}
                        className='relative cursor-pointer inline-block px-3 py-1 font-semibold  leading-tight text-white'
                    >
                        <span
                            aria-hidden='true'
                            className='absolute inset-0 text-white bg-[#D1793E] hover:bg-[#dc600e] rounded-full'
                        ></span>
                        <span className='relative'>
                            {loading ? <SmallSpinner /> : ' Approve Request'}
                        </span>
                    </span>) : <>{user?.verify && user.verify === 'verified' ?
                        (<span className=' rounded-full px-3 py-1 font-semibold  leading-tight bg-blue-600 text-white'>
                            {loading ? <SmallSpinner /> : 'Verified'}
                        </span>) : ''

                    }</>

                }
            </td>
            <td className=" text-center">
                <span className=" font-semibold text-sm rounded-md ">

                    <button onClick={() => handleDelete(user)} className="bg-red-600 hover:bg-red-800 px-2 py-1 text-white md:ml-1 ">DEL</button>

                </span>

            </td>
        </tr>
    );
};

export default UsersTableRow;