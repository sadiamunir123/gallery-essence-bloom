import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Artwork = Tables<"artworks">;

export const useArtworks = () => {
  return useQuery({
    queryKey: ["artworks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("artworks")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as Artwork[];
    },
  });
};

export const useArtwork = (id: string | undefined) => {
  return useQuery({
    queryKey: ["artwork", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("artworks")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data as Artwork;
    },
    enabled: !!id,
  });
};
