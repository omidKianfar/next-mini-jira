import { ClipLoader } from "react-spinners";
import { LoadingProps } from "./type";

const ButtonLoading = ({ color, size }: LoadingProps) => {
  return <ClipLoader color={color} size={size} />;
};

export default ButtonLoading;
