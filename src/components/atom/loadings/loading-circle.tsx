import { ClipLoader } from 'react-spinners';
interface LoadingProps {
  color?: string;
  size?: number;
}

const LoadingCircle = ({ color = '#3b82f6', size = 16 }: LoadingProps) => {
  return <ClipLoader color={color} size={size} />;
};

export default LoadingCircle;
