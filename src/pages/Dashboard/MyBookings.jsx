import { useEffect, useState } from "react";
import { getUserBookings } from "../../api/bookings";
import { useAuth } from "../../hooks/useAuth";
import Spinner from "../../components/Spinner/Spinner";
import BookingRow from "../../components/TableRow/BookingRow";
import { Link } from "react-router-dom";
import PrimaryBtn from "../../components/PrimaryBtn/PrimaryBtn";

const MyBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true)
    const fetchBookings = () => {
        if (user?.email) {
            getUserBookings(user?.email)
                .then(data => {
                    setBookings(data)
                    setLoading(false)
                })
        }

    }

    useEffect(() => {
        fetchBookings()

    }, [user?.email]);



    return (
        <>

            {loading ? (
                <Spinner />
            ) :
                bookings.length < 1 ? <>
                    <div className='h-screen text-gray-600 gap-5 flex flex-col justify-center items-center pb-16 text-xl lg:text-3xl'>
                        You have not booking any product yet.
                        <Link to='/shop/all'>
                            <PrimaryBtn classes='px-6 py-2 text-medium font-semibold rounded-full'>
                                Shop
                            </PrimaryBtn>
                        </Link>
                    </div>
                </> :
                    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
                        <h2 className="mb-4 text-2xl font-semibold leadi">MyProducts</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-xs">

                                <thead className="dark:bg-gray-700">
                                    <tr className="text-left">
                                        <th className="p-3">#</th>
                                        <th className="p-3">Image</th>
                                        <th className="p-3">Customer Name</th>
                                        <th className="p-3">Customer Number</th>
                                        <th className="p-3">Price</th>
                                        <th className="p-3">Transaction id</th>
                                        <th className="p-3">Seller Name</th>

                                        <th className="p-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        bookings?.map((booking, i) =>
                                            <BookingRow
                                                key={i}
                                                i={i}
                                                booking={booking}
                                                fetchBookings={fetchBookings}
                                            ></BookingRow>
                                        )
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>}
        </>
    );
};

export default MyBookings;