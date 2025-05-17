import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const allSkills = [
  { name: "Figma", icon: "logos:figma" },
  { name: "Vue 3", icon: "logos:vue" },
  { name: "Tailwind", icon: "logos:tailwindcss-icon" },
  { name: "Vite", icon: "logos:vitejs" },
  { name: "Laravel", icon: "logos:laravel" },
  { name: "Livewire", icon: "simple-icons:livewire" },
  { name: "PHP", icon: "logos:php" },
  { name: "MySQL", icon: "logos:mysql" },
  { name: "Docker", icon: "logos:docker-icon" },
  { name: "Pest", icon: "logos:pestphp" },
  { name: "Inertia.js", icon: "logos:inertiajs" },
  { name: "Node.js", icon: "logos:nodejs-icon" },
  { name: "Git", icon: "logos:git-icon" },
];

const iconOverrides: Record<string, string> = {
  "logos:pestphp": "ph:bug", // or another visual metaphor
  "simple-icons:livewire": "mdi:flash",
  "logos:inertiajs": "mdi:infinity",
};

const fallbackIcon = "mdi:sparkles";

const VISIBLE = 5;
const INTERVAL = 4000;

export default function SkillCarousel() {
  const [visibleSkills, setVisibleSkills] = useState(() => {
    return getInitialSkills(allSkills, VISIBLE);
  });

  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleSkills((prev) => {
        const available = allSkills.filter((s) => !prev.find((v) => v.name === s.name));

        if (available.length === 0) return prev;

        const newSkill = available[Math.floor(Math.random() * available.length)];
        const replaceIndex = Math.floor(Math.random() * VISIBLE);

        setAnimatingIndex(replaceIndex);

        const updated = [...prev];
        updated[replaceIndex] = {
          ...newSkill,
          id: `${newSkill.name}-${Date.now()}`,
        };

        return updated;
      });

      // Reset animating index after animation
      setTimeout(() => {
        setAnimatingIndex(null);
      }, 1000);
    }, INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full text-center px-12 mt-6">
      <div className="flex flex-wrap lg:flex-nowrap justify-center gap-6 lg-gap-0 lg:justify-between ">
        {visibleSkills.map((skill, idx) => {
          const overrideIcon = iconOverrides[skill.icon];
          const icon = overrideIcon || skill.icon || fallbackIcon;

          return (
            <div
              key={idx}
              className={`relative flex justify-center items-center h-14 w-40 transition-all duration-700 ease-out border border-white/10 bg-white/5 rounded-full px-4 text-white text-lg font-medium shadow-[0_0_15px_rgba(251,113,133,0.45)] ${
                idx === animatingIndex
                  ? "opacity-0 scale-90 animate-fade-in"
                  : "opacity-100 scale-100"
              }`}
            >
              <Icon icon={icon} width={20} height={20} className="mr-2" />
              <span>{skill.name}</span>
              {idx === animatingIndex && <Sparkles />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getInitialSkills(source: any[], count: number) {
  const shuffled = [...source].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map((s) => ({ ...s, id: s.name }));
}

function Sparkles() {
  const count = 6;
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const delay = Math.random() * 0.4;

        return (
          <div
            key={i}
            className="absolute w-[6px] h-[6px] bg-pink-400 rounded-full opacity-80 animate-sparkle"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </>
  );
}
