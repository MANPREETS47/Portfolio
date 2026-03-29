"use client";

import { useRef } from "react";
import { ExternalLink, Github, Code2, Cpu, Database } from "lucide-react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const projects = [
  {
    title: "AI Researcher Agent",
    description: "Multi-agent system for automated web research and detailed report generation using GPT-4o and Tavily.",
    tags: ["Python", "OpenAI", "Tavily", "LangChain"],
    github: "https://github.com/MANPREETS47/AI-Research-Agent",
    icon: <Cpu className="text-primary w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Enterprise Knowledge Assistant",
    description: "Advanced RAG system with document chunking, vector embeddings, and real-time Q&A capabilities.",
    tags: ["GenAI", "RAG", "Python", "ChromaDB"],
    github: "https://github.com/MANPREETS47/Enterprise-Knowledge-Assistant",
    icon: <Database className="text-secondary w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Order Management System",
    description: "Event-driven microservices architecture using Spring Boot, Kafka, and Redis for high-performance processing.",
    tags: ["Java", "Spring Boot", "Kafka", "Docker"],
    github: "https://github.com/MANPREETS47/Order-Management-System",
    icon: <Code2 className="text-primary w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Future Scale AI",
    description: "Explored distributed training of large models on consumer hardware using decentralized compute.",
    tags: ["PyTorch", "Gossip Protocol", "AI", "DistScale"],
    github: "https://github.com/MANPREETS47",
    icon: <Cpu className="text-secondary w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
  },
];

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const totalWidth = container.scrollWidth - window.innerWidth + 100;

    gsap.to(container, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 0.5,
        end: () => `+=${container.scrollWidth}`,
        invalidateOnRefresh: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="projects" className="relative min-h-screen overflow-hidden bg-[#020617]/50 py-20">
      <div className="absolute top-20 left-10 md:left-20 z-10 space-y-4">
        <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase">
          Featured <span className="text-gradient">Work</span>
        </h2>
        <p className="text-slate-500 max-w-md font-medium">
          Architecting robust systems and pushing the boundaries of Generative AI. 
          <span className="block mt-2 text-primary/50 text-xs uppercase tracking-widest">Scroll to explore →</span>
        </p>
      </div>

      <div ref={containerRef} className="flex h-screen items-center px-[10vw] gap-12 w-fit pt-20">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className="w-[85vw] md:w-[600px] flex-shrink-0 group"
          >
            <div className="glass-card overflow-hidden h-[500px] flex flex-col interactive">
              <div className="relative h-[65%] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent opacity-80" />
                
                <div className="absolute top-6 left-6 p-3 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10">
                  {project.icon}
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-primary transition-colors tracking-tighter uppercase">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-2 font-medium">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between mt-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-[10px] font-bold bg-white/5 border border-white/10 rounded-full text-slate-400 uppercase tracking-widest"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      <Github size={20} />
                    </a>
                    <button className="text-slate-400 hover:text-white transition-colors">
                      <ExternalLink size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* End Placeholder */}
        <div className="w-[40vw] flex-shrink-0 flex items-center justify-center">
            <div className="text-center space-y-4">
                 <div className="text-8xl font-black text-white/5 tracking-tighter uppercase">More</div>
                 <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Explore all on GitHub</p>
            </div>
        </div>
      </div>
    </section>
  );
}
