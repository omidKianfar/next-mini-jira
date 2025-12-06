import { useAuth } from "../../imports";
import SignupStep from "./steps/signup-step";
import ProfileStep from "./steps/profile-step";
import PaymentStep from "./steps/payment-step";
import PalnStep from "./steps/paln-step";
import PasswordStep from "./steps/password-step";

const SignupComponent = () => {
  const { stepNumber } = useAuth();

  const renderStep = () => {
    switch (stepNumber) {
      case "0":
        return <SignupStep />;
      case "1":
        return <ProfileStep />;
      case "2":
        return <PaymentStep />;
      case "3":
        return <PalnStep />;
      case "4":
        return <PasswordStep />;
      default:
        return null;
    }
  };

  return renderStep();
};

export default SignupComponent;
