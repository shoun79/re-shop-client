import Swal from "sweetalert2";
import { deleteAUser, getAllUsers, makeSellerVerify } from "../../api/user";
import { useEffect, useState } from "react";
import UsersTableRow from "../../components/TableRow/UsersTableRow";
import { useTitle } from "../../hooks/useTitle";

const AllUsers = () => {
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers()
    }, []);
    useTitle('All Users') //for page title

    const handleRequest = user => {
        makeSellerVerify(user)
            .then(data => {
                console.log(data)
                if (data.result.modifiedCount) {
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Now you are a verified seller",
                        showConfirmButton: false,
                        timer: 2500
                    })
                    getUsers()

                }
            })
    }

    const handleDelete = user => {

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
                deleteAUser(user._id)
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount) {
                            getUsers()
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }

    const getUsers = () => {
        setLoading(true)
        getAllUsers()
            .then(data => {
                console.log(data);
                setUsers(data)
                setLoading(false)
            })
    }
    return (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
            <h2 className="mb-4 text-2xl font-semibold leadi">All Users</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full text-xs">

                    <thead className="dark:bg-gray-700">
                        <tr className="text-left">
                            <th className="p-3">#</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Request/Status</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users?.map((user, i) =>
                                <UsersTableRow
                                    handleRequest={handleRequest}
                                    key={i}
                                    i={i}
                                    user={user}
                                    loading={loading}
                                    handleDelete={handleDelete}
                                ></UsersTableRow>
                            )
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;