import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useCalculateTimeElapsed } from "../../hooks/useCaluseCulateTimeElapsed";
import { getVerifyStatus } from "../../api/user";
import { deleteWishList, getWishListStatus, addToReport } from "../../api/products";
import Swal from "sweetalert2";
import PrimaryBtn from "../PrimaryBtn/PrimaryBtn";
import { useNavigate } from "react-router-dom";
const WishListCard = ({ item }) => {
    const { user } = useAuth();
    const [verify, setVerify] = useState(null);
    const [wishListStatus, setWishListStatus] = useState('');
    const navigate = useNavigate();


    const timeAgo = useCalculateTimeElapsed(item?.timestamp);

    useEffect(() => {
        getVerifyStatus(item?.seller?.email)
            .then(data => {

                setVerify(data)

            })
    }, [item?.seller?.email]);

    useEffect(() => {
        getWishListStatus(item?.productId, user?.email)
            .then(data => {

                setWishListStatus(data)

            })
    }, [item?.productId, user?.email]);

    //WishList add
    const handleWishListDelete = item => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteWishList(item?._id)
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount) {

                            Swal.fire({
                                title: "Deleted!",
                                text: "Successfully deleted.",
                                icon: "success"
                            });
                            window.location.reload();
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })

            }
        });




    }

    //report to admin
    const handleReport = item => {

        if (user) {
            const reportData = {
                productId: item?._id,
                imageUrl: item?.imageUrl,
                name: item?.name,
                seller: {
                    name: item?.seller?.name,
                    email: item?.seller?.email
                },
                user: {
                    name: user
                }
            }
            addToReport(reportData)
                .then(data => {
                    if (data.insertedId) {
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
        } else {
            navigate('/login')
        }


    }

    return (
        <>
            {
                item?.status === "available" && <div className=" mx-auto my-6 w-full md:max-w-[350px] space-y-6 rounded-xl bg-white px-4 pb-8 pt-4 font-sans shadow-lg dark:bg-[#18181B]">
                    <div className="relative flex h-48 w-full justify-center lg:h-[280px]">
                        <div className="absolute left-4 right-4 top-4 flex items-center justify-between">

                            <div onClick={() => handleWishListDelete(item)} className="flex items-center">
                                {
                                    wishListStatus === true && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6 fill-red-500 cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>

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
                        <Link to={`/product-details/${item?.productId}`}><PrimaryBtn>Details</PrimaryBtn></Link>

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

export default WishListCard;