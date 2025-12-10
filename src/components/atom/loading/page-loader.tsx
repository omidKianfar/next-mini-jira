import { PulseLoader } from "../imports";

const PageLoading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <PulseLoader color="#3B82F6" size={30} />
    </div>
  );
};

export default PageLoading;
