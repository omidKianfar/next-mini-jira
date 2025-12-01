import { Button } from "../../../imports";
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
      <h1 className="text-amber-500 font-semibold">Your account has been created.</h1>
     
      <p className="mt-4">
        If you return to the signup step, you won’t be able to register with
        this account again. You must log in to the app and complete the payment
        and profile setup separately in your account.
      </p>

      <div className="flex justify-end gap-4 mt-8">
        <Button
          onClick={handleClose}
          className="bg-blue-500 text-white border-2
                 hover:bg-transparent hover:border-blue-500
               hover:text-blue-500 rounded-lg px-8 py-2 
                transition-all duration-200
            "
        >
          Cancel
        </Button>

        <Button
          onClick={BackProfile}
          className="bg-blue-500 text-white border-2
                 hover:bg-transparent hover:border-blue-500
               hover:text-blue-500 rounded-lg px-10 py-2 
                transition-all duration-200
            "
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default BackToSignup;
