import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode, Pagination } from 'swiper/modules';

const Category = () => {
    const sliders = [
        {
            categoryName: 'Bajaj',
            img: 'https://images.unsplash.com/photo-1629616092586-636e3010398a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFqYWp8ZW58MHx8MHx8fDA%3D'
        },
        {
            categoryName: 'Tvs',
            img: 'https://plus.unsplash.com/premium_photo-1681488134408-d6eb570673af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHZzJTIwc2Nvb3RlcnxlbnwwfHwwfHx8MA%3D%3D'
        },
        {
            categoryName: 'Yamaha',
            img: 'https://images.unsplash.com/photo-1616889154907-0c5f6721dcba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8eWFtYWhhfGVufDB8fDB8fHww'
        },
        {
            categoryName: 'Honda',
            img: 'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8SG9uZGF8ZW58MHx8MHx8fDA%3D'
        }
    ];
    return (
        <div className="my-20 px-2">
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
                    sliders.map((slider, i) => <SwiperSlide key={i}>
                        <Link to={`/shop/${slider.categoryName.toLocaleLowerCase()}`} className="flex flex-col justify-center items-center">
                            <img className="w-52 rounded-full hover:scale-125 transition-all" src={slider.img} alt="" />
                            <h3 className="mt-2 text-xl">{slider.categoryName}</h3>

                        </Link>
                    </SwiperSlide>)
                }

            </Swiper>

        </div>
    );
};

export default Category;