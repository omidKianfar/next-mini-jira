'use client';

import { lazy, Suspense } from 'react';
import HeroSectionComponent from './hero-section';
import FooterComponent from './footer';
import LoadingCircle from '../../atom/loadings/loading-circle';

const WorkflowComponent = lazy(() => import('./workflow'));
const ProjectComponent = lazy(() => import('./project'));
const TaskJourneyComponent = lazy(() => import('./task-journey-component'));

const HomeComponent = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800 selection:bg-warning-100">
      <HeroSectionComponent />

      <Suspense
        fallback={
          <div className="flex h-64 items-center justify-center">
            <LoadingCircle size={40} />
          </div>
        }
      >
        <ProjectComponent />
      </Suspense>

      <Suspense
        fallback={
          <div className="flex h-64 items-center justify-center">
            <LoadingCircle size={40} />
          </div>
        }
      >
        <TaskJourneyComponent />
      </Suspense>

      <Suspense
        fallback={
          <div className="flex h-64 items-center justify-center">
            <LoadingCircle size={40} />
          </div>
        }
      >
        <WorkflowComponent />
      </Suspense>

      <FooterComponent />
    </div>
  );
};

export default HomeComponent;
