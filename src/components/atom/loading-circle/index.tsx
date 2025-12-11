import { ClipLoader } from "react-spinners";
import { LoadingProps } from "../type";

const LoadingCircle = ({ color, size }: LoadingProps) => {
  return <ClipLoader color={color} size={size} />;
};

export default LoadingCircle;
