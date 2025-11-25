import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-12 bg-gradient-to-r from-primary to-navy-light text-primary-foreground">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-5xl font-bold mb-4">Kontakt</h1>
          <p className="text-xl text-primary-foreground/90">
            Skontaktuj się z nami - chętnie odpowiemy na wszystkie pytania
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Telefon</h3>
                    <a href="tel:+48123456789" className="text-muted-foreground hover:text-primary transition-colors">
                      +48 123 456 789
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">Poniedziałek - Piątek, 9:00 - 18:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <a
                      href="mailto:kontakt@premiumrealestate.pl"
                      className="text-muted-foreground hover:text-primary transition-colors break-all"
                    >
                      kontakt@premium.pl
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">Odpowiadamy w ciągu 24h</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Adres biura</h3>
                    <p className="text-muted-foreground">
                      ul. Przykładowa 123<br />
                      00-001 Warszawa<br />
                      Polska
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Godziny otwarcia</h3>
                    <div className="text-muted-foreground space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Poniedziałek - Piątek:</span>
                        <span className="font-medium">9:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sobota:</span>
                        <span className="font-medium">10:00 - 14:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Niedziela:</span>
                        <span className="font-medium">Zamknięte</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <h2 className="font-serif text-3xl font-bold mb-6">Wyślij wiadomość</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">Imię *</Label>
                      <Input id="firstName" placeholder="Jan" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nazwisko *</Label>
                      <Input id="lastName" placeholder="Kowalski" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="jan@example.com" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefon *</Label>
                      <Input id="phone" type="tel" placeholder="+48 123 456 789" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Temat</Label>
                    <Input id="subject" placeholder="Pytanie o ofertę" />
                  </div>

                  <div>
                    <Label htmlFor="message">Wiadomość *</Label>
                    <Textarea
                      id="message"
                      placeholder="Wpisz swoją wiadomość..."
                      rows={6}
                      required
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="terms" className="mt-1" required />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z{" "}
                      <a href="#" className="text-primary hover:underline">
                        polityką prywatności
                      </a>
                    </label>
                  </div>

                  <Button type="submit" size="lg" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
                    Wyślij wiadomość
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map */}
            <div className="mt-8">
              <h3 className="font-serif text-2xl font-semibold mb-4">Nasza lokalizacja</h3>
              <div className="bg-gray-200 h-[400px] rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Tutaj będzie mapa Google Maps</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
