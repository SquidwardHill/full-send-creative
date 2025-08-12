import React from "react";
import "~/assets/styles/components/SkillCarousel.css";
import SkillIcon from "./SkillIcon.js";
import type { Skill } from "../types/skills.js";

interface SkillCarouselProps {
  skills: Skill[];
  speed?: number; // seconds for one full loop
}

export default function SkillCarousel({ skills, speed = 20 }: SkillCarouselProps) {
  // Duplicate the list so it scrolls seamlessly
  const doubledSkills = [...skills, ...skills];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Fade masks */}
      <div className="fade-left pointer-events-none absolute left-0 top-0 h-full w-[10%] z-10"></div>
      <div className="fade-right pointer-events-none absolute right-0 top-0 h-full w-[10%] z-10"></div>

      {/* Scrolling track */}
      <div
        className="flex animate-scroll gap-12 px-[10%]" // padding matches fade width so items fade out at edges
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {doubledSkills.map((skill, idx) => (
          <div key={idx} className="flex items-center text-bubblegum-500 min-w-[15%] shrink-0">
            <div className="w-8 h-8 flex items-center justify-center">
              <SkillIcon name={skill.icon as any} />
            </div>
            <span className="ml-3 text-md tracking-wide">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
