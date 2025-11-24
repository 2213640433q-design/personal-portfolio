
export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string; // Kept for backward compatibility or extra info if needed
  description: string;
  meta: {
    tech: string;
    industry: string;
    platform: string;
  };
  tags: string[];
  link?: string;
  imagePlaceholderType: 'tech' | 'abstract' | 'people'; // For Picsum
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface AwardItem {
  title: string;
  description?: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface ValueProp {
  title: string;
  description: string;
  icon: any; // Lucide Icon component
}
