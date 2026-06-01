'use client';

import { motion } from 'framer-motion';
import MyIcon from '../../atom/icon-components';
import { IconName } from '../../atom/icon-components/icons';
import { CONTACT_LINKS } from './data';
import { enqueueSnackbar } from 'notistack';

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
} as const;

const ContactComponent = () => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);

    enqueueSnackbar('Copied', { variant: 'success' });
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-white px-4 py-20 text-gray-600 lg:py-24">
      <div className="max-w-h4 mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 lg:mb-10"
        >
          <h1 className="mb-4 text-h3 font-extrabold text-gray-800 lg:text-h2">
            Let’s <span className="text-warning-500">Connect</span>
          </h1>

          <p className="mx-auto max-w-xl text-body leading-relaxed text-gray-500">
            Whether you have a remote opportunity, a technical question, or just
            want to talk about frontend architecture—feel free to reach out.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto grid max-w-xl grid-cols-1 gap-4"
        >
          {CONTACT_LINKS.map((link, index) => {
            const isEmail = link.isEmail;

            return isEmail ? (
              <motion.button
                key={index}
                onClick={() => handleCopy(link.value)}
                variants={itemVariants}
                className={`flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 ${link.color}`}
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 text-gray-700">
                    <MyIcon
                      icon={link.icon as IconName}
                      className="text-subtitle font-black"
                    />
                  </div>

                  <div>
                    <h3 className="text-label font-bold text-gray-800">
                      {link.name}
                    </h3>

                    <p className="text-label text-gray-400">{link.value}</p>
                  </div>
                </div>

                <MyIcon icon="copy" className="text-title text-gray-400" />
              </motion.button>
            ) : (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className={`flex cursor-pointer items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 ${link.color}`}
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 text-gray-700">
                    <MyIcon
                      icon={link.icon as IconName}
                      className="text-subtitle font-black"
                    />
                  </div>

                  <div>
                    <h3 className="text-label font-bold text-gray-800">
                      {link.name}
                    </h3>

                    <p className="text-label text-gray-400">{link.value}</p>
                  </div>
                </div>

                <MyIcon
                  icon="arrow-right"
                  className="text-title text-gray-400"
                />
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default ContactComponent;
