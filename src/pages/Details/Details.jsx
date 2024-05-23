import ProductDetails from "../../components/Details/ProductDetails";
import { useTitle } from "../../hooks/useTitle";

const Details = () => {
    useTitle('Details') //for page title

    return (
        <div>
            <ProductDetails></ProductDetails>
        </div>
    );
};

export default Details;