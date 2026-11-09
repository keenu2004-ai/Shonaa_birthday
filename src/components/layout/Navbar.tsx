import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X, Sparkles, Compass, Film, BookOpen, Gift } from 'lucide-react';
import { loveStoryConfig } from '../../config/loveStory';

interface NavbarProps {
  onOpenBirthdayCelebration?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBirthdayCelebration }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Our Story', href: '#story', icon: BookOpen },
    { label: 'Counter', href: '#counter', icon: Heart },
    { label: 'Memories', href: '#gallery', icon: Sparkles },
    { label: 'Videos', href: '#videos', icon: Film },
    { label: 'Fights & Laughs', href: '#fights', icon: Heart },
    { label: 'Travel', href: '#travel', icon: Compass },
    { label: 'Her Dreams', href: '#dreams', icon: Sparkles },
    { label: 'Letters', href: '#letters', icon: BookOpen },
    { label: 'Birthday', href: '#countdown', icon: Gift },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-ivory-100/90 backdrop-blur-md shadow-sm border-b border-blush-200/60 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-blush-100 group-hover:bg-burgundy text-burgundy group-hover:text-champagne flex items-center justify-center transition-colors duration-300">
            <Heart className="w-4 h-4 fill-current" />
          </div>
          <span className="font-serif font-bold text-lg sm:text-xl text-burgundy tracking-tight">
            {loveStoryConfig.names.websiteTitle}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-espresso-soft hover:text-burgundy hover:bg-blush-100/80 transition-colors duration-200 font-sans"
            >
              {link.label}
            </a>
          ))}

          {/* Special Quick Birthday Surprise Button */}
          {onOpenBirthdayCelebration && (
            <button
              onClick={onOpenBirthdayCelebration}
              className="ml-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-burgundy hover:bg-burgundy-light text-ivory-100 shadow-sm hover:shadow transition-all duration-200 flex items-center gap-1.5"
            >
              <Gift className="w-3.5 h-3.5 text-champagne" />
              <span>Surprise</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center gap-2">
          {onOpenBirthdayCelebration && (
            <button
              onClick={onOpenBirthdayCelebration}
              className="p-2 rounded-full bg-blush-100 text-burgundy"
              aria-label="Birthday celebration trigger"
            >
              <Gift className="w-4 h-4 text-burgundy" />
            </button>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-blush-100/80 text-burgundy hover:bg-blush-200 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-ivory-100/98 backdrop-blur-lg border-b border-blush-200 shadow-xl overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-espresso hover:bg-blush-100 hover:text-burgundy transition-colors"
                  >
                    <Icon className="w-4 h-4 text-rose-vintage" />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
