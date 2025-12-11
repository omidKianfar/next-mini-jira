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
      <h1 className="font-semibold text-warning-500">
        Your account has been created.
      </h1>

      <p className="mt-4">
        If you return to the signup step, you won’t be able to register with
        this account again. You must log in to the app and complete the payment
        and profile setup separately in your account.
      </p>

      <div className="mt-8 flex justify-center gap-4 lg:justify-end">
        <ButtonNext onClick={handleClose}>Cancel</ButtonNext>

        <ButtonNext onClick={BackProfile}>Back</ButtonNext>
      </div>
    </div>
  );
};

export default BackToSignup;
