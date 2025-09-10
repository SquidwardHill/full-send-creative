export const ROLE_DISPLAY_NAMES = {
  DESIGNER: "Designer",
  FRONTEND_LEAD: "Frontend Lead", 
  FRONTEND_DEVELOPER: "Frontend Developer",
  BACKEND_DEVELOPER: "Backend Developer",
  FULL_STACK_DEVELOPER: "Full Stack Developer",
  TECHNICAL_LEAD: "Technical Lead",
  PRODUCT_STRATEGIST: "Product Strategist",
} as const;

export type ContributorRole = keyof typeof ROLE_DISPLAY_NAMES;

export function getRoleDisplayName(role: ContributorRole): string {
  return ROLE_DISPLAY_NAMES[role] || role;
}

export function getRolesDisplayString(roles: ContributorRole[]): string {
  return roles.map(getRoleDisplayName).join(" • ");
}
