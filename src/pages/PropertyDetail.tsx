import { useParams } from "react-router-dom";
import { MapPin, Bed, Bath, Maximize, Calendar, Home, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const PropertyDetailPage = () => {
  const { id } = useParams();

  const property = {
    title: "Luksusowy apartament z widokiem na miasto",
    location: "Warszawa, Śródmieście, ul. Marszałkowska 45",
    price: "1 200 000 zł",
    type: "Sprzedaż",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    year: 2022,
    floor: "12/15",
    images: [property1, property2, property3],
    description: `Ekskluzywny apartament w prestiżowej lokalizacji w sercu Warszawy. Nieruchomość charakteryzuje się wysokim standardem wykończenia i przestronnym układem pomieszczeń.

Apartament składa się z przestronnego salonu z aneksem kuchennym, trzech komfortowych sypialni, dwóch eleganckich łazienek oraz przestronnego balkonu z panoramicznym widokiem na centrum miasta.

Mieszkanie jest w pełni wykończone i umeblowane, gotowe do zamieszkania. W cenie znajdują się również dwa miejsca parkingowe w garażu podziemnym oraz komórka lokatorska.

Budynek z 2022 roku, wyposażony w windę, monitoring 24h oraz ochronę. W bezpośrednim sąsiedztwie znajdują się sklepy, restauracje, placówki edukacyjne oraz doskonała komunikacja miejska.`,
    features: [
      "Klimatyzacja",
      "Ogrzewanie podłogowe",
      "Zabudowana kuchnia",
      "Balkon 15m²",
      "Garaż (2 miejsca)",
      "Komórka lokatorska",
      "Winda",
      "Monitoring",
      "Ochrona 24h",
      "Niski czynsz",
    ],
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-28 pb-12">
        <div className="container mx-auto px-4">
          {/* Images Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="md:col-span-2 h-[500px] rounded-lg overflow-hidden">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            {property.images.slice(1).map((image, index) => (
              <div key={index} className="h-[300px] rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`${property.title} ${index + 2}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>

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
                    Dodano 5 dni temu
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

              {/* Location */}
              <div>
                <h2 className="font-serif text-2xl font-semibold mb-4">Lokalizacja</h2>
                <div className="bg-gray-200 h-[400px] rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Tutaj będzie mapa Google Maps</p>
                </div>
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
                        {Math.round(parseInt(property.price.replace(/\s/g, '')) / property.area)} zł/m²
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
                        <Phone className="w-4 h-4 mr-2" />
                        Zadzwoń
                      </Button>
                      <Button variant="outline" className="w-full" size="lg">
                        <Mail className="w-4 h-4 mr-2" />
                        Wyślij wiadomość
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Form */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-serif text-xl font-semibold mb-4">Zapytaj o ofertę</h3>
                    <form className="space-y-4">
                      <div>
                        <Label htmlFor="name">Imię i nazwisko</Label>
                        <Input id="name" placeholder="Jan Kowalski" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="jan@example.com" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefon</Label>
                        <Input id="phone" type="tel" placeholder="+48 123 456 789" />
                      </div>
                      <div>
                        <Label htmlFor="message">Wiadomość</Label>
                        <Textarea
                          id="message"
                          placeholder="Jestem zainteresowany/a tą nieruchomością..."
                          rows={4}
                        />
                      </div>
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Wyślij zapytanie
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Agent Card */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-serif text-xl font-semibold mb-4">Twój agent</h3>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full" />
                      <div>
                        <div className="font-semibold">Anna Kowalska</div>
                        <div className="text-sm text-muted-foreground">Agent nieruchomości</div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        +48 123 456 789
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        anna.kowalska@premium.pl
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetailPage;
