export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Stat {
  icon: React.ReactNode;
  number: string;
  label: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  experience: string;
  image: string;
  description: string;
}

export interface CategoryOption {
  value: string;
  label: string;
  icon: React.ReactNode;
}

export interface SelectOption {
  value: string;
  label: string;
}
