
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Skills } from './components/Skills';
import { Work } from './components/Work';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ParticleBackground } from './components/ParticleBackground';

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="font-sans selection:bg-brand-orange selection:text-white">
       <ParticleBackground />
       <Navbar />
       
       {/* pt-20 added to offset fixed h-20 header, pt-24 on large screens for more breathing room */}
       <main className="relative z-10 pt-20 lg:pt-24">
        <Hero />
        <About />
        <Services />
        <Skills />
        <Work />
        <Contact />
       </main>
       
       <Footer />
       
       <div className="fixed inset-0 pointer-events-none -z-40 overflow-hidden mix-blend-screen">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10" />
          
          <div 
            className="absolute top-0 left-1/4 w-96 h-96 bg-brand-orange/20 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob" 
          />
          <div 
            className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob"
            style={{ animationDelay: '2s' }}
          />
          <div 
            className="absolute -bottom-32 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob"
            style={{ animationDelay: '4s' }}
          />
       </div>
    </div>
  );
}

export default App;
