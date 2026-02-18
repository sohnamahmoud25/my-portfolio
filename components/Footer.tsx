
import React from 'react';
import { Github, Linkedin, Instagram, Heart, Mail, MapPin, Hexagon } from 'lucide-react';

// Custom X Icon Component
const XIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Footer: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
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

  return (
    <footer className="relative bg-[#0b111b] pt-20 pb-10 overflow-hidden border-t border-white/5">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column (Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-brand-orange to-brand-orangeDark rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-orange/20">
                S
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-2xl text-white tracking-tight">Sohan Mahmud</span>
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-brand-orange/40 rounded-full blur-sm animate-pulse" />
                  <Hexagon size={18} className="text-brand-orange relative z-10 animate-[spin_6s_linear_infinite]" />
                </div>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base max-w-sm">
              Crafting digital experiences where design meets functionality. I help businesses turn ideas into modern, scalable web solutions.
            </p>
            <div className="flex gap-4 pt-2">
              {[
                { icon: Github, href: 'https://github.com/sohnamahmoud25', label: 'Github' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/sohan-mahmud-4a823032a/', label: 'LinkedIn' },
                { icon: XIcon, href: 'https://twitter.com/sohan_mahmud', label: 'X (Twitter)' },
                { icon: Instagram, href: 'https://www.instagram.com/_zyan.here_/?__pwa=1#', label: 'Instagram' },
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-orange hover:border-brand-orange transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon size={18} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links (Span 2) */}
          <div className="lg:col-span-2 lg:pl-4">
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider text-xs opacity-50">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Services', 'Work', 'Contact'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={(e) => scrollToSection(e, item.toLowerCase())}
                    className="text-gray-400 hover:text-brand-orange transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider text-xs opacity-50">Expertise</h4>
            <ul className="space-y-4">
              {['UI/UX Design', 'Web Development', 'React Applications', 'Design Systems', 'Technical Consultation'].map((item) => (
                <li key={item} className="text-gray-400 text-sm hover:text-white transition-colors cursor-default flex items-center gap-2">
                  <div className="w-1 h-1 bg-white/20 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider text-xs opacity-50">Get in Touch</h4>
            <div className="space-y-4">
              <a href="mailto:sohanmahmoud25@gmail.com" className="group flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-brand-orange/30 transition-all">
                <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
                  <Mail size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1 tracking-widest">Email Me</p>
                  <p className="text-white text-sm font-medium group-hover:text-brand-orange transition-colors break-all">sohanmahmoud25@gmail.com</p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1 tracking-widest">Location</p>
                  <p className="text-white text-sm font-medium">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-gray-500 text-xs sm:text-sm text-center md:text-left">
             © {new Date().getFullYear()} Sohan Mahmud. All rights reserved.
           </p>
           
           <div className="flex items-center gap-6">
              <button onClick={(e) => scrollToSection(e, 'home')} className="text-gray-500 hover:text-white text-xs sm:text-sm transition-colors">Privacy</button>
              <button onClick={(e) => scrollToSection(e, 'home')} className="text-gray-500 hover:text-white text-xs sm:text-sm transition-colors">Terms</button>
              <p className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                Crafted with <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" /> using React
              </p>
           </div>
        </div>
      </div>
    </footer>
  );
};
