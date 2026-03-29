"use client";

import { useRef } from "react";
import { ArrowRight, Download, Github, Linkedin, Mail, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface HeroProps {
  onAboutClick: () => void;
}

export function Hero({ onAboutClick }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    tl.from(".hero-status", { y: 20, opacity: 0, duration: 1, delay: 0.5 })
      .from(".hero-title", { y: 50, opacity: 0, duration: 1.2 }, "-=0.6")
      .from(".hero-tagline", { y: 20, opacity: 0, duration: 1 }, "-=0.8")
      .from(".hero-description", { y: 20, opacity: 0, duration: 1 }, "-=0.8")
      .from(".hero-btns", { y: 20, opacity: 0, scale: 0.95, duration: 1 }, "-=0.8")
      .from(".hero-social", { y: 20, opacity: 0, stagger: 0.1, duration: 1 }, "-=0.8")
      .from(".hero-scroll", { opacity: 0, duration: 1 }, "-=0.5");
  }, { scope: containerRef });

  const handleMagnetic = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const target = e.currentTarget;
    const { left, top, width, height } = target.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    
    gsap.to(target, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const resetMagnetic = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4">
      <div className="text-center space-y-8 max-w-5xl">
        <div className="hero-status inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          System Online // Portfolio v1.0
        </div>

        <h1 className="hero-title text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">
          Hi, I&apos;m <span className="text-gradient">Manpreet Singh</span>
        </h1>

        <p className="hero-tagline text-xl md:text-2xl text-slate-400 font-medium tracking-tight">
          Backend Architect <span className="text-primary font-light mx-2">//</span> AI Researcher <span className="text-secondary font-light mx-2">//</span> Full-stack Developer
        </p>

        <p className="hero-description text-lg text-slate-400 max-w-2xl mx-auto italic">
          &ldquo;Code is poetry, and every line is a step towards innovation.&rdquo;
        </p>

        <div className="hero-btns flex flex-wrap items-center justify-center gap-4 pt-6">
          <button 
            onClick={onAboutClick} 
            onMouseMove={handleMagnetic}
            onMouseLeave={resetMagnetic}
            className="btn-outline flex items-center gap-2 interactive"
          >
            About Me <ChevronRight size={18} />
          </button>
          <Link 
            href="#contact" 
            onMouseMove={handleMagnetic as any}
            onMouseLeave={resetMagnetic as any}
            className="btn-primary flex items-center gap-2 interactive"
          >
            Let&apos;s Connect <ArrowRight size={18} />
          </Link>
          <a
            href="/resume.pdf"
            download="Manpreet_Singh_Resume.pdf"
            onMouseMove={handleMagnetic as any}
            onMouseLeave={resetMagnetic as any}
            onClick={async (e) => {
              // Check if resume exists, show alert if not
              const res = await fetch("/resume.pdf", { method: "HEAD" });
              if (!res.ok) {
                e.preventDefault();
                alert("Resume coming soon! Check back later.");
              }
            }}
            className="btn-outline flex items-center gap-2 text-white interactive"
          >
            <Download size={18} /> Download Resume
          </a>
        </div>

        <div className="hero-social flex items-center justify-center gap-6 pt-12">
          <a
            href="https://github.com/MANPREETS47"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full interactive"
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com/in/manpreet-singh-04829a293/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full interactive"
          >
            <Linkedin size={24} />
          </a>
          <a
            href={`mailto:${process.env.EMAIL_ADDRESS}`}
            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full interactive"
          >
            <Mail size={24} />
          </a>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
        <span className="text-xs uppercase tracking-widest font-semibold">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent" />
      </div>
    </section>
  );
}
