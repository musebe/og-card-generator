'use client';

import { motion } from 'motion/react';

/* eslint-disable @next/next/no-img-element */

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className='mt-auto bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-6'
    >
      <div className='mx-auto max-w-7xl flex flex-col items-center gap-4 px-4 text-center'>
        {/* Tagline */}
        <p className='text-sm font-medium'>
          Dynamic Social Media Card Generator — real-time Open Graph images with
          customizable templates, dynamic overlays, and CMS integration.
        </p>

        {/* Tech badges */}
        <div className='flex flex-wrap justify-center gap-3 text-xs'>
          <a
            href='https://nextjs.org/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='https://img.shields.io/badge/Next.js-15-black?logo=next.js'
              alt='Next.js badge'
              width={130}
              height={24}
            />
          </a>
          <a
            href='https://cloudinary.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='https://img.shields.io/badge/Cloudinary-Dynamic_OG-lightblue?logo=cloudinary'
              alt='Cloudinary badge'
              width={200}
              height={24}
            />
          </a>
          <a
            href='https://tailwindcss.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='https://img.shields.io/badge/TailwindCSS-4.0-38BDF8?logo=tailwindcss'
              alt='Tailwind CSS badge'
              width={160}
              height={24}
            />
          </a>
          <a
            href='https://ui.shadcn.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='https://img.shields.io/badge/shadcn.ui-Tailwind_Components-pink?logo=tailwindcss'
              alt='shadcn/ui badge'
              width={180}
              height={24}
            />
          </a>
          <a
            href='https://motion.dev/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='https://img.shields.io/badge/Motion.dev-Animations-orange?logo=framer'
              alt='Motion.dev badge'
              width={170}
              height={24}
            />
          </a>
        </div>

        {/* Credits */}
        <p className='text-xs text-gray-500 dark:text-gray-400'>
          Built by{' '}
          <a
            href='https://github.com/musebe'
            target='_blank'
            rel='noopener noreferrer'
            className='underline hover:text-gray-700 dark:hover:text-gray-200'
          >
            Eugine Musebe
          </a>{' '}
          ·{' '}
          <a
            href='https://github.com/musebe/socialcardgen'
            target='_blank'
            rel='noopener noreferrer'
            className='underline hover:text-gray-700 dark:hover:text-gray-200'
          >
            View source on GitHub
          </a>
        </p>
      </div>
    </motion.footer>
  );
}

/* eslint-enable @next/next/no-img-element */
