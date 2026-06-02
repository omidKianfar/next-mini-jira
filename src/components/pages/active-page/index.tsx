'use client';

import { useNavigation } from '@/src/hooks/navigation/use-navigation';
import ButtonNext from '../../atom/buttons-component/button-next';
import MyIcon from '../../atom/icon-components';

export default function ActivePageComponent() {
  const navigation = useNavigation();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
      <div className="mb-8 rounded-full bg-warning-100 p-4">
        <MyIcon icon="alert-triangle" className="text-4xl text-warning-500" />
      </div>

      <h1 className="mb-2 text-h2 font-bold text-gray-800">
        Account Deactivated
      </h1>

      <div className="mb-8 max-w-md">
        <h2 className="mb-2 text-title font-bold text-error-500">
          Something went wrong
        </h2>
        <p className="text-gray-600">
          Your account has been deactivated. Please contact our support team to
          resolve this issue and restore your access.
        </p>
      </div>

      <ButtonNext
        onClick={() => navigation.support()}
        icon={<MyIcon icon="arrow-right" className="ml-2" />}
      >
        Contact Support
      </ButtonNext>
    </div>
  );
}
