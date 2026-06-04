'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import MyImage from '../../atom/image-components';
import { PROJECT_SLIDES } from './data';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const ProjectComponent = () => {
  return (
    <section className="w-full overflow-hidden bg-white px-4 pb-16 pt-2">
      <div className="mx-auto max-w-[1400px]">
        <div className="theme-warning-pagination w-full">
          <Swiper
            modules={[Pagination, Autoplay, EffectCoverflow]}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            coverflowEffect={{
              rotate: 12,
              stretch: -40,
              depth: 60,
              modifier: 1,
              slideShadows: false,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            className="!pb-14"
          >
            {PROJECT_SLIDES.map((item, index) => (
              <SwiperSlide
                key={index}
                className="h-auto max-w-[540px] lg:max-w-[860px]"
              >
                <div className="group flex h-full select-none flex-col rounded-2xl border border-gray-100 bg-white p-3 shadow-lg transition-all duration-300 hover:border-gray-300 hover:shadow-xl">
                  <div className="relative aspect-[21/9] w-full overflow-hidden rounded-md">
                    <MyImage
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-w: 1024px) 100vw, 860px"
                      priority={index === 0}
                      className="object-conatin scale-y-[1.02] object-top"
                    />
                  </div>

                  <div className="p-3 text-center">
                    <h3 className="mb-0.5 text-base font-bold text-gray-800 lg:text-body">
                      {item.title}
                    </h3>
                    <p className="mx-auto max-w-xl text-bodySm leading-relaxed text-gray-600">
                      {item.description}
                    </p>
                  </div>
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

export default ProjectComponent;
