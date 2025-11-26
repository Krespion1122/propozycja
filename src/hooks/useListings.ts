import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  propertyType: 'mieszkanie' | 'dom' | 'lokal';
  offerType: 'sprzedaż' | 'wynajem';
  mainImage: string;
  images: string[];
  features: string[];
  floor?: string;
  year: number;
  createdAt: string;
  featured?: boolean;
  googleMapsUrl?: string;
}

interface DbListing {
  id: string;
  title: string;
  description: string | null;
  price: number;
  location: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  property_type: string;
  offer_type: string;
  main_image: string | null;
  images: string[] | null;
  features: string[] | null;
  floor: string | null;
  year: number | null;
  created_at: string;
  featured: boolean | null;
  google_maps_url: string | null;
}

const mapDbToListing = (db: DbListing): Listing => ({
  id: db.id,
  title: db.title,
  description: db.description || '',
  price: Number(db.price),
  location: db.location,
  area: Number(db.area),
  bedrooms: db.bedrooms,
  bathrooms: db.bathrooms,
  propertyType: db.property_type as Listing['propertyType'],
  offerType: db.offer_type as Listing['offerType'],
  mainImage: db.main_image || '',
  images: db.images || [],
  features: db.features || [],
  floor: db.floor || undefined,
  year: db.year || new Date().getFullYear(),
  createdAt: db.created_at,
  featured: db.featured || false,
  googleMapsUrl: db.google_maps_url || undefined,
});

const mapListingToDb = (listing: Omit<Listing, 'id' | 'createdAt'>) => ({
  title: listing.title,
  description: listing.description,
  price: listing.price,
  location: listing.location,
  area: listing.area,
  bedrooms: listing.bedrooms,
  bathrooms: listing.bathrooms,
  property_type: listing.propertyType,
  offer_type: listing.offerType,
  main_image: listing.mainImage,
  images: listing.images,
  features: listing.features,
  floor: listing.floor || null,
  year: listing.year,
  featured: listing.featured || false,
  google_maps_url: listing.googleMapsUrl || null,
});

export const useListings = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const loadListings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setListings((data || []).map(mapDbToListing));
    } catch (error) {
      console.error('Failed to load listings:', error);
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadListings();
  }, []);

  const addListing = async (listing: Omit<Listing, 'id' | 'createdAt'>) => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .insert(mapListingToDb(listing))
        .select()
        .single();

      if (error) throw error;
      
      if (data) {
        setListings(prev => [mapDbToListing(data), ...prev]);
      }
      return { error: null };
    } catch (error) {
      console.error('Failed to add listing:', error);
      return { error };
    }
  };

  const updateListing = async (id: string, listing: Omit<Listing, 'id' | 'createdAt'>) => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .update(mapListingToDb(listing))
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      if (data) {
        setListings(prev => prev.map(l => l.id === id ? mapDbToListing(data) : l));
      }
      return { error: null };
    } catch (error) {
      console.error('Failed to update listing:', error);
      return { error };
    }
  };

  const deleteListing = async (id: string) => {
    try {
      const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setListings(prev => prev.filter(l => l.id !== id));
      return { error: null };
    } catch (error) {
      console.error('Failed to delete listing:', error);
      return { error };
    }
  };

  return {
    listings,
    loading,
    addListing,
    updateListing,
    deleteListing,
    refreshListings: loadListings,
  };
};
