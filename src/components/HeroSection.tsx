"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [particles, setParticles] = useState<Array<{ id: number; size: number; left: number; top: number; opacity: number; duration: number; delay: number }>>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const newParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.1,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
    
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth) * 2 - 1;
      targetY = (e.clientY / innerHeight) * 2 - 1;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      if (containerRef.current) {
        const rotateY = currentX * 2;
        const rotateX = -currentY * 2;
        containerRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }

      if (bgRef.current) {
        const moveX = -currentX * 15;
        const moveY = -currentY * 15;
        bgRef.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.05)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isTouchDevice]);

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-aela-black perspective-container">
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-container {
          perspective: 1000px;
        }
        @keyframes aela-particle-float {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          20% { opacity: var(--particle-opacity); }
          80% { opacity: var(--particle-opacity); }
          100% { transform: translateY(-150px) translateX(30px) scale(0.8); opacity: 0; }
        }
        @keyframes aela-text-entrance {
          0% { transform: translate3d(0, 40px, 0) rotateX(-15deg); opacity: 0; }
          100% { transform: translate3d(0, 0, 0) rotateX(0); opacity: 1; }
        }
        .animate-text-entrance {
          animation: aela-text-entrance 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          will-change: transform, opacity;
          opacity: 0;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-500 { animation-delay: 500ms; }
      `}} />

      <div ref={containerRef} className="absolute inset-0 w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}>
        
        <div ref={bgRef} className="absolute inset-0 w-full h-full" style={{ willChange: 'transform', transform: 'scale(1.05)' }}>
          <Image 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
            alt="Hero Background"
            fill
            className="object-cover object-center opacity-40"
            priority
            unoptimized
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-aela-black via-aela-black/80 to-aela-gold/20 z-10 pointer-events-none" />

        <div className="absolute inset-0 z-[15] pointer-events-none overflow-hidden" style={{ transform: 'translateZ(10px)' }}>
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full bg-aela-gold"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                left: `${p.left}%`,
                top: `${p.top}%`,
                '--particle-opacity': p.opacity,
                animation: `aela-particle-float ${p.duration}s infinite linear`,
                animationDelay: `${p.delay}s`,
                opacity: 0,
                willChange: 'transform, opacity'
              } as React.CSSProperties}
            />
          ))}
        </div>

        <div ref={contentRef} className="relative z-20 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6" style={{ transform: 'translateZ(30px)', willChange: 'transform' }}>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-aela-cream drop-shadow-lg animate-text-entrance delay-100">
            Vista o seu estilo de viver.
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-aela-cream/90 max-w-2xl font-light animate-text-entrance delay-300">
            Moda feminina com qualidade premium e estilo que transforma.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-8 w-full sm:w-auto animate-text-entrance delay-500">
            <Link href="/produtos" className="inline-flex justify-center items-center px-8 py-4 text-base font-semibold bg-aela-gold text-aela-black hover:bg-aela-gold-light transition-colors duration-300 rounded-sm uppercase tracking-wider relative overflow-hidden group shadow-lg shadow-aela-gold/20 hover:shadow-aela-gold/40">
              <span className="relative z-10">Explorar Coleção</span>
              <div className="absolute inset-0 h-full w-0 bg-aela-white/20 transition-all duration-500 ease-out group-hover:w-full z-0"></div>
            </Link>
            <Link href="/produtos?filter=novidades" className="inline-flex justify-center items-center px-8 py-4 text-base font-semibold border-2 border-aela-gold text-aela-gold hover:bg-aela-gold/10 transition-colors duration-300 rounded-sm uppercase tracking-wider hover:shadow-lg hover:shadow-aela-gold/10">
              Novidades
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
