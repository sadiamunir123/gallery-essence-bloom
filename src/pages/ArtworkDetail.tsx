import { useParams, Link } from "react-router-dom";
import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ZoomIn, ZoomOut, Maximize2, X } from "lucide-react";
import { artworks } from "@/data/artworks";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ArtworkDetail = () => {
  const { id } = useParams();
  const artwork = artworks.find((a) => a.id === id);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.5, 5));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.5, 1));

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setScale((s) => Math.max(1, Math.min(5, s - e.deltaY * 0.002)));
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    posStart.current = { ...position };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setPosition({
      x: posStart.current.x + (e.clientX - dragStart.current.x),
      y: posStart.current.y + (e.clientY - dragStart.current.y),
    });
  };

  const handleMouseUp = () => setDragging(false);
  const resetZoom = () => { setScale(1); setPosition({ x: 0, y: 0 }); };

  if (!artwork) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <p className="font-body text-muted-foreground">Artwork not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 md:pt-32 pb-20 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft size={16} />
            Back to Gallery
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <img src={artwork.image} alt={artwork.title} className="w-full object-cover" />
              <button
                onClick={() => { setZoomOpen(true); resetZoom(); }}
                className="absolute bottom-4 right-4 bg-[hsl(0,0%,3%)]/70 text-white p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Open zoom viewer"
              >
                <Maximize2 size={18} />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col justify-center"
            >
              <p className="font-body text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">
                {artwork.category}
              </p>
              <h1 className="font-display text-3xl md:text-5xl font-medium mb-4">
                {artwork.title}
              </h1>
              <p className="font-accent text-lg text-muted-foreground italic mb-6">
                {artwork.medium} · {artwork.dimensions} · {artwork.year}
              </p>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-8 max-w-md">
                {artwork.description}
              </p>

              {artwork.sold ? (
                <div className="font-body text-sm tracking-[0.2em] uppercase text-muted-foreground border border-border px-6 py-3 w-fit">
                  Sold
                </div>
              ) : (
                <div>
                  {artwork.price && (
                    <p className="font-display text-2xl mb-4">
                      ${artwork.price.toLocaleString()}
                    </p>
                  )}
                  <Link
                    to="/contact"
                    className="inline-block font-body text-sm tracking-[0.2em] uppercase bg-foreground text-primary-foreground px-8 py-3 hover:opacity-80 transition-opacity"
                  >
                    Inquire
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      {/* Zoom Overlay */}
      {zoomOpen && (
        <div className="fixed inset-0 z-[70] bg-[hsl(0,0%,3%)] flex flex-col">
          <div className="flex items-center justify-between px-6 py-4">
            <p className="font-display text-white text-lg">{artwork.title}</p>
            <div className="flex items-center gap-4">
              <button onClick={handleZoomOut} className="text-white/50 hover:text-white transition-colors"><ZoomOut size={20} /></button>
              <span className="font-body text-sm text-white/40">{Math.round(scale * 100)}%</span>
              <button onClick={handleZoomIn} className="text-white/50 hover:text-white transition-colors"><ZoomIn size={20} /></button>
              <button onClick={() => setZoomOpen(false)} className="text-white/50 hover:text-white transition-colors ml-4"><X size={20} /></button>
            </div>
          </div>
          <div
            ref={containerRef}
            className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing zoom-container flex items-center justify-center"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              src={artwork.image}
              alt={artwork.title}
              className="max-h-full max-w-full select-none"
              draggable={false}
              style={{
                transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                transition: dragging ? "none" : "transform 0.2s ease-out",
              }}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ArtworkDetail;
