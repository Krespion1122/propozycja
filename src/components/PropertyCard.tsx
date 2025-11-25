import { Link } from "react-router-dom";
import { MapPin, Bed, Bath, Maximize } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: "sprzedaż" | "wynajem";
  featured?: boolean;
}

const PropertyCard = ({
  id,
  title,
  location,
  price,
  image,
  bedrooms,
  bathrooms,
  area,
  type,
  featured,
}: PropertyCardProps) => {
  return (
    <Link to={`/oferty/${id}`}>
      <Card className="group overflow-hidden hover:shadow-large transition-all duration-300 h-full">
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-primary text-primary-foreground">
              {type}
            </Badge>
            {featured && (
              <Badge className="bg-accent text-accent-foreground">
                Polecane
              </Badge>
            )}
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center text-muted-foreground mb-4">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>{bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{bathrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize className="w-4 h-4" />
              <span>{area} m²</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="font-serif text-2xl font-bold text-primary">{price}</span>
            <span className="text-sm text-muted-foreground">
              {Math.round(parseInt(price.replace(/\s/g, '')) / area)} zł/m²
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;
