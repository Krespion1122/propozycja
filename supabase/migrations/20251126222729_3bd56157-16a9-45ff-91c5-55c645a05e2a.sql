-- Drop existing restrictive policies for messages
DROP POLICY IF EXISTS "Admins can view messages" ON public.messages;
DROP POLICY IF EXISTS "Admins can update messages" ON public.messages;
DROP POLICY IF EXISTS "Admins can delete messages" ON public.messages;

-- Create permissive policies for messages (since we use password-only admin)
CREATE POLICY "Anyone can view messages" 
ON public.messages 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can update messages" 
ON public.messages 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete messages" 
ON public.messages 
FOR DELETE 
USING (true);