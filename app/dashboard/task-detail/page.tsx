import { Suspense } from 'react';
import FramerMotion from '@/src/components/atom/animation-component';
import PageLoading from '@/src/components/common/page-loading';
import TaskDetailComponent from '@/src/components/pages/dashboard/task-detail';

const TaskDeatailPage = () => {
  return (
    <FramerMotion>
      <Suspense fallback={<PageLoading />}>
        <TaskDetailComponent />
      </Suspense>
    </FramerMotion>
  );
};

export default TaskDeatailPage;
