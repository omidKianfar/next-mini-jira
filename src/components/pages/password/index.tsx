'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@/src/hooks/navigation/use-navigation';
import { useIsMobile } from '@/src/hooks/mobile-size/use-is-mobile';
import { useAuth } from '@/src/hooks/auth/use-auth';
import { useRequireActiveStatus } from '@/src/hooks/pages-user-status-require/use-require-active-status';
import { useRequirePaymentStatus } from '@/src/hooks/pages-user-status-require/use-require-payment-status';
import FramerMotion from '../../atom/animation-component';
import ButtonBack from '../../atom/buttons-component/button-back';
import InputField from '../../molecule/RHF-controllers-components/input-field';
import MyIcon from '../../atom/icon-components';
import ButtonNext from '../../atom/buttons-component/button-next';
import MyImage from '../../atom/image-components';
import { passwordSchema } from './schema';
import { SignPropsType } from '@/src/types/global';

const PasswordComponent = () => {
  const pathName = usePathname();
  const navigation = useNavigation();
  const isMobile = useIsMobile();
  const { user, updatePasswordGoogle, addOrUpdatePasswordForCurrentUser } =
    useAuth();

  useRequireActiveStatus();
  useRequirePaymentStatus();

  const [loading, setLoading] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  const isSignupPage = pathName.includes('/signup');
  const isProfilePage = pathName.includes('profile');
  const isResetPasswordMode = pathName.includes('/password');

  const defaultValues: SignPropsType = {
    email: user?.email ?? '',
    password: '',
  };

  const methods = useForm<SignPropsType>({
    defaultValues,
    resolver: yupResolver(passwordSchema),
    mode: 'onSubmit',
  });

  const { reset, handleSubmit } = methods;

  useEffect(() => {
    if (user) {
      reset({
        email: user?.email ?? '',
        password: '',
      });
    }
  }, [user, reset]);

  const setProfileHandler = async (values: SignPropsType) => {
    setLoading(true);
    try {
      if (isSignupPage) {
        await updatePasswordGoogle({ newPassword: values.password });
      } else {
        await addOrUpdatePasswordForCurrentUser({
          newPassword: values.password,
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <FramerMotion>
      <div
        className={`flex w-full flex-col items-center justify-center p-4 md:p-8 ${
          isSignupPage ? 'min-h-screen' : ''
        }`}
      >
        <div className="flex w-full max-w-6xl flex-col items-center justify-center gap-8 lg:flex-row lg:gap-16">
          <div className="w-full max-w-[500px] rounded-2xl border-2 border-warning-300 bg-white p-6 pt-8 shadow-md transition-all">
            {isProfilePage && (
              <div className="mb-4">
                <ButtonBack onClick={() => navigation.profile()} />
              </div>
            )}

            <h1 className="mb-8 text-center text-h4 font-extrabold tracking-tight text-warning-500">
              Password
            </h1>

            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(setProfileHandler)}
                className="space-y-5"
              >
                <InputField
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  disabled
                  icon={<MyIcon icon="email" className="text-error-400" />}
                />

                <InputField
                  name="password"
                  label={isResetPasswordMode ? 'New Password' : 'Password'}
                  placeholder={
                    isResetPasswordMode
                      ? 'Enter your new password'
                      : 'Enter your password'
                  }
                  type={passwordShow ? 'text' : 'password'}
                  autoComplete={
                    isResetPasswordMode ? 'new-password' : 'current-password'
                  }
                  icon={
                    passwordShow ? (
                      <MyIcon
                        icon="show"
                        className="cursor-pointer text-success-500 transition-colors hover:text-success-600"
                        onClick={() => setPasswordShow(false)}
                      />
                    ) : (
                      <MyIcon
                        icon="hide"
                        className="cursor-pointer text-slate-400 transition-colors hover:text-slate-500"
                        onClick={() => setPasswordShow(true)}
                      />
                    )
                  }
                />

                <div className="flex items-center justify-end pt-2">
                  <ButtonNext type="submit" isLoading={loading}>
                    {isResetPasswordMode ? 'Save' : 'Next'}
                  </ButtonNext>
                </div>
              </form>
            </FormProvider>
          </div>

          <div className="flex w-full max-w-[500px] items-center justify-center">
            <MyImage
              src="/images/set-password.svg"
              alt="Set Password Illustration"
              width={isMobile ? 280 : 450}
              height={isMobile ? 180 : 350}
              className="object-contain"
              wrapperClass="w-full h-auto flex items-center justify-center"
            />
          </div>
        </div>
      </div>
    </FramerMotion>
  );
};

export default PasswordComponent;
