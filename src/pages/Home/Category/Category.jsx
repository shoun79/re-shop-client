import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

import { FreeMode, Pagination } from 'swiper/modules';
import { useEffect, useState } from "react";
import './category.css'
const Category = () => {

    const [categorys, setCategorys] = useState([]);



    useEffect(() => {
        fetch('/categorys.json')
            .then(res => res.json())
            .then(data => {
                setCategorys(data)
            })
    }, []);

    return (
        <div data-aos="fade-up" data-aos-duration="3000" data-aos-anchor-placement="top-bottom" data-aos-delay="500" className="my-20 px-2">
            <div className="flex justify-between">
                <h3 className="text-xl md:text-3xl font-bold">Shop By Category</h3>
                <Link to='/shop/all'><p className="underline">See All Categories</p></Link>
            </div>

            {/* category slider*/}

            <Swiper
                slidesPerView={3}
                spaceBetween={10}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper pt-10"
            >
                {
                    categorys.map((slider, i) => <SwiperSlide key={i}>
                        <Link to={`/shop/${slider.categoryName.toLocaleLowerCase()}`} className="flex flex-col justify-center items-center">
                            <img className="w-52 rounded-full  category-img bounce" src={slider.img} alt="" />

                            <h3 className="mt-2 text-xl">{slider.categoryName}</h3>

                        </Link>
                    </SwiperSlide>)
                }

            </Swiper>

        </div>
    );
};

export default Category;