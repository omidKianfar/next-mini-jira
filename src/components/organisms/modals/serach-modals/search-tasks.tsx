"use client";

import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";

// hooks
import { useNavigation } from "@/src/hooks/navigation/use-navigation";
import { useIsMobile } from "@/src/hooks/mobile-size/use-is-mobile";

// type
import { Task, ModalProps } from "@/src/types/global";

// redux
import { RootState } from "@/src/store";

// ui
import MyIcon from "../../../atom/icon-components";
import EmptyColumn from "../../../atom/empty-components/empty-column";

// utils
import { stringSlicer } from "@/src/utils/string-slicer";

const SearchTasks = ({ handleClose }: Pick<ModalProps, "handleClose">) => {
  // hooks
  const navigation = useNavigation();
  const isMobile = useIsMobile();

  // redux
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  // states
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  // functions
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
      <h1 className="mb-4 text-center text-subtitle font-bold text-warning-500">
        Search Tasks
      </h1>

      <div className="relative mb-4 rounded-lg border-2 border-warning-400 bg-gray-50 p-2 shadow-md">
        <div>
          <MyIcon
            icon="tabler:zoom"
            className="absolute left-3 top-5 text-title text-primary-500"
          />

          {filteredTasks.length > 0 && (
            <MyIcon
              icon="material-symbols:close-rounded"
              className="absolute right-3 top-5 cursor-pointer text-title text-gray-400 hover:text-error-500"
              onClick={handelClear}
            />
          )}

          <input
            className="my-1 w-full rounded-lg border-2 border-primary-400 px-8 py-2 text-bodySm shadow-md focus:outline-primary-700"
            value={searchValue}
            onChange={(event) => serachHandler(event)}
            autoFocus
          />
        </div>
      </div>

      {openMenu ? (
        filteredTasks.length > 0 ? (
          <div className="scrollbar-hide mt-4 max-h-80 overflow-y-auto">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="mb-4 flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-warning-400 bg-white shadow-md"
                onClick={() => {
                  navigation.taskDetail(task.id);
                  handleClose();
                }}
              >
                <div className="w-full p-1">
                  <div className="rounded-lg border border-gray-300 bg-gray-50 shadow-md">
                    <div className="p-2">
                      <p className="break-word text-bodySm font-bold">
                        {stringSlicer({
                          string: task.title,
                          slice: isMobile ? 50 : 100,
                        })}
                      </p>
                    </div>

                    <hr className="mx-2 border border-dashed border-gray-300" />

                    <p className="break-words p-2 text-bodySm">
                      {stringSlicer({
                        string: task.description,
                        slice: isMobile ? 100 : 200,
                      })}
                    </p>
                  </div>

                  <div className="flex items-center justify-between rounded-b-lg px-2 pb-1 pt-2">
                    <MyIcon
                      icon={
                        task.tag == "bug"
                          ? "solar:bug-bold-duotone"
                          : "material-symbols:task"
                      }
                      className="mr-2 text-title text-warning-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-2">
            <EmptyColumn />
          </div>
        )
      ) : null}
    </div>
  );
};

export default SearchTasks;
