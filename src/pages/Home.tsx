import { Link, useNavigate } from "react-router-dom";
import { Search, Award, Users, CheckCircle2, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PropertyCard from "@/components/PropertyCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useListings } from "@/hooks/useListings";
import { useState } from "react";
import heroImage from "@/assets/hero-home.jpg";

const HomePage = () => {
  const navigate = useNavigate();
  const { listings, loading } = useListings();
  const [searchFilters, setSearchFilters] = useState({
    offerType: '',
    propertyType: '',
    location: '',
    areaMin: '',
    areaMax: '',
  });

  const featuredProperties = listings.filter(l => l.featured).slice(0, 3).map(l => ({
    id: l.id,
    title: l.title,
    location: l.location,
    price: `${l.price.toLocaleString()} zł${l.offerType === 'wynajem' ? '/mies' : ''}`,
    image: l.mainImage,
    bedrooms: l.bedrooms,
    bathrooms: l.bathrooms,
    area: l.area,
    type: l.offerType,
    featured: true,
  }));

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchFilters.offerType) params.set('offerType', searchFilters.offerType);
    if (searchFilters.propertyType) params.set('propertyType', searchFilters.propertyType);
    if (searchFilters.location) params.set('location', searchFilters.location);
    if (searchFilters.areaMin) params.set('areaMin', searchFilters.areaMin);
    if (searchFilters.areaMax) params.set('areaMax', searchFilters.areaMax);
    navigate(`/oferty?${params.toString()}`);
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury apartment"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 to-navy/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Znajdź swoje<br />
              <span className="text-gradient-gold">wymarzone</span> miejsce
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Odkryj najlepsze nieruchomości w Polsce. Profesjonalna obsługa, sprawdzona jakość, pewna inwestycja.
            </p>

            {/* Search Box */}
            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-large">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Select value={searchFilters.offerType} onValueChange={(v) => setSearchFilters({...searchFilters, offerType: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Typ oferty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sprzedaż">Sprzedaż</SelectItem>
                    <SelectItem value="wynajem">Wynajem</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={searchFilters.propertyType} onValueChange={(v) => setSearchFilters({...searchFilters, propertyType: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Typ nieruchomości" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mieszkanie">Mieszkanie</SelectItem>
                    <SelectItem value="dom">Dom</SelectItem>
                    <SelectItem value="lokal">Lokal komercyjny</SelectItem>
                  </SelectContent>
                </Select>

                <Input 
                  placeholder="Lokalizacja" 
                  className="bg-white"
                  value={searchFilters.location}
                  onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
                />

                <Input 
                  type="number" 
                  placeholder="Metraż od (m²)" 
                  className="bg-white"
                  value={searchFilters.areaMin}
                  onChange={(e) => setSearchFilters({...searchFilters, areaMin: e.target.value})}
                />

                <Input 
                  type="number" 
                  placeholder="Metraż do (m²)" 
                  className="bg-white"
                  value={searchFilters.areaMax}
                  onChange={(e) => setSearchFilters({...searchFilters, areaMax: e.target.value})}
                />

                <Button 
                  onClick={handleSearch}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground w-full"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Szukaj
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Polecane <span className="text-gradient-gold">oferty</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Starannie wyselekcjonowane nieruchomości najwyższej klasy
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Ładowanie ofert...</p>
            </div>
          ) : featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Brak polecanych ofert</p>
            </div>
          )}

          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/oferty" className="flex items-center gap-2">
                Zobacz wszystkie oferty
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Dlaczego <span className="text-gradient-gold">my?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Doświadczenie, profesjonalizm i indywidualne podejście do każdego klienta
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-lg hover:shadow-medium transition-all">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Wieloletnie doświadczenie</h3>
              <p className="text-muted-foreground">
                Ponad 15 lat na rynku nieruchomości. Tysiące zadowolonych klientów i zrealizowanych transakcji.
              </p>
            </div>

            <div className="text-center p-8 rounded-lg hover:shadow-medium transition-all">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Indywidualne podejście</h3>
              <p className="text-muted-foreground">
                Każdy klient jest dla nas wyjątkowy. Dostosowujemy nasze usługi do Twoich potrzeb i oczekiwań.
              </p>
            </div>

            <div className="text-center p-8 rounded-lg hover:shadow-medium transition-all">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Gwarancja bezpieczeństwa</h3>
              <p className="text-muted-foreground">
                Kompleksowa obsługa prawna i pełna transparentność na każdym etapie transakcji.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Co mówią nasi <span className="text-gradient-gold">klienci</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Twoje zadowolenie jest naszą największą nagrodą
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg shadow-soft">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6">
                "Profesjonalna obsługa od początku do końca. Dzięki Premium Real Estate znalazłem wymarzone mieszkanie w centrum Warszawy."
              </p>
              <div>
                <p className="font-semibold">Piotr Kowalski</p>
                <p className="text-sm text-muted-foreground">Kupno mieszkania</p>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-soft">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6">
                "Sprzedaż mojego domu przebiegła sprawnie i bezproblemowo. Polecam każdemu, kto szuka rzetelnego partnera."
              </p>
              <div>
                <p className="font-semibold">Anna Nowak</p>
                <p className="text-sm text-muted-foreground">Sprzedaż domu</p>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-soft">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6">
                "Kompleksowa pomoc w wynajmie lokalu komercyjnego. Świetny kontakt i merytoryczne doradztwo na każdym etapie."
              </p>
              <div>
                <p className="font-semibold">Marek Wiśniewski</p>
                <p className="text-sm text-muted-foreground">Wynajem lokalu</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-navy-light text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Szukasz idealnej nieruchomości?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Skontaktuj się z nami już dziś i pozwól nam pomóc w znalezieniu Twojego wymarzonego miejsca.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/kontakt">Umów spotkanie</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-white/10 hover:bg-white/20 text-white border-white/30">
              <Link to="/oferty">Przeglądaj oferty</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
