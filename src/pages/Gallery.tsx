import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { artworks } from "@/data/artworks";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = ["All", ...new Set(artworks.map((a) => a.category))];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? artworks
      : artworks.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-20 px-4 sm:px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-2 sm:mb-3">
              Collection
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium mb-1.5 sm:mb-2">
              Gallery
            </h1>
            <p className="font-accent text-base sm:text-lg text-muted-foreground italic mb-6 sm:mb-10">
              A curated collection of original works
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-8 sm:mb-12 overflow-x-auto pb-2 -mx-1 px-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-body text-[10px] sm:text-xs tracking-[0.2em] uppercase pb-1 transition-all duration-300 border-b-2 whitespace-nowrap ${
                  activeCategory === cat
                    ? "border-accent text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {filtered.map((artwork, i) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link to={`/gallery/${artwork.id}`} className="group block">
                  <div className="relative overflow-hidden mb-4">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[hsl(0,0%,3%)]/0 group-hover:bg-[hsl(0,0%,3%)]/20 transition-all duration-500" />
                    {artwork.sold && (
                      <div className="absolute top-4 right-4 bg-[hsl(0,0%,3%)]/80 text-white font-body text-[10px] tracking-[0.2em] uppercase px-3 py-1">
                        Sold
                      </div>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-medium mb-1 group-hover:text-accent transition-colors duration-300">
                    {artwork.title}
                  </h3>
                  <p className="font-accent text-sm text-muted-foreground italic">
                    {artwork.medium}, {artwork.year}
                  </p>
                  {artwork.price && !artwork.sold && (
                    <p className="font-body text-sm text-muted-foreground mt-1">
                      ${artwork.price.toLocaleString()}
                    </p>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
