import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/react-splide/css";
import SkillIcon from "./SkillIcon.js";
import type { Skill } from "../types/skills.js";
import "../assets/styles/components/SkillCarousel.css";

interface SkillCarouselProps {
  skills: Skill[];
  speed?: number; // seconds for one full loop
}

export default function SkillCarousel({ skills, speed = 0.3 }: SkillCarouselProps) {
  const repeatedSkills = [...skills, ...skills, ...skills, ...skills];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Fade masks */}
      <div className="fade-left pointer-events-none absolute left-0 top-0 h-full w-[10%] z-10"></div>
      <div className="fade-right pointer-events-none absolute right-0 top-0 h-full w-[10%] z-10"></div>
      <Splide
        options={{
          type: "loop",
          perPage: "auto",
          perMove: 1,
          arrows: false,
          pagination: false,
          gap: "2rem",
          breakpoints: {
            1024: {
              gap: "1.5rem",
            },
            768: {
              gap: "1rem",
            },
          },
          autoScroll: {
            speed: speed,
            pauseOnHover: false,
            pauseOnFocus: false,
          },
        }}
        extensions={{ AutoScroll }}
      >
        {repeatedSkills.map((skill, idx) => (
          <SplideSlide key={idx}>
            <div className="flex items-center text-bubblegum-500 whitespace-nowrap">
              <div className="w-8 h-8 flex items-center justify-center">
                <SkillIcon name={skill.icon as any} />
              </div>
              <span className="ml-1 md:ml-3 text-md tracking-wide">{skill.name}</span>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
