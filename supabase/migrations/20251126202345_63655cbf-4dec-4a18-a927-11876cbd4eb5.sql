-- Add google_maps_url column to listings table
ALTER TABLE public.listings ADD COLUMN google_maps_url text;

-- Create messages table for contact form submissions
CREATE TABLE public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  listing_id uuid REFERENCES public.listings(id) ON DELETE SET NULL,
  listing_title text,
  is_read boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert messages (contact form)
CREATE POLICY "Anyone can insert messages"
ON public.messages
FOR INSERT
WITH CHECK (true);

-- Only admins can view messages
CREATE POLICY "Admins can view messages"
ON public.messages
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update messages (mark as read)
CREATE POLICY "Admins can update messages"
ON public.messages
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete messages
CREATE POLICY "Admins can delete messages"
ON public.messages
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));