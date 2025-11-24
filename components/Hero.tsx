
import React, { useEffect, useRef } from 'react';
import { PERSONAL_INFO } from '../constants';
import { ArrowDown, Mail, Github, Linkedin } from 'lucide-react';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId: number;
    let time = 0;
    let mouse = { x: 0.5, y: 0.5 };
    let targetMouse = { x: 0.5, y: 0.5 };

    const resize = () => {
      if (containerRef.current) {
        width = containerRef.current.clientWidth;
        height = containerRef.current.clientHeight;
        
        // Handle High DPI displays
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouse.x = (e.clientX - rect.left) / width;
      targetMouse.y = (e.clientY - rect.top) / height;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation configuration
    const lines = 60; // Number of strands
    const colors = ['#F5C518', '#FFFFFF', '#333333']; // Brand colors

    const draw = () => {
      // Smooth mouse interpolation
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      time += 0.005;

      // Draw the "Neural Silk"
      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        
        const color = colors[i % colors.length];
        const xOffset = (width * 0.5) + (i - lines/2) * 10; 
        const amplitude = 50 + (i % 5) * 20; 
        
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.2, color === '#F5C518' ? 'rgba(245, 197, 24, 0.1)' : 'rgba(255,255,255,0.05)');
        gradient.addColorStop(0.5, color === '#F5C518' ? 'rgba(245, 197, 24, 0.4)' : 'rgba(255,255,255,0.2)');
        gradient.addColorStop(0.8, color === '#F5C518' ? 'rgba(245, 197, 24, 0.1)' : 'rgba(255,255,255,0.05)');
        gradient.addColorStop(1, 'transparent');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = color === '#F5C518' ? 2 : 1;

        // Draw curve segments
        for (let y = 0; y <= height; y += 20) {
          const noise1 = Math.sin(y * 0.002 + time + i * 0.1);
          const noise2 = Math.cos(y * 0.005 - time + i * 0.05);
          const warp = (mouse.x - 0.5) * 200 * Math.sin(y * 0.003);
          
          const x = xOffset + warp + noise1 * amplitude + noise2 * (amplitude * 0.5);
          
          if (y === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      id="about"
      className="relative min-h-screen flex items-center overflow-hidden bg-black"
    >
      {/* Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0 opacity-80"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          
          {/* Left: Text Content */}
          <div className="flex flex-col items-start text-left animate-fade-in-up order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow text-xs font-semibold tracking-wider uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
              OPEN FOR WORK
            </div>

            {/* Drago-style Typography */}
            <div className="relative mb-12 mt-4 select-none">
              <h1 className="text-[5rem] sm:text-[6rem] md:text-[8rem] leading-[0.85] font-black text-white tracking-tighter uppercase font-sans drop-shadow-2xl">
                {PERSONAL_INFO.name.split(' ')[0]} <br/>
                {PERSONAL_INFO.name.split(' ')[1]}
              </h1>
              <span className="absolute -bottom-4 right-0 md:-bottom-8 md:right-4 font-script text-5xl sm:text-6xl md:text-7xl text-brand-yellow -rotate-6 transform origin-bottom-right z-10 whitespace-nowrap drop-shadow-md">
                Chris Liu
              </span>
            </div>
            
            <h2 className="text-2xl md:text-3xl text-gray-300 mb-8 font-light flex items-center gap-3">
              <span>{PERSONAL_INFO.title}</span>
              <span className="h-px w-12 bg-zinc-700" />
            </h2>
            
            <p className="max-w-xl text-lg text-gray-400 mb-10 leading-relaxed border-l-2 border-zinc-800 pl-6">
              {PERSONAL_INFO.tagline}
            </p>

            <div className="flex items-center gap-6">
               <a 
                 href="#contact" 
                 className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
               >
                 <span className="relative z-10 flex items-center gap-2">
                   联系我 <Mail size={18} />
                 </span>
                 <div className="absolute inset-0 bg-brand-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
               </a>

               <div className="flex gap-4">
                 <button className="p-3 border border-zinc-800 rounded-full hover:border-brand-yellow hover:text-brand-yellow transition-colors text-zinc-400">
                   <Github size={20} />
                 </button>
                 <button className="p-3 border border-zinc-800 rounded-full hover:border-brand-yellow hover:text-brand-yellow transition-colors text-zinc-400">
                   <Linkedin size={20} />
                 </button>
               </div>
            </div>
          </div>

          {/* Right: Portrait Image */}
          <div className="flex justify-center lg:justify-end items-center relative order-1 lg:order-2 animate-fade-in-up delay-100">
            {/* Glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-brand-yellow/10 rounded-full blur-[100px] pointer-events-none" />
            
            {/* Image Frame */}
            <div className="relative w-[300px] sm:w-[380px] aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-all duration-700 group">
               {/* Overlay tint */}
               <div className="absolute inset-0 bg-brand-yellow/10 mix-blend-overlay z-10 opacity-50 group-hover:opacity-0 transition-opacity duration-500" />
               
               <img 
                 src="https://i.imgur.com/G86KPQ7.jpeg" 
                 alt="Liu Xinlin"
                 className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
               />
               
               {/* Decorative corners */}
               <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-brand-yellow/50 z-20" />
               <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-brand-yellow/50 z-20" />
            </div>
          </div>

        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-zinc-600">
          <ArrowDown size={24} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
