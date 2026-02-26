'use client';

// hook
import { useNavigation } from '@/src/hooks/navigation/use-navigation';
import { useIsMobile } from '@/src/hooks/mobile-size/use-is-mobile';

// ui
import ButtonNext from '../../atom/buttons-component/button-next';
import MyImage from '../../atom/image-components';
import MyIcon from '../../atom/icon-components';

const HeroSectionComponent = () => {
  // hook
  const isMobile = useIsMobile();
  const navigation = useNavigation();

  return (
    <div className="relative overflow-hidden px-4 pb-16 pt-24 lg:pt-32">
      <div className="flex justify-center">
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-6 inline-flex items-center rounded-full bg-warning-50 px-4 py-1.5 text-label font-medium text-warning-500 ring-1 ring-inset ring-warning-500/20">
              v1.0 is now live
            </div>

            <h1 className="mb-6 text-h4 font-extrabold tracking-tight text-gray-500 lg:text-h1">
              The Next Gen
              <br />
              <span className="text-warning-500">Project Manager</span>
            </h1>

            <p className="mx-auto mb-10 max-w-[500px] text-lg leading-relaxed text-slate-600 lg:mx-0">
              A professional Mini Jira clone engineered for speed and precision.
              Experience seamless task management with a production-grade stack.
            </p>

            <div className="flex w-full justify-center lg:justify-start">
              <ButtonNext
                onClick={() => navigation.signin()}
                className="max-w-[140px]"
                icon={<MyIcon icon="maki:arrow" className="ml-2" />}
              >
                Signin
              </ButtonNext>
            </div>
          </div>

          <div className="relative z-10 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
            <MyImage
              src="/images/landing.png"
              alt="Mini Jira Dashboard Preview"
              width={isMobile ? 400 : 720}
              height={isMobile ? 250 : 480}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionComponent;
