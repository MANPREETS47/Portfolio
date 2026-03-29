"use client";

import { motion } from "framer-motion";
import { Server, Layout, Database, Terminal, Cpu, Cloud } from "lucide-react";

const skillCategories = [
  {
    title: "Full-Stack JS",
    icon: <Layout className="text-primary" />,
    skills: ["React", "Next.js", "TypeScript", "Node.js", "Redux", "Socket.io"],
  },
  {
    title: "Backend & Systems",
    icon: <Server className="text-secondary" />,
    skills: ["Java", "Spring Boot", "Spring Security", "Hibernate", "Maven", "Apache Kafka"],
  },
  {
    title: "AI & Data Science",
    icon: <Cpu className="text-primary" />,
    skills: ["Python", "TensorFlow", "Keras", "LangChain", "HuggingFace", "OpenCV"],
  },
  {
    title: "Databases & Cloud",
    icon: <Database className="text-secondary" />,
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Docker", "AWS"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 px-4" style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white">Technical Arsenal</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A comprehensive set of tools for building modern, scalable, and intelligent applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 space-y-6 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-white/5 rounded-2xl">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wider text-center">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs font-semibold bg-white/5 border border-white/10 rounded-full text-slate-400 transition-colors hover:text-white hover:bg-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
