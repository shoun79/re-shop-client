import { Link } from "react-router-dom";
import PrimaryBtn from "../PrimaryBtn/PrimaryBtn";
import { getVerifyStatus } from "../../api/user";
import { useEffect, useState } from "react";
import { calculateTimeElapsed } from "../../hooks/calculateTimeElapsed";

const ProductCard = ({ item }) => {

    const [verify, setVerify] = useState(null);

    const timeAgo = calculateTimeElapsed(item?.timestamp);

    useEffect(() => {
        getVerifyStatus(item?.seller?.email)
            .then(data => {
                console.log(data);
                setVerify(data)

            })
    }, [item?.seller?.email]);



    return (
        <div className=" mx-auto my-6 w-full md:max-w-[350px] space-y-6 rounded-xl bg-white px-4 pb-8 pt-4 font-sans shadow-lg dark:bg-[#18181B]">
            <div className="relative flex h-48 w-full justify-center lg:h-[280px]">
                <div className="absolute left-4 right-4 top-4 flex items-center justify-between">

                    <div className="flex items-center"><svg width={30} className="fill-transparent stroke-white stroke-2 hover:fill-red-500 hover:stroke-red-500 " viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }}> <g strokeWidth="0"></g> <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g> <g id="SVGRepo_iconCarrier"><path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"></path></g></svg></div>
                    <button className="rounded-xl bg-[#D1793E] hover:bg-[#dc600e]/90 px-3 py-1 font-medium text-white duration-200 ">${item?.price}</button>
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
    );
};

export default ProductCard;