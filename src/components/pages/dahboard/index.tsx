"use client";

import {
  AddTaskFormComponent,
  BoardComponent,
  Button,
  ModalContainer,
  useAuth,
  useRequireUserStatus,
  useRouter,
  useState,
} from "./imports";

const DashboardComponent = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { user, logout } = useAuth();

  console.log(user);

  useRequireUserStatus();

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push("/signin");
  };

  return (
    <div className="w-full h-full p-4">
      <div>
        <Button
          onClick={handleOpenModal}
          className=" bg-blue-500 text-white border-2
           hover:bg-transparent hover:border-blue-500
           hover:text-blue-500 rounded-lg px-8 py-2 
           transition-all duration-200"
        >
          Add Task
        </Button>
        <Button onClick={handleLogout}>logout</Button>

        <ModalContainer open={open} handleClose={handleCloseModal}>
          <AddTaskFormComponent handleClose={handleCloseModal} />
        </ModalContainer>
      </div>

      <BoardComponent />
    </div>
  );
};

export default DashboardComponent;
