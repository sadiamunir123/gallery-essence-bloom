import { useParams, Link } from "react-router-dom";
import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ZoomIn, ZoomOut, Maximize2, X } from "lucide-react";
import { artworks } from "@/data/artworks";
import Navigation from "@/components/Navigation";

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
    setScale((s) => {
      const newScale = s - e.deltaY * 0.002;
      return Math.max(1, Math.min(5, newScale));
    });
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

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  if (!artwork) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-body text-muted-foreground">Artwork not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation variant="dark" />

      <main className="pt-28 pb-20 px-8 md:px-16">
        <Link
          to="/gallery"
          className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft size={16} />
          Back to Gallery
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <img
              src={artwork.image}
              alt={artwork.title}
              className="w-full object-cover"
            />
            <button
              onClick={() => { setZoomOpen(true); resetZoom(); }}
              className="absolute bottom-4 right-4 bg-foreground/70 text-primary-foreground p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Open zoom viewer"
            >
              <Maximize2 size={18} />
            </button>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
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
                <button className="font-body text-sm tracking-[0.2em] uppercase bg-foreground text-primary-foreground px-8 py-3 hover:opacity-80 transition-opacity">
                  Inquire
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      {/* Zoom Overlay */}
      {zoomOpen && (
        <div className="fixed inset-0 z-50 bg-gallery-overlay flex flex-col">
          {/* Controls */}
          <div className="flex items-center justify-between px-6 py-4">
            <p className="font-display text-gallery-text text-lg">
              {artwork.title}
            </p>
            <div className="flex items-center gap-4">
              <button onClick={handleZoomOut} className="text-gallery-text/70 hover:text-gallery-text transition-colors" aria-label="Zoom out">
                <ZoomOut size={20} />
              </button>
              <span className="font-body text-sm text-gallery-text/50">
                {Math.round(scale * 100)}%
              </span>
              <button onClick={handleZoomIn} className="text-gallery-text/70 hover:text-gallery-text transition-colors" aria-label="Zoom in">
                <ZoomIn size={20} />
              </button>
              <button onClick={() => setZoomOpen(false)} className="text-gallery-text/70 hover:text-gallery-text transition-colors ml-4" aria-label="Close">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Zoomable Image */}
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
    </div>
  );
};

export default ArtworkDetail;
