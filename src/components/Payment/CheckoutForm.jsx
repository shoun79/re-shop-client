import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPaymentIntent, saveBooking } from "../../api/bookings";
import PrimaryBtn from "../PrimaryBtn/PrimaryBtn";
import Swal from "sweetalert2";
import SmallSpinner from "../Spinner/SmallSpinner";
import { delWishListAfterBook, updateProduct } from "../../api/products";

const CheckoutForm = ({ bookingData, product }) => {
    const [clientSecret, setClientSecret] = useState('');
    const [cardError, setCardError] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const { price, name, email } = bookingData;
    console.log(product?._id);
    useEffect(() => {
        getPaymentIntent(parseFloat(price))
            .then(data => {
                console.log(data);
                setClientSecret(data.clientSecret)
            })

    }, [price]);

    console.log(transactionId);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });


        if (error) {
            setCardError(error?.message || '')
            console.log('[error]', error);

        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setCardError('')
        }
        setProcessing(true);

        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name || 'anonymous',
                        email: email || 'unknown'
                    },
                },
            },
        );

        if (intentError) {
            setCardError(intentError?.message)
            setProcessing(false)
        }
        else {
            setCardError('')
            setTransactionId(paymentIntent.id)
            console.log(paymentIntent);
            //store payment on database
            const data = {
                transactionId: paymentIntent.id,
                ...bookingData
            }
            saveBooking(data)
                .then(data => {
                    console.log(data);
                    const updatedData = {
                        advertised: "false",
                        status: "sold",
                        wishList: "false"
                    }
                    updateProduct(product?._id, updatedData)
                        .then(() => {

                            delWishListAfterBook(product?._id)
                            setProcessing(false)
                            Swal.fire({
                                position: "top",
                                icon: "success",
                                title: `Booking Successful.Your transaction id is ${paymentIntent.id}`
                            })
                            navigate('/dashboard/my-bookings')
                        })


                })
                .catch(err => console.log(err))
        }



    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    className="border p-4 rounded-md shadow-md"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {
                    cardError && <p className="text-red-500 mt-2">{cardError}</p>
                }
                <div className="mt-4">
                    <PrimaryBtn className=" bg-gradient-to-r from-emerald-500 to-lime-500 rounded-md px-4 py-1 text-white hover:text-gray-300" type="submit" disabled={!stripe || !clientSecret || processing}>
                        {processing ? <SmallSpinner></SmallSpinner> : 'Pay'}
                    </PrimaryBtn>
                </div>
            </form>
        </>
    );
};

export default CheckoutForm;