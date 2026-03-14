import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { artworks } from "@/data/artworks";
import Navbar from "@/components/Navbar";

const heroArtworks = artworks.slice(0, 5);

const Index = () => {
  const [current, setCurrent] = useState(0);
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);
  const minSwipeDistance = 50;

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

  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    if (Math.abs(distance) >= minSwipeDistance) {
      distance > 0 ? next() : prev();
    }
    touchStart.current = null;
    touchEnd.current = null;
  };

  const artwork = heroArtworks[current];

  return (
    <div
      className="h-[100dvh] w-screen overflow-hidden relative bg-[hsl(0,0%,3%)]"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Navbar />

      {/* Full-screen slideshow background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={artwork.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={artwork.image}
            alt={artwork.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Artwork info overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={artwork.id + "-info"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute bottom-20 sm:bottom-28 left-4 sm:left-6 md:left-12 z-10 max-w-[calc(100%-2rem)] sm:max-w-lg"
        >
          <p className="font-body text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-white/40 mb-1.5 sm:mb-2">
            {artwork.category} · {artwork.year}
          </p>
          <h2 className="font-display text-xl sm:text-2xl md:text-4xl text-white font-medium mb-0.5 sm:mb-1 leading-tight">
            {artwork.title}
          </h2>
          <p className="font-accent text-xs sm:text-sm md:text-base text-white/50 italic">
            {artwork.medium}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Slide Controls */}
      <div className="absolute bottom-6 sm:bottom-12 left-0 right-0 flex items-center justify-center gap-4 sm:gap-6 z-10">
        <button onClick={prev} className="text-white/40 hover:text-white transition-colors p-1 hidden sm:block" aria-label="Previous">
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-2 sm:gap-3">
          {heroArtworks.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-[2px] transition-all duration-500 ${
                i === current ? "w-8 sm:w-10 bg-white" : "w-4 sm:w-5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <button onClick={next} className="text-white/40 hover:text-white transition-colors p-1 hidden sm:block" aria-label="Next">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-6 sm:bottom-12 right-4 sm:right-6 md:right-12 z-10">
        <span className="font-body text-[10px] sm:text-xs tracking-widest text-white/30">
          {String(current + 1).padStart(2, "0")} / {String(heroArtworks.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

export default Index;
