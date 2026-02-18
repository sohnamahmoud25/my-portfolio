import React, { useEffect, useRef } from 'react';

export const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- Configuration ---
    const fontSize = 14;
    const fontFamily = 'monospace';
    // Mix of binary, syntax, and keywords letters
    const chars = "0101{}<>/;[]=+*-varconstfunctionreturn".split(""); 
    
    let animationFrameId: number;
    let drops: number[] = [];
    
    // Scroll Interaction Variables
    let scrollSpeed = 0;
    let lastScrollY = window.scrollY;

    // --- Resize Handler ---
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Re-initialize drops
      const columns = Math.ceil(canvas.width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) {
        // Random start Y to avoid "wall of text" effect on load
        drops[i] = Math.random() * -(canvas.height / fontSize); 
      }
    };

    // --- Scroll Handler ---
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      
      // Boost speed based on scroll delta
      // We cap the max boost to avoid chaos
      scrollSpeed = Math.min(delta, 50); 
      
      lastScrollY = currentScrollY;
    };

    // --- Drawing Loop ---
    const draw = () => {
      // Create fading trail effect
      // We use a very transparent black to clear the canvas slowly, creating the trail
      // rgba(15, 23, 36) is the brand-dark color
      ctx.fillStyle = 'rgba(15, 23, 36, 0.15)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Text settings
      ctx.font = `${fontSize}px ${fontFamily}`;
      
      // Decay scroll speed back to 0
      scrollSpeed *= 0.9; 
      // Base speed is 1, plus scroll boost
      const currentSpeedOffset = Math.max(0, scrollSpeed * 0.2); 

      // Draw drops
      for (let i = 0; i < drops.length; i++) {
        // Randomly pick a character
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Color logic: subtle cyan/blue
        // Occasional bright highlight for "glint" effect
        const isHighlight = Math.random() > 0.99;
        if (isHighlight) {
            ctx.fillStyle = '#ffffff'; // White glint
        } else {
            ctx.fillStyle = '#06b6d4'; // Cyan-500 solid color for visibility
        }

        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Move drop down
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        } else {
            // Speed = Base (0.5) + Random (0.5) + ScrollBoost
            drops[i] += 0.5 + Math.random() * 0.5 + (currentSpeedOffset * 0.5);
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // --- Init ---
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    handleResize(); // Initial setup
    draw(); // Start loop

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      // Fallback bg color in case JS fails or loads slow
      style={{ backgroundColor: '#0f1724' }} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-10] opacity-30"
    />
  );
};