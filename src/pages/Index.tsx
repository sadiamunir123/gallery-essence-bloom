import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { artworks } from "@/data/artworks";
import Navigation from "@/components/Navigation";

const heroArtworks = artworks.slice(0, 4);

const Index = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % heroArtworks.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + heroArtworks.length) % heroArtworks.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  const artwork = heroArtworks[current];

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Navigation variant="light" />

      {/* Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={artwork.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={artwork.image}
            alt={artwork.title}
            className="h-full w-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gallery-overlay/80 via-gallery-overlay/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Artwork Info */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={artwork.id + "-info"}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gallery-text/60 mb-2">
              {artwork.category} · {artwork.year}
            </p>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-gallery-text font-medium mb-3">
              {artwork.title}
            </h2>
            <p className="font-accent text-lg md:text-xl text-gallery-text/70 max-w-lg mb-6 italic">
              {artwork.medium} — {artwork.dimensions}
            </p>
            <Link
              to={`/gallery/${artwork.id}`}
              className="inline-block font-body text-sm tracking-[0.2em] uppercase text-gallery-text border-b border-gallery-text/40 pb-1 hover:border-gallery-text transition-colors duration-300"
            >
              View Artwork
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="flex items-center gap-6 mt-8">
          <button
            onClick={prev}
            className="text-gallery-text/60 hover:text-gallery-text transition-colors"
            aria-label="Previous artwork"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-3">
            {heroArtworks.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-px transition-all duration-500 ${
                  i === current
                    ? "w-10 bg-gallery-text"
                    : "w-5 bg-gallery-text/30 hover:bg-gallery-text/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="text-gallery-text/60 hover:text-gallery-text transition-colors"
            aria-label="Next artwork"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
