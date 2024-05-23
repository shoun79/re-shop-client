import { useState } from "react";
import PrimaryBtn from "../../../components/PrimaryBtn/PrimaryBtn";
import { Link } from "react-router-dom";

import './Banner.css'

export const CarouselMain = () => {
    const [currentSlider, setCurrentSlider] = useState(0);
    const sliders = [{ img: "https://images.unsplash.com/photo-1598808503491-a8ebebc0b55d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHVzZWQlMjBtb3RvcmJpa2V8ZW58MHwxfDB8fHww", tags: "Bike", }, { img: "https://images.unsplash.com/photo-1519078156762-58b4d1756729?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlZCUyMG1vdG9yYmlrZXxlbnwwfDF8MHx8fDA%3D", tags: "Bike", }, { img: "https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHVzZWQlMjBtb3RvcmJpa2V8ZW58MHwxfDB8fHww", tags: "Bike", }, { img: "https://images.unsplash.com/photo-1598808503491-a8ebebc0b55d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGluZGlhbiUyMG1vdG9yYmlrZXxlbnwwfDF8MHx8fDA%3D", tags: "Bike", }, { img: "https://plus.unsplash.com/premium_photo-1661893953411-6d32f9baba97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fGluZGlhbiUyMG1vdG9yYmlrZXxlbnwwfDF8MHx8fDA%3D", tags: "Bike", },];
    const nextSlider = () => setCurrentSlider((currentSlider) => (currentSlider === sliders.length - 1 ? 0 : currentSlider + 1));
    const prevSlider = () => setCurrentSlider((currentSlider) => (currentSlider === sliders.length + 1 ? 0 : currentSlider - 1));
    return (
        <div className="sm:w-2/3 h-[540px] md:h-[670px] flex items-center relative overflow-hidden">
            {/* arrow */}
            {
                currentSlider > 0 && < button onClick={prevSlider} className="absolute flex justify-center items-center left-2 top-1/2 bg-white rounded-full z-50 w-6 h-6 md:w-8 md:h-8 bgWhite ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" fill="#0095FF" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>

                </button>
            }


            <button onClick={nextSlider} className="absolute flex justify-center items-center right-2 top-1/2 bg-white rounded-full z-50 w-6 h-6 md:w-8 md:h-8 bgWhite ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" fill="#0095FF" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>

            </button>
            {/* slider container */}
            <div className="ease-linear duration-300 flex gap-[2%]" style={{ transform: `translateX(-${currentSlider * 52}%)` }}>
                {/* sliders */}
                {sliders.map((slide, inx) => (
                    <div key={inx}
                        className={`${currentSlider === inx ? 'h-[310px] md:h-[310px] lg:h-[580px] ' : 'h-[260px] md:h-[280px] lg:h-[480px]'} min-w-[50%] bg-black/30 relative duration-200`}
                    >
                        <img src={slide.img} className="w-full h-full" alt={slide.tags} />
                    </div>
                ))}
            </div>
        </div >
    );
};
const Banner = () => {

    return (
        <div className="max-w-7xl mx-auto h-[540px] lg:h-[670px] px-3 lg:px-10 flex flex-col lg:flex-row items-center justify-center overflow-hidden gap-5 lg:gap-10 relative">
            <div className="bg-[#f3f9fc] w-full absolute left-0 h-[540px] lg:h-[670px] -z-40"></div>
            <div className="w-2/3 lg:w-1/3 text-center lg:text-left space-y-2 lg:space-y-5 py-5">
                <h1 className="text-lg md:text-2xl lg:text-[40px] font-bold">Buy & Sell Second hand Bike!</h1>
                <p className="text-[#616161] text-xs md:text-lg   pb-4">Get Decent Products At Much Lower Prices</p>
                <Link to='/shop/all'><PrimaryBtn>

                    <div className="wrapper">
                        <svg>
                            <text x="50%" y="50%" dy=".35em" textAnchor="middle">
                                Start Shopping
                            </text>
                        </svg>
                    </div>
                </PrimaryBtn></Link>
            </div>
            <CarouselMain />
        </div>
    );
};

export default Banner;