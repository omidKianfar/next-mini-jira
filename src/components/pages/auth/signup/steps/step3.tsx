import React from "react";
import { SignupProps } from "../../type";

const Step3Component = ({ changeStep }: Pick<SignupProps, "changeStep">) => {
  const BackProfile = () => {
    changeStep("1");
  };

  return (
    <div>
      <button onClick={BackProfile}>Back</button>
    </div>
  );
};

export default Step3Component;
