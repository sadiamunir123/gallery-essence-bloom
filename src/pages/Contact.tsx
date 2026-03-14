import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out! I'll get back to you shortly.",
    });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-20 px-4 sm:px-5 md:px-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-2 sm:mb-3">
              Get in Touch
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium mb-1.5 sm:mb-2">
              Contact
            </h1>
            <p className="font-accent text-base sm:text-lg text-muted-foreground italic mb-10 sm:mb-16">
              I'd love to hear from you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 border border-border rounded-lg">
                  <Mail size={18} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-body text-sm font-medium mb-1">Email</h3>
                  <a href="mailto:hello@haqarts.com" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                    hello@haqarts.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 border border-border rounded-lg">
                  <Phone size={18} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-body text-sm font-medium mb-1">Phone</h3>
                  <p className="font-body text-sm text-muted-foreground">Available on request</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 border border-border rounded-lg">
                  <MapPin size={18} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-body text-sm font-medium mb-1">Studio</h3>
                  <p className="font-body text-sm text-muted-foreground">Lahore, Pakistan</p>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  Whether you're interested in purchasing a piece, commissioning a custom work, or exploring collaboration opportunities — don't hesitate to reach out.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-3 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="font-body text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 bg-card border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="font-body text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 bg-card border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="font-body text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-card border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                  placeholder="Commission, Purchase, or General Inquiry"
                />
              </div>

              <div>
                <label className="font-body text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                  Message
                </label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 bg-card border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Tell me about your vision..."
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 font-body text-sm tracking-[0.2em] uppercase bg-foreground text-primary-foreground px-8 py-3.5 hover:opacity-80 transition-opacity"
              >
                <Send size={14} />
                Send Message
              </button>
            </motion.form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
