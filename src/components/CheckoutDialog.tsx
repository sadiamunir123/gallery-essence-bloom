import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Artwork } from "@/hooks/use-artworks";

interface CheckoutDialogProps {
  artwork: Artwork;
  open: boolean;
  onClose: () => void;
}

const CheckoutDialog = ({ artwork, open, onClose }: CheckoutDialogProps) => {
  const queryClient = useQueryClient();
  const [step, setStep] = useState<"details" | "confirm" | "success">("details");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.address) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (step === "details") {
      setStep("confirm");
      return;
    }

    setLoading(true);
    try {
      // Create order
      const { error: orderError } = await supabase.from("orders").insert({
        artwork_id: artwork.id,
        customer_name: form.name,
        customer_email: form.email,
        customer_phone: form.phone || null,
        shipping_address: form.address,
        total_amount: artwork.price || 0,
      });

      if (orderError) throw orderError;

      // Mark artwork as sold
      const { error: updateError } = await supabase
        .from("artworks")
        .update({ sold: true })
        .eq("id", artwork.id);

      if (updateError) throw updateError;

      queryClient.invalidateQueries({ queryKey: ["artwork", artwork.id] });
      queryClient.invalidateQueries({ queryKey: ["artworks"] });

      setStep("success");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep("details");
    setForm({ name: "", email: "", phone: "", address: "" });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[hsl(0,0%,3%)]/70 backdrop-blur-sm px-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-background border border-border rounded-xl w-full max-w-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-accent" />
                <h2 className="font-display text-lg font-medium text-foreground">
                  {step === "success" ? "Order Confirmed!" : step === "confirm" ? "Review Order" : "Checkout"}
                </h2>
              </div>
              <button onClick={handleClose} className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground">
                <X size={18} />
              </button>
            </div>

            {step === "success" ? (
              <div className="px-6 py-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                >
                  <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
                </motion.div>
                <h3 className="font-display text-xl font-medium text-foreground mb-2">Thank You!</h3>
                <p className="font-body text-sm text-muted-foreground mb-1">
                  Your order for <span className="font-medium text-foreground">{artwork.title}</span> has been placed.
                </p>
                <p className="font-body text-sm text-muted-foreground mb-6">
                  A confirmation will be sent to <span className="font-medium text-foreground">{form.email}</span>
                </p>
                <button
                  onClick={handleClose}
                  className="font-body text-sm tracking-[0.15em] uppercase bg-accent text-accent-foreground px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Done
                </button>
              </div>
            ) : step === "confirm" ? (
              <div className="px-6 py-5">
                {/* Order Summary */}
                <div className="flex gap-4 p-4 bg-muted/50 rounded-lg mb-5">
                  <img src={artwork.image_url} alt={artwork.title} className="w-20 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <p className="font-display text-base font-medium text-foreground">{artwork.title}</p>
                    <p className="font-accent text-sm text-muted-foreground italic">{artwork.medium} · {artwork.year}</p>
                    {artwork.price && (
                      <p className="font-display text-lg font-medium text-accent mt-1">
                        ${Number(artwork.price).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>

                {/* Customer Details Summary */}
                <div className="space-y-2 mb-6 text-sm font-body">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name</span>
                    <span className="text-foreground font-medium">{form.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="text-foreground font-medium">{form.email}</span>
                  </div>
                  {form.phone && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone</span>
                      <span className="text-foreground font-medium">{form.phone}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground font-medium text-right max-w-[60%]">{form.address}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("details")}
                    className="flex-1 font-body text-sm tracking-[0.1em] uppercase border border-border text-foreground px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 font-body text-sm tracking-[0.1em] uppercase bg-accent text-accent-foreground px-4 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? <><Loader2 size={16} className="animate-spin" /> Processing...</> : "Confirm Purchase"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-6 py-5">
                {/* Artwork Preview */}
                <div className="flex gap-4 p-4 bg-muted/50 rounded-lg mb-5">
                  <img src={artwork.image_url} alt={artwork.title} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <p className="font-display text-base font-medium text-foreground">{artwork.title}</p>
                    {artwork.price && (
                      <p className="font-display text-lg font-medium text-accent">
                        ${Number(artwork.price).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>

                {/* Form */}
                <div className="space-y-3">
                  <div>
                    <label className="font-body text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1 block">
                      Full Name *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-lg font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1 block">
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-lg font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1 block">
                      Phone
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-lg font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1 block">
                      Shipping Address *
                    </label>
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="123 Main St, City, State, ZIP"
                      rows={2}
                      className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-lg font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 resize-none"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full mt-5 font-body text-sm tracking-[0.15em] uppercase bg-accent text-accent-foreground px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Review Order
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutDialog;
