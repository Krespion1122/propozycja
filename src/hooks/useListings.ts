import { useState, useEffect } from 'react';

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
}

export const useListings = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const loadListings = async () => {
    try {
      const response = await fetch('/data/listings.json');
      const data = await response.json();
      setListings(data);
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

  const saveListings = async (newListings: Listing[]) => {
    setListings(newListings);
  };

  const addListing = (listing: Listing) => {
    const newListings = [...listings, listing];
    saveListings(newListings);
  };

  const updateListing = (id: string, updatedListing: Listing) => {
    const newListings = listings.map(l => l.id === id ? updatedListing : l);
    saveListings(newListings);
  };

  const deleteListing = (id: string) => {
    const newListings = listings.filter(l => l.id !== id);
    saveListings(newListings);
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
