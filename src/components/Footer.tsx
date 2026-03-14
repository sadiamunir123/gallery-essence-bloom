import { Link } from "react-router-dom";
import { Instagram, Mail, Phone } from "lucide-react";
import haqLogo from "@/assets/haq-arts-logo.jpeg";

const Footer = () => {
  return (
    <footer className="bg-[hsl(0,0%,3%)] text-white/60 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-10 py-10 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <img src={haqLogo} alt="HAQ Arts" className="h-12 w-auto mb-4" />
            <p className="font-body text-sm leading-relaxed max-w-sm mb-6">
              Contemporary art by Sadia Munir — exploring emotion, texture, and color through oil, mixed media, and gold leaf.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-white/10 hover:border-white/30 hover:text-white transition-all">
                <Instagram size={16} />
              </a>
              <a href="mailto:hello@haqarts.com" className="p-2 rounded-full border border-white/10 hover:border-white/30 hover:text-white transition-all">
                <Mail size={16} />
              </a>
              <a href="tel:+1234567890" className="p-2 rounded-full border border-white/10 hover:border-white/30 hover:text-white transition-all">
                <Phone size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase text-white/80 mb-5">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Gallery", path: "/gallery" },
                { label: "About", path: "/about" },
                { label: "Services", path: "/services" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="font-body text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase text-white/80 mb-5">Studio</h4>
            <div className="font-body text-sm space-y-3">
              <p>Lahore, Pakistan</p>
              <p>hello@haqarts.com</p>
              <p>Available for commissions</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="font-body text-xs text-white/30">
            © {new Date().getFullYear()} HAQ Arts. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/30">
            Designed with passion for art
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
