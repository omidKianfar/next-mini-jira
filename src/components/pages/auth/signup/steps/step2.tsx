import InputField from "@/src/components/atom/controllers/input-field";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ProfileSchema } from "../../schema";
import DateInputField from "@/src/components/atom/controllers/date-input-field";
import Image from "next/image";
import { useAuth } from "@/src/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { SignupProps } from "../../type";
import { ProfileProps } from "@/src/types/global";
import ModalContainer from "@/src/components/atom/modal";
import BackToSignup from "./modal/back-to-signup";

const Step2Component = ({ changeStep }: Pick<SignupProps, "changeStep">) => {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const { saveUserProfile, user } = useAuth();

  const photoRef = useRef<HTMLInputElement | null>(null);

  const defaultValues: ProfileProps = useMemo(
    () => ({
      photo: user?.photo ?? "",
      userName: user?.userName ?? "",
      birthday: user?.birthday ?? "",
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
    const userId = user?.userId as string;

    const data = {
      photo: values?.photo,
      userName: values?.userName,
      birthday: values?.birthday,
    };

    try {
      const result = await saveUserProfile({ userId, data }).unwrap();

      await queryClient.invalidateQueries({
        queryKey: ["userProfile", result.userId],
      });

      changeStep("2");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <div className="lg:w-[500px] border p-4 rounded-sm">
      <button
        type="button"
        className="border-2 rounded-sm px-8 py-2 cursor-pointer"
        onClick={handleOpenModal}
      >
        Back
      </button>

      <ModalContainer open={open} handleClose={handleCloseModal}>
        <BackToSignup changeStep={changeStep} handleClose={handleCloseModal} />
      </ModalContainer>

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
