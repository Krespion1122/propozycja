-- Create listings table
CREATE TABLE public.listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  location TEXT NOT NULL,
  area NUMERIC NOT NULL,
  bedrooms INTEGER NOT NULL DEFAULT 1,
  bathrooms INTEGER NOT NULL DEFAULT 1,
  property_type TEXT NOT NULL DEFAULT 'mieszkanie',
  offer_type TEXT NOT NULL DEFAULT 'sprzedaż',
  main_image TEXT,
  images TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  floor TEXT,
  year INTEGER,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read listings (public website)
CREATE POLICY "Listings are publicly viewable" 
ON public.listings 
FOR SELECT 
USING (true);

-- Allow authenticated users to manage listings (for admin)
CREATE POLICY "Authenticated users can insert listings" 
ON public.listings 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update listings" 
ON public.listings 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete listings" 
ON public.listings 
FOR DELETE 
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_listings_updated_at
BEFORE UPDATE ON public.listings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for property images
INSERT INTO storage.buckets (id, name, public) VALUES ('property-images', 'property-images', true);

-- Allow public read access to property images
CREATE POLICY "Property images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'property-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload property images" 
ON storage.objects 
FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'property-images');

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete property images" 
ON storage.objects 
FOR DELETE 
TO authenticated
USING (bucket_id = 'property-images');

-- Insert sample listings
INSERT INTO public.listings (title, description, price, location, area, bedrooms, bathrooms, property_type, offer_type, main_image, images, features, floor, year, featured) VALUES
('Luksusowy apartament z widokiem', 'Ekskluzywny apartament w prestiżowej lokalizacji w sercu Warszawy. Nieruchomość charakteryzuje się wysokim standardem wykończenia i przestronnym układem pomieszczeń.

Apartament składa się z przestronnego salonu z aneksem kuchennym, trzech komfortowych sypialni, dwóch eleganckich łazienek oraz przestronnego balkonu z panoramicznym widokiem na centrum miasta.

Mieszkanie jest w pełni wykończone i umeblowane, gotowe do zamieszkania. W cenie znajdują się również dwa miejsca parkingowe w garażu podziemnym oraz komórka lokatorska.', 1200000, 'Warszawa, Śródmieście', 120, 3, 2, 'mieszkanie', 'sprzedaż', '/upload/property-1.jpg', ARRAY['/upload/property-1.jpg', '/upload/property-2.jpg', '/upload/property-3.jpg'], ARRAY['Klimatyzacja', 'Ogrzewanie podłogowe', 'Zabudowana kuchnia', 'Balkon 15m²', 'Garaż (2 miejsca)', 'Winda'], '12/15', 2022, true),

('Ekskluzywny penthouse', 'Wyjątkowy penthouse na ostatnim piętrze nowoczesnego budynku w ekskluzywnej dzielnicy Wilanów. Apartament oferuje niepowtarzalny widok i najwyższy standard wykończenia.', 15000, 'Warszawa, Wilanów', 180, 4, 3, 'mieszkanie', 'wynajem', '/upload/property-2.jpg', ARRAY['/upload/property-2.jpg', '/upload/property-1.jpg', '/upload/property-3.jpg'], ARRAY['Taras 60m²', 'Jacuzzi', 'Sauna', 'Smart home', 'Garaż (3 miejsca)'], '15/15', 2023, true),

('Nowoczesny apartament', 'Stylowy apartament w odnowionej kamienicy w sercu Kazimierza. Połączenie historycznego charakteru z nowoczesnym komfortem.', 850000, 'Kraków, Kazimierz', 85, 2, 1, 'mieszkanie', 'sprzedaż', '/upload/property-3.jpg', ARRAY['/upload/property-3.jpg', '/upload/property-1.jpg'], ARRAY['Wysoki sufit', 'Kominek', 'Parkiet dębowy', 'Piwnica'], '2/4', 2020, true),

('Przestronny dom z ogrodem', 'Komfortowy dom wolnostojący w zielonej dzielnicy Oliwa. Idealny dla rodziny ceniącej spokój i bliskość natury.', 1800000, 'Gdańsk, Oliwa', 220, 5, 3, 'dom', 'sprzedaż', '/upload/property-1.jpg', ARRAY['/upload/property-1.jpg', '/upload/property-2.jpg'], ARRAY['Ogród 500m²', 'Taras', 'Garaż', 'Kominek', 'Alarm'], '', 2019, false),

('Mieszkanie w centrum', 'Przytulne mieszkanie w samym sercu Starego Miasta. Doskonała lokalizacja dla osób ceniących miejski styl życia.', 650000, 'Wrocław, Stare Miasto', 65, 2, 1, 'mieszkanie', 'sprzedaż', '/upload/property-2.jpg', ARRAY['/upload/property-2.jpg', '/upload/property-3.jpg'], ARRAY['Balkon', 'Piwnica', 'Nowe okna'], '3/5', 2015, false),

('Elegancki apartament', 'Nowoczesny apartament w prestiżowej lokalizacji na Grunwaldzie. Wysoki standard i doskonała infrastruktura.', 950000, 'Poznań, Grunwald', 95, 3, 2, 'mieszkanie', 'sprzedaż', '/upload/property-3.jpg', ARRAY['/upload/property-3.jpg'], ARRAY['Klimatyzacja', 'Balkon', 'Garaż', 'Monitoring'], '8/12', 2021, false);