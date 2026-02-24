import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";
import artwork4 from "@/assets/artwork-4.jpg";
import artwork5 from "@/assets/artwork-5.jpg";
import artwork6 from "@/assets/artwork-6.jpg";
import artwork7 from "@/assets/artwork-7.jpg";
import artwork8 from "@/assets/artwork-8.jpg";

export interface Artwork {
  id: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  price: number | null;
  sold: boolean;
  image: string;
  description: string;
  category: string;
}

export const artworks: Artwork[] = [
  {
    id: "1",
    title: "Ember Horizon",
    year: "2025",
    medium: "Oil on Canvas",
    dimensions: "120 × 60 cm",
    price: 4800,
    sold: false,
    image: artwork1,
    description: "A vivid exploration of warmth and intensity, where golden light dissolves into deep burgundy depths. The impasto technique creates a tactile landscape of emotion.",
    category: "Abstract",
  },
  {
    id: "2",
    title: "Oceanic Reverie",
    year: "2025",
    medium: "Mixed Media on Canvas",
    dimensions: "180 × 100 cm",
    price: 7200,
    sold: false,
    image: artwork2,
    description: "Inspired by the untamed power of the ocean, this piece captures the fluid dance between chaos and serenity through layers of blue and silver.",
    category: "Abstract",
  },
  {
    id: "3",
    title: "Terra Forma",
    year: "2024",
    medium: "Acrylic on Canvas",
    dimensions: "100 × 50 cm",
    price: 3600,
    sold: true,
    image: artwork3,
    description: "A minimalist meditation on earth and form. Geometric shapes meet organic curves in a harmonious dialogue of terracotta and charcoal.",
    category: "Minimalist",
  },
  {
    id: "4",
    title: "Verdant Alchemy",
    year: "2025",
    medium: "Oil & Gold Leaf on Canvas",
    dimensions: "150 × 80 cm",
    price: 8500,
    sold: false,
    image: artwork4,
    description: "Deep emerald meets precious gold leaf in this luxurious exploration of nature's most opulent palette. Each brushstroke reveals hidden depths.",
    category: "Mixed Media",
  },
  {
    id: "5",
    title: "Rose Quartz Dreams",
    year: "2024",
    medium: "Oil on Canvas",
    dimensions: "100 × 100 cm",
    price: 5200,
    sold: false,
    image: artwork5,
    description: "Soft flowing forms in rose and coral create a meditative space where warmth and tenderness converge with golden veins of light.",
    category: "Abstract",
  },
  {
    id: "6",
    title: "Midnight Crescendo",
    year: "2024",
    medium: "Oil on Canvas",
    dimensions: "120 × 120 cm",
    price: null,
    sold: true,
    image: artwork6,
    description: "A dramatic symphony of indigo and white, capturing the raw energy of a midnight storm where light breaks through darkness.",
    category: "Abstract",
  },
  {
    id: "7",
    title: "Gilded Garden",
    year: "2025",
    medium: "Mixed Media & Gold Leaf",
    dimensions: "90 × 90 cm",
    price: 4500,
    sold: false,
    image: artwork7,
    description: "Botanical forms rendered in luminous gold leaf against warm earth tones, celebrating the intersection of nature and precious materials.",
    category: "Botanical",
  },
  {
    id: "8",
    title: "Sunset Passage",
    year: "2024",
    medium: "Oil on Canvas",
    dimensions: "90 × 90 cm",
    price: 3800,
    sold: false,
    image: artwork8,
    description: "An impressionistic journey through color and light, where sunset hues melt into reflective waters, blurring the boundary between sky and earth.",
    category: "Landscape",
  },
];
