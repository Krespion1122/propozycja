import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-accent rounded flex items-center justify-center">
                <span className="text-accent-foreground font-serif font-bold text-xl">PR</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg leading-none">Premium Real Estate</span>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Profesjonalne biuro nieruchomości z wieloletnim doświadczeniem. Twoje marzenia, nasza misja.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4">Szybkie linki</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/oferty" className="hover:text-accent transition-colors">
                  Oferty nieruchomości
                </Link>
              </li>
              <li>
                <Link to="/o-nas" className="hover:text-accent transition-colors">
                  O nas
                </Link>
              </li>
              <li>
                <Link to="/dla-sprzedajacych" className="hover:text-accent transition-colors">
                  Dla sprzedających
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="hover:text-accent transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4">Nasze usługi</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-primary-foreground/80">Sprzedaż nieruchomości</li>
              <li className="text-primary-foreground/80">Wynajem mieszkań</li>
              <li className="text-primary-foreground/80">Wycena nieruchomości</li>
              <li className="text-primary-foreground/80">Doradztwo prawne</li>
              <li className="text-primary-foreground/80">Zarządzanie nieruchomościami</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4">Kontakt</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  ul. Przykładowa 123<br />
                  00-001 Warszawa
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+48123456789" className="hover:text-accent transition-colors">
                  +48 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:kontakt@premiumrealestate.pl" className="hover:text-accent transition-colors">
                  kontakt@premium.pl
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>&copy; 2024 Premium Real Estate. Wszelkie prawa zastrzeżone.</p>
            <div className="flex gap-6">
              <Link to="#" className="hover:text-accent transition-colors">
                Polityka prywatności
              </Link>
              <Link to="#" className="hover:text-accent transition-colors">
                Regulamin
              </Link>
              <Link to="#" className="hover:text-accent transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
