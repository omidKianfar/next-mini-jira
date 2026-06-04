'use client';

import { motion } from 'framer-motion';
import { TECH_STACK } from './data';

const WorkflowComponent = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' } as const,
    },
  };

  return (
    <motion.div className="relative overflow-hidden border-y border-gray-100 bg-white py-12 transition-colors duration-500">
      <div className="relative z-10 mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-subtitle font-semibold text-gray-600 lg:text-title"
        >
          Powering the Modern Engineering Workflow
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-8 lg:flex lg:flex-wrap lg:items-center lg:justify-center lg:gap-x-12 lg:gap-y-10"
        >
          {TECH_STACK.map((tech, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.1,
                color: '#F59E0B',
              }}
              className="flex w-32 cursor-default items-center justify-center text-center transition-colors duration-300 lg:w-auto"
            >
              <span className="break-words font-black text-gray-500 lg:text-subtitle">
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
