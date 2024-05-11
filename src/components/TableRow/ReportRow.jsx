import Swal from "sweetalert2";
import { deleteProduct } from "../../api/products";

const ReportRow = ({ product, i, fetchProducts }) => {
    const handleDelete = product => {
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
                deleteProduct(product._id)
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount) {
                            fetchProducts()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your product has been deleted.",
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
                <img className="w-20" src={product.imageUrl} alt="" />
            </td>
            <td className="p-3">
                <p>{product.name}</p>
            </td>
            <td className="p-3">
                <p>{product?.seller?.name}</p>
            </td>
            <td className="p-3 ">
                <p>{product?.seller?.email}</p>
            </td>


            <td className=" text-center">
                <span className=" font-semibold text-sm rounded-md ">

                    <button onClick={() => handleDelete(product)} className="bg-red-600 hover:bg-red-800 px-2 py-1 text-white md:ml-1 ">DEL</button>

                </span>

            </td>
        </tr>
    );
};

export default ReportRow;