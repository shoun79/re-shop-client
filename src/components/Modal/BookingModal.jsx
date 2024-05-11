import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Payment/CheckoutForm";

const BookingModal = ({ openModal, setOpenModal, product }) => {
    const { user } = useAuth();

    const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PK);


    const [bookingData, setBookingData] = useState({
        productName: product?.name,
        price: product?.price,
        location: product?.location,
        imageUrl: product?.imageUrl,
        name: user?.displayName,
        email: user?.email,
        seller: {
            name: product?.seller?.name,
            email: product?.seller?.email,
        }


    });



    return (
        <div className="w-72 mx-auto flex items-center justify-center">


            <div className={`fixed flex justify-center items-center z-[100] ${openModal ? 'visible opacity-1' : 'invisible opacity-0'} duration-300 inset-0 w-full h-full`}>
                <div onClick={(e_) => e_.stopPropagation()} className={`absolute overflow-x-hidden overflow-y-scroll w-full h-full flex justify-center bg-white drop-shadow-2xl rounded-lg ${openModal ? 'translate-y-0 opacity-1 duration-300' : 'translate-y-32 opacity-0 duration-100'}`}>
                    <main className="px-4 sm:px-6 lg:px-8 py-8">
                        <button onClick={() => { setOpenModal(false) }} className="mr-0 mx-auto flex bg-slate-950 text-white px-3 py-2 rounded-lg mb-6">Close</button>


                        <div className="px-6  ">
                            <div className="">
                                <p className="font-semibold text-2xl">Booking information</p>

                            </div>
                            <form

                                noValidate="" action="" className="container flex flex-col mx-auto space-y-12">

                                <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm ">
                                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                        <div className="col-span-full sm:col-span-3">
                                            <label htmlFor="productName" className="text-sm">Product name</label>
                                            <input defaultValue={product?.name} id="productName" type="text" placeholder="Product name" name="name" className="w-full rounded-md focus:ring focus:ri focus:ri border border-gray-500 text-gray-900 pl-1" required disabled />
                                        </div>
                                        <div className="col-span-full sm:col-span-2">
                                            <label htmlFor="price" className="text-sm">Price</label>
                                            <input defaultValue={product?.price} id="price" type="number" name="price" placeholder="Price" className="w-full rounded-md focus:ring focus:ri focus:ri border border-gray-500 text-gray-900 pl-1" disabled />
                                        </div>
                                        <div className="col-span-full sm:col-span-3">
                                            <label htmlFor="displayName" className="text-sm">Your Name</label>
                                            <input defaultValue={user?.displayName} id="purchase" type="text" placeholder="Your Name" name="displayName" className="w-full rounded-md focus:ring focus:ri focus:ri border border-gray-500 text-gray-900 pl-1" required disabled />
                                        </div>
                                        <div className="col-span-full sm:col-span-3">
                                            <label htmlFor="email" className="text-sm">Your Email</label>
                                            <input defaultValue={user?.email} id="email" type="email" name="email" placeholder="Your Email" className="w-full pl-1 rounded-md focus:ring focus:ri focus:ri border border-gray-500 text-gray-900" required disabled />
                                        </div>
                                        <div className="col-span-full sm:col-span-3">
                                            <label htmlFor="location" className="text-sm">Meeting Location</label>
                                            <input
                                                onChange={e => setBookingData({ ...bookingData, location: e.target.value })}
                                                defaultValue={product?.location}
                                                id="location" type="text" name="location" placeholder="Location" className="w-full pl-1 rounded-md focus:ring focus:ri focus:ri border border-gray-500 text-gray-900" required />
                                        </div>
                                        <div className="col-span-full sm:col-span-3">
                                            <label htmlFor="number" className="text-sm">Mobile number</label>
                                            <input
                                                onChange={e => setBookingData({ ...bookingData, number: e.target.value })}
                                                id="number" type="number" name="number" placeholder="Mobile number" className="pl-1 w-full rounded-md focus:ring focus:ri focus:ri border border-gray-500 text-gray-900"
                                                maxLength={11}
                                                required />
                                        </div>
                                    </div>

                                </fieldset>
                            </form>
                            <Elements stripe={stripePromise} >
                                <CheckoutForm bookingData={bookingData} product={product} />
                            </Elements>
                        </div>

                    </main>

                </div>
            </div>
        </div>
    );
};

export default BookingModal;