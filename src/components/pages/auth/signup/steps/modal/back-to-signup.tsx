import { SignupProps } from "../../../type";
import { ModalProps } from "@/src/components/atom/modal/type";

const BackToSignup = ({
  changeStep,
  handleClose,
}: Pick<SignupProps, "changeStep"> & Pick<ModalProps, "handleClose">) => {
  const BackProfile = () => {
    changeStep("0");
  };

  return (
    <div>
      <p>
        Your Account is created. when you back in signup step, you can't signup
        with this account again. you must login in to app and do payment and
        profile sepratly in your account
      </p>
      
      <button
        type="button"
        className="border-2 rounded-sm px-8 py-2 cursor-pointer"
        onClick={handleClose}
      >
        Cancel
      </button>
      <button
        type="button"
        className="border-2 rounded-sm px-8 py-2 cursor-pointer"
        onClick={BackProfile}
      >
        Back
      </button>
    </div>
  );
};

export default BackToSignup;
