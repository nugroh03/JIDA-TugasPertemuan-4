export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  guests: string;
  message: string;
}

export interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  details: string[];
  description: string;
}

export interface SocialMedia {
  icon: React.ReactNode;
  name: string;
  handle: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export type ContactFormStatus = 'idle' | 'success' | 'error';
