'use client';

import {
  Autoplay,
  EffectCoverflow,
  Pagination,
  Swiper,
  SwiperSlide,
} from '../imports';
import { FEATURES } from './data';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const FeaturesComponent = () => {
  return (
    <section className="bg-slate-50/50 px-2 py-[48px]">
      <div className="mx-auto max-w-full">
        <div className="mb-[48px] text-center">
          <h2 className="mb-4 text-subtitle font-semibold text-gray-600 lg:text-title">
            Engineered for High-Performance Teams
          </h2>

          <p className="font-semibold text-gray-500">
            Experience a smooth, interactive showcase of our core engine and
            specialized tools.
          </p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay, EffectCoverflow]}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          loop={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            320: { slidesPerView: 1.2, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
          className="!pb-4"
        >
          {FEATURES.map((item, index) => (
            <SwiperSlide key={index} className="max-w-[400px]">
              <div className="group flex h-full flex-col rounded-lg border-2 border-warning-300 bg-white p-6 shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-warning-100 lg:text-title">
                  {item.icon}
                </div>

                <h3 className="mb-2 font-bold text-gray-800 lg:text-title">
                  {item.title}
                </h3>

                <p className="text-gray-500">{item.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturesComponent;
