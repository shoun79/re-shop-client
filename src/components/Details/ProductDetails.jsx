import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getVerifyStatus } from "../../api/user";

const ProductDetails = () => {
    const product = useLoaderData();
    const [verify, setVerify] = useState(null);


    useEffect(() => {
        getVerifyStatus(product?.seller?.email)
            .then(data => {
                setVerify(data)

            })
    }, [product?.seller?.email]);

    let date = new Date(product?.timestamp);

    // time format
    let hours = `${date.getHours()}`;
    let minutes = `${date.getMinutes()}`;


    let newFormat = hours >= 12 ? 'PM' : 'AM';

    // Find current hour in AM-PM Format
    hours = hours % 12;

    // To display "0" as "12"
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    const time = hours + ':' + minutes + ' ' + newFormat;


    /* Date format */
    let dateMDY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${time}`;


    return (
        <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
            <div className="xl:w-2/6 lg:w-2/5 w-80">
                <img className="w-full" alt="image of a product" src={product?.imageUrl} />
            </div>
            <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
                <div className="border-b border-gray-200 pb-6">
                    <div className="relative py-2 pr-2 rounded-md w-fit h-fit">
                        {verify && verify === 'verified' &&
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue" className="w-4 h-4 text-blue-600 absolute -right-2 top-1">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                            </svg>
                        }
                        <span className="text-[#c7c7c5] ">{product?.seller?.name}</span>
                    </div>

                    <p className="text-sm leading-none text-gray-600 dark:text-gray-300 ">Posted on: {dateMDY}  </p>
                    <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2">{product?.name}</h1>
                </div>
                <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                    <p className="text-base leading-4 text-gray-800 dark:text-gray-300">Original price:</p>
                    <div className="flex items-center justify-center">
                        <p className="text-sm leading-none text-gray-600 dark:text-gray-300">${product?.originalPrice}</p>
                    </div>
                </div>
                <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                    <p className="text-base leading-4 text-gray-800 dark:text-gray-300">Resale price:</p>
                    <div className="flex items-center justify-center">
                        <p className="text-sm leading-none text-gray-600 dark:text-gray-300">${product?.price}</p>
                    </div>
                </div>

                <button className="bg-[#D1793E] hover:bg-[#dc600e] focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white  w-full py-4  focus:outline-none">
                    <svg className="mr-3 text-white dark:text-gray-900" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.02301 7.18999C7.48929 6.72386 7.80685 6.12992 7.93555 5.48329C8.06425 4.83666 7.9983 4.16638 7.74604 3.55724C7.49377 2.94809 7.06653 2.42744 6.51835 2.06112C5.97016 1.6948 5.32566 1.49928 4.66634 1.49928C4.00703 1.49928 3.36252 1.6948 2.81434 2.06112C2.26615 2.42744 1.83891 2.94809 1.58665 3.55724C1.33439 4.16638 1.26843 4.83666 1.39713 5.48329C1.52583 6.12992 1.8434 6.72386 2.30968 7.18999L4.66634 9.54749L7.02301 7.18999Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4.66699 4.83333V4.84166" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13.69 13.8567C14.1563 13.3905 14.4738 12.7966 14.6025 12.15C14.7312 11.5033 14.6653 10.8331 14.413 10.2239C14.1608 9.61476 13.7335 9.09411 13.1853 8.72779C12.6372 8.36148 11.9926 8.16595 11.3333 8.16595C10.674 8.16595 10.0295 8.36148 9.48133 8.72779C8.93314 9.09411 8.5059 9.61476 8.25364 10.2239C8.00138 10.8331 7.93543 11.5033 8.06412 12.15C8.19282 12.7966 8.51039 13.3905 8.97667 13.8567L11.3333 16.2142L13.69 13.8567Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11.333 11.5V11.5083" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Book now
                </button>
                <div>
                    <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 dark:text-gray-300 mt-7">{product?.details}</p>
                    <p className="text-base leading-4 mt-7 text-gray-600 dark:text-gray-300">CC: {product?.cc}</p>
                    <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">Years of use: {product?.purchase}</p>
                    <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">Condition type: {product?.condition}</p>
                    <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">Location: {product?.location}</p>
                    <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">Mobile number: {product?.number}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;