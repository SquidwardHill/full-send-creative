import {
  SiFigma,
  SiTailwindcss,
  SiLaravel,
  SiLivewire,
  SiGit,
  SiPhpstorm,
  SiPostman,
  SiInertia,
  SiTypescript,
  SiVitest,
  SiMiro,
} from "react-icons/si";
import { FaVuejs, FaPhp, FaDocker, FaNodeJs, FaJs, FaReact, FaNpm } from "react-icons/fa";
import { GrMysql } from "react-icons/gr";
import type { IconType } from "react-icons";

// Map skill names to actual icon components
const skillIconMap: Record<string, IconType> = {
  figma: SiFigma,
  tailwind: SiTailwindcss,
  laravel: SiLaravel,
  livewire: SiLivewire,
  react: FaReact,
  phpstorm: SiPhpstorm,
  postman: SiPostman,
  vuejs: FaVuejs,
  npm: FaNpm,
  git: SiGit,
  javascript: FaJs,
  php: FaPhp,
  mysql: GrMysql,
  docker: FaDocker,
  "pest-php": FaPhp, // Note: Same icon as PHP
  inertia: SiInertia,
  "node-js": FaNodeJs,
  typescript: SiTypescript,
  vite: SiVitest,
  miro: SiMiro,
};

// Type for valid skill icon names
export type SkillIconName = keyof typeof skillIconMap;

interface SkillIconProps {
  name: SkillIconName;
  className?: string;
}

export default function SkillIcon({ name, className = "" }: SkillIconProps) {
  const IconComponent = skillIconMap[name];

  if (!IconComponent) {
    console.warn(`Skill icon "${name}" not found in skillIconMap`);
    return null;
  }

  return <IconComponent className={className} />;
}

// Export the icon map for external use if needed
export { skillIconMap };
