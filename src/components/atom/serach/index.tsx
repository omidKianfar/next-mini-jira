"use client";

import {
  ChangeEvent,
  Icon,
  RootState,
  stringSlicer,
  useIsMobile,
  useRouter,
  useSelector,
  useState,
} from "../imports";

import { ModalProps } from "../type";

const SearchTasks = ({ handleClose }: Pick<ModalProps, "handleClose">) => {
  const router = useRouter();

  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const isMobile = useIsMobile();

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  const serachHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as string;

    setSearchValue(value);

    if (!value.trim()) {
      setFilteredTasks([]);
      setOpenMenu(false);
      return;
    }

    const query = value.toLowerCase();

    const filtered = tasks.filter((task) => {
      const title = task?.title.toLowerCase() || "";
      const description = task?.description.toLowerCase() || "";
      return title.includes(query) || description.includes(query);
    });

    setFilteredTasks(filtered);
    setOpenMenu(true);
  };

  return (
    <div className=" w-full">
      <h1 className="text-2xl font-bold text-amber-500 text-center mb-4">
        Search Todo
      </h1>
      <div className="relative">
        <Icon
          icon={"tabler:zoom"}
          className="absolute top-3 left-1 text-2xl text-blue-500"
        />

        {filteredTasks.length > 0 && (
          <Icon
            icon={"material-symbols:close-rounded"}
            className="absolute top-3 right-1 text-2xl text-gray-400 hover:text-red-500 cursor-pointer"
            onClick={() => {
              setSearchValue("");
              setFilteredTasks([]);
              setOpenMenu(false);
            }}
          />
        )}

        <input
          className="w-full my-1 border-2 py-2 rounded-lg border-blue-400 focus:outline-blue-600  text-sm px-8 shadow"
          value={searchValue}
          onChange={(event) => serachHandler(event)}
        />
      </div>

      {openMenu ? (
        filteredTasks.length > 0 ? (
          <div className=" mt-4  max-h-80 overflow-y-auto scrollbar-hide  ">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className=" bg-white border-2 border-amber-400 rounded-lg mb-4  flex justify-between items-center cursor-pointer "
                onClick={() => {
                  router.push(`/dashboard/task-detail?taskId=${task.id}`);
                  handleClose();
                }}
              >
                <div className="w-full">
                  <div className="flex justify-between items-center p-1 bg-amber-400 rounded-t-lg ">
                    <Icon
                      icon={
                        task.tag == "bug"
                          ? "solar:bug-bold-duotone"
                          : "material-symbols:task"
                      }
                      className="mr-1 text-white text-2xl"
                    />
                  </div>

                  <div className=" p-2">
                    <p className="wrap-break-word font-bold mb-2 text-blue-500">
                      {stringSlicer({
                        string: task.title,
                        slice: isMobile ? 25 : 50,
                      })}
                    </p>

                    <p className="wrap-break-word text-sm">
                      {stringSlicer({
                        string: task.description,
                        slice: isMobile ? 50 : 100,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className=" mt-1 bg-white border rounded shadow p-3 text-gray-500 z-20">
            No results
          </div>
        )
      ) : null}
    </div>
  );
};

export default SearchTasks;
