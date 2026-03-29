"use client";

import { useState } from "react";
import { Navbar } from "@/components/Sections/Navbar";
import { Hero } from "@/components/Sections/Hero";
import { Projects } from "@/components/Sections/Projects";
import { Skills } from "@/components/Sections/Skills";
import { Contact } from "@/components/Sections/Contact";
import { Background } from "@/components/Theme/Background";
import { SmoothScroll } from "@/components/Theme/SmoothScroll";
import { CustomCursor } from "@/components/UI/CustomCursor";
import { Terminal } from "@/components/About/Terminal";

export default function Home() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <SmoothScroll>
      <main className="relative overflow-x-hidden selection:bg-primary/30 selection:text-white bg-[#020617]">
        <Background />
        <CustomCursor />
        <Navbar onAboutClick={() => setIsTerminalOpen(true)} />
        
        <div className="pb-20">
          <Hero onAboutClick={() => setIsTerminalOpen(true)} />
          <Projects />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
            <Skills />
            <Contact />
          </div>
        </div>

        <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />

        <footer className="py-12 border-t border-white/5 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Manpreet Singh. Built with Next.js, TypeScript & MongoDB.</p>
          <p className="mt-2 tracking-widest uppercase text-[10px] font-bold text-primary/50">
            The Architect of Innovation
          </p>
        </footer>
      </main>
    </SmoothScroll>
  );
}
