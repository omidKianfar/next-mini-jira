'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@/src/hooks/auth/use-auth';
import { useNavigation } from '@/src/hooks/navigation/use-navigation';
import { useIsMobile } from '@/src/hooks/mobile-size/use-is-mobile';
import Logo from '@/src/components/atom/logo-component';
import MyImage from '@/src/components/atom/image-components';
import InputField from '@/src/components/molecule/RHF-controllers-components/input-field';
import MyIcon from '@/src/components/atom/icon-components';
import ButtonNext from '@/src/components/atom/buttons-component/button-next';
import ButtonFreeClass from '@/src/components/atom/buttons-component/button-free-class';
import { authSchema } from './schema';
import { FormValues } from '../type';

const AuthComponent = () => {
  const navigation = useNavigation();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { signinWithEmail, signupWithEmail, googleSignin } = useAuth();

  const [loading, setLoading] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  const defaultValues: FormValues = {
    email: '',
    password: '',
  };

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(authSchema),
  });

  const authUser = async (values: FormValues) => {
    setLoading(true);

    try {
      if (pathname.includes('signin')) {
        await signinWithEmail({
          email: values.email,
          password: values.password,
        });
      } else {
        await signupWithEmail({
          email: values?.email,
          password: values?.password,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const authGoogle = async () => {
    setLoading(true);

    try {
      await googleSignin();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50/50 p-4">
      <div className="mb-6">
        <Logo />
      </div>

      <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-12">
        <MyImage
          src="/images/auth.png"
          alt="Auth Illustration"
          width={isMobile ? 260 : 460}
          height={isMobile ? 180 : 360}
          className="object-contain"
          wrapperClass="w-[280px] h-[180px] lg:w-[460px] lg:h-[360px] flex items-center justify-center"
        />

        <div className="w-[90vw] max-w-[440px] rounded-2xl border border-gray-300 bg-white p-6 pb-10 pt-8 shadow-sm lg:w-[440px]">
          <h1 className="mb-8 text-center text-h4 font-bold text-primary-500">
            {pathname.includes('signin') ? 'Sign In' : 'Sign Up'}
          </h1>

          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(authUser)}
              autoComplete="on"
              className="space-y-5"
            >
              <InputField
                name="email"
                label="Email"
                placeholder="Enter your email"
                type="email"
                autoFocus
                autoComplete="email"
                icon={<MyIcon icon="email" className="text-error-400" />}
              />

              <InputField
                name="password"
                label="Password"
                placeholder="Enter your password"
                type={passwordShow ? 'text' : 'password'}
                autoComplete="current-password"
                icon={
                  passwordShow ? (
                    <MyIcon
                      icon="show"
                      className="cursor-pointer text-success-400"
                      onClick={() => setPasswordShow(false)}
                    />
                  ) : (
                    <MyIcon
                      icon={'hide'}
                      className="cursor-pointer text-gray-400"
                      onClick={() => setPasswordShow(true)}
                    />
                  )
                }
              />

              <div className="flex items-center justify-between gap-4 pt-4">
                <div className="flex items-center">
                  <MyIcon
                    icon={'google'}
                    className={`rounded-full border border-gray-100 p-2.5 text-h3 shadow-sm transition-all duration-200 ${
                      loading
                        ? 'cursor-not-allowed opacity-50 grayscale'
                        : 'cursor-pointer bg-white hover:rotate-12 hover:bg-gray-50'
                    }`}
                    onClick={!loading ? authGoogle : undefined}
                  />
                </div>

                <ButtonNext
                  type="submit"
                  isLoading={loading}
                  className="w-full min-w-[140px] lg:w-auto"
                >
                  {pathname.includes('signin') ? 'Sign In' : 'Sign Up'}
                </ButtonNext>
              </div>
            </form>
          </FormProvider>

          <div className="mt-8 flex justify-center border-t border-gray-100 pt-8">
            <ButtonFreeClass
              icon={
                <MyIcon
                  icon="arrow-right"
                  className="translate-y-[1px] transform text-body"
                />
              }
              onClick={() =>
                pathname.includes('signin')
                  ? navigation.signup()
                  : navigation.signin()
              }
              className="flex items-center gap-1 text-label font-semibold text-warning-500 hover:text-warning-600"
            >
              {pathname.includes('signin')
                ? "Don't have an account? Sign Up"
                : 'Already have an account? Sign In'}
            </ButtonFreeClass>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
