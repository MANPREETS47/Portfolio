"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

    const fxTo = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power3" });
    const fyTo = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      fxTo(e.clientX);
      fyTo(e.clientY);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "BUTTON" || target.tagName === "A" || target.closest(".interactive")) {
        gsap.to(follower, { scale: 2.5, backgroundColor: "rgba(16, 185, 129, 0.2)", backdropFilter: "blur(4px)", duration: 0.3 });
        gsap.to(cursor, { scale: 0.5, backgroundColor: "#10b981", duration: 0.3 });
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "BUTTON" || target.tagName === "A" || target.closest(".interactive")) {
        gsap.to(follower, { scale: 1, backgroundColor: "rgba(16, 185, 129, 0.1)", backdropFilter: "blur(0px)", duration: 0.3 });
        gsap.to(cursor, { scale: 1, backgroundColor: "#10b981", duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.querySelectorAll("button, a, .interactive").forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter as any);
      el.addEventListener("mouseleave", handleMouseLeave as any);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.querySelectorAll("button, a, .interactive").forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter as any);
        el.removeEventListener("mouseleave", handleMouseLeave as any);
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[1000] mix-blend-difference"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div 
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-primary/30 bg-primary/10 rounded-full pointer-events-none z-[999] opacity-50"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
}
