"use client";

import { useNavigation } from "@/src/hooks/navigation";
import { ModalProps } from "../type";
import { useSelector } from "react-redux";
import { useIsMobile } from "@/src/hooks/mobile-size";
import { ChangeEvent, useState } from "react";
import { Task } from "@/src/types/global";
import { RootState } from "@/src/store";
import MyIcon from "../../atom/icon";
import { stringSlicer } from "../../utils/string-slicer";

const SearchTasks = ({ handleClose }: Pick<ModalProps, "handleClose">) => {
  const navigation = useNavigation();

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

  const handelClear = () => {
    setSearchValue("");
    setFilteredTasks([]);
    setOpenMenu(false);
  };

  return (
    <div className="w-full">
      <h1 className="mb-4 text-center text-title font-bold text-warning-500">
        Search Todo
      </h1>

      <div className="relative">
        <MyIcon
          icon="tabler:zoom"
          className="absolute left-1 top-3 text-title text-primary-500"
        />

        {filteredTasks.length > 0 && (
          <MyIcon
            icon="material-symbols:close-rounded"
            className="absolute right-1 top-3 cursor-pointer text-title text-gray-400 hover:text-error-500"
            onClick={handelClear}
          />
        )}

        <input
          className="my-1 w-full rounded-xl border-2 border-primary-400 px-8 py-2 text-bodySm shadow-sm focus:outline-primary-600"
          value={searchValue}
          onChange={(event) => serachHandler(event)}
        />
      </div>

      {openMenu ? (
        filteredTasks.length > 0 ? (
          <div className="scrollbar-hide mt-4 max-h-80 overflow-y-auto">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="mb-4 flex cursor-pointer items-center justify-between rounded-xl border-2 border-warning-400 bg-white"
                onClick={() => {
                  navigation.taskDetail(task.id);
                  handleClose();
                }}
              >
                <div className="w-full">
                  <MyIcon
                    icon={
                      task.tag == "bug"
                        ? "solar:bug-bold-duotone"
                        : "material-symbols:task"
                    }
                    className="flex items-center justify-between rounded-t-xl bg-gradient-to-r from-warning-500 via-warning-400 to-warning-500 p-1 text-title text-white"
                  />

                  <div className="p-2">
                    <p className="wrap-break-word mb-2 font-bold text-primary-500">
                      {stringSlicer({
                        string: task.title,
                        slice: isMobile ? 25 : 50,
                      })}
                    </p>

                    <p className="wrap-break-word text-bodySm">
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
          <div className="z-20 mt-1 rounded-xl border-2 bg-white p-3 text-gray-500 shadow-sm">
            No results
          </div>
        )
      ) : null}
    </div>
  );
};

export default SearchTasks;
