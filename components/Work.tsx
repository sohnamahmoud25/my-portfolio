import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { WorkItem } from '../types';

// Extended interface locally since we are adding specific fields for the template
interface ProjectItem extends WorkItem {
  problem: string;
  stack: string[];
  liveLink?: string;
  codeLink?: string;
}

const works: ProjectItem[] = [
  {
    title: 'E-Commerce Dashboard',
    category: 'React App',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    problem: 'Businesses needed a centralized way to manage inventory and view real-time sales analytics.',
    stack: ['React', 'Tailwind', 'Recharts'],
    liveLink: '#',
    codeLink: '#'
  },
  {
    title: 'Task Management App',
    category: 'Productivity Tool',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=1000',
    problem: 'Teams struggled with organizing daily tasks. Created a drag-and-drop interface to streamline workflow.',
    stack: ['React', 'DND Kit', 'Firebase'],
    liveLink: '#',
    codeLink: '#'
  },
  {
    title: 'Modern Portfolio Template',
    category: 'Web Design',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000',
    problem: 'Designers needed a fast, high-performance portfolio to showcase work without complex setup.',
    stack: ['React', 'Framer Motion', 'Tailwind'],
    liveLink: '#',
    codeLink: '#'
  },
];

export const Work: React.FC = () => {
  return (
    <section id="work" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Project <span className="text-brand-orange">Showcase</span>
          </motion.h2>
          <div className="w-16 md:w-20 h-1 bg-brand-orange mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {works.map((work, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-brand-card rounded-2xl overflow-hidden border border-white/5 hover:border-brand-orange/30 transition-all duration-300 flex flex-col h-full"
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a href={work.liveLink} className="p-3 bg-brand-orange rounded-full text-white hover:bg-white hover:text-brand-orange transition-colors" title="View Live">
                    <ExternalLink size={20} />
                  </a>
                  <a href={work.codeLink} className="p-3 bg-gray-800 rounded-full text-white hover:bg-white hover:text-black transition-colors" title="View Code">
                    <Github size={20} />
                  </a>
                </div>
              </div>
              
              <div className="p-5 md:p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-brand-orange text-[10px] md:text-xs font-bold uppercase tracking-wider bg-brand-orange/10 px-2 py-1 rounded">
                    {work.category}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-brand-orange transition-colors">
                  {work.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 flex-grow leading-relaxed">
                  <span className="font-semibold text-gray-300">Problem:</span> {work.problem}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {work.stack.map((tech, i) => (
                    <span key={i} className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};