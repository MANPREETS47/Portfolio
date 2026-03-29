"use client";

import { motion } from "framer-motion";
import { Send, Mail, MapPin, Linkedin, Github } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white">Let&apos;s Architect Something Together</h2>
            <p className="text-slate-400 max-w-lg">
              Whether you have a question about backend systems, AI research, or just want to connect—I&apos;m always happy to chat.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-slate-300">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <Mail className="text-primary" size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">Email</p>
                <p className="text-lg">manpreetsingh@example.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-300">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <MapPin className="text-secondary" size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">Location</p>
                <p className="text-lg">Punjab, India</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <a href="https://linkedin.com/in/manpreet-singh-04829a293/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              <Linkedin className="text-slate-400 group-hover:text-white" size={20} />
            </a>
            <a href="https://github.com/MANPREETS47" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              <Github className="text-slate-400" size={20} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass p-8 space-y-6"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-300">Full Name</label>
              <input
                id="name"
                type="text"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-colors text-white"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-300">Email Address</label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-colors text-white"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-slate-300">Your Message</label>
              <textarea
                id="message"
                required
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-colors text-white resize-none"
                placeholder="How can I help you?"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full btn-primary flex items-center justify-center gap-2 group"
            >
              {status === "loading" ? "Sending..." : status === "success" ? "Message Sent!" : (
                <>
                  Send Message <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            
            {status === "success" && (
              <p className="text-sm text-green-400 text-center animate-fade-in">
                Thank you! I&apos;ll get back to you shortly.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
