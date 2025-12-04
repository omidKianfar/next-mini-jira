"use client";

import {
  AddTaskFormComponent,
  BoardComponent,
  Button,
  clearTasks,
  Icon,
  ModalContainer,
  useAuth,
  useDispatch,
  useRequireUserStatus,
  useRouter,
  useState,
  useTaskListener,
} from "./imports";

const DashboardComponent = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const { user, logout } = useAuth();

  useRequireUserStatus();

  useTaskListener({ user });

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    dispatch(clearTasks());

    router.push("/signin");
  };

  return (
    <div className="w-full h-full p-4">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={handleLogout}>logout</Button>

        

        <Button
          onClick={handleOpenModal}
          icon={
            <Icon
              icon="fluent:task-list-square-add-20-filled"
              className="text-5xl text-blue-500 hover:text-blue-700"
            />
          }
        ></Button>
      </div>

      <BoardComponent />

      <ModalContainer open={open} handleClose={handleCloseModal}>
        <AddTaskFormComponent handleClose={handleCloseModal} />
      </ModalContainer>
    </div>
  );
};

export default DashboardComponent;
