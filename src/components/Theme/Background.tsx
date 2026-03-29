"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nebulaRef1 = useRef<HTMLDivElement>(null);
  const nebulaRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // Starfield setup
    const stars: { x: number; y: number; size: number; opacity: number; speed: number }[] = [];
    const starCount = 150;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
        opacity: Math.random(),
        speed: Math.random() * 0.05 + 0.01,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach((s) => {
        s.y -= s.speed;
        if (s.y < 0) s.y = canvas.height;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.fill();
        
        // Twinkle effect
        if (Math.random() > 0.98) s.opacity = Math.random();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Animate nebulas with GSAP
    if (nebulaRef1.current) {
      gsap.to(nebulaRef1.current, {
        x: "10%",
        y: "10%",
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    if (nebulaRef2.current) {
      gsap.to(nebulaRef2.current, {
        x: "-10%",
        y: "-10%",
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div className="grain" />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 bg-[#020617] pointer-events-none"
      />
      {/* Deep Space Nebulas - Blue/Indigo/Violet */}
      <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden mix-blend-screen opacity-40">
        <div 
          ref={nebulaRef1}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-950/40 rounded-full blur-[160px]" 
        />
        <div 
          ref={nebulaRef2}
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-900/30 rounded-full blur-[160px]" 
        />
        <div className="absolute top-[30%] left-[40%] w-[30%] h-[30%] bg-violet-950/20 rounded-full blur-[140px]" />
      </div>
    </>
  );
}
