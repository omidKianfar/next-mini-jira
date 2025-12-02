import { UseSetStepNumberProps } from "../../type";
import { useEffect } from "../../imports";

export const useSetStepNumber = ({ setStepNumber }: UseSetStepNumberProps) => {
  useEffect(() => {
    const saved =
      typeof window !== "undefined" ? localStorage.getItem("step") : null;
    if (saved) setStepNumber(saved);
  }, []);
};
