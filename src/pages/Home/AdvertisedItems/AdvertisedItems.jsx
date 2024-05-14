import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import ProductCard from "../../../components/Card/ProductCard";
import Spinner from "../../../components/Spinner/Spinner";
import { getAdvertisedProducts } from "../../../api/products";

const AdvertisedItems = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAdvertisedProducts()
            .then(data => {
                setProducts(data)
                setLoading(false)
            })

    }, []);


    return (
        <>
            {
                products?.length ? <div className="border-b mx-2">
                    <div className="text-center">
                        <SectionTitle title='Advertised items'></SectionTitle>
                    </div>

                    {loading ? (
                        <Spinner />
                    ) :
                        <div className='container pb-8 pt-2 mx-auto'>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                {
                                    products.map((item, i) => <ProductCard key={i} item={item} ></ProductCard>)
                                }
                            </div>
                        </div>
                    }
                </div> : ''
            }
        </>

    );
};

export default AdvertisedItems;