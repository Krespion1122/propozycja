import { Award, Users, Target, CheckCircle2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import teamImage from "@/assets/about-team.jpg";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary via-navy-light to-primary text-primary-foreground relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full" />
          <div className="absolute top-20 right-20 w-48 h-48 border border-white rounded-full" />
          <div className="absolute bottom-10 left-1/4 w-24 h-24 border border-white rounded-lg rotate-45" />
          <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-white/20 rounded-full" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent-foreground" />
                </div>
                <span className="text-accent font-medium uppercase tracking-wider text-sm">Kim jesteśmy</span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">O nas</h1>
              <p className="text-xl text-primary-foreground/90 max-w-2xl mb-6">
                Poznaj naszą historię i wartości, które nas wyróżniają na rynku nieruchomości
              </p>
              <div className="flex items-center gap-6 text-primary-foreground/80">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  <span>15+ lat doświadczenia</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span>3000+ klientów</span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="relative">
                <div className="w-40 h-40 bg-accent/20 rounded-full flex items-center justify-center">
                  <div className="w-28 h-28 bg-accent/40 rounded-full flex items-center justify-center">
                    <Award className="w-14 h-14 text-accent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="font-serif text-4xl font-bold mb-6 text-center">
            Profesjonalizm i zaufanie od <span className="text-gradient-gold">2009 roku</span>
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-8">
            Premium Real Estate to profesjonalne biuro nieruchomości z ponad 15-letnim doświadczeniem na rynku.
            Specjalizujemy się w sprzedaży, kupnie i wynajmie mieszkań, domów oraz lokali komercyjnych na terenie
            całej Polski.
          </p>
          <p className="text-lg text-muted-foreground text-center">
            Naszym celem jest zapewnienie kompleksowej obsługi i indywidualnego podejścia do każdego klienta.
            Stawiamy na transparentność, profesjonalizm i pełne bezpieczeństwo transakcji.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-serif text-2xl font-semibold mb-4">Nasza misja</h3>
            <p className="text-muted-foreground">
              Pomagamy ludziom znaleźć wymarzone miejsce do życia i realizować marzenia o własnej nieruchomości.
              Każda transakcja to dla nas odpowiedzialność i zobowiązanie.
            </p>
          </div>

          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-serif text-2xl font-semibold mb-4">Nasza wizja</h3>
            <p className="text-muted-foreground">
              Dążymy do bycia liderem rynku nieruchomości w Polsce, wyznaczając standardy profesjonalizmu,
              uczciwości i jakości obsługi klienta.
            </p>
          </div>

          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-serif text-2xl font-semibold mb-4">Nasze wartości</h3>
            <p className="text-muted-foreground">
              Zaufanie, profesjonalizm, transparentność i indywidualne podejście to fundamenty, na których
              budujemy relacje z naszymi klientami.
            </p>
          </div>
        </div>

        {/* Company Image */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl font-bold mb-6">
                Nasza <span className="text-gradient-gold">firma</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Jesteśmy zespołem doświadczonych profesjonalistów, którzy łączą pasję do nieruchomości
                z głęboką wiedzą rynkową i merytorycznym doradztwem.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Oferujemy kompleksową obsługę na najwyższym poziomie, dbając o każdy detal 
                i zapewniając pełne bezpieczeństwo transakcji.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Profesjonalna obsługa</h4>
                    <p className="text-muted-foreground">Zapewniamy kompleksową pomoc na każdym etapie transakcji</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Wiedza rynkowa</h4>
                    <p className="text-muted-foreground">Stale śledzimy trendy i analizujemy rynek nieruchomości</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Indywidualne podejście</h4>
                    <p className="text-muted-foreground">Każdy klient otrzymuje dedykowaną opiekę przez cały proces</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-large">
              <img
                src={teamImage}
                alt="Premium Real Estate"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-primary to-navy-light text-primary-foreground rounded-2xl p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-serif text-5xl font-bold mb-2">15+</div>
              <div className="text-primary-foreground/80">Lat doświadczenia</div>
            </div>
            <div>
              <div className="font-serif text-5xl font-bold mb-2">3000+</div>
              <div className="text-primary-foreground/80">Zadowolonych klientów</div>
            </div>
            <div>
              <div className="font-serif text-5xl font-bold mb-2">500+</div>
              <div className="text-primary-foreground/80">Ofert rocznie</div>
            </div>
            <div>
              <div className="font-serif text-5xl font-bold mb-2">98%</div>
              <div className="text-primary-foreground/80">Pozytywnych opinii</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
