
import React, { useEffect, useRef } from 'react';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Mouse interaction state
    let mouse = {
      x: -1000,
      y: -1000,
      radius: 200 // Radius of interaction
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseSize: number;
      color: string;
      density: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        // Random velocity for drift
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        // Random size
        this.size = Math.random() * 2 + 1;
        this.baseSize = this.size;
        // Random density for mass/attraction physics
        this.density = (Math.random() * 30) + 1;
        // Color: Cyan/Blue tint with low opacity
        this.color = `rgba(6, 182, 212, ${Math.random() * 0.3 + 0.1})`; 
      }

      update() {
        // 1. Base Drift
        this.x += this.vx;
        this.y += this.vy;

        // 2. Mouse Interaction Physics
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            // A. Grow Size
            const sizeMap = (mouse.radius - distance) / mouse.radius;
            this.size = this.baseSize + (sizeMap * 3); // Grow up to +3px
            
            // B. Attraction Force
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            
            // Move particle towards mouse based on force & density
            const directionX = forceDirectionX * force * this.density * 0.05;
            const directionY = forceDirectionY * force * this.density * 0.05;
            
            this.x += directionX;
            this.y += directionY;
        } else {
            // Return to base size
            this.size = this.baseSize;
        }

        // 3. Boundary Bounce
        if (this.x > canvas.width || this.x < 0) this.vx = -this.vx;
        if (this.y > canvas.height || this.y < 0) this.vy = -this.vy;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      // Calculate particle count based on screen area (responsive density)
      const particleCount = (canvas.width * canvas.height) / 12000; 
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Base Background Color
      ctx.fillStyle = '#0f172a'; // slate-900
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // 4. Draw Connections (Network Effect)
        // We only draw lines if the particle is NEAR THE MOUSE
        const dxMouse = mouse.x - particles[i].x;
        const dyMouse = mouse.y - particles[i].y;
        const distMouse = Math.sqrt(dxMouse*dxMouse + dyMouse*dyMouse);

        if (distMouse < mouse.radius) {
            // Check neighbors
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Connection threshold
                if (distance < 100) {
                    ctx.beginPath();
                    // Opacity based on distance between particles AND distance to mouse
                    // This creates a "spotlight" of connections
                    const opacity = (1 - distance / 100) * (1 - distMouse / mouse.radius);
                    ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`; // Cyan lines
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    // Event Listeners
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Use clientX/Y to track mouse relative to viewport, 
      // even if pointer-events are disabled on the canvas itself.
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Initial Start
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-[50]"
      style={{ 
        background: '#0f172a',
        pointerEvents: 'none' // CRITICAL FIX: Allows clicks and scrolls to pass through to the website
      }}
    />
  );
};
