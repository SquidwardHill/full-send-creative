import { useEffect, useRef } from "react";
import SkillIcon from "./SkillIcon.js";
import type { Skill } from "../types/skills.js";

interface SkillCarouselProps {
  skills: Skill[];
  speed?: number; // seconds for one full loop
}

export default function SkillCarousel({ skills, speed = 0.3 }: SkillCarouselProps) {
  const repeatedSkills = [...skills, ...skills, ...skills, ...skills];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const duration = speed * 1000; // Convert to milliseconds

      // Create smooth infinite scroll animation
      const animate = () => {
        container.style.transform = `translateX(-${scrollWidth / 2}px)`;
        container.style.transition = `transform ${duration}s linear`;

        setTimeout(() => {
          container.style.transition = "none";
          container.style.transform = "translateX(0)";
          requestAnimationFrame(animate);
        }, duration * 1000);
      };

      animate();
    }
  }, [speed]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Fade masks */}
      <div className="fade-left pointer-events-none absolute left-0 top-0 h-full w-[10%] z-10"></div>
      <div className="fade-right pointer-events-none absolute right-0 top-0 h-full w-[10%] z-10"></div>

      {/* Scrolling track */}
      <div
        ref={containerRef}
        className="flex gap-8 md:gap-12 px-[10%]"
        style={{
          width: "max-content",
        }}
      >
        {repeatedSkills.map((skill, idx) => (
          <div key={idx} className="flex items-center text-bubblegum-500 whitespace-nowrap">
            <div className="w-8 h-8 flex items-center justify-center">
              <SkillIcon name={skill.icon as any} />
            </div>
            <span className="ml-1 md:ml-3 text-md tracking-wide">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
