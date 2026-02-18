import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface WorkItem {
  title: string;
  category: string;
  image: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SkillItem {
  name: string;
  icon: LucideIcon;
  level?: string;
}
