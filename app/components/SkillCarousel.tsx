import { useEffect, useRef, useState, useCallback } from "react";
import SkillIcon from "./SkillIcon.js";
import type { Skill } from "../types/skills.js";

interface SkillCarouselProps {
  skills: Skill[];
  speed?: number; // seconds for one full loop
}

export default function SkillCarousel({ skills, speed = 0.3 }: SkillCarouselProps) {
  const repeatedSkills = [...skills, ...skills, ...skills, ...skills];
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll animation
  useEffect(() => {
    if (containerRef.current && !isDragging && !isPaused) {
      const container = containerRef.current;
      const scrollWidth = container.scrollWidth;
      const duration = speed * 1000;

      const animate = () => {
        if (!isDragging && !isPaused && containerRef.current) {
          container.style.transform = `translateX(-${scrollWidth / 2}px)`;
          container.style.transition = `transform ${duration}s linear`;

          setTimeout(() => {
            if (!isDragging && !isPaused && containerRef.current) {
              container.style.transition = "none";
              container.style.transform = "translateX(0)";
              requestAnimationFrame(animate);
            }
          }, duration * 1000);
        }
      };

      animate();
    }
  }, [speed, isDragging, isPaused]);

  // Touch/mouse handlers
  const handleStart = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    setIsPaused(true);

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);

    if (containerRef.current) {
      setScrollLeft(containerRef.current.scrollLeft);
    }
  }, []);

  const handleMove = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      e.preventDefault();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const x = clientX - startX;
      containerRef.current.scrollLeft = scrollLeft - x;
    },
    [isDragging, startX, scrollLeft]
  );

  const handleEnd = useCallback(() => {
    setIsDragging(false);
    // Resume auto-scroll after a delay
    setTimeout(() => {
      setIsPaused(false);
    }, 2000);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Fade masks */}
      <div className="fade-left pointer-events-none absolute left-0 top-0 h-full w-[10%] z-10"></div>
      <div className="fade-right pointer-events-none absolute right-0 top-0 h-full w-[10%] z-10"></div>

      {/* Scrolling track */}
      <div
        ref={containerRef}
        className="flex gap-8 md:gap-12 px-[10%] overflow-x-auto scrollbar-hide"
        style={{
          width: "max-content",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
      >
        {repeatedSkills.map((skill, idx) => (
          <div
            key={idx}
            className="flex items-center text-bubblegum-500 whitespace-nowrap flex-shrink-0"
          >
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
