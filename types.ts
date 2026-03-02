
export interface Experience {
  title: string;
  location: string;
  designation: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
}

export interface Schooling {
  institution: string;
  degree: string;
  year: string;
}

export interface ItemWithThumbnail {
  title: string;
  link: string;
  description: string;
  thumbnail: string;
}

export interface ProfessionalData {
  name: string;
  role: string;
  about: string;
  email: string;
  linkedin: string;
  experienceYears: string;
  experience: Experience[];
  schooling: Schooling[];
  talks: ItemWithThumbnail[];
  projects: ItemWithThumbnail[];
  blogs: ItemWithThumbnail[];
  certifications: ItemWithThumbnail[];
}

export interface Attribution {
  name: string;
  url: string;
}

export interface AdventureItem {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: string;
  color: string;
  // 3D model
  modelPath?: string;
  modelScale?: number;
  modelRotation?: [number, number, number];
  effects?: string[];
  attribution?: Attribution;
  // Section layout
  reversed?: boolean;
  videoBackground?: string;
  ctaLink?: string;
  ctaLabel?: string;
  // Canvas overlays
  badge?: string;
  watermark?: string;
}

export interface AdventureData {
  instagram: string;
  hobbies: AdventureItem[];
}
