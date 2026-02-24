import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { artworks } from "@/data/artworks";
import Sidebar from "@/components/Sidebar";

const categories = ["All", ...new Set(artworks.map((a) => a.category))];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? artworks
      : artworks.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="md:ml-56 pt-16 md:pt-12 pb-20 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-medium mb-2">
            Gallery
          </h1>
          <p className="font-accent text-lg text-muted-foreground italic mb-10">
            A curated collection of original works
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-body text-xs tracking-[0.2em] uppercase pb-1 transition-all duration-300 border-b ${
                activeCategory === cat
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {artwork.sold && (
                    <div className="absolute top-4 right-4 bg-foreground/80 text-primary-foreground font-body text-[10px] tracking-[0.2em] uppercase px-3 py-1">
                      Sold
                    </div>
                  )}
                </div>
                <h3 className="font-display text-lg font-medium mb-1 group-hover:opacity-70 transition-opacity">
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
      </main>
    </div>
  );
};

export default Gallery;
