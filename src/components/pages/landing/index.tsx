'use client';

import HeroSectionComponent from './hero-section';
import FooterComponent from './footer';
import WorkflowComponent from './workflow';
import FeaturesComponent from './feature';

const HomeComponent = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800 selection:bg-warning-100">
      <HeroSectionComponent />

      <WorkflowComponent />

      <FeaturesComponent />

      <FooterComponent />
    </div>
  );
};

export default HomeComponent;
