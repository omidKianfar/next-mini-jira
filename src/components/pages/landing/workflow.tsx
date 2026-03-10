'use client';

import { IconName, motion, MyIcon } from '../imports';
import { containerVariants, itemVariants, TECH_STACK } from './data';

const WorkflowComponent = () => {
  return (
    <div className="border-y border-gray-100 bg-white py-[32px]">
      <div className="mx-auto px-4 text-center">
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
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-5 lg:justify-center lg:gap-x-12 lg:gap-y-10"
        >
          {TECH_STACK.map((tech, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.1,
                color: '#F59E0B',
              }}
              className="flex cursor-default items-center gap-3 transition-colors duration-300"
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
    </div>
  );
};

export default WorkflowComponent;
