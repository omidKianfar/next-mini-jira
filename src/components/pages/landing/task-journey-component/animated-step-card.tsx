import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';

const splitText = (text: string) => {
  return text ? text.split(' ') : [];
};

const AnimatedStepCard = ({ step, index }: { step: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(cardRef, { once: false, amount: 0.05 });
  const titleWords = splitText(step.title);
  const isFirstStep = index === 0;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const elementVariants = {
    hidden: {
      opacity: isFirstStep ? 1 : 0,
      y: isFirstStep ? 0 : 12,
      filter: isFirstStep ? 'blur(0px)' : 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 15,
      },
    },
  } as const;

  const wordVariants = {
    hidden: {
      opacity: isFirstStep ? 1 : 0,
      y: isFirstStep ? 0 : 15,
      filter: isFirstStep ? 'blur(0px)' : 'blur(5px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 60,
        damping: 14,
      },
    } as const,
  };

  return (
    <motion.div
      ref={cardRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView || isFirstStep ? 'visible' : 'hidden'}
      className="flex h-full w-[85vw] flex-shrink-0 flex-col items-start justify-center space-y-4 px-4 text-left will-change-transform lg:w-[580px]"
    >
      <div className="flex w-full flex-wrap overflow-visible py-1">
        {titleWords.map((word, wordIndex) => (
          <div key={wordIndex} className="inline-block overflow-visible">
            <motion.span
              variants={wordVariants}
              className="mr-[0.2em] inline-block select-none text-h4 font-extrabold tracking-tight text-gray-900 lg:text-h1"
            >
              {word}
            </motion.span>
          </div>
        ))}
      </div>

      <motion.p
        variants={elementVariants}
        className="max-w-xl text-bodySm leading-relaxed text-gray-500 lg:text-body"
      >
        {step.description}
      </motion.p>
    </motion.div>
  );
};

export default AnimatedStepCard;
