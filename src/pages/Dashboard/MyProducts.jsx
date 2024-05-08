import PrimaryBtn from "../../components/PrimaryBtn/PrimaryBtn";

import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getSellerProducts } from "../../api/products";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import TableRow from "../../components/TableRow/TableRow";

const MyProducts = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)
    const fetchProducts = () => {
        if (user?.email) {
            getSellerProducts(user?.email)
                .then(data => {
                    setProducts(data)
                    setLoading(false)
                })
        }
    }

    useEffect(() => {
        fetchProducts()

    }, [user?.email]);



    return (
        <>

            {loading ? (
                <Spinner />
            ) :
                products.length < 1 ? <>
                    <div className='h-screen text-gray-600 gap-5 flex flex-col justify-center items-center pb-16 text-xl lg:text-3xl'>
                        You have not post any product yet.
                        <Link to='/dashboard/add-product'>
                            <PrimaryBtn classes='px-6 py-2 text-medium font-semibold rounded-full'>
                                Add Product
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
                                        <th className="p-3">Name</th>
                                        <th className="p-3">price</th>
                                        <th className="p-3">Product category</th>
                                        <th className="p-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        products?.map((product, i) =>
                                            <TableRow
                                                key={i}
                                                i={i}
                                                product={product}
                                                fetchProducts={fetchProducts}
                                            ></TableRow>
                                        )
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>}
        </>
    );
};

export default MyProducts;