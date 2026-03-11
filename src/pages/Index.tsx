import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { artworks } from "@/data/artworks";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const heroArtworks = artworks.slice(0, 5);
const featuredArtworks = artworks.filter((a) => !a.sold).slice(0, 6);

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
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section - Full Screen */}
      <section className="relative h-screen w-full overflow-hidden">
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
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,3%)]/90 via-[hsl(0,0%,3%)]/30 to-[hsl(0,0%,3%)]/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(0,0%,3%)]/50 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16 lg:p-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={artwork.id + "-info"}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="max-w-3xl"
            >
              <p className="font-body text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/40 mb-3">
                {artwork.category} · {artwork.year}
              </p>
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-medium mb-4 leading-tight">
                {artwork.title}
              </h2>
              <p className="font-accent text-base md:text-lg text-white/50 max-w-lg mb-8 italic">
                {artwork.medium} — {artwork.dimensions}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to={`/gallery/${artwork.id}`}
                  className="inline-flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase text-[hsl(0,0%,3%)] bg-white px-7 py-3.5 hover:bg-white/90 transition-all duration-300"
                >
                  View Artwork
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to="/gallery"
                  className="inline-flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase text-white border border-white/30 px-7 py-3.5 hover:bg-white/10 transition-all duration-300"
                >
                  Explore Gallery
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Controls */}
          <div className="flex items-center gap-6 mt-10">
            <button
              onClick={prev}
              className="text-white/40 hover:text-white transition-colors p-1"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-3">
              {heroArtworks.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-[2px] transition-all duration-500 ${
                    i === current
                      ? "w-10 bg-white"
                      : "w-5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="text-white/40 hover:text-white transition-colors p-1"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Artworks Section */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-14"
          >
            <div>
              <p className="font-body text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">
                Collection
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-medium">
                Featured Works
              </h2>
            </div>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors mt-4 md:mt-0"
            >
              View All
              <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredArtworks.map((art, i) => (
              <motion.div
                key={art.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link to={`/gallery/${art.id}`} className="group block">
                  <div className="relative overflow-hidden mb-4">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[hsl(0,0%,3%)]/0 group-hover:bg-[hsl(0,0%,3%)]/20 transition-all duration-500" />
                  </div>
                  <h3 className="font-display text-lg font-medium mb-1 group-hover:text-accent transition-colors duration-300">
                    {art.title}
                  </h3>
                  <p className="font-accent text-sm text-muted-foreground italic">
                    {art.medium}
                  </p>
                  {art.price && (
                    <p className="font-body text-sm text-muted-foreground mt-1">
                      ${art.price.toLocaleString()}
                    </p>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About CTA Section */}
      <section className="bg-[hsl(0,0%,3%)] py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-white/30 mb-4">
              The Artist
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-white font-medium mb-6">
              Sadia Munir
            </h2>
            <p className="font-accent text-lg md:text-xl text-white/40 italic max-w-2xl mx-auto mb-10 leading-relaxed">
              "Art is the bridge between the visible world and the invisible emotions that shape our inner lives."
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase text-white border border-white/20 px-8 py-3.5 hover:bg-white/5 transition-all duration-300"
            >
              Learn More
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">
              What I Offer
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-medium">
              Services
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Commissioned Works", desc: "Bespoke paintings crafted to your vision, palette, and space." },
              { title: "Art Consultation", desc: "Expert guidance on building a meaningful art collection." },
              { title: "Workshops", desc: "Intimate studio sessions exploring oil, mixed media, and gold leaf." },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="p-8 md:p-10 border border-border hover:border-accent/30 bg-card transition-all duration-300"
              >
                <h3 className="font-display text-lg font-medium mb-3">
                  {s.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              All Services
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
