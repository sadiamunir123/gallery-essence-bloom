import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";
import artwork4 from "@/assets/artwork-4.jpg";
import artwork5 from "@/assets/artwork-5.jpg";
import artwork6 from "@/assets/artwork-6.jpg";
import artwork7 from "@/assets/artwork-7.jpg";
import artwork8 from "@/assets/artwork-8.jpg";
import artwork9 from "@/assets/artwork-9.jpg";
import artwork10 from "@/assets/artwork-10.jpg";
import artwork11 from "@/assets/artwork-11.jpg";
import artwork12 from "@/assets/artwork-12.jpg";
import artwork13 from "@/assets/artwork-13.jpg";
import artwork14 from "@/assets/artwork-14.jpg";
import artwork15 from "@/assets/artwork-15.jpg";
import artwork16 from "@/assets/artwork-16.jpg";

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
  {
    id: "9",
    title: "Crimson & Gold",
    year: "2025",
    medium: "Oil & Gold Leaf on Canvas",
    dimensions: "140 × 100 cm",
    price: 9200,
    sold: false,
    image: artwork9,
    description: "A bold statement in crimson and metallic gold, where thick impasto layers create a dramatic interplay of passion and luxury.",
    category: "Abstract",
  },
  {
    id: "10",
    title: "Misty Peaks",
    year: "2024",
    medium: "Watercolor on Paper",
    dimensions: "80 × 60 cm",
    price: 2800,
    sold: false,
    image: artwork10,
    description: "Ethereal mountain ranges dissolve into soft mist, evoking a meditative calm through delicate washes of blue and grey.",
    category: "Landscape",
  },
  {
    id: "11",
    title: "Emerald Canopy",
    year: "2025",
    medium: "Acrylic & Gold Leaf on Canvas",
    dimensions: "110 × 90 cm",
    price: 5800,
    sold: false,
    image: artwork11,
    description: "Lush foliage rendered in rich emerald tones with subtle gold accents, celebrating the abundant beauty of the natural world.",
    category: "Botanical",
  },
  {
    id: "12",
    title: "Tempest",
    year: "2025",
    medium: "Oil on Canvas",
    dimensions: "160 × 120 cm",
    price: 8800,
    sold: false,
    image: artwork12,
    description: "The raw power of ocean waves captured in swirling navy and white, a fluid meditation on nature's untameable energy.",
    category: "Abstract",
  },
  {
    id: "13",
    title: "Sienna Construct",
    year: "2024",
    medium: "Mixed Media on Canvas",
    dimensions: "100 × 80 cm",
    price: 4200,
    sold: true,
    image: artwork13,
    description: "Warm terracotta and burnt orange geometric forms create a structured composition evoking ancient architecture and earthen warmth.",
    category: "Minimalist",
  },
  {
    id: "14",
    title: "Sakura Whisper",
    year: "2025",
    medium: "Watercolor on Silk",
    dimensions: "70 × 50 cm",
    price: 3200,
    sold: false,
    image: artwork14,
    description: "Delicate cherry blossoms float on ivory silk, a whisper of spring rendered with Japanese-inspired sensitivity and grace.",
    category: "Botanical",
  },
  {
    id: "15",
    title: "Violet Nebula",
    year: "2025",
    medium: "Acrylic & Resin on Canvas",
    dimensions: "120 × 120 cm",
    price: 6500,
    sold: false,
    image: artwork15,
    description: "Cosmic purple and silver tones swirl in fluid harmony, evoking the infinite depths of distant nebulae and starlight.",
    category: "Abstract",
  },
  {
    id: "16",
    title: "Autumn Cathedral",
    year: "2024",
    medium: "Oil on Canvas",
    dimensions: "130 × 100 cm",
    price: 5500,
    sold: false,
    image: artwork16,
    description: "Golden light floods through autumn canopy, transforming an ordinary forest path into a cathedral of amber and gold.",
    category: "Landscape",
  },
];
