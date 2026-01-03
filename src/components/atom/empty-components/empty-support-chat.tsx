import MyIcon from "@/src/components/atom/icon-components";

const AdminEmptySupportComponent = () => {
  return (
    <div className="h-full w-full">
      <div className="flex h-[calc(100vh-125px)] w-full items-center justify-center overflow-y-auto rounded-md border-2 border-warning-500 bg-white p-2 shadow-md lg:h-[calc(100vh-110px)] lg:p-4">
        <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-400 p-16 shadow-md">
          <h4 className="text-h4 text-gray-400">No chat history</h4>

          <MyIcon
            icon="line-md:chat-round-dots-filled"
            className="ml-2 text-h1 text-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminEmptySupportComponent;
