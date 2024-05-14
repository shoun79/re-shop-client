import Swal from "sweetalert2";
import { deleteBooking } from "../../api/bookings";

const BookingRow = ({ booking, i, fetchBookings }) => {
    console.log(booking);
    const handleDelete = booking => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteBooking(booking._id)
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount) {
                            fetchBookings()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Booking has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }
    return (
        <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
            <td className="p-3">
                <p>{i + 1}</p>
            </td>
            <td className="p-3">
                <img className="w-20" src={booking?.imageUrl} alt="" />
            </td>
            <td className="p-3">
                <p>{booking?.productName}</p>
            </td>
            <td className="p-3 ">
                <p>{booking.number}</p>
            </td>
            <td className="p-3">
                <p>{booking?.price}</p>
            </td>
            <td className="p-3">
                <p>{booking?.transactionId}</p>
            </td>

            <td className="p-3 ">
                <p>{booking.seller?.name}</p>
            </td>


            <td className=" text-center">
                <span className=" font-semibold text-sm rounded-md ">

                    <button onClick={() => handleDelete(booking)} className="bg-red-600 hover:bg-red-800 px-2 py-1 text-white md:ml-1 ">DEL</button>

                </span>

            </td>
        </tr>
    );
};

export default BookingRow;