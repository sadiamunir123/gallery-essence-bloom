import { motion } from "framer-motion";
import { Palette, Frame, BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    icon: Palette,
    title: "Commissioned Works",
    description:
      "Bespoke paintings created to your vision. Whether you desire a specific palette, size, or emotional tone, I work closely with collectors to bring their artistic dreams to life.",
  },
  {
    icon: Frame,
    title: "Art Consultation",
    description:
      "Expert guidance on building your art collection. From selecting pieces that complement your space to understanding artistic value and provenance.",
  },
  {
    icon: BookOpen,
    title: "Workshops & Mentorship",
    description:
      "Intimate studio workshops exploring techniques in oil painting, mixed media, and gold leaf application. Available for individual and small group sessions.",
  },
  {
    icon: Users,
    title: "Exhibition Curation",
    description:
      "Collaborative exhibition planning and curation services for galleries, corporate spaces, and private collections seeking a cohesive artistic narrative.",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 md:pt-32 pb-20 px-5 md:px-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">
              What I Offer
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-medium mb-2">
              Services
            </h1>
            <p className="font-accent text-lg text-muted-foreground italic mb-16">
              Bringing art into every facet of your world
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="p-8 md:p-10 border border-border bg-card hover:border-accent/30 transition-all duration-300"
              >
                <service.icon
                  size={28}
                  className="text-accent mb-6"
                  strokeWidth={1.5}
                />
                <h3 className="font-display text-xl font-medium mb-3">
                  {service.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-20 text-center"
          >
            <p className="font-accent text-xl text-muted-foreground italic mb-6">
              Interested in working together?
            </p>
            <Link
              to="/contact"
              className="inline-block font-body text-sm tracking-[0.2em] uppercase bg-foreground text-primary-foreground px-10 py-4 hover:opacity-80 transition-opacity"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
