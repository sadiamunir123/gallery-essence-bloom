CREATE POLICY "Anyone can update artwork sold status"
ON public.artworks
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);