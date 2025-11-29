import { PulseLoader } from "react-spinners";

const PageLoading = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen ">
      <PulseLoader color="#3B82F6" size={50} />
    </div>
  );
};

export default PageLoading;
