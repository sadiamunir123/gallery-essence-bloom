import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.jpeg";

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
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLight = variant === "light";

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6">
        <Link to="/" className="z-50">
          <img src={logo} alt="HAQ Arts" className="h-10 md:h-12 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-body text-sm tracking-widest uppercase transition-opacity duration-300 hover:opacity-60 ${
                isLight ? "text-gallery-text" : "text-foreground"
              } ${location.pathname === item.path ? "opacity-100" : "opacity-70"}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden z-50 ${isLight || mobileOpen ? "text-gallery-text" : "text-foreground"}`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

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
