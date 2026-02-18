import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Layout, BookOpen } from 'lucide-react';

// @ts-ignore
// This comment above tells TypeScript to ignore the "Cannot find module" error. 
// Vite will still find the image and build it correctly.
import profileImg from './profile.png'; 

const uspItems = [
  {
    icon: Target,
    title: "Problem Solver",
    description: "I approach coding challenges with a logical mindset, ensuring efficient and bug-free solutions."
  },
  {
    icon: Layout,
    title: "Detail-Oriented",
    description: "Pixel-perfect implementation is my standard. I ensure the final product matches the design exactly."
  },
  {
    icon: Zap,
    title: "Bridge: Design & Logic",
    description: "With skills in both Figma and React, I seamlessly translate aesthetic designs into functional code."
  },
  {
    icon: BookOpen,
    title: "Fast Learner",
    description: "Technology evolves fast, and so do I. I constantly upskill to stay ahead of industry trends."
  }
];

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6">
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl mb-16 relative overflow-hidden"
        >
            <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 relative z-10">
                <div className="relative shrink-0 group mx-auto md:mx-0">
                    <div className="absolute inset-0 rounded-full border border-brand-orange/20 scale-110 group-hover:scale-125 transition-transform duration-700" />
                    <div className="absolute inset-0 rounded-full border border-brand-orange/10 scale-125 animate-pulse-slow" />
                    
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-full p-2 bg-gradient-to-br from-white/10 to-transparent border border-white/20 shadow-2xl relative">
                        {/* We use the variable 'profileImg' here (NO quotes, NO .png extension) */}
                        <img 
                           src={profileImg} 
                           alt="Sohan Mahmud" 
                           className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
                        />
                    </div>
                </div>

                <div className="text-center md:text-left flex-1 min-w-0">
                    <span className="inline-block py-1 px-3 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-wider mb-4">
                        Who I Am
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight break-words">
                        Sohan Mahmud.
                    </h2>
                    <div className="space-y-6 text-gray-300 text-base md:text-lg leading-relaxed break-words">
                        <p>
                           I am a digital creator based in Bangladesh, fueled by a passion for building things that matter. To me, design and code are more than just tools—they are bridges that connect people to experiences.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {uspItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-brand-card/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl hover:bg-white/5 hover:border-brand-orange/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-brand-orange mb-4 group-hover:scale-110 transition-transform">
                <item.icon size={24} />
              </div>
              <h3 className="text-white text-lg font-bold mb-2 group-hover:text-brand-orange transition-colors">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};