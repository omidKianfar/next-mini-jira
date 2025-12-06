import { PulseLoader } from "../imports";

const PageLoading = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen ">
      <PulseLoader color="#3B82F6" size={30} />
    </div>
  );
};

export default PageLoading;
