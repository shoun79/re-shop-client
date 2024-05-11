import { Link, useNavigate } from "react-router-dom";
import PrimaryBtn from "../PrimaryBtn/PrimaryBtn";
import { getVerifyStatus } from "../../api/user";
import { useEffect, useState } from "react";
import { useCalculateTimeElapsed } from "../../hooks/useCaluseCulateTimeElapsed";
import { updateProduct } from "../../api/products";
import Swal from "sweetalert2";

const ProductCard = ({ item }) => {

    const [verify, setVerify] = useState(null);
    const navigate = useNavigate();

    const timeAgo = useCalculateTimeElapsed(item?.timestamp);

    useEffect(() => {
        getVerifyStatus(item?.seller?.email)
            .then(data => {

                setVerify(data)

            })
    }, [item?.seller?.email]);

    //WishList
    const handleWishList = item => {
        const updatedData = {
            wishList: "true",
        }
        updateProduct(item?._id, updatedData)
            .then(data => {
                if (data.modifiedCount) {
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Product added in wishList",
                        showConfirmButton: false,
                        timer: 2500
                    })
                    navigate('/wishList')


                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    //report to admin
    const handleReport = item => {
        const updatedData = {
            report: "true",
        }
        updateProduct(item?._id, updatedData)
            .then(data => {
                if (data.modifiedCount) {
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Successfully report to admin",
                        showConfirmButton: false,
                        timer: 2500
                    })


                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            {
                item?.status === "available" && <div className=" mx-auto my-6 w-full md:max-w-[350px] space-y-6 rounded-xl bg-white px-4 pb-8 pt-4 font-sans shadow-lg dark:bg-[#18181B]">
                    <div className="relative flex h-48 w-full justify-center lg:h-[280px]">
                        <div className="absolute left-4 right-4 top-4 flex items-center justify-between">

                            <div onClick={() => handleWishList(item)} className="flex items-center">
                                {
                                    item?.wishList === "true" ? <svg width={30} className="  stroke-2 fill-red-500 stroke-white " viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" > <g strokeWidth="0"></g> <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g> <g id="SVGRepo_iconCarrier"><path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"></path></g></svg> : <svg width={30} className="fill-transparent stroke-white stroke-2 hover:fill-red-500 hover:stroke-red-500 " viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }}> <g strokeWidth="0"></g> <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g> <g id="SVGRepo_iconCarrier"><path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"></path></g></svg>
                                }

                            </div>
                            <button className="rounded-xl bg-[#D1793E] hover:bg-[#dc600e]/90 px-3 py-1 font-medium text-white duration-200 ">${item?.price}</button>

                        </div>

                        <div onClick={() => handleReport(item)} className="absolute  right-3 bottom-3 cursor-pointer">
                            <div className="flex items-center justify-center">
                                <div className="pointer group relative h-10 p-2 bg-[#D1793E] hover:bg-[#dc600e]/90 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                                    </svg>

                                    <div className="absolute -left-[200px] top-0 flex cursor-pointer whitespace-nowrap opacity-0 duration-500 hover:hidden group-hover:-left-[170px] group-hover:opacity-100">
                                        <p className="h-fit rounded-md bg-[#0EA5E9] px-3 py-2 text-white shadow-[0px_0px_10px_0px_#0EA5E9]"> Report to admin</p>
                                        <span className="absolute -right-2 top-[50%] h-0 w-0 -translate-y-1/2 rotate-45 border-b-[20px] border-r-[20px] border-b-transparent border-r-[#0EA5E9] shadow-[0px_0px_10px_0px_#0EA5E9]"></span>
                                    </div>
                                </div>
                            </div>


                        </div>


                        <img width={300} height={300} className="h-full w-full rounded-lg bg-black/40 " src={item?.imageUrl} alt="card navigate ui" />
                    </div>

                    <div className="relative mx-auto w-[85%] space-y-2 text-center font-semibold">
                        <div className="absolute right-0  -top-4 flex items-center justify-between">

                            <span>{timeAgo}</span>
                        </div>
                        <h6 className="text-sm md:text-base lg:text-lg">{item?.name}</h6>
                        <p className="text-xs font-semibold text-gray-400 md:text-sm">Location: {item?.location}</p>
                        <p className="text-xs font-semibold text-gray-400 md:text-sm">Condition type: {item?.condition}</p>

                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base">
                        <Link to={`/product-details/${item?._id}`}><PrimaryBtn>Details</PrimaryBtn></Link>

                        <div className="relative mx-auto  p-2 rounded-md w-fit h-fit">
                            {verify && verify === 'verified' &&
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue" className="w-4 h-4 text-blue-600 absolute -right-2 top-1">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                </svg>
                            }
                            <span className="text-[#c7c7c5] ">{item?.seller?.name}</span>
                        </div>




                    </div>
                </div>
            }
        </>

    );
};

export default ProductCard;