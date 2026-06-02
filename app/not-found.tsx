'use client';

import { useNavigation } from '@/src/hooks/navigation/use-navigation';
import ButtonNext from '@/src/components/atom/buttons-component/button-next';
import MyIcon from '@/src/components/atom/icon-components';

export default function NotFound() {
  const navigation = useNavigation();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center p-6 text-center">
      <div className="mb-6 flex flex-col items-center">
        <MyIcon
          icon="alert-circle"
          className="mb-4 text-[100px] text-warning-400"
        />
        <h1 className="text-8xl font-black text-error-500">404</h1>
      </div>

      <div className="mb-10 max-w-md">
        <h2 className="mb-3 text-2xl font-bold text-gray-800">
          Page not found
        </h2>
        <p className="text-gray-500">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
      </div>

      <ButtonNext
        onClick={() => navigation.dashboard()}
        icon={<MyIcon icon="arrow-right" className="ml-2" />}
        className="w-full max-w-[200px]"
      >
        Go Home
      </ButtonNext>
    </div>
  );
}
