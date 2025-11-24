import InputField from "@/src/components/atom/controllers/input-field";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ProfileProps, SignupProps } from "../../types";
import { ProfileSchema } from "../../schema";
import DateInputField from "@/src/components/atom/controllers/date-input-field";
import Image from "next/image";

const Step2Component = ({ changeStep }: Pick<SignupProps, "changeStep">) => {
  const photoRef = useRef<HTMLInputElement | null>(null);

  const defaultValues: ProfileProps = useMemo(
    () => ({
      photo: "",
      userName: "",
      birthday: "",
    }),
    []
  );

  const methods = useForm<ProfileProps>({
    defaultValues,
    resolver: yupResolver(ProfileSchema),
    mode: "onSubmit",
  });

  const photoRefHandler = () => {
    photoRef.current?.click();
  };

  const uploadPhotoHandler = (event: any) => {
    const file = event?.target?.files?.[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    methods.setValue("photo", url);
  };

  const setProfileHandler = async (values: ProfileProps) => {

    changeStep("2");
  };

  return (
    <div className="lg:w-[500px] border p-4 rounded-sm">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(setProfileHandler)}>
          <div className="mb-8">
            {methods.watch("photo") && (
              <Image
                src={methods.watch("photo")!}
                width={120}
                height={120}
                alt="Selected photo"
                className="rounded-full object-cover w-[100px] h-[100px]"
              />
            )}

            <InputField
              name="photo"
              type="file"
              label="Photo"
              placeholder="Enter your email"
              ref={photoRef}
              onChange={uploadPhotoHandler}
              className="hidden"
            />

            <button type="button" onClick={photoRefHandler}>
              Upload
            </button>
          </div>

          <InputField
            name="userName"
            label="Email"
            placeholder="Enter your email"
          />

          <DateInputField name="birthday" label="Birthday" />

          <div className="flex justify-end items-center">
            <button
              type="submit"
              className="cursor-pointer rounded-sm px-8 py-2 border mt-4"
            >
              Next
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Step2Component;
