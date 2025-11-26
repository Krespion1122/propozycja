import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useMessages } from "@/hooks/useMessages";
import { toast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { sendMessage } = useMessages();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast({ title: "Uwaga", description: "Musisz wyrazić zgodę na przetwarzanie danych.", variant: "destructive" });
      return;
    }
    
    setSending(true);
    const result = await sendMessage({
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    });

    if (result.error) {
      toast({ title: "Błąd", description: "Nie udało się wysłać wiadomości.", variant: "destructive" });
    } else {
      toast({ title: "Wysłano", description: "Twoja wiadomość została wysłana. Skontaktujemy się wkrótce." });
      setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
      setAgreed(false);
    }
    setSending(false);
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary via-navy-light to-primary text-primary-foreground relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-32 h-32 border-2 border-white rounded-full" />
          <div className="absolute top-32 left-20 w-48 h-48 border border-white rounded-full" />
          <div className="absolute bottom-10 right-1/4 w-24 h-24 border border-white rounded-lg rotate-45" />
          <div className="absolute bottom-16 left-1/3 w-16 h-16 bg-white/20 rounded-full" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-accent-foreground" />
                </div>
                <span className="text-accent font-medium uppercase tracking-wider text-sm">Napisz do nas</span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">Kontakt</h1>
              <p className="text-xl text-primary-foreground/90 max-w-2xl mb-6">
                Skontaktuj się z nami - chętnie odpowiemy na wszystkie pytania
              </p>
              <div className="flex flex-wrap items-center gap-6 text-primary-foreground/80">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-accent" />
                  <span>+48 123 456 789</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  <span>Pon-Pt: 9:00-18:00</span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="relative">
                <div className="w-40 h-40 bg-accent/20 rounded-full flex items-center justify-center">
                  <div className="w-28 h-28 bg-accent/40 rounded-full flex items-center justify-center">
                    <MapPin className="w-14 h-14 text-accent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                      href="mailto:kontakt@domnieruchomosci.pl"
                      className="text-muted-foreground hover:text-primary transition-colors break-all"
                    >
                      kontakt@domnieruchomosci.pl
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">Imię *</Label>
                      <Input 
                        id="firstName" 
                        placeholder="Jan" 
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nazwisko *</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Kowalski" 
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <Label htmlFor="phone">Telefon *</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="+48 123 456 789" 
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required 
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Temat</Label>
                    <Input 
                      id="subject" 
                      placeholder="Pytanie o ofertę" 
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Wiadomość *</Label>
                    <Textarea
                      id="message"
                      placeholder="Wpisz swoją wiadomość..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      className="mt-1" 
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      required 
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z{" "}
                      <a href="#" className="text-primary hover:underline">
                        polityką prywatności
                      </a>
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground"
                    disabled={sending}
                  >
                    {sending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Wyślij wiadomość
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map */}
            <div className="mt-8">
              <h3 className="font-serif text-2xl font-semibold mb-4">Nasza lokalizacja</h3>
              <div className="bg-muted h-[400px] rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.515556060645!2d21.012228776691745!3d52.229675971981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc8c92692e49%3A0xc2e97ae22de0ecc6!2sPa%C5%82ac%20Kultury%20i%20Nauki!5e0!3m2!1spl!2spl!4v1709123456789!5m2!1spl!2spl"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokalizacja biura"
                />
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
