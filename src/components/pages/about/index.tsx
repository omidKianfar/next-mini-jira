'use client';

import { motion } from 'framer-motion';
import MyImage from '../../atom/image-components';
import Link from 'next/link';

const AboutComponent = () => {
  return (
    <div className="bg-white px-4 py-16 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center lg:mb-24"
        >
          <h1 className="mb-4 text-h3 font-extrabold text-gray-800 lg:text-h1">
            Behind <span className="text-warning-500">Mini Jira</span>
          </h1>

          <p className="mx-auto max-w-2xl text-body leading-relaxed text-gray-600">
            A high-performance project management tool designed to strip away
            the bloat and deliver speed, precision, and real-time collaboration.
          </p>
        </motion.div>

        <div className="mb-20 text-center lg:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-title font-bold text-gray-800">
              The Motivation
            </h2>

            <p className="mb-4 text-body leading-relaxed text-gray-600">
              Traditional project management tools can feel heavy, cluttered,
              and slow. Mini Jira was engineered from scratch to tackle these
              exact pain points. By focusing heavily on frontend performance,
              state hydration, and optimistic UI updates, this platform ensures
              that managing your sprint is as fast as typing code.
            </p>
          </motion.div>
        </div>

        <div className="mb-20 lg:mb-32">
          <h2 className="mb-4 text-center text-title font-bold text-gray-800">
            Engineering Challenges
          </h2>

          <p className="mx-auto mb-12 max-w-xl text-center text-body text-gray-600">
            How complex frontend engineering problems were solved during
            development.
          </p>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <h3 className="mb-2 flex items-center gap-2 font-bold text-gray-800">
                Real-time State Desynchronization
              </h3>

              <p className="text-label leading-relaxed text-gray-600">
                <strong className="text-warning-500">Solution:</strong>{' '}
                Implemented a strict event-driven state architecture using
                Socket.io combined with optimistic UI updates. If a server
                synchronization fails, the UI gracefully rolls back to the
                previous stable state, preventing layout shifts and ensuring
                data consistency.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <h3 className="mb-2 flex items-center gap-2 font-bold text-gray-800">
                Kanban Board Performance Dropping on Drag
              </h3>

              <p className="text-label leading-relaxed text-gray-600">
                <strong className="text-warning-500">Solution:</strong>{' '}
                Engineered optimized collision detection algorithms using{' '}
                <code className="rounded bg-gray-100 px-1 text-warning-600">
                  @dnd-kit
                </code>
                . Memoized list items and columns heavily, reducing unnecessary
                re-renders during active drag operations to maintain a steady
                60fps interaction model.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8 rounded-2xl border border-gray-100 bg-gray-50/50 p-8 shadow-sm lg:flex-row lg:p-12"
        >
          <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-white shadow-inner">
            <span className="text-h4 font-extrabold text-gray-300">OK</span>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="mb-2 text-title font-bold text-gray-800">
              About the Developer
            </h2>

            <p className="mb-4 max-w-2xl text-body leading-relaxed text-gray-600">
              Hi, I’m Omid Kianfar. A Frontend Engineer passionate about
              crafting highly interactive, performant, and production-ready web
              applications. Mini Jira serves as a playground for testing
              advanced React patterns, state management solutions, and
              micro-interactions.
            </p>

            <div className="flex justify-center gap-4 text-label font-semibold text-warning-600 lg:justify-start">
              <Link
                target="_blank"
                href="https://github.com/omidKianfar"
                className="cursor-pointer hover:underline"
              >
                GitHub
              </Link>

              <span className="text-gray-300">•</span>

              <Link
                target="_blank"
                href="https://linkedin.com/in/kianfar-omid1990/"
                className="cursor-pointer hover:underline"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutComponent;
