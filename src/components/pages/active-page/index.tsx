'use client';

import { useNavigation } from '@/src/hooks/navigation/use-navigation';

import ButtonNext from '@/src/components/atom/buttons-component/button-next';
import MyIcon from '@/src/components/atom/icon-components';

export default function ActivePageComponent() {
  const navigation = useNavigation();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-4">
      <div className="mb-10 flex justify-center rounded-sm bg-warning-500 px-6 py-2 shadow-md">
        <h1 className="text-h2 font-semibold text-white">Deactivated</h1>
      </div>

      <div className="mb-8 flex flex-col justify-start">
        <h1 className="mb-2 text-title font-bold text-error-500">
          Somthing went wrong
        </h1>

        <p className="text-h4 font-semibold">
          Your account has been deactivated.
        </p>
      </div>

      <div>
        <ButtonNext
          onClick={() => navigation.support()}
          icon={<MyIcon icon="arrow-right" className="ml-2 text-body" />}
        >
          Go support
        </ButtonNext>
      </div>
    </div>
  );
}
