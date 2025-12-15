// Add these to your existing types/navigation.ts if needed
export type WebinarType = {
  id: string;
  title: string;
  date: string;
  speaker?: string;
  duration?: string;
};

export type BlogType = {
  id: string;
  title: string;
  excerpt: string;
  thumbnail?: string;
  author?: string;
  date?: string;
  readTime?: string;
  category?: string;
};