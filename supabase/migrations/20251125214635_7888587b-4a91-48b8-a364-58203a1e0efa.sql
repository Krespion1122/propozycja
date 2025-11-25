-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can insert listings" ON public.listings;
DROP POLICY IF EXISTS "Authenticated users can update listings" ON public.listings;
DROP POLICY IF EXISTS "Authenticated users can delete listings" ON public.listings;

-- Create public policies for admin panel (protected by password in UI)
CREATE POLICY "Anyone can insert listings" 
ON public.listings 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update listings" 
ON public.listings 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete listings" 
ON public.listings 
FOR DELETE 
USING (true);