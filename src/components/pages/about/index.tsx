'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Engineering_Highlights } from './data';

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
            A production-grade project management ecosystem engineered for
            high-performance workflows and seamless real-time collaboration.
          </p>
        </motion.div>

        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center text-title font-bold text-gray-800"
          >
            Engineering Highlights
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Engineering_Highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-xl border border-gray-100 bg-gray-50 p-6 shadow-sm"
              >
                <h3 className="mb-2 font-bold text-gray-800">{item.title}</h3>

                <p className="text-sm leading-relaxed text-gray-600">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-lg border border-gray-300 bg-gray-100 p-8 text-gray-700 shadow-xl lg:p-12"
        >
          <h2 className="mb-4 text-title font-bold">About the Developer</h2>

          <p className="mb-8 leading-relaxed text-gray-600">
            "Hi, I’m Omid Kianfar, a Senior Frontend Engineer with 6 years of
            experience in React.js and Next.js. I am a problem-solver who enjoys
            taking on complex technical challenges and learning new technologies
            to deliver high-quality solutions. My approach is to focus on clean
            architecture, performance, and user-centric features. Mini Jira is
            my engineering sandbox, where I experiment with new patterns and
            refine my development process using production-grade patterns and
            practices."
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/pdf/Omid-Kianfar-Resume.pdf"
              target="_blank"
              download
              className="rounded-lg bg-warning-500 px-6 py-3 text-center text-bodySm font-semibold text-gray-900 transition hover:bg-warning-400"
            >
              Download Full Resume
            </Link>

            <div className="flex items-center justify-center gap-6 font-semibold">
              <Link
                href="https://github.com/omidKianfar"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-warning-400"
              >
                GitHub
              </Link>

              <Link
                href="https://linkedin.com/in/kianfar-omid1990/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-warning-400"
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
