import { useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import ProductCard from "../../../components/Card/ProductCard";
import Spinner from "../../../components/Spinner/Spinner";

const AdvertisedItems = () => {

    const [loading, setLoading] = useState(false); //TODO:true korte hobe
    const homes = [1, 2, 3, 4, 5, 6];
    return (
        <div className="border-b mx-2">
            <div className="text-center">
                <SectionTitle title='Advertised items'></SectionTitle>
            </div>

            {loading ? (
                <Spinner />
            ) :
                <div className='container pb-8 pt-2 mx-auto'>
                    <div className='flex flex-wrap'>
                        {
                            homes.slice(0, 6).map((item, i) => <ProductCard key={i} item={item} ></ProductCard>)
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default AdvertisedItems;