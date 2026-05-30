'use client';

import { useNavigation } from '@/src/hooks/navigation/use-navigation';
import ButtonNext from '@/src/components/atom/buttons-component/button-next';
import MyIcon from '@/src/components/atom/icon-components';

export default function NotFound() {
  const navigation = useNavigation();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-4">
      <div className="mb-4 flex justify-center">
        <h1 className="text-h2 font-bold text-warning-500 lg:text-h1">404</h1>
      </div>

      <div className="flex flex-col justify-start">
        <h1 className="mb-4 text-h4 font-bold lg:text-h2">
          Somthing went wrong
        </h1>

        <p className="mb-12 text-subtitle lg:text-h4">Page not found.</p>
      </div>

      <div>
        <ButtonNext
          onClick={() => navigation.dashboard()}
          icon={<MyIcon icon="arrow-right" className="ml-2 text-body" />}
        >
          Go Home
        </ButtonNext>
      </div>
    </div>
  );
}
