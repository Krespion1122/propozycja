import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import PropertyCard from "@/components/PropertyCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useListings } from "@/hooks/useListings";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const ListingsPage = () => {
  const [searchParams] = useSearchParams();
  const { listings } = useListings();
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [areaRange, setAreaRange] = useState([0, 500]);
  const [filters, setFilters] = useState({
    offerType: searchParams.get('offerType') || '',
    propertyType: searchParams.get('propertyType') || '',
    location: searchParams.get('location') || '',
    bedrooms: '',
    sortBy: 'newest',
  });

  useEffect(() => {
    const areaMin = searchParams.get('areaMin');
    const areaMax = searchParams.get('areaMax');
    if (areaMin) setAreaRange([parseInt(areaMin), areaRange[1]]);
    if (areaMax) setAreaRange([areaRange[0], parseInt(areaMax)]);
  }, [searchParams]);

  const filteredProperties = listings.filter(listing => {
    if (filters.offerType && listing.offerType !== filters.offerType) return false;
    if (filters.propertyType && listing.propertyType !== filters.propertyType) return false;
    if (filters.location && !listing.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.bedrooms && listing.bedrooms.toString() !== filters.bedrooms) return false;
    if (listing.price < priceRange[0] || listing.price > priceRange[1]) return false;
    if (listing.area < areaRange[0] || listing.area > areaRange[1]) return false;
    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'price-low') return a.price - b.price;
    if (filters.sortBy === 'price-high') return b.price - a.price;
    if (filters.sortBy === 'area') return b.area - a.area;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }).map(l => ({
    id: l.id,
    title: l.title,
    location: l.location,
    price: `${l.price.toLocaleString()} zł${l.offerType === 'wynajem' ? '/mies' : ''}`,
    image: l.mainImage || property1,
    bedrooms: l.bedrooms,
    bathrooms: l.bathrooms,
    area: l.area,
    type: l.offerType,
    featured: l.featured,
  }));

  // Fallback demo properties
  const demoProperties = [
    {
      id: "1",
      title: "Luksusowy apartament z widokiem",
      location: "Warszawa, Śródmieście",
      price: "1 200 000 zł",
      image: property1,
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      type: "sprzedaż" as const,
      featured: true,
    },
    {
      id: "2",
      title: "Ekskluzywny penthouse",
      location: "Warszawa, Wilanów",
      price: "2 500 000 zł",
      image: property2,
      bedrooms: 4,
      bathrooms: 3,
      area: 180,
      type: "sprzedaż" as const,
      featured: true,
    },
    {
      id: "3",
      title: "Nowoczesny apartament",
      location: "Kraków, Kazimierz",
      price: "850 000 zł",
      image: property3,
      bedrooms: 2,
      bathrooms: 1,
      area: 85,
      type: "sprzedaż" as const,
    },
    {
      id: "4",
      title: "Przestronny dom z ogrodem",
      location: "Gdańsk, Oliwa",
      price: "1 800 000 zł",
      image: property1,
      bedrooms: 5,
      bathrooms: 3,
      area: 220,
      type: "sprzedaż" as const,
    },
    {
      id: "5",
      title: "Mieszkanie w centrum",
      location: "Wrocław, Stare Miasto",
      price: "650 000 zł",
      image: property2,
      bedrooms: 2,
      bathrooms: 1,
      area: 65,
      type: "sprzedaż" as const,
    },
    {
      id: "6",
      title: "Elegancki apartament",
      location: "Poznań, Grunwald",
      price: "950 000 zł",
      image: property3,
      bedrooms: 3,
      bathrooms: 2,
      area: 95,
      type: "sprzedaż" as const,
    },
  ];

  const displayProperties = filteredProperties.length > 0 || listings.length > 0 
    ? filteredProperties 
    : demoProperties;

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-12 bg-gradient-to-r from-primary to-navy-light text-primary-foreground">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-5xl font-bold mb-4">Nasze oferty</h1>
          <p className="text-xl text-primary-foreground/90">
            Znajdź idealną nieruchomość dla siebie
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h2 className="font-serif text-2xl font-semibold">Filtry</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  {showFilters ? "Ukryj" : "Pokaż"}
                </Button>
              </div>

              <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
                <div>
                  <Label className="mb-2 block">Typ oferty</Label>
                  <Select value={filters.offerType} onValueChange={(v) => setFilters({...filters, offerType: v === 'all' ? '' : v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Wszystkie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="sprzedaż">Sprzedaż</SelectItem>
                      <SelectItem value="wynajem">Wynajem</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2 block">Typ nieruchomości</Label>
                  <Select value={filters.propertyType} onValueChange={(v) => setFilters({...filters, propertyType: v === 'all' ? '' : v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Wszystkie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="mieszkanie">Mieszkanie</SelectItem>
                      <SelectItem value="dom">Dom</SelectItem>
                      <SelectItem value="lokal">Lokal komercyjny</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2 block">Lokalizacja</Label>
                  <Input 
                    placeholder="Wpisz lokalizację" 
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                  />
                </div>

                <div>
                  <Label className="mb-4 block">
                    Przedział cenowy: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} zł
                  </Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={5000000}
                    step={50000}
                    className="mb-2"
                  />
                </div>

                <div>
                  <Label className="mb-4 block">
                    Powierzchnia: {areaRange[0]} - {areaRange[1]} m²
                  </Label>
                  <Slider
                    value={areaRange}
                    onValueChange={setAreaRange}
                    min={0}
                    max={500}
                    step={10}
                    className="mb-2"
                  />
                </div>

                <div>
                  <Label className="mb-2 block">Liczba pokoi</Label>
                  <Select value={filters.bedrooms} onValueChange={(v) => setFilters({...filters, bedrooms: v === 'all' ? '' : v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Dowolna" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Dowolna</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Znaleziono <span className="font-semibold text-foreground">{displayProperties.length}</span> ofert
              </p>
              <Select value={filters.sortBy} onValueChange={(v) => setFilters({...filters, sortBy: v})}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Sortuj" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Najnowsze</SelectItem>
                  <SelectItem value="price-low">Cena: rosnąco</SelectItem>
                  <SelectItem value="price-high">Cena: malejąco</SelectItem>
                  <SelectItem value="area">Powierzchnia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {displayProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12 space-x-2">
              <Button variant="outline" disabled>Poprzednia</Button>
              <Button variant="outline" className="bg-primary text-primary-foreground">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Następna</Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ListingsPage;
