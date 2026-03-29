"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

import { gsap } from "@/lib/gsap";

interface NavbarProps {
  onAboutClick: () => void;
}

export function Navbar({ onAboutClick }: NavbarProps) {
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
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-auto"
    >
      <div className={cn(
        "bg-[#020617]/40 backdrop-blur-2xl border border-white/10 px-8 py-3 flex items-center justify-center gap-10 rounded-full shadow-2xl",
      )}>
        {links.map((link) => (
          <button
            key={link.href}
            onMouseMove={handleMagnetic}
            onMouseLeave={resetMagnetic}
            onClick={() => {
              if (link.label === "About") {
                onAboutClick();
              } else {
                const el = document.querySelector(link.href);
                el?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="nav-link text-sm font-bold uppercase tracking-widest interactive"
          >
            {link.label}
          </button>
        ))}
      </div>
    </motion.nav>
  );
}
