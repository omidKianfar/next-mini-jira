import { LoadingProps } from "../type";
import { ClipLoader } from "../imports";

const ButtonLoading = ({ color, size }: LoadingProps) => {
  return <ClipLoader color={color} size={size} />;
};

export default ButtonLoading;
