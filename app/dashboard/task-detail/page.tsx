import FramerMotion from "@/src/components/atom/animation";
import TaskDetailComponent from "@/src/components/pages/dahboard/detail";

const DashboardPage = () => {
  return (
    <FramerMotion>
      <TaskDetailComponent />
    </FramerMotion>
  );
};

export default DashboardPage;
