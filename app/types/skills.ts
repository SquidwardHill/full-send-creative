export interface Skill {
  id: string;
  name: string;
  icon: string;
  category: "design" | "css" | "backend" | "frontend" | "tools" | "language" | "database" | "testing";
  description: string;
}

export interface SkillWithIcon extends Skill {
  isActive?: boolean;
  proficiency?: "beginner" | "intermediate" | "advanced" | "expert";
}
