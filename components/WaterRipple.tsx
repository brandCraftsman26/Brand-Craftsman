"use client";

import React, { useEffect, useRef } from 'react';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  thickness: number;
}

const WaterRipple: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const requestRef = useRef<number | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width || window.innerWidth;
      canvas.height = rect.height || window.innerHeight;
    };
    resizeCanvas();
    const timeoutId = setTimeout(resizeCanvas, 100);
    window.addEventListener('resize', resizeCanvas);

    let lastTime = 0;
    const animate = (time: number) => {
      // throttle mouse move ripples addition but animate smoothly
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const activeRipples: Ripple[] = [];
      
      ripplesRef.current.forEach(ripple => {
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        
        // Shockwave aesthetic
        ctx.strokeStyle = `rgba(0, 240, 255, ${ripple.alpha})`;
        ctx.lineWidth = ripple.thickness;
        ctx.stroke();
        
        // Inner wave
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.alpha * 0.8})`;
        ctx.lineWidth = ripple.thickness * 0.5;
        ctx.stroke();
        
        ripple.radius += 8;
        ripple.alpha -= 0.015; 
        ripple.thickness = Math.max(0.1, ripple.thickness - 0.05);
        
        if (ripple.alpha > 0) {
          activeRipples.push(ripple);
        }
      });
      
      ripplesRef.current = activeRipples;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    let lastMouseAdd = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMouseAdd < 30) return; // Throttle ripple creation
      lastMouseAdd = now;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ripplesRef.current.push({ x, y, radius: 15, alpha: 0.3, thickness: 6 });
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ripplesRef.current.push({ x, y, radius: 20, alpha: 0.3, thickness: 12 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default WaterRipple;
