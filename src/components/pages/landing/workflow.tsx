'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { MouseEvent } from 'react';
import MyIcon from '../../atom/icon-components';
import { IconName } from '../../atom/icon-components/icons';
import { containerVariants, itemVariants, TECH_STACK } from './data';

const WorkflowComponent = () => {
  const mouseXProgress = useMotionValue(0);

  const smoothXProgress = useSpring(mouseXProgress, {
    stiffness: 500,
    damping: 15,
    mass: 0.2,
  });

  const background = useTransform(smoothXProgress, (x) => {
    const start = x - 5;
    const end = x + 5;

    return `linear-gradient(115deg, 
        transparent ${start}%, 
        rgba(245, 158, 11, 0.2) ${x}%, 
        transparent ${end}%
      )`;
  });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX } = event;
    const { left, width } = currentTarget.getBoundingClientRect();

    const xPercentage = ((clientX - left) / width) * 100;
    mouseXProgress.set(xPercentage);
  };

  const handleMouseLeave = () => {
    mouseXProgress.set(-50);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ background }}
      className="relative overflow-hidden border-y border-gray-100 bg-white py-[32px] transition-colors duration-500"
    >
      <div className="relative z-10 mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-[48px] text-subtitle font-semibold text-gray-600 lg:text-title"
        >
          Powering the Modern Engineering Workflow
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-3 justify-items-center gap-x-4 gap-y-6 lg:flex lg:flex-wrap lg:items-center lg:justify-center lg:gap-x-12 lg:gap-y-10"
        >
          {TECH_STACK.map((tech, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.1,
                color: '#F59E0B',
              }}
              className="flex cursor-default items-center gap-2 transition-colors duration-300"
            >
              <MyIcon
                icon={tech.icon as IconName}
                className="font-black text-gray-500 lg:text-subtitle"
              />

              <span className="whitespace-nowrap font-black text-gray-500 lg:text-subtitle">
                {tech.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WorkflowComponent;
