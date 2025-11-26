"use client";

import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authSchema } from "../../schema";
import InputField from "@/src/components/atom/controllers/input-field";
import { useAuth } from "@/src/hooks/useAuth";
import { FormValues, SignupProps } from "../../type";

const Step1Component = ({ setPage, changeStep }: SignupProps) => {
  const { signupWithEmail } = useAuth();

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

    const result = await signupWithEmail({ email, password });
    console.log("signupWithEmail", result);

    if (result) {
      changeStep("1");
    }
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
              Sign up
            </button>
          </div>
        </form>
      </FormProvider>

      <button onClick={() => setPage("signin")}>{"Signin ->"}</button>
    </div>
  );
};

export default Step1Component;
