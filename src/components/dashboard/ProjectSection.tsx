import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";

const INITIAL_PROJECTS = [
  {
    id: "os-guild",
    name: "os-guild",
    role: "Maintainer",
    description: "Community-driven platform for collaborative open source development.",
    language: "TypeScript",
    stars: 284,
    link: "https://github.com/OsGuild-HQ/os-guild",
  },
  {
    id: "neo-wallet",
    name: "neo-wallet",
    role: "Core Contributor",
    description: "Self-custodial Bitcoin wallet with Fedimint integration.",
    language: "Rust",
    stars: 512,
    link: "https://github.com/OsGuild-HQ",
  },
  {
    id: "architect-bot",
    name: "architect-bot",
    role: "Creator",
    description: "Intelligent Discord bot guiding open-source contribution workflows.",
    language: "Python",
    stars: 138,
    link: "https://github.com/OsGuild-HQ",
  },
  {
    id: "fedimint-modules",
    name: "fedimint-modules",
    role: "Contributor",
    description: "Custom Fedimint modules for community banking.",
    language: "Rust",
    stars: 203,
    link: "https://github.com/OsGuild-HQ",
  },
];

export function ProjectSection() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [starredIds, setStarredIds] = useState<string[]>([]);

  const handleStar = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (starredIds.includes(id)) {
      setProjects(prev =>
        prev.map(p => (p.id === id ? { ...p, stars: p.stars - 1 } : p))
      );
      setStarredIds(prev => prev.filter(i => i !== id));
    } else {
      setProjects(prev =>
        prev.map(p => (p.id === id ? { ...p, stars: p.stars + 1 } : p))
      );
      setStarredIds(prev => [...prev, id]);
    }
  };

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="flex items-end justify-between border-b-[3px] border-black pb-4">
        <h2 className="flex items-center gap-3 text-2xl font-black text-white">
          <span className="inline-block h-3.5 w-3.5 border-2 border-black bg-[#39d353]" />
          Featured Work
        </h2>
        <a
          href="https://github.com/OsGuild-HQ"
          target="_blank"
          rel="noopener noreferrer"
          className="border-b-2 border-transparent pb-1 text-sm font-bold text-[#8b949e] transition-colors hover:border-[#39d353] hover:text-[#39d353] flex items-center gap-1"
        >
          View all projects
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project, i) => {
          const isStarred = starredIds.includes(project.id);
          return (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="group block"
            >
              <Card className="h-full flex flex-col justify-between p-6">
                <div>
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="flex items-center gap-1.5 text-xl font-black text-white group-hover:text-[#39d353] transition-colors">
                        {project.name}
                        <ArrowUpRight className="h-4 w-4 text-[#39d353] opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </h3>
                      <p className="mt-0.5 font-mono text-xs text-[#8b949e]">{project.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 mb-6 text-sm leading-relaxed text-[#c9d1d9]">
                    {project.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-[#30363d]">
                  {/* Language */}
                  <span className="flex items-center gap-1.5 text-[#8b949e]">
                    <span 
                      className="h-2 w-2 rounded-full border border-black" 
                      style={{ 
                        backgroundColor: 
                          project.language === "TypeScript" ? "#3178c6" : 
                          project.language === "Rust" ? "#dea584" : "#f1e05a" 
                      }} 
                    />
                    {project.language}
                  </span>

                  {/* Stars Action */}
                  <button
                    onClick={(e) => handleStar(e, project.id)}
                    className={`flex items-center gap-1 px-2.5 py-1 border-2 transition-all cursor-pointer ${
                      isStarred 
                        ? "border-[#39d353] bg-[#238636]/20 text-[#39d353]"
                        : "border-[#30363d] bg-black/30 text-[#8b949e] hover:border-white hover:text-white"
                    }`}
                  >
                    <Star className={`h-3.5 w-3.5 ${isStarred ? "fill-[#39d353]" : ""}`} />
                    <span>{project.stars}</span>
                  </button>
                </div>
              </Card>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
