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
import EmptyColumn from "../../organisms/board/empty-column";

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
          className="my-1 w-full rounded-lg border-2 border-primary-400 px-8 py-2 text-bodySm shadow-sm focus:outline-primary-600"
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
                  <div>
                    <div className="rounded-t-lg bg-gradient-to-r from-warning-400 via-warning-300 to-warning-400 p-2 shadow-md">
                      <p className="break-word text-bodySm font-bold">
                        {stringSlicer({
                          string: task.title,
                          slice: isMobile ? 45 : 90,
                        })}
                      </p>
                    </div>

                    <p className="break-words p-2 text-bodySm">
                      {stringSlicer({
                        string: task.description,
                        slice: isMobile ? 90 : 180,
                      })}
                    </p>
                  </div>
                  <div className="flex items-center justify-between rounded-b-lg bg-gradient-to-r from-warning-400 via-warning-300 to-warning-400 px-2 py-1">
                    <MyIcon
                      icon={
                        task.tag == "bug"
                          ? "solar:bug-bold-duotone"
                          : "material-symbols:task"
                      }
                      className="mr-2 text-title text-white"
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
