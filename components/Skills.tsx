import React from 'react';
import { motion } from 'framer-motion';
import { Database, Server, Wind, Layout, Terminal, Code2, Cpu, Globe, Layers, Figma, Box, Hexagon, Component, Hash, Laptop } from 'lucide-react';
import { SkillItem } from '../types';

// Extended skills list for a denser slider
const skills: SkillItem[] = [
  { name: 'React', icon: Code2 },
  { name: 'TypeScript', icon: Terminal },
  { name: 'Node.js', icon: Server },
  { name: 'Tailwind CSS', icon: Wind },
  { name: 'Framer Motion', icon: Layers },
  { name: 'Figma', icon: Figma },
  { name: 'Next.js', icon: Globe },
  { name: 'MongoDB', icon: Database },
  { name: 'GraphQL', icon: Hexagon },
  { name: 'Three.js', icon: Box },
  { name: 'Redux', icon: Cpu },
  { name: 'UI/UX', icon: Layout },
  { name: 'Web Components', icon: Component },
  { name: 'Algorithms', icon: Hash },
  { name: 'Responsive', icon: Laptop },
];

export const Skills: React.FC = () => {
  return (
    // Removed 'bg-brand-dark' to make it transparent
    <section id="skills" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 mb-12 md:mb-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-white mb-6"
        >
          Technical <span className="text-brand-orange">Proficiency</span>
        </motion.h2>
        <div className="w-16 md:w-24 h-1.5 bg-brand-orange mx-auto rounded-full mb-6 md:mb-8" />
        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
          A robust collection of modern technologies and tools I use to bring digital products to life.
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative w-full overflow-hidden">
        
        {/* Gradient Fade Masks - Adjusted to be transparent/gradient to match global style */}
        <div className="absolute top-0 left-0 w-12 md:w-48 h-full bg-gradient-to-r from-[#0f1724] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-12 md:w-48 h-full bg-gradient-to-l from-[#0f1724] to-transparent z-10 pointer-events-none" />

        {/* Row 1: Left to Right */}
        <div className="flex mb-4 md:mb-8 overflow-hidden">
          <div className="flex animate-scroll hover:paused min-w-full items-center">
            {[...skills, ...skills, ...skills].map((skill, index) => (
              <div 
                key={`r1-${index}`} 
                className="flex-shrink-0 mx-2 md:mx-4 w-40 md:w-48 group cursor-default"
              >
                <div className="bg-white/5 border border-white/5 px-4 md:px-6 py-3 md:py-4 rounded-xl flex items-center gap-3 md:gap-4 hover:bg-white/10 hover:border-brand-orange/50 transition-all duration-300 transform group-hover:-translate-y-1">
                  <skill.icon size={20} className="text-brand-orange group-hover:text-white transition-colors shrink-0" />
                  <span className="text-gray-300 font-medium text-sm md:text-base group-hover:text-white transition-colors whitespace-nowrap">{skill.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="flex overflow-hidden">
          <div className="flex animate-scroll-reverse hover:paused min-w-full items-center">
             {[...skills.reverse(), ...skills, ...skills].map((skill, index) => (
              <div 
                key={`r2-${index}`} 
                className="flex-shrink-0 mx-2 md:mx-4 w-40 md:w-48 group cursor-default"
              >
                <div className="bg-white/5 border border-white/5 px-4 md:px-6 py-3 md:py-4 rounded-xl flex items-center gap-3 md:gap-4 hover:bg-white/10 hover:border-green-400/50 transition-all duration-300 transform group-hover:-translate-y-1">
                  <skill.icon size={20} className="text-green-400 group-hover:text-white transition-colors shrink-0" />
                  <span className="text-gray-300 font-medium text-sm md:text-base group-hover:text-white transition-colors whitespace-nowrap">{skill.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};