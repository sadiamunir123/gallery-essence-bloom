import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Image, User, Briefcase, Search, X, Menu } from "lucide-react";
import logo from "@/assets/logo.jpeg";
import { artworks } from "@/data/artworks";

const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Gallery", path: "/gallery", icon: Image },
  { label: "About", path: "/about", icon: User },
  { label: "Services", path: "/services", icon: Briefcase },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

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

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 pt-6 pb-8">
        <Link to="/" onClick={() => setMobileOpen(false)}>
          <img src={logo} alt="HAQ Arts" className="h-12 w-auto" />
        </Link>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm tracking-wide transition-all duration-200 group ${
                isActive
                  ? "bg-accent/15 text-foreground"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <item.icon
                size={18}
                strokeWidth={1.5}
                className={`transition-colors ${isActive ? "text-accent" : "text-muted-foreground group-hover:text-foreground"}`}
              />
              <span className="tracking-[0.1em] uppercase text-xs font-medium">
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Search Button */}
      <div className="px-3 pb-6">
        <button
          onClick={() => setSearchOpen(true)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-body text-xs tracking-[0.1em] uppercase text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all"
        >
          <Search size={18} strokeWidth={1.5} />
          Search
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 bottom-0 w-56 bg-background border-r border-border z-50 flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-background/90 backdrop-blur-lg border-b border-border/50">
        <Link to="/">
          <img src={logo} alt="HAQ Arts" className="h-9 w-auto" />
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 rounded-full text-foreground hover:bg-muted/50 transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-full text-foreground hover:bg-muted/50 transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: -280 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -280 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative w-64 h-full bg-background border-r border-border shadow-xl">
              {sidebarContent}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-foreground/30 backdrop-blur-sm flex items-start justify-center pt-[15vh]"
            onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="bg-background border border-border rounded-xl shadow-2xl w-[90vw] max-w-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative p-4">
                <Search
                  size={18}
                  className="absolute left-8 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search artworks..."
                  className="w-full pl-10 pr-10 py-3 bg-muted/40 border border-border rounded-lg font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all"
                />
                <button
                  onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                  className="absolute right-8 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={16} />
                </button>
              </div>

              {searchQuery.trim() && (
                <div className="border-t border-border max-h-72 overflow-y-auto px-4 py-2">
                  {searchResults.length > 0 ? (
                    searchResults.map((artwork) => (
                      <button
                        key={artwork.id}
                        onClick={() => handleResultClick(artwork.id)}
                        className="w-full flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-muted/60 transition-colors text-left"
                      >
                        <img
                          src={artwork.image}
                          alt={artwork.title}
                          className="w-11 h-11 object-cover rounded"
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
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground font-body text-sm py-6">
                      No results for "{searchQuery}"
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
