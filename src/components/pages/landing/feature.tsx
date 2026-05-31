'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { FEATURES } from './data';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const FeaturesComponent = () => {
  return (
    <section className="bg-slate-50/50 px-4 py-[64px]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-[48px] text-center">
          <h2 className="mb-4 text-subtitle font-semibold text-gray-600 lg:text-title">
            Engineered for High-Performance Teams
          </h2>

          <p className="mx-auto max-w-2xl font-semibold text-gray-500">
            Experience a smooth, interactive showcase of our core engine and
            specialized tools.
          </p>
        </div>

        <div className="theme-warning-pagination w-full">
          <Swiper
            modules={[Pagination, Autoplay, EffectCoverflow]}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 100,
              modifier: 1.5,
              slideShadows: false,
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              320: { spaceBetween: 16 },
              768: { spaceBetween: 24 },
              1024: { spaceBetween: 32 },
            }}
            className="!pb-14"
          >
            {FEATURES.map((item, index) => (
              <SwiperSlide
                key={index}
                className="h-auto max-w-[340px] md:max-w-[380px]"
              >
                <div className="group flex h-full select-none flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-warning-300 hover:shadow-md">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-warning-50 text-warning-500 transition-colors duration-300 group-hover:bg-warning-100 lg:text-title">
                    {item.icon}
                  </div>

                  <h3 className="mb-2 font-bold text-gray-800 lg:text-title">
                    {item.title}
                  </h3>

                  <p className="text-body leading-relaxed text-gray-500">
                    {item.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .theme-warning-pagination .swiper-pagination-bullet-active {
          background: #f59e0b !important;
        }
        .theme-warning-pagination .swiper-pagination-bullet {
          background: #d1d5db;
          opacity: 1;
        }
        .theme-warning-pagination .swiper-pagination-bullet-active-main {
          background: #f59e0b !important;
        }
      `}</style>
    </section>
  );
};

export default FeaturesComponent;
