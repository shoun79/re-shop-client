import { useTitle } from "../../../hooks/useTitle";
import AdvertisedItems from "../AdvertisedItems/AdvertisedItems";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import DiscoverProduct from "../DiscoverProduct/DiscoverProduct";
import Sponsor from "../Sponsor/Sponsor";

const Home = () => {
    useTitle('Home') //for page title
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <AdvertisedItems></AdvertisedItems>
            <DiscoverProduct></DiscoverProduct>
            <Sponsor></Sponsor>

        </div>
    );
};

export default Home;