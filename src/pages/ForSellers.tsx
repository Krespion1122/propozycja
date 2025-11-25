import { Link } from "react-router-dom";
import { Camera, FileText, Users, CheckCircle2, TrendingUp, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ForSellersPage = () => {
  const steps = [
    {
      icon: Camera,
      title: "Prezentacja nieruchomości",
      description: "Profesjonalne zdjęcia, wirtualne spacery 3D i atrakcyjne opisy zwiększające widoczność oferty",
    },
    {
      icon: FileText,
      title: "Wycena i dokumentacja",
      description: "Bezpłatna wycena rynkowa i weryfikacja dokumentów przez naszych prawników",
    },
    {
      icon: Users,
      title: "Marketing i promocja",
      description: "Aktywna promocja w największych portalach nieruchomości i mediach społecznościowych",
    },
    {
      icon: CheckCircle2,
      title: "Finalizacja transakcji",
      description: "Kompleksowa obsługa prawna i pomoc w negocjacjach aż do przekazania kluczy",
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Maksymalna cena sprzedaży",
      description: "Dzięki naszemu doświadczeniu i sieci kontaktów negocjujemy najlepsze warunki",
    },
    {
      icon: Shield,
      title: "Bezpieczeństwo transakcji",
      description: "Pełna obsługa prawna i weryfikacja nabywców gwarantuje spokój i bezpieczeństwo",
    },
    {
      icon: Camera,
      title: "Profesjonalna prezentacja",
      description: "Wysokiej jakości materiały foto/wideo przyciągają więcej potencjalnych kupców",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-primary to-navy-light text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              Sprzedaj swoją nieruchomość z nami
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Profesjonalna obsługa, maksymalna cena i pełne bezpieczeństwo transakcji.
              Zaufało nam już ponad 3000 klientów.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/kontakt">Bezpłatna wycena</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-white/10 hover:bg-white/20 text-white border-white/30">
                <Link to="/kontakt">Umów spotkanie</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4">
              Dlaczego warto <span className="text-gradient-gold">z nami sprzedać?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Zapewniamy kompleksową obsługę na każdym etapie sprzedaży
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-2 hover:border-accent hover:shadow-large transition-all">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4">
              Jak przebiega <span className="text-gradient-gold">proces sprzedaży?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transparentny i prosty proces w 4 krokach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-lg shadow-soft h-full">
                  <div className="flex items-center justify-center w-12 h-12 bg-accent text-accent-foreground rounded-full font-bold text-lg mb-4">
                    {index + 1}
                  </div>
                  <step.icon className="w-8 h-8 text-accent mb-4" />
                  <h3 className="font-serif text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-accent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4">
              Co <span className="text-gradient-gold">zapewniamy?</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-lg mb-2">Bezpłatna wycena nieruchomości</h4>
                <p className="text-muted-foreground">
                  Profesjonalna analiza rynku i realistyczna wycena bazująca na aktualnych trendach i porównywalnych transakcjach
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-lg mb-2">Profesjonalna sesja zdjęciowa</h4>
                <p className="text-muted-foreground">
                  Wysokiej jakości zdjęcia wykonane przez zawodowych fotografów nieruchomości, opcjonalnie wirtualny spacer 3D
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-lg mb-2">Kompleksowa obsługa prawna</h4>
                <p className="text-muted-foreground">
                  Weryfikacja dokumentów, przygotowanie umów, reprezentacja podczas transakcji i pomoc w formalnościach
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-lg mb-2">Szeroka promocja oferty</h4>
                <p className="text-muted-foreground">
                  Publikacja w największych portalach nieruchomości, social media, oraz w naszej bazie potencjalnych kupców
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-lg mb-2">Organizacja pokazów</h4>
                <p className="text-muted-foreground">
                  Koordynacja spotkań z potencjalnymi nabywcami, weryfikacja ich wiarygodności finansowej i intencji zakupowych
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-lg mb-2">Negocjacje i finalizacja</h4>
                <p className="text-muted-foreground">
                  Profesjonalne prowadzenie negocjacji w Twoim imieniu oraz pełne wsparcie aż do przekazania kluczy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-navy-light text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Gotowy do sprzedaży?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Skontaktuj się z nami już dziś i otrzymaj bezpłatną wycenę swojej nieruchomości
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/kontakt">Bezpłatna wycena</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-white/10 hover:bg-white/20 text-white border-white/30">
              <Link to="/kontakt">Zadzwoń: +48 123 456 789</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ForSellersPage;
