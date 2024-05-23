import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Spinner from "../../../components/Spinner/Spinner";
import ProductCard from "../../../components/Card/ProductCard";
import { getAllProducts } from "../../../api/products";
import { Link } from "react-router-dom";
import PrimaryBtn from "../../../components/PrimaryBtn/PrimaryBtn";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const DiscoverProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllProducts('')
            .then(data => {
                const discoverProduct = data.filter(item => item.status === "available");
                setProducts(discoverProduct)
                setLoading(false)
            })

    }, []);


    return (
        products.length ? <div data-aos="fade-up" data-aos-duration="3000" data-aos-anchor-placement="top-bottom" data-aos-delay="500" className="mt-28">
            <div className="text-center">
                <SectionTitle title='Discover Our Features'></SectionTitle>
            </div>

            {loading ? (
                <Spinner />
            ) :
                <div className='container pb-8 pt-2 mx-auto'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
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