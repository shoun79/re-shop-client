import { useEffect, useState } from "react";
import { getWishListProducts } from "../../api/products";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Spinner from "../../components/Spinner/Spinner";
import { Link } from "react-router-dom";
import PrimaryBtn from "../../components/PrimaryBtn/PrimaryBtn";
import { useAuth } from "../../hooks/useAuth";
import WishListCard from "../../components/Card/WishListCard";

const WishList = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true)
        getWishListProducts(user?.email)
            .then(data => {
                setProducts(data)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                console.log(err);
            })

    }, [user?.email]);

    return (
        <>
            {
                products?.length ? <div className="border-b mx-2 mt-6">
                    <div className="text-center">
                        <SectionTitle title='WishList items'></SectionTitle>
                    </div>

                    {loading ? (
                        <Spinner />
                    ) :
                        <div className='container pb-8 pt-2 mx-auto'>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                {
                                    products.map((item, i) => <WishListCard key={i} item={item} ></WishListCard>)
                                }
                            </div>
                        </div>
                    }
                </div> : <div className='h-screen text-gray-600 flex flex-col justify-center items-center pb-16 text-xl lg:text-3xl'>
                    <p className="mb-3">No product found in Wishlist</p>
                    <Link to='/shop/all'>
                        <PrimaryBtn classes='px-6 py-2 text-medium font-semibold rounded-full'>
                            Shop
                        </PrimaryBtn>
                    </Link>
                </div>
            }
        </>
    );
};

export default WishList;