import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Spinner from "../../../components/Spinner/Spinner";
import ProductCard from "../../../components/Card/ProductCard";
import { getAllProducts } from "../../../api/products";
import { Link } from "react-router-dom";
import PrimaryBtn from "../../../components/PrimaryBtn/PrimaryBtn";

const DiscoverProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllProducts('')
            .then(data => {
                setProducts(data)
                setLoading(false)
            })

    }, []);

    console.log(products);

    return (
        products.length ? <div className="mt-28">
            <div className="text-center">
                <SectionTitle title='Discover Our Features'></SectionTitle>
            </div>

            {loading ? (
                <Spinner />
            ) :
                <div className='container pb-8 pt-2 mx-auto'>
                    <div className='flex flex-wrap'>
                        {
                            products.slice(0, 6).map((item, i) => <ProductCard key={i} item={item} ></ProductCard>)
                        }
                    </div>
                    <div className="text-center mt-4">
                        <Link to='/shop/all'><PrimaryBtn>Sell All</PrimaryBtn></Link>
                    </div>
                </div>
            }
        </div> : ''
    );
};

export default DiscoverProduct;