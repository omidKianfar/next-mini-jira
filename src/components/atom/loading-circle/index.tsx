import { ClipLoader } from "react-spinners";
import { LoadingProps } from "../type";

const LoadingCircle = ({ color = "#3b82f6", size = 16 }: LoadingProps) => {
  return <ClipLoader color={color} size={size} />;
};

export default LoadingCircle;
