import React, { useEffect, useRef } from 'react';

export const BackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // --- Configuration ---
    const PARTICLE_COUNT = 70; // Adjust for density
    const CONNECTION_DISTANCE = 150;
    const BASE_SPEED = 0.5;
    const BRAND_DARK = '#0f1724'; // The background color
    
    // --- State ---
    let particles: Particle[] = [];
    let scrollSpeed = 0;
    let lastScrollY = window.scrollY;
    let animationFrameId: number;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * BASE_SPEED;
        this.vy = (Math.random() - 0.5) * BASE_SPEED;
        this.size = Math.random() * 2 + 1;
        
        // Randomly pick brand colors (Cyan, Orange, or White)
        const colors = ['rgba(6, 182, 212, 0.8)', 'rgba(243, 156, 18, 0.8)', 'rgba(255, 255, 255, 0.5)'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Standard movement
        this.x += this.vx;
        this.y += this.vy;

        // Scroll acceleration (Warp effect)
        // When scrolling, particles move faster vertically
        this.y -= scrollSpeed * 0.5; 

        // Boundary wrap
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      
      // Calculate speed based on scroll delta
      // Limit max speed to avoid chaos
      scrollSpeed = delta;
      
      lastScrollY = currentScrollY;
    };

    const animate = () => {
      if (!ctx) return;

      // 1. Clear & Draw Background
      // We draw the background COLOR here to ensure it covers the white html body
      ctx.fillStyle = BRAND_DARK;
      ctx.fillRect(0, 0, width, height);

      // 2. Friction for scroll speed (return to normal)
      scrollSpeed *= 0.9;

      // 3. Update & Draw Particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // 4. Draw Connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            // Opacity based on distance
            const opacity = 1 - distance / CONNECTION_DISTANCE;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Listeners
    window.addEventListener('resize', init);
    window.addEventListener('scroll', handleScroll);
    
    init();
    animate();

    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-[999]"
      style={{ pointerEvents: 'none' }}
    />
  );
};
