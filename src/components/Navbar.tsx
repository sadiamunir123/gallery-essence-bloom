import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { artworks } from "@/data/artworks";
import haqLogo from "@/assets/haq-arts-logo.png";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Gallery", path: "/gallery" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const searchResults = searchQuery.trim()
    ? artworks.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.medium.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleResultClick = (id: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    navigate(`/gallery/${id}`);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[hsl(0,0%,3%)]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-[hsl(0,0%,3%)]"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-10 h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={haqLogo} alt="HAQ Arts" className="h-10 md:h-12 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 font-body text-[11px] tracking-[0.2em] uppercase transition-all duration-300 ${
                    isActive ? "text-white" : "text-white/50 hover:text-white/80"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute bottom-0 left-4 right-4 h-[2px] bg-[hsl(var(--accent))]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
              aria-label="Search"
            >
              {searchOpen ? <X size={18} /> : <Search size={18} />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 right-0 z-40 bg-[hsl(0,0%,5%)]/98 backdrop-blur-xl border-b border-white/10 top-16 md:top-20"
          >
            <div className="max-w-xl mx-auto px-5 py-6">
              <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search artworks, categories, mediums..."
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg font-body text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/40 transition-all"
                />
              </div>
              {searchQuery.trim() && (
                <div className="mt-4 max-h-64 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <div className="space-y-1">
                      {searchResults.map((artwork) => (
                        <button
                          key={artwork.id}
                          onClick={() => handleResultClick(artwork.id)}
                          className="w-full flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-white/5 transition-colors text-left"
                        >
                          <img src={artwork.image} alt={artwork.title} className="w-11 h-11 object-cover rounded" />
                          <div>
                            <p className="font-display text-sm font-medium text-white">{artwork.title}</p>
                            <p className="font-body text-xs text-white/40">{artwork.category} · {artwork.medium}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-white/40 font-body text-sm py-6">No results for "{searchQuery}"</p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[hsl(0,0%,3%)] flex flex-col items-center justify-center gap-6"
          >
            {navItems.map((item, i) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`font-display text-3xl tracking-wider transition-all duration-300 ${
                      isActive ? "text-white" : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div layoutId="mobile-active" className="h-[2px] bg-[hsl(var(--accent))] mt-1" />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
