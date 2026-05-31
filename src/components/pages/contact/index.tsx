'use client';

import { motion } from 'framer-motion';
import MyIcon from '../../atom/icon-components';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const CONTACT_LINKS = [
  {
    name: 'LinkedIn',
    value: 'Connect on Professional Network',
    icon: 'linkedin', // مطمئن شو این آیکون در کامپوننتت هست، در غیر این صورت از آیکون مناسب استفاده کن
    url: 'https://linkedin.com/in/your-profile',
    color: 'hover:border-blue-400 hover:bg-blue-50/30',
  },
  {
    name: 'GitHub',
    value: 'Check out Source Code & Projects',
    icon: 'github',
    url: 'https://github.com/your-username',
    color: 'hover:border-slate-400 hover:bg-slate-50',
  },
  {
    name: 'Email Direct',
    value: 'omid@example.com',
    icon: 'mail',
    url: 'mailto:omid@example.com',
    color: 'hover:border-warning-400 hover:bg-warning-50/30',
  },
];

const ContactComponent = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-white px-4 py-20 text-gray-600 lg:py-32">
      <div className="mx-auto w-full max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 lg:mb-16"
        >
          <h1 className="mb-4 text-h3 font-extrabold text-gray-800 lg:text-h1">
            Let’s <span className="text-warning-500">Connect</span>
          </h1>
          <p className="mx-auto max-w-xl text-body leading-relaxed text-slate-500">
            Whether you have a remote opportunity, a technical question, or just
            want to talk about frontend architecture—feel free to reach out.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto grid max-w-xl gap-4 sm:grid-cols-1"
        >
          {CONTACT_LINKS.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className={`flex cursor-pointer items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 ${link.color}`}
            >
              <div className="flex items-center gap-4 text-left">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-100 bg-slate-50 text-gray-700">
                  <MyIcon
                    icon={link.icon}
                    className="text-subtitle font-black"
                  />
                </div>
                <div>
                  <h3 className="text-label font-bold text-gray-800">
                    {link.name}
                  </h3>
                  <p className="text-caption text-slate-400">{link.value}</p>
                </div>
              </div>
              <MyIcon
                icon="arrow-right"
                className="text-slate-400 transition-transform duration-200 group-hover:text-gray-600"
              />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ContactComponent;
