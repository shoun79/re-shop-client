import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import ProductCard from "../../components/Card/ProductCard";
import SideNavShop from "../../components/SideNavShop/SideNavShop";
import { getAllProducts } from "../../api/products";
import { useParams } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";

const Shop = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { category } = useParams();
    useTitle('Shop') //for page title

    useEffect(() => {
        getAllProducts(category)
            .then(data => {
                setProducts(data)
                setLoading(false)
            })

    }, [category]);

    return (
        <div className='md:flex justify-center gap-10  '>
            <div className="">
                <SideNavShop></SideNavShop>
            </div>
            <div className='flex-1'>
                <div >
                    {loading ? (
                        <Spinner />
                    ) : products.length < 1 ?
                        <>

                            <div className='h-screen text-gray-600 gap-5 flex flex-col items-center  text-xl lg:text-3xl mt-16'>
                                No product under this category.
                            </div>
                        </> :
                        <div className='container pb-8 pt-2 mx-auto mt-8 '>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                {
                                    products?.map((item, i) => <ProductCard key={i} item={item} ></ProductCard>)
                                }
                            </div>
                        </div>
                    }


                </div>

            </div>
        </div>
    );
};

export default Shop;