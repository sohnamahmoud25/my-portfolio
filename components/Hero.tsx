
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Code, Coffee, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const handleScrollTo = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    const element = document.querySelector(target);
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
    <section id="home" className="min-h-screen flex items-center pt-28 pb-12 md:pt-20 md:pb-0 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-20 right-0 w-64 h-64 md:w-96 md:h-96 bg-brand-orange/10 rounded-full blur-3xl -z-10 animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-48 h-48 md:w-72 md:h-72 bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-[50]">
        {/* Content */}
        <div className="flex-1 text-center lg:text-left w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-gray-300 text-xs md:text-sm font-medium tracking-wide">
                    Available for Immediate Joining
                </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] mb-6 text-white">
              Building Modern <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-300">
                Web Experiences
              </span>
            </h1>
            
            <p className="text-gray-400 text-base sm:text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Passionate Frontend Developer specializing in React and UI/UX. I don't just write code; I build user-centric digital experiences that solve business problems.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-brand-orange to-brand-orangeDark text-white font-semibold shadow-lg shadow-brand-orange/25 hover:shadow-brand-orange/40 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group pointer-events-auto"
              >
                Hire Me <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#work"
                onClick={(e) => handleScrollTo(e, '#work')}
                className="px-8 py-3.5 rounded-full bg-white/5 text-white font-semibold hover:bg-white/10 backdrop-blur-sm border border-white/10 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 pointer-events-auto"
              >
                See My Work
              </a>
            </div>
          </motion.div>
        </div>

        {/* Floating Card */}
        <div className="flex-1 w-full max-w-md lg:max-w-lg relative">
          <motion.div
            className="animate-float"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-brand-card backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/20 rounded-full blur-2xl -mr-10 -mt-10" />
              
              <h3 className="text-2xl font-bold text-white mb-6 relative z-10">
                Why <span className="text-brand-orange">Collaborate?</span>
              </h3>
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-brand-orange/20 flex items-center justify-center text-brand-orange group-hover:scale-110 transition-transform shrink-0">
                    <Code size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Clean Code</h4>
                    <p className="text-sm text-gray-400">Scalable & Maintainable</p>
                  </div>
                </div>

                <div className="w-full h-px bg-white/10" />

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform shrink-0">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Professional</h4>
                    <p className="text-sm text-gray-400">Detail-Oriented & Punctual</p>
                  </div>
                </div>

                <div className="w-full h-px bg-white/10" />

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform shrink-0">
                    <Coffee size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Fast Learner</h4>
                    <p className="text-sm text-gray-400">Adaptable to New Tech</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
