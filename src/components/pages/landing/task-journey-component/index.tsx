'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TASK_JOURNEY_STEPS } from '../data';
import AnimatedStepCard from './animated-step-card';

const TaskJourneyComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollingContainerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [scrollRange, setScrollRange] = useState(0);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    setIsMounted(true);
    const el = document.getElementById('main-scroll-container');

    if (el) {
      setScrollContainer(el);
    }
  }, []);

  useEffect(() => {
    if (scrollingContainerRef.current) {
      setScrollRange(
        scrollingContainerRef.current.scrollWidth - window.innerWidth
      );
    }
  }, [isMounted]);

  const { scrollYProgress } = useScroll({
    target: isMounted ? containerRef : undefined,
    container: scrollContainer ? { current: scrollContainer } : undefined,
    offset: ['start start', 'end end'],
  });

  const xTransform = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  if (!isMounted) {
    return <div className="h-[250vh] bg-gray-50/50 lg:h-[300vh]" />;
  }

  return (
    <div
      ref={containerRef}
      className="relative h-[250vh] w-full bg-white lg:h-[300vh]"
    >
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden pl-16 lg:pl-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.15),transparent_70%)]" />

        <motion.div
          ref={scrollingContainerRef}
          style={{ x: xTransform }}
          className="flex flex-row items-start gap-[60px] will-change-transform lg:gap-[150px]"
        >
          {TASK_JOURNEY_STEPS.map((step, index) => (
            <AnimatedStepCard key={index} step={step} index={index} />
          ))}

          <div className="w-[25px] flex-shrink-0" />
        </motion.div>
      </div>
    </div>
  );
};

export default TaskJourneyComponent;
