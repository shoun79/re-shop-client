import { useEffect, useState } from "react";
import { getReportProducts } from "../../api/products";
import Spinner from "../../components/Spinner/Spinner";
import ReportRow from "../../components/TableRow/ReportRow";

const ReportedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchProducts = () => {

        getReportProducts()
            .then(data => {
                setProducts(data)
                setLoading(false)
            })

    }

    useEffect(() => {
        fetchProducts()

    }, []);

    return (
        <>

            {loading ? (
                <Spinner />
            ) :
                products.length < 1 ? <>
                    <div className='h-screen text-gray-600 gap-5 flex flex-col justify-center items-center pb-16 text-xl lg:text-3xl'>
                        No reported product here.

                    </div>
                </> :
                    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
                        <h2 className="mb-4 text-2xl font-semibold leadi">Reported Products</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-xs">

                                <thead className="dark:bg-gray-700">
                                    <tr className="text-left">
                                        <th className="p-3">#</th>
                                        <th className="p-3">Image</th>
                                        <th className="p-3">Name</th>
                                        <th className="p-3">Seller Name</th>
                                        <th className="p-3">Seller Email</th>

                                        <th className="p-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        products?.map((product, i) =>
                                            <ReportRow
                                                key={i}
                                                i={i}
                                                product={product}
                                                fetchProducts={fetchProducts}
                                            ></ReportRow>
                                        )
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>}
        </>
    );
};

export default ReportedProducts;