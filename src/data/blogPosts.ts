import artwork3 from "@/assets/artwork-3.jpg";
import artwork7 from "@/assets/artwork-7.jpg";
import artwork12 from "@/assets/artwork-12.jpg";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Alchemy of Gold Leaf in Contemporary Art",
    excerpt: "Exploring the ancient technique of gold leaf application and its transformative power in modern abstract painting...",
    image: artwork7,
    date: "2026-02-15",
    category: "Technique",
  },
  {
    id: "2",
    title: "Color Theory: Building Emotional Palettes",
    excerpt: "How strategic color choices can evoke deep emotional responses and create immersive visual experiences for viewers...",
    image: artwork3,
    date: "2026-01-28",
    category: "Thesis",
  },
  {
    id: "3",
    title: "The Role of Texture in Abstract Expressionism",
    excerpt: "A deep dive into impasto techniques and mixed media layering that bring paintings to life with tactile dimension...",
    image: artwork12,
    date: "2026-01-10",
    category: "Research",
  },
];
