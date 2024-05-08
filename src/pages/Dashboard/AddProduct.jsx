import { useState } from "react";
import PrimaryBtn from "../../components/PrimaryBtn/PrimaryBtn";
import { getImageUrl } from "../../api/getImageUrl";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { addProduct } from "../../api/products";
import Swal from "sweetalert2";
import SmallSpinner from "../../components/Spinner/SmallSpinner";

const AddProduct = () => {
    const { user } = useAuth();
    const [condition, setCondition] = useState('excellent');
    const [productCategory, setProductCategory] = useState('bajaj');
    const [showName, setShowName] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [previewImg, setPreviewImg] = useState('');


    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const purchase = form.purchase.value;
        const location = form.location.value;
        const number = form.number.value;
        const price = form.price.value;
        const originalPrice = form.originalPrice.value;
        const cc = form.cc.value;
        const image = form.image.files[0];
        const details = form.details.value;
        const timestamp = new Date();
        console.log(condition);
        setIsLoading(true)
        getImageUrl(image)
            .then(imageUrl => {
                const productData = {
                    name,
                    purchase,
                    location,
                    number,
                    price,
                    originalPrice,
                    cc,
                    imageUrl,
                    condition,
                    productCategory,
                    details,
                    timestamp,
                    seller: {
                        name: user?.displayName,
                        image: user?.photoURL,
                        email: user?.email,
                    }

                }
                addProduct(productData)
                    .then(data => {
                        if (data.insertedId) {
                            console.log(data);
                            setIsLoading(false)
                            Swal.fire({
                                position: "top",
                                icon: "success",
                                title: "Product Added",
                                showConfirmButton: false,
                                timer: 2500
                            })
                            navigate('/dashboard/my-products')
                        }

                    })
            })
            .catch(err => {
                setIsLoading(false)
                console.log(err)
            })
    }

    const handleImageChange = image => {
        setPreviewImg(window.URL.createObjectURL(image))

        setShowName(image)
    }
    return (
        <section className="px-6  ">
            <div className="">
                <p className="font-semibold text-2xl">Add a Product</p>

            </div>
            <form onSubmit={handleSubmit} noValidate="" action="" className="container flex flex-col mx-auto space-y-12">

                <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm ">
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="productName" className="text-sm">Product name</label>
                            <input id="productName" type="text" placeholder="Product name" name="name" className="w-full rounded-md focus:ring focus:ri focus:ri border border-gray-500 text-gray-900 pl-1" required />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="purchase" className="text-sm">Year of purchase</label>
                            <input id="purchase" type="number" placeholder="Year of purchase" name="purchase" className="w-full rounded-md focus:ring focus:ri focus:ri border border-gray-500 text-gray-900 pl-1" required />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="location" className="text-sm">Location</label>
                            <input id="location" type="text" name="location" placeholder="Location" className="w-full pl-1 rounded-md focus:ring focus:ri focus:ri border border-gray-500 text-gray-900" required />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="number" className="text-sm">Mobile number</label>
                            <input id="number" type="number" name="number" placeholder="Mobile number" className="pl-1 w-full rounded-md focus:ring focus:ri focus:ri border border-gray-500 text-gray-900" required />
                        </div>
                        <div className="col-span-full sm:col-span-2">
                            <label htmlFor="price" className="text-sm">Price</label>
                            <input id="price" type="number" name="price" placeholder="Price" className="w-full rounded-md focus:ring focus:ri focus:ri border border-gray-500 text-gray-900 pl-1" />
                        </div>
                        <div className="col-span-full sm:col-span-2">
                            <label htmlFor="state" className="text-sm">Original Price</label>
                            <input id="state" type="number" name="originalPrice" placeholder="Original Price" className="w-full rounded-md focus:ring focus:ri focus:ri border border-gray-500 text-gray-900 pl-1" />
                        </div>
                        <div className="col-span-full sm:col-span-2">
                            <label htmlFor="cc" className="text-sm">CC</label>
                            <input id="cc" type="number" placeholder="CC" className="w-full rounded-md focus:ring focus:ri focus:ri border border-gray-500 text-gray-900 pl-1" />
                        </div>

                        <div className="col-span-full sm:col-span-2">
                            <label htmlFor='image' className='block mb-2 text-sm'>
                                Select Image:
                            </label>

                            <div className="my-5 flex justify-center">
                                <label className="flex h-full w-max items-end gap-4 rounded-md border bg-gray-500 px-4 py-2 text-white active:ring-4 active:ring-cyan-200" htmlFor="file">
                                    <svg width={30} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><g id="Complete"><g id="upload"><g><path d="M3,12.3v7a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2v-7" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><g><polyline data-name="Right" fill="none" id="Right-2" points="7.9 6.7 12 2.7 16.1 6.7" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline><line fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="16.3" y2="4.8"></line></g></g></g></g></g>
                                    </svg>
                                    <p className="text-lg font-medium"> {showName.name ? showName.name.length > 6 ? showName.name.slice(0, 6) + '...' : showName.name : 'Upload'}</p>
                                </label>
                                <input
                                    onChange={e => handleImageChange(e.target.files[0])}
                                    className="hidden" id="file" type="file" name='image' required />
                                {previewImg && <img src={previewImg} alt='preview image' className='w-20 h-16' />}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">

                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="Condition" className="text-sm">Condition</label>
                            <select required
                                onChange={(e) => setCondition(e.target.value)}

                                className="select select-bordered w-full max-w-xs border border-gray-500 text-gray-900">
                                <option disabled>Select Condition</option>
                                <option value="excellent">Excellent</option>
                                <option name="condition" value="good">Good</option>
                                <option value='fair'>Fair</option>
                            </select>
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="Condition" className="text-sm">Product category</label>
                            <select required onChange={(e) => setProductCategory(e.target.value)} className="select select-bordered w-full max-w-xs border border-gray-500 text-gray-900">
                                <option disabled>Select a category</option>
                                <option value="bajaj">Bajaj</option>
                                <option value="tvs">Tvs</option>
                                <option value='yahama'>Yahama</option>
                                <option value='honda'>Honda</option>
                            </select>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="details" className="text-sm">Details</label>
                            <textarea id="details" placeholder="Details" name="details" className="w-full rounded-md focus:ring focus:ri focus:ri border border-gray-500 text-gray-900 pl-1"></textarea>
                        </div>


                    </div>
                </fieldset>
                <div>
                    <PrimaryBtn>{isLoading ? <SmallSpinner /> : ' Add a product'}  </PrimaryBtn>
                </div>
            </form>
        </section>
    );
};

export default AddProduct;