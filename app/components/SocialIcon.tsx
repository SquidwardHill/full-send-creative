import { FaGithub, FaDribbble, FaEnvelope, FaLinkedin } from "react-icons/fa";
import type { IconType } from "react-icons";

// Map icon names to actual icon components
const iconMap: Record<string, IconType> = {
  github: FaGithub,
  dribbble: FaDribbble,
  mail: FaEnvelope,
  linkedin: FaLinkedin,
  // Add more icons as needed
};

// Type for valid icon names
export type SocialIconName = keyof typeof iconMap;

interface SocialIconProps {
  name: SocialIconName;
  className?: string;
}

export default function SocialIcon({ name, className = "" }: SocialIconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }

  return <IconComponent className={className} />;
}

// Export the icon map for external use if needed
export { iconMap };
