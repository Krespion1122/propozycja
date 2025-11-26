import { Link } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-navy-light rounded flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-xl">DN</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl leading-none">Dom Nieruchomości</span>
              <span className="text-xs text-muted-foreground">Twoje wymarzone nieruchomości</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Strona główna
            </Link>
            <Link to="/oferty" className="text-foreground hover:text-primary transition-colors font-medium">
              Oferty
            </Link>
            <Link to="/o-nas" className="text-foreground hover:text-primary transition-colors font-medium">
              O nas
            </Link>
            <Link to="/dla-sprzedajacych" className="text-foreground hover:text-primary transition-colors font-medium">
              Dla sprzedających
            </Link>
            <Link to="/kontakt" className="text-foreground hover:text-primary transition-colors font-medium">
              Kontakt
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/kontakt" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+48 123 456 789</span>
              </Link>
            </Button>
            <Button size="sm" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/kontakt">Umów spotkanie</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <Link
              to="/"
              className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Strona główna
            </Link>
            <Link
              to="/oferty"
              className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Oferty
            </Link>
            <Link
              to="/o-nas"
              className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              O nas
            </Link>
            <Link
              to="/dla-sprzedajacych"
              className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dla sprzedających
            </Link>
            <Link
              to="/kontakt"
              className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kontakt
            </Link>
            <div className="pt-4 space-y-2">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/kontakt" className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+48 123 456 789</span>
                </Link>
              </Button>
              <Button size="sm" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <Link to="/kontakt">Umów spotkanie</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
