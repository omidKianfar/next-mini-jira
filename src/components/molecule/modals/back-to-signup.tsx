import { useAuth } from "@/src/hooks/auth/use-auth";
import { ModalProps } from "../type";
import ButtonNext from "../../atom/button/button-next";

const BackToSignup = ({ handleClose }: Pick<ModalProps, "handleClose">) => {
  const { changeStep } = useAuth();

  const BackProfile = () => {
    changeStep("0");
  };

  return (
    <div>
      <h1 className="mb-4 text-subtitle font-semibold text-warning-500">
        Your account has been created.
      </h1>

      <p className="mt-4 break-words rounded-lg bg-gray-100 p-2 text-body text-blue-500 shadow-md">
        If you return to the signup step, you will no longer be able to register
        with this account. You will need to log in to the app and complete the
        payment and profile setup separately.
      </p>

      <div className="mt-4 flex justify-center gap-4 lg:justify-end">
        <ButtonNext onClick={handleClose}>Cancel</ButtonNext>

        <ButtonNext onClick={BackProfile}>Back</ButtonNext>
      </div>
    </div>
  );
};

export default BackToSignup;
