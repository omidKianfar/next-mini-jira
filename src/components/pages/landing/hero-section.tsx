'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useNavigation } from '@/src/hooks/navigation/use-navigation';
import ButtonNext from '../../atom/buttons-component/button-next';
import MyIcon from '../../atom/icon-components';
import MyImage from '../../atom/image-components';
import { useAuth } from '@/src/hooks/auth/use-auth';

import 'swiper/css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

const APP_PREVIEWS = [
  { src: '/images/landing.png', alt: 'Mini Jira Dashboard Preview' },
  { src: '/images/board.png', alt: 'Mini Jira Kanban Board' },
  { src: '/images/settings.png', alt: 'Mini Jira Project Settings' },
];

const HeroSectionComponent = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  return (
    <div className="relative overflow-hidden px-4 py-12 lg:py-28">
      <div className="flex justify-center">
        <div className="flex w-full max-w-7xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              variants={itemVariants}
              className="mb-6 inline-flex items-center rounded-full bg-warning-50 px-4 py-1.5 text-label font-medium text-warning-500 ring-1 ring-inset ring-warning-500/20"
            >
              v1.0 is now live
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-6 text-h4 font-extrabold leading-tight tracking-tight text-gray-500 lg:text-h1"
            >
              The Next-Gen
              <br />
              <span className="text-warning-500">Project Manager</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mx-auto mb-10 max-w-[500px] text-body leading-relaxed text-slate-600 lg:mx-0 lg:mb-16"
            >
              A high-performance project management tool engineered for speed
              and precision.
            </motion.p>

            {!user && (
              <motion.div
                variants={itemVariants}
                className="flex w-full justify-center lg:justify-start lg:px-0"
              >
                <ButtonNext
                  onClick={() => navigation.signin()}
                  className="w-full md:max-w-[240px] lg:w-auto lg:max-w-[200px]"
                  icon={<MyIcon icon="arrow-right" className="ml-2" />}
                >
                  Get Started
                </ButtonNext>
              </motion.div>
            )}
          </motion.div>

          <div className="relative z-10 w-full max-w-[640px] flex-1 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl lg:max-w-none">
            <div className="h-full w-full">
              <Swiper
                modules={[Autoplay]}
                loop={true}
                allowTouchMove={true}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                }}
                className="h-full w-full"
              >
                {APP_PREVIEWS.map((image, index) => (
                  <SwiperSlide key={index} className="h-full w-full">
                    <MyImage
                      src={image.src}
                      alt={image.alt}
                      width={720}
                      height={280}
                      className="h-auto w-full rounded-lg object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionComponent;
