'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // theme toggle
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: '🏠 Home', href: '/' },
    { label: '⚙️ Generator', href: '/generator' },
    { label: '🎨 Templates', href: '/templates' },
    { label: '📖 About', href: '/about' },
  ];

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 16 }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow'
          : 'bg-transparent'
      }`}
    >
      <div className='max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:py-4'>
        {/* Logo / Brand */}
        <Link
          href='/'
          className='text-xl sm:text-2xl font-extrabold tracking-tight'
        >
          <motion.span
            whileHover={{ scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            🖼️ SocialCardGen
          </motion.span>
        </Link>

        {/* Desktop nav */}
        <div className='hidden md:flex items-center space-x-4'>
          {links.map(({ label, href }) => (
            <Link key={href} href={href} className='whitespace-nowrap'>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button variant='ghost' size='sm'>
                  {label}
                </Button>
              </motion.div>
            </Link>
          ))}

          {/* Theme toggle button */}
          {mounted && (
            <Button
              variant='ghost'
              size='sm'
              onClick={toggleTheme}
              aria-label='Toggle dark mode'
            >
              {resolvedTheme === 'dark' ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </Button>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className='md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: open ? 'auto' : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className='md:hidden overflow-hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700'
      >
        <div className='flex flex-col px-4 py-3 space-y-2'>
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className='block rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700'
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          {/* Mobile theme toggle */}
          {mounted && (
            <button
              onClick={() => {
                toggleTheme();
                setOpen(false);
              }}
              className='flex items-center space-x-2 rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full'
            >
              {resolvedTheme === 'dark' ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
              <span>
                {resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </span>
            </button>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
}
