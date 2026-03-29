"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal as TerminalIcon, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BOOT_SEQUENCE = [
  "Initializing manpreet-os v1.0.4...",
  "Loading architectural modules...",
  "Establishing secure connection to MongoDB...",
  "Retrieving AI research data...",
  "System ready.",
  "Type /help to see available commands.",
];

export function Terminal({ isOpen, onClose }: TerminalProps) {
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isBooting, setIsBooting] = useState(true);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsBooting(true);
      setHistory([]);
      let i = 0;
      const interval = setInterval(() => {
        if (i < BOOT_SEQUENCE.length) {
          setHistory((prev) => [...prev, BOOT_SEQUENCE[i]]);
          i++;
        } else {
          setIsBooting(false);
          clearInterval(interval);
        }
      }, 400);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response = "";

    switch (trimmed) {
      case "/help":
        response = "Available commands: /work, /skills, /help, /clear, /exit";
        break;
      case "/work":
        response = "Fetching project data...\n- AI Research Agent\n- Enterprise Knowledge Assistant\n- Order Management System\n(Try clicking on 'Projects' in the background for more detail)";
        break;
      case "/skills":
        response = "Loading skill matrix...\n- Fullstack JS (Next.js, TS)\n- Backend (Java, Spring Boot, Kafka)\n- AI/ML (LangChain, OpenAI, Python)";
        break;
      case "/clear":
        setHistory([]);
        return;
      case "/exit":
        onClose();
        return;
      default:
        response = `Command not recognized: ${trimmed}. Type /help for assistance.`;
    }

    setHistory((prev) => [...prev, `> ${cmd}`, response]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    handleCommand(input);
    setInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-4xl h-[600px] bg-[#020617]/90 backdrop-blur-2xl border border-white/5 rounded-3xl overflow-hidden flex flex-col shadow-[0_0_50px_-12px_rgba(16,185,129,0.15)]"
          >
            {/* Terminal Header */}
            <div className="bg-white/10 px-4 py-2 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-xs text-slate-400 font-mono ml-2">manpreet@portfolio ~ /about</span>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Terminal Body */}
            <div 
              ref={scrollRef}
              className="flex-1 p-6 font-mono text-sm overflow-y-auto space-y-2 text-slate-300"
            >
              {history.filter(line => typeof line === 'string').map((line, i) => (
                <div key={i} className={cn(
                  "whitespace-pre-wrap leading-relaxed",
                  line.startsWith(">") ? "text-primary font-bold" : "text-slate-300"
                )}>
                  {line}
                </div>
              ))}
              
              {!isBooting && (
                <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2">
                  <ChevronRight size={16} className="text-primary animate-pulse" />
                  <input
                    autoFocus
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-slate-600"
                    placeholder="Type a command..."
                  />
                </form>
              )}
            </div>

            {/* Terminal Footer */}
            <div className="px-6 py-2 bg-white/5 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              <span>Status: {isBooting ? "Booting..." : "Online"}</span>
              <div className="flex items-center gap-2">
                <TerminalIcon size={12} />
                <span>Bash v4.4</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
