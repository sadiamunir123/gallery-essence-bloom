import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation variant="dark" />

      <main className="pt-28 pb-20 px-8 md:px-16 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            The Artist
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-medium mb-8">
            Sadia Munir
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <p className="font-accent text-xl md:text-2xl text-muted-foreground italic leading-relaxed">
            "Art is the bridge between the visible world and the invisible
            emotions that shape our inner lives."
          </p>

          <div className="w-12 h-px bg-accent my-8" />

          <p className="font-body text-base text-muted-foreground leading-relaxed">
            Sadia Munir is a contemporary artist whose work explores the
            intersection of emotion, texture, and color. Working primarily in
            oil and mixed media, her practice is rooted in a deep fascination
            with the expressive potential of materials — from the luminous
            warmth of gold leaf to the raw earthiness of impasto oils.
          </p>

          <p className="font-body text-base text-muted-foreground leading-relaxed">
            Drawing inspiration from natural landscapes, inner emotional
            states, and the rich artistic traditions of both East and West,
            Sadia creates works that invite contemplation and connection.
            Each piece is a dialogue between control and spontaneity, where
            deliberate composition meets the unpredictable beauty of the
            creative process.
          </p>

          <p className="font-body text-base text-muted-foreground leading-relaxed">
            Her work has been exhibited in galleries across multiple cities,
            and her paintings are held in private collections internationally.
            Sadia holds a Master of Fine Arts and continues to push the
            boundaries of her practice through experimentation with new
            materials and techniques.
          </p>
        </motion.div>

        {/* Thesis Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Research
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium mb-6">
            Artist's Thesis
          </h2>
          <div className="bg-card p-8 md:p-12 border border-border">
            <h3 className="font-display text-xl mb-4 italic">
              "The Emotional Landscape: Materiality and Meaning in
              Contemporary Abstract Painting"
            </h3>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
              This thesis explores how the physical properties of painting
              materials — their weight, texture, luminosity, and behavior —
              serve as carriers of emotional meaning. Through an analysis of
              my own studio practice alongside historical and contemporary
              precedents, I argue that materiality is not merely a vehicle
              for representation, but an active participant in the creation
              of meaning.
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              Central to this investigation is the concept of the "emotional
              landscape" — abstract compositions that evoke the felt
              experience of place without depicting it literally. By layering
              gold leaf with oil paint, combining controlled geometry with
              gestural marks, the work seeks to create spaces of
              contemplation that resonate on both visual and emotional levels.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default About;
