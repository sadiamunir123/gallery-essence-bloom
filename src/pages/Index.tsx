import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, ChevronDown, Palette, Frame, Home as HomeIcon, BookOpen, Mail, Instagram, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { artworks } from "@/data/artworks";
import { blogPosts } from "@/data/blogPosts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import artwork5 from "@/assets/artwork-5.jpg";

const heroArtworks = artworks.slice(0, 5);
const featuredArtworks = artworks.filter((a) => !a.sold).slice(0, 5);
const signatureCollection = artworks.filter((a) => !a.sold).slice(2, 8);

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

      {/* ========== SECTION 1: HERO ========== */}
      <section className="relative h-screen w-full overflow-hidden grain-overlay">
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
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay))]/90 via-[hsl(var(--hero-overlay))]/40 to-[hsl(var(--hero-overlay))]/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay))]/60 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight leading-none mb-2">
              HAQ
            </h1>
            <div className="flex items-center justify-center gap-0 mb-3">
              <div className="logo-stripe h-[3px] w-20 md:w-32 rounded-full" />
            </div>
            <p className="font-body text-xs md:text-sm tracking-[0.4em] uppercase text-white/50 mb-6">
              Arts
            </p>
            <p className="font-accent text-lg md:text-2xl lg:text-3xl text-white/60 italic max-w-xl mx-auto mb-10 leading-relaxed">
              Exploring Depth, Color & Emotion
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase text-[hsl(var(--hero-overlay))] bg-white px-8 py-4 hover:bg-white/90 transition-all duration-300"
              >
                View Gallery
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase text-white border border-white/30 px-8 py-4 hover:bg-white/10 transition-all duration-300"
              >
                Meet the Artist
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Slide Controls */}
        <div className="absolute bottom-24 left-0 right-0 flex items-center justify-center gap-6 z-10">
          <button onClick={prev} className="text-white/40 hover:text-white transition-colors p-1" aria-label="Previous">
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            {heroArtworks.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-[2px] transition-all duration-500 ${
                  i === current ? "w-10 bg-white" : "w-5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={next} className="text-white/40 hover:text-white transition-colors p-1" aria-label="Next">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 scroll-indicator">
          <ChevronDown size={20} className="text-white/30" />
        </div>
      </section>

      {/* ========== SECTION 2: FEATURED MASTERPIECES ========== */}
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
              Curated Selection
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-medium">
              Featured Masterpieces
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {featuredArtworks.map((art, i) => (
              <motion.div
                key={art.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link to={`/gallery/${art.id}`} className="group block artwork-card rounded-sm overflow-hidden bg-card">
                  <div className="relative overflow-hidden">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105 artwork-cursor"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[hsl(var(--hero-overlay))]/0 group-hover:bg-[hsl(var(--hero-overlay))]/20 transition-all duration-500" />
                    {/* Quick View */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="font-body text-[10px] tracking-[0.2em] uppercase text-white bg-[hsl(var(--hero-overlay))]/60 backdrop-blur-sm px-5 py-2.5">
                        Quick View
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-base font-medium mb-1 group-hover:text-accent transition-colors duration-300">
                      {art.title}
                    </h3>
                    <p className="font-accent text-sm text-muted-foreground italic">
                      {art.medium} · {art.year}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 3: ABOUT THE ARTIST ========== */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-[hsl(var(--hero-overlay))] grain-overlay relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <img
                src={artwork5}
                alt="Artist portrait"
                className="w-full aspect-[3/4] object-cover"
                loading="lazy"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-[hsl(var(--accent))]/30" />
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="font-body text-[10px] tracking-[0.4em] uppercase text-white/30 mb-4">
                The Artist
              </p>
              <h2 className="font-display text-3xl md:text-5xl text-white font-medium mb-6">
                Sadia Munir
              </h2>
              <p className="font-accent text-lg md:text-xl text-white/50 italic mb-6 leading-relaxed">
                "Art is the bridge between the visible world and the invisible emotions that shape our inner lives."
              </p>
              <p className="font-body text-sm text-white/40 leading-relaxed mb-8">
                Based in Lahore, Pakistan, Sadia Munir is a contemporary artist whose work explores the intersections of emotion, texture, and color. Working primarily in oil, mixed media, and gold leaf, her paintings invite viewers into meditative spaces where warmth and depth converge. With exhibitions across South Asia and the Middle East, her art continues to captivate collectors worldwide.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase text-white border border-white/20 px-8 py-3.5 hover:bg-white/5 transition-all duration-300"
              >
                Read Full Artist Story
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 4: SIGNATURE COLLECTION ========== */}
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
                Exclusive
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-medium">
                Signature Collection
              </h2>
            </div>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors mt-4 md:mt-0"
            >
              Explore Full Gallery
              <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {signatureCollection.map((art, i) => (
              <motion.div
                key={art.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link to={`/gallery/${art.id}`} className="group block artwork-card rounded-sm overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105 artwork-cursor"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[hsl(var(--hero-overlay))]/0 group-hover:bg-[hsl(var(--hero-overlay))]/20 transition-all duration-500" />
                  </div>
                  <div className="pt-4">
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
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 5: COMMISSION & SERVICES ========== */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-card">
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
              Commission & Services
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Palette, title: "Commissioned Paintings", desc: "Bespoke paintings crafted to your vision, palette, and space. From concept to canvas, every piece is a collaboration." },
              { icon: HomeIcon, title: "Wall Murals & Interior Art", desc: "Transform your spaces with large-scale murals and custom interior art that brings walls to life with color and emotion." },
              { icon: Frame, title: "Art Consultation", desc: "Expert guidance on curating a meaningful art collection for your home, office, or gallery space." },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group p-8 md:p-10 border border-border hover:border-accent/30 bg-background transition-all duration-500 artwork-card"
              >
                <s.icon size={28} className="text-accent mb-5 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-display text-lg font-medium mb-3">
                  {s.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase bg-foreground text-background px-8 py-4 hover:opacity-90 transition-all duration-300"
            >
              Request a Commission
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== SECTION 6: BLOG / THESIS ========== */}
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
              Writings
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-medium">
              Latest Articles & Thesis
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group artwork-card bg-card rounded-sm overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="font-body text-[10px] tracking-[0.15em] uppercase bg-[hsl(var(--hero-overlay))]/70 backdrop-blur-sm text-white px-3 py-1.5">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="font-body text-xs text-muted-foreground mb-2">
                    {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                  <h3 className="font-display text-lg font-medium mb-2 group-hover:text-accent transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors">
              Read All Articles
              <BookOpen size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ========== SECTION 7: CONTACT / COLLABORATION ========== */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-[hsl(var(--hero-overlay))] grain-overlay relative">
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-white/30 mb-3">
              Get in Touch
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-white font-medium mb-4">
              Let's Collaborate
            </h2>
            <p className="font-accent text-lg text-white/40 italic max-w-lg mx-auto">
              Interested in a commission, exhibition, or collaboration? I'd love to hear from you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
          >
            {/* Contact Form */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-5"
            >
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-5 py-3.5 bg-white/5 border border-white/10 font-body text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/40 transition-all"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-5 py-3.5 bg-white/5 border border-white/10 font-body text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/40 transition-all"
              />
              <textarea
                placeholder="Tell me about your project..."
                rows={4}
                className="w-full px-5 py-3.5 bg-white/5 border border-white/10 font-body text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/40 transition-all resize-none"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase bg-white text-[hsl(var(--hero-overlay))] px-8 py-4 hover:bg-white/90 transition-all duration-300"
              >
                Send Message
                <Send size={14} />
              </button>
            </form>

            {/* Contact Info */}
            <div className="flex flex-col justify-center gap-8">
              <div className="flex items-start gap-4">
                <Mail size={20} className="text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-body text-xs tracking-[0.15em] uppercase text-white/40 mb-1">Email</p>
                  <a href="mailto:hello@haqarts.com" className="font-body text-sm text-white hover:text-accent transition-colors">
                    hello@haqarts.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Instagram size={20} className="text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-body text-xs tracking-[0.15em] uppercase text-white/40 mb-1">Instagram</p>
                  <a href="https://instagram.com/haqarts" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-white hover:text-accent transition-colors">
                    @haqarts
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Palette size={20} className="text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-body text-xs tracking-[0.15em] uppercase text-white/40 mb-1">Studio</p>
                  <p className="font-body text-sm text-white/70">
                    Lahore, Pakistan<br />
                    Available for commissions worldwide
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
