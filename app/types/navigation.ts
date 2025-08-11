export interface QuickLink {
  id: string;
  label: string;
  to: string;
  description: string;
  icon: string;
  type: "internal" | "external";
  category: "navigation" | "social";
}

export interface NavigationItem extends QuickLink {
  isActive?: boolean;
}
