'use client';

import HeroSectionComponent from './hero-section';
import FooterComponent from './footer';
import WorkflowComponent from './workflow';
import ProjectComponent from './project';
import TaskJourneyComponent from './task-journey-component';

const HomeComponent = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800 selection:bg-warning-100">
      <HeroSectionComponent />
      <ProjectComponent />
      <TaskJourneyComponent />
      <WorkflowComponent />
      <FooterComponent />
    </div>
  );
};

export default HomeComponent;
