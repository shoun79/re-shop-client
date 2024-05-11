
//save bookings
export const saveBooking = async (bookingData) => {
    const url = `${import.meta.env.VITE_APP_API_URL}/bookings`;
    const res = await fetch(url, {
        method: 'POST',
        headers: {

            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('reShop-token')}`,

        },
        body: JSON.stringify(bookingData)
    })
    const data = await res.json();
    return data;
}

//get all bookings for admin
export const getAllBookings = async () => {
    const url = `${import.meta.env.VITE_APP_API_URL}/bookings`;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('reShop-token')}`,
        }
    })
    const data = await res.json();
    return data;
}

//get user bookings 
export const getUserBookings = async email => {
    const url = `${import.meta.env.VITE_APP_API_URL}/bookings?email=${email}`;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('reShop-token')}`
        }
    })
    const data = await res.json();
    return data;
}

//delete user bookings 
export const deleteBooking = async id => {
    const url = `${import.meta.env.VITE_APP_API_URL}/bookings/${id}`;
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('reShop-token')}`
        }
    })
    const data = await res.json();
    return data;
}

//get payment intent
export const getPaymentIntent = async price => {
    const url = `${import.meta.env.VITE_APP_API_URL}/create-payment-intent`;

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('reShop-token')}`
        },
        body: JSON.stringify({ price })
    })
    const data = await res.json();
    return data;
}