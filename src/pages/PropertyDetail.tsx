import { useParams } from "react-router-dom";
import { MapPin, Bed, Bath, Maximize, Calendar, Home, Phone, Mail, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ImageLightbox from "@/components/ImageLightbox";
import { useListings } from "@/hooks/useListings";
import { useMessages } from "@/hooks/useMessages";
import { toast } from "@/hooks/use-toast";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const { listings, loading } = useListings();
  const { sendMessage } = useMessages();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [sending, setSending] = useState(false);

  const listing = listings.find(l => l.id === id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!listing) return;
    
    setSending(true);
    const result = await sendMessage({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      listingId: listing.id,
      listingTitle: listing.title,
    });

    if (result.error) {
      toast({ title: "Błąd", description: "Nie udało się wysłać wiadomości.", variant: "destructive" });
    } else {
      toast({ title: "Wysłano", description: "Twoja wiadomość została wysłana. Skontaktujemy się wkrótce." });
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
    setSending(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-28 pb-12 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-28 pb-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl font-bold mb-4">Nie znaleziono oferty</h1>
            <p className="text-muted-foreground">Oferta o podanym ID nie istnieje.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const property = {
    title: listing.title,
    location: listing.location,
    price: `${listing.price.toLocaleString()} zł${listing.offerType === 'wynajem' ? '/mies' : ''}`,
    priceNum: listing.price,
    type: listing.offerType === 'sprzedaż' ? 'Sprzedaż' : 'Wynajem',
    bedrooms: listing.bedrooms,
    bathrooms: listing.bathrooms,
    area: listing.area,
    year: listing.year,
    floor: listing.floor || 'N/A',
    images: listing.images.length > 0 ? listing.images : [listing.mainImage].filter(Boolean),
    description: listing.description,
    features: listing.features,
    createdAt: listing.createdAt,
    googleMapsUrl: listing.googleMapsUrl,
  };

  const daysSinceCreated = Math.floor((Date.now() - new Date(property.createdAt).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-28 pb-12">
        <div className="container mx-auto px-4">
          {/* Main Image */}
          {property.images.length > 0 && (
            <div 
              className="h-[500px] rounded-lg overflow-hidden mb-4 cursor-pointer"
              onClick={() => {
                setLightboxIndex(0);
                setLightboxOpen(true);
              }}
            >
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          {/* Image Gallery */}
          {property.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
              {property.images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-48 h-32 rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => {
                    setLightboxIndex(index + 1);
                    setLightboxOpen(true);
                  }}
                >
                  <img
                    src={image}
                    alt={`${property.title} ${index + 2}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title and Location */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                    {property.type}
                  </span>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Dodano {daysSinceCreated} dni temu
                  </span>
                </div>
                <h1 className="font-serif text-4xl font-bold mb-4">{property.title}</h1>
                <div className="flex items-center text-muted-foreground text-lg">
                  <MapPin className="w-5 h-5 mr-2" />
                  {property.location}
                </div>
              </div>

              {/* Key Features */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <Bed className="w-8 h-8 mx-auto mb-2 text-accent" />
                      <div className="font-semibold text-lg">{property.bedrooms}</div>
                      <div className="text-sm text-muted-foreground">Sypialnie</div>
                    </div>
                    <div className="text-center">
                      <Bath className="w-8 h-8 mx-auto mb-2 text-accent" />
                      <div className="font-semibold text-lg">{property.bathrooms}</div>
                      <div className="text-sm text-muted-foreground">Łazienki</div>
                    </div>
                    <div className="text-center">
                      <Maximize className="w-8 h-8 mx-auto mb-2 text-accent" />
                      <div className="font-semibold text-lg">{property.area} m²</div>
                      <div className="text-sm text-muted-foreground">Powierzchnia</div>
                    </div>
                    <div className="text-center">
                      <Home className="w-8 h-8 mx-auto mb-2 text-accent" />
                      <div className="font-semibold text-lg">{property.floor}</div>
                      <div className="text-sm text-muted-foreground">Piętro</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <div>
                <h2 className="font-serif text-2xl font-semibold mb-4">Opis nieruchomości</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground whitespace-pre-line">
                  {property.description}
                </div>
              </div>

              {/* Features */}
              {property.features.length > 0 && (
                <div>
                  <h2 className="font-serif text-2xl font-semibold mb-4">Udogodnienia</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Location */}
              <div>
                <h2 className="font-serif text-2xl font-semibold mb-4">Lokalizacja</h2>
                {property.googleMapsUrl ? (
                  <div className="h-[400px] rounded-lg overflow-hidden">
                    <iframe
                      src={property.googleMapsUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Lokalizacja nieruchomości"
                    />
                  </div>
                ) : (
                  <div className="bg-muted h-[400px] rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Mapa niedostępna</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* Price Card */}
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="font-serif text-4xl font-bold text-primary mb-2">
                        {property.price}
                      </div>
                      <div className="text-muted-foreground">
                        {Math.round(property.priceNum / property.area).toLocaleString()} zł/m²
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg" asChild>
                        <a href="tel:+48123456789">
                          <Phone className="w-4 h-4 mr-2" />
                          Zadzwoń
                        </a>
                      </Button>
                      <Button variant="outline" className="w-full" size="lg" asChild>
                        <a href="mailto:kontakt@domnieruchomosci.pl">
                          <Mail className="w-4 h-4 mr-2" />
                          Wyślij email
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Form */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-serif text-xl font-semibold mb-4">Zapytaj o ofertę</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Imię i nazwisko *</Label>
                        <Input 
                          id="name" 
                          placeholder="Jan Kowalski" 
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="jan@example.com" 
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefon</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          placeholder="+48 123 456 789" 
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="message">Wiadomość *</Label>
                        <Textarea
                          id="message"
                          placeholder="Jestem zainteresowany/a tą nieruchomością..."
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={sending}>
                        {sending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Wyślij zapytanie
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Company Contact Card */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-serif text-xl font-semibold mb-4">Skontaktuj się z nami</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <a href="tel:+48123456789" className="hover:text-primary">
                          +48 123 456 789
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <a href="mailto:kontakt@domnieruchomosci.pl" className="hover:text-primary">
                          kontakt@domnieruchomosci.pl
                        </a>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      Odpowiadamy na zapytania w ciągu 24 godzin
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {lightboxOpen && property.images.length > 0 && (
        <ImageLightbox
          images={property.images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNext={() => setLightboxIndex((prev) => Math.min(prev + 1, property.images.length - 1))}
          onPrevious={() => setLightboxIndex((prev) => Math.max(prev - 1, 0))}
        />
      )}

      <Footer />
    </div>
  );
};

export default PropertyDetailPage;
