

//add a product
export const addProduct = async (productData) => {
    const url = `${import.meta.env.VITE_APP_API_URL}/products`;
    const res = await fetch(url, {
        method: 'POST',
        headers: {

            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('reShop-token')}`
        },
        body: JSON.stringify(productData)
    })
    const data = await res.json();
    return data;
}


//get all products

export const getAllProducts = async (category) => {
    const url = `${import.meta.env.VITE_APP_API_URL}/products/?category=${category}`;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('reShop-token')}`
        }
    });
    const data = await res.json();
    return data;
}
//get all products

export const getAdvertisedProducts = async () => {
    const url = `${import.meta.env.VITE_APP_API_URL}/products-advertised`;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('reShop-token')}`
        }
    });
    const data = await res.json();
    return data;
}

export const getWishListProducts = async (email) => {
    const url = `${import.meta.env.VITE_APP_API_URL}/wishlist/${email}`;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('reShop-token')}`
        }
    });
    const data = await res.json();
    return data;
}
export const getWishListStatus = async (_id, email) => {
    const url = `${import.meta.env.VITE_APP_API_URL}/wishlist-status?email=${email}&id=${_id}`;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('reShop-token')}`
        }
    });
    const data = await res.json();
    return data;
}



export const addToWishList = async (wishListData) => {
    const url = `${import.meta.env.VITE_APP_API_URL}/wishlist-add`;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('reShop-token')}`
        },
        body: JSON.stringify(wishListData)
    });
    const data = await res.json();
    return data;
}
export const deleteWishList = async (id) => {
    const url = `${import.meta.env.VITE_APP_API_URL}/wishlist/${id}`;
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('reShop-token')}`
        },
    });
    const data = await res.json();
    return data;
}
export const delWishListAfterBook = async (id) => {
    const url = `${import.meta.env.VITE_APP_API_URL}/wishlist-booking/${id}`;
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('reShop-token')}`
        },
    });
    const data = await res.json();
    return data;
}



//add a report
export const addToReport = async (reportData) => {
    const url = `${import.meta.env.VITE_APP_API_URL}/products-report`;
    const res = await fetch(url, {
        method: 'POST',
        headers: {

            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('reShop-token')}`
        },
        body: JSON.stringify(reportData)
    })
    const data = await res.json();
    return data;
}

//get report products
export const getReportProducts = async () => {
    const url = `${import.meta.env.VITE_APP_API_URL}/products-report`;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('reShop-token')}`
        }
    });
    const data = await res.json();
    return data;
}
//get report products
export const delReportProducts = async (id) => {
    const url = `${import.meta.env.VITE_APP_API_URL}/products-report/${id}`;
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



//get a single product

// export const getAProduct = async () => {

//     const url = `${import.meta.env.VITE_APP_API_URL}/products/?category=${category}`;
//     const res = await fetch(url);
//     const data = await res.json();
//     return data;
// }



//get all products for seller
export const getSellerProducts = async email => {
    const url = `${import.meta.env.VITE_APP_API_URL}/products/${email}`;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('reShop-token')}`
        }
    });
    const data = await res.json();
    return data;
}

//update product

export const updateProduct = async (id, productData) => {
    const url = `${import.meta.env.VITE_APP_API_URL}/product/${id}`;
    const res = await fetch(url, {
        method: 'PUT',
        headers: {

            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('reShop-token')}`
        },
        body: JSON.stringify(productData)
    });
    const data = await res.json();
    return data;
}

//delete a product
export const deleteProduct = async id => {
    const url = `${import.meta.env.VITE_APP_API_URL}/product/${id}`;
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