import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import logo from "@/assets/logo.jpeg";
import { artworks } from "@/data/artworks";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Gallery", path: "/gallery" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
];

interface NavigationProps {
  variant?: "light" | "dark";
}

const Navigation = ({ variant = "dark" }: NavigationProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const isLight = variant === "light";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

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
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-background/80 backdrop-blur-lg shadow-sm border-b border-border/50"
            : "py-5"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="z-50 flex-shrink-0">
          <img
            src={logo}
            alt="HAQ Arts"
            className={`w-auto transition-all duration-500 ${scrolled ? "h-8 md:h-9" : "h-10 md:h-12"}`}
          />
        </Link>

        {/* Desktop Nav - Center */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative font-body text-xs tracking-[0.2em] uppercase transition-all duration-300 py-1 ${
                  isLight && !scrolled ? "text-gallery-text" : "text-foreground"
                } ${isActive ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side: Search + Mobile Toggle */}
        <div className="flex items-center gap-3 z-50">
          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className={`p-2 rounded-full transition-all duration-300 hover:bg-muted/50 ${
              isLight && !scrolled ? "text-gallery-text" : "text-foreground"
            }`}
            aria-label="Search"
          >
            {searchOpen ? <X size={20} /> : <Search size={20} />}
          </button>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-full transition-all duration-300 hover:bg-muted/50 ${
              isLight && !scrolled || mobileOpen ? "text-gallery-text" : "text-foreground"
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className={`fixed left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border shadow-lg ${
              scrolled ? "top-[52px]" : "top-[68px]"
            }`}
          >
            <div className="max-w-2xl mx-auto px-6 py-6">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search artworks, categories, mediums..."
                  className="w-full pl-12 pr-4 py-3 bg-muted/50 border border-border rounded-lg font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all"
                />
              </div>

              {/* Search Results */}
              {searchQuery.trim() && (
                <div className="mt-4 max-h-64 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <div className="space-y-1">
                      {searchResults.map((artwork) => (
                        <button
                          key={artwork.id}
                          onClick={() => handleResultClick(artwork.id)}
                          className="w-full flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-muted/60 transition-colors text-left"
                        >
                          <img
                            src={artwork.image}
                            alt={artwork.title}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="font-display text-sm font-medium text-foreground">
                              {artwork.title}
                            </p>
                            <p className="font-body text-xs text-muted-foreground">
                              {artwork.category} · {artwork.medium}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground font-body text-sm py-6">
                      No artworks found for "{searchQuery}"
                    </p>
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
            className="fixed inset-0 z-40 bg-gallery-overlay flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-3xl text-gallery-text tracking-wide hover:opacity-60 transition-opacity"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
