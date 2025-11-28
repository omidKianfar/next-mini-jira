"use client";

import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authSchema } from "../schema";
import InputField from "@/src/components/atom/controllers/input-field";
import { useAuth } from "@/src/hooks/useAuth";
import { AuthProps, FormValues } from "../type";
import { useRouter } from "next/navigation";

const SigninComponent = ({ setPage }: AuthProps) => {
  const router = useRouter();

  const { signinWithEmail } = useAuth();

  const defaultValues: FormValues = useMemo(
    () => ({
      email: "",
      password: "",
    }),
    []
  );

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(authSchema),
  });

  const signupUser = async (values: FormValues) => {
    const email = values.email;
    const password = values.password;

    await signinWithEmail({ email, password }).unwrap();

    router.push("/");
  };

  return (
    <div className="lg:w-[500px] border p-4 rounded-sm">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(signupUser)}>
          <InputField
            name="email"
            label="Email"
            placeholder="Enter your email"
          />

          <InputField
            name="password"
            label="Password"
            placeholder="Enter your password"
          />

          <div className="flex justify-end items-center">
            <button
              type="submit"
              className="cursor-pointer rounded-sm px-8 py-2 border mt-4"
            >
              Sign in
            </button>
          </div>
        </form>
      </FormProvider>

      <button onClick={() => setPage("signup")}>{"Signup ->"}</button>
    </div>
  );
};

export default SigninComponent;
