"use client";

import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";

// hooks
import { useNavigation } from "@/src/hooks/navigation";
import { useIsMobile } from "@/src/hooks/mobile-size";

// type
import { ModalProps } from "../../molecule/type";
import { Task } from "@/src/types/global";

// redux
import { RootState } from "@/src/store";

// ui
import MyIcon from "../../atom/icon";
import EmptyColumn from "../board/empty-column";

// utiles
import { stringSlicer } from "../../utils/string-slicer";

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
        Search Todo
      </h1>

      <div className="mb-4 rounded-lg bg-gray-50 p-1 shadow-md">
        <div className="relative rounded-lg bg-gray-100 p-1">
          <MyIcon
            icon="tabler:zoom"
            className="absolute left-2 top-4 text-title text-primary-500"
          />

          {filteredTasks.length > 0 && (
            <MyIcon
              icon="material-symbols:close-rounded"
              className="absolute right-2 top-4 cursor-pointer text-title text-gray-400 hover:text-error-500"
              onClick={handelClear}
            />
          )}

          <input
            className="my-1 w-full rounded-lg border-2 border-primary-400 px-8 py-2 text-bodySm shadow-md focus:outline-primary-700"
            value={searchValue}
            onChange={(event) => serachHandler(event)}
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
                  <div className="rounded-lg border border-gray-100 bg-gray-50 shadow-md">
                    <div className="p-2">
                      <p className="break-word text-bodySm font-bold">
                        {stringSlicer({
                          string: task.title,
                          slice: isMobile ? 50 : 100,
                        })}
                      </p>
                    </div>

                    <div className="border-t-2 border-dotted">
                      <p className="break-words p-2 text-bodySm">
                        {stringSlicer({
                          string: task.description,
                          slice: isMobile ? 100 : 200,
                        })}
                      </p>
                    </div>
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
