-- Drop existing restrictive policies for listings
DROP POLICY IF EXISTS "Admins can delete listings" ON public.listings;
DROP POLICY IF EXISTS "Admins can insert listings" ON public.listings;
DROP POLICY IF EXISTS "Admins can update listings" ON public.listings;

-- Create permissive policies for listings (since we use password-only admin)
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