'use client';

import {
  useIsMobile,
  useNavigation,
  motion,
  ButtonNext,
  MyIcon,
  MyImage,
} from '../imports';

const HeroSectionComponent = () => {
  const isMobile = useIsMobile();
  const navigation = useNavigation();

  return (
    <div className="relative overflow-hidden px-4 py-8 lg:py-36">
      <div className="flex justify-center">
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6 inline-flex items-center rounded-full bg-warning-50 px-4 py-1.5 text-label font-medium text-warning-500 ring-1 ring-inset ring-warning-500/20"
            >
              v1.0 is now live
            </motion.div>

            <h1 className="mb-6 text-h4 font-extrabold tracking-tight text-gray-500 lg:text-h1">
              The Next Gen
              <br />
              <span className="text-warning-500">Project Manager</span>
            </h1>

            <p className="mx-auto mb-10 max-w-[500px] text-lg leading-relaxed text-slate-600 lg:mx-0">
              A professional Mini Jira engineered for speed and precision.
            </p>

            <div className="flex w-full justify-center lg:justify-start">
              <ButtonNext
                onClick={() => navigation.signin()}
                className="max-w-[140px]"
                icon={<MyIcon icon="arrow-right" className="ml-2" />}
              >
                Signin
              </ButtonNext>
            </div>
          </div>

          <motion.div
            className="relative z-10 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <motion.div
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay: 0.2,
              }}
            >
              <MyImage
                src="/images/landing.png"
                alt="Mini Jira Dashboard Preview"
                width={isMobile ? 400 : 720}
                height={isMobile ? 250 : 480}
                className="rounded-lg object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionComponent;
