import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, Github, Linkedin, Instagram, ArrowRight
} from 'lucide-react';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/sohanmahmud', label: 'Github' },
  { icon: Linkedin, href: 'https://linkedin.com/in/sohanmahmud', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com/sohanmahmud', label: 'Instagram' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // CRITICAL FIX: Body Scroll Lock
  // Prevents the background site from scrolling when the mobile menu is open.
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/' + href);
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const LogoBrand = ({ isMobile = false, onClick }: { isMobile?: boolean, onClick: (e: React.MouseEvent) => void }) => (
    <a 
      href="#home"
      className="flex items-center gap-2 cursor-pointer group pointer-events-auto" 
      onClick={onClick}
    >
      <div className={`relative ${isMobile ? 'w-8 h-8' : 'w-9 h-9 sm:w-10 sm:h-10'} flex items-center justify-center`}>
         <div className="absolute inset-0 bg-gradient-to-br from-[#06b6d4] to-purple-600 rounded-lg blur-[2px] opacity-60 group-hover:opacity-100 transition-opacity"></div>
         <div className="relative w-full h-full bg-[#0f172a] border border-white/10 rounded-lg flex items-center justify-center text-white transform group-hover:rotate-12 transition-transform duration-500 overflow-hidden">
            {/* এখানে আপনার logoicon.png বসানো হয়েছে */}
            <img src="/logoicon.png" alt="Sohan Mahmud Logo" className="w-full h-full object-cover" />
         </div>
      </div>
      <div className="flex flex-col leading-tight overflow-hidden text-left">
        <span className={`font-bold ${isMobile ? 'text-sm' : 'text-base sm:text-lg'} text-white tracking-wider group-hover:text-[#06b6d4] transition-colors truncate uppercase`}>SOHAN MAHMUD</span>
        {!isMobile && (
          <span className="text-[8px] sm:text-[9px] text-gray-400 uppercase tracking-[0.25em] font-medium hidden xs:block">INTERFACE ARCHITECT</span>
        )}
      </div>
    </a>
  );

  return (
    <>
      {/* --- MAIN HEADER (Desktop & Toggle) --- */}
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] h-20 flex items-center transition-all duration-500 ease-in-out ${
          scrolled
            ? 'bg-[#0f172a]/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-xl'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center relative z-20">
          <LogoBrand onClick={(e) => handleNavClick(e, '#home')} />

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex gap-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-gray-400 hover:text-white transition-all font-bold text-[11px] uppercase tracking-[0.2em] relative group py-2"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#06b6d4] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-5 py-2 rounded-lg bg-cyan-500/10 border border-[#06b6d4]/40 text-[#06b6d4] font-bold text-[10px] uppercase tracking-[0.15em] hover:bg-[#06b6d4] hover:text-[#0f172a] transition-all duration-300 flex items-center gap-2"
            >
              HIRE ME <ArrowRight size={12} />
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white transition-all active:scale-90 z-[100]"
            onClick={() => setIsOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* --- COMPACT MOBILE OVERLAY (WITH SLIDE-IN & SCROLL FIX) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[9999] lg:hidden bg-slate-900/98 backdrop-blur-2xl flex flex-col overflow-y-auto max-h-screen"
          >
            {/* Header Row inside Overlay (Always accessible at top) */}
            <div className="sticky top-0 z-50 p-6 flex justify-between items-center bg-slate-900/40 backdrop-blur-md border-b border-white/5">
              <LogoBrand isMobile={true} onClick={(e) => handleNavClick(e, '#home')} />
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-[#06b6d4] active:scale-90 transition-all shadow-lg"
                aria-label="Close Menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Menu Links Container */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-20">
              <motion.ul 
                initial="hidden"
                animate="visible"
                variants={{ 
                  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } 
                }}
                className="flex flex-col gap-6 w-full items-center"
              >
                {navItems.map((item) => (
                  <motion.li
                    key={item.label}
                    variants={{ 
                      hidden: { opacity: 0, x: 20 }, 
                      visible: { opacity: 1, x: 0 } 
                    }}
                    className="w-full text-center"
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="group inline-block py-2 w-full active:scale-95 transition-transform"
                    >
                      <span className="text-xl font-medium uppercase tracking-[0.3em] text-gray-400 group-hover:text-[#06b6d4] transition-all">
                        {item.label}
                      </span>
                      <span className="block mt-1 h-[1px] w-0 group-hover:w-12 bg-[#06b6d4] mx-auto transition-all duration-300"></span>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Bottom Footer Area inside Overlay */}
            <div className="p-10 border-t border-white/5 flex flex-col items-center gap-8 bg-slate-900/20 mt-auto">
              <div className="flex gap-8">
                {socialLinks.map((social) => (
                  <a 
                    key={social.label} 
                    href={social.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/30 hover:text-[#06b6d4] transition-all transform hover:scale-125"
                    aria-label={social.label}
                  >
                    <social.icon size={22} />
                  </a>
                ))}
              </div>
              
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full max-w-[300px] py-4 rounded-xl bg-gradient-to-r from-[#06b6d4] to-purple-600 text-[#0f172a] font-bold uppercase tracking-widest text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                HIRE ME <ArrowRight size={16} />
              </a>
              
              <p className="text-[10px] text-gray-600 uppercase tracking-widest">Available for Remote Projects</p>
            </div> 
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};