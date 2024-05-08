import axios from "axios";

//get all users
export const getAllUsers = async () => {
    const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/users`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('reShop-token')}`
        }
    });
    const data = await res.json();
    return data;
}

// get user role
export const getUserRole = async email => {
    if (email) {
        const url = `${import.meta.env.VITE_APP_API_URL}/user/${email}`;
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('reShop-token')}`
            }
        })
        const user = await res.json();
        return user?.role;
    }
}
// get Verify Status
export const getVerifyStatus = async email => {
    if (email) {
        const url = `${import.meta.env.VITE_APP_API_URL}/seller/${email}`;
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('reShop-token')}`
            }
        })
        const user = await res.json();
        return user?.verify;
    }
}


//user host request
export const verifyRequest = async sellerData => {
    const url = `${import.meta.env.VITE_APP_API_URL}/user/${sellerData?.email}`;
    const { data } = await axios.put(url, sellerData, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('reShop-token')}`
        }
    });

    return data;
}

//make seller verify
export const makeSellerVerify = async user => {
    delete user._id;
    const url = `${import.meta.env.VITE_APP_API_URL}/user/${user?.email}`;
    const res = await fetch(url, {
        method: 'PUT',
        headers: {

            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('reShop-token')}`
        },
        body: JSON.stringify({ ...user, verify: 'verified' })
    })
    const data = await res.json();
    return data;
}


//delete a user
export const deleteAUser = async id => {
    const url = `${import.meta.env.VITE_APP_API_URL}/user/${id}`;
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('reShop-token')}`
        }
    });
    const data = await res.json();
    return data;
}