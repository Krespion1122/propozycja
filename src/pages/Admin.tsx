import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, GripVertical, Save, X, LogIn, LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useListings, Listing } from "@/hooks/useListings";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

const AdminPage = () => {
  const { listings, loading, addListing, updateListing, deleteListing, refreshListings } = useListings();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  
  const [formData, setFormData] = useState<Partial<Listing>>({
    title: '',
    description: '',
    price: 0,
    location: '',
    area: 0,
    bedrooms: 1,
    bathrooms: 1,
    propertyType: 'mieszkanie',
    offerType: 'sprzedaż',
    images: [],
    features: [],
    floor: '',
    year: new Date().getFullYear(),
    featured: false,
  });
  const [draggedImages, setDraggedImages] = useState<string[]>([]);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setAuthError(error.message);
    } else {
      refreshListings();
    }
  };

  const handleSignUp = async () => {
    setAuthError("");
    
    const { error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`
      }
    });
    
    if (error) {
      setAuthError(error.message);
    } else {
      toast({ title: "Sprawdź email, aby potwierdzić konto" });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const listingData = {
      title: formData.title || '',
      description: formData.description || '',
      price: formData.price || 0,
      location: formData.location || '',
      area: formData.area || 0,
      bedrooms: formData.bedrooms || 1,
      bathrooms: formData.bathrooms || 1,
      propertyType: formData.propertyType || 'mieszkanie',
      offerType: formData.offerType || 'sprzedaż',
      mainImage: draggedImages[0] || formData.images?.[0] || '',
      images: draggedImages.length > 0 ? draggedImages : formData.images || [],
      features: formData.features || [],
      floor: formData.floor || '',
      year: formData.year || new Date().getFullYear(),
      featured: formData.featured || false,
    } as Omit<Listing, 'id' | 'createdAt'>;

    let result;
    if (editingId) {
      result = await updateListing(editingId, listingData);
      if (!result.error) {
        toast({ title: "Zaktualizowano ogłoszenie" });
      }
    } else {
      result = await addListing(listingData);
      if (!result.error) {
        toast({ title: "Dodano nowe ogłoszenie" });
      }
    }

    if (result.error) {
      toast({ title: "Błąd", description: "Nie udało się zapisać ogłoszenia", variant: "destructive" });
    } else {
      resetForm();
    }
    
    setSaving(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: 0,
      location: '',
      area: 0,
      bedrooms: 1,
      bathrooms: 1,
      propertyType: 'mieszkanie',
      offerType: 'sprzedaż',
      images: [],
      features: [],
      floor: '',
      year: new Date().getFullYear(),
      featured: false,
    });
    setDraggedImages([]);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (listing: Listing) => {
    setFormData(listing);
    setDraggedImages(listing.images);
    setEditingId(listing.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Czy na pewno chcesz usunąć to ogłoszenie?')) {
      const result = await deleteListing(id);
      if (result.error) {
        toast({ title: "Błąd", description: "Nie udało się usunąć ogłoszenia", variant: "destructive" });
      } else {
        toast({ title: "Usunięto ogłoszenie" });
      }
    }
  };

  const handleImageDragStart = (index: number) => {
    return (e: React.DragEvent) => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', index.toString());
    };
  };

  const handleImageDrop = (dropIndex: number) => {
    return (e: React.DragEvent) => {
      e.preventDefault();
      const dragIndex = parseInt(e.dataTransfer.getData('text/html'));
      const newImages = [...draggedImages];
      const [removed] = newImages.splice(dragIndex, 1);
      newImages.splice(dropIndex, 0, removed);
      setDraggedImages(newImages);
    };
  };

  const addImageUrl = () => {
    const url = prompt('Podaj URL zdjęcia:');
    if (url) {
      setDraggedImages([...draggedImages, url]);
    }
  };

  const removeImage = (index: number) => {
    setDraggedImages(draggedImages.filter((_, i) => i !== index));
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Panel Administratora</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Hasło</Label>
                <Input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {authError && (
                <p className="text-sm text-destructive">{authError}</p>
              )}
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  <LogIn className="w-4 h-4 mr-2" />
                  Zaloguj
                </Button>
                <Button type="button" variant="outline" onClick={handleSignUp}>
                  Rejestracja
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-4xl font-bold">Panel Administratora</h1>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-accent hover:bg-accent/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Dodaj ogłoszenie
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Wyloguj
            </Button>
          </div>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId ? 'Edytuj ogłoszenie' : 'Nowe ogłoszenie'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Tytuł *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label>Lokalizacja *</Label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label>Cena (zł) *</Label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                      required
                    />
                  </div>

                  <div>
                    <Label>Powierzchnia (m²) *</Label>
                    <Input
                      type="number"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: parseInt(e.target.value) || 0 })}
                      required
                    />
                  </div>

                  <div>
                    <Label>Liczba sypialni *</Label>
                    <Input
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) || 1 })}
                      required
                    />
                  </div>

                  <div>
                    <Label>Liczba łazienek *</Label>
                    <Input
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) || 1 })}
                      required
                    />
                  </div>

                  <div>
                    <Label>Typ nieruchomości *</Label>
                    <Select
                      value={formData.propertyType}
                      onValueChange={(value: any) => setFormData({ ...formData, propertyType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mieszkanie">Mieszkanie</SelectItem>
                        <SelectItem value="dom">Dom</SelectItem>
                        <SelectItem value="lokal">Lokal komercyjny</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Typ oferty *</Label>
                    <Select
                      value={formData.offerType}
                      onValueChange={(value: any) => setFormData({ ...formData, offerType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sprzedaż">Sprzedaż</SelectItem>
                        <SelectItem value="wynajem">Wynajem</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Piętro</Label>
                    <Input
                      value={formData.floor}
                      onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                      placeholder="np. 2/5"
                    />
                  </div>

                  <div>
                    <Label>Rok budowy *</Label>
                    <Input
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || new Date().getFullYear() })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label>Opis *</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={6}
                    required
                  />
                </div>

                <div>
                  <Label>Udogodnienia (oddzielone przecinkami)</Label>
                  <Input
                    value={formData.features?.join(', ')}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value.split(',').map(f => f.trim()).filter(Boolean) })}
                    placeholder="Klimatyzacja, Balkon, Garaż"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Label>Zdjęcia (przeciągnij, aby zmienić kolejność)</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addImageUrl}>
                      <Plus className="w-4 h-4 mr-2" />
                      Dodaj zdjęcie
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {draggedImages.map((img, index) => (
                      <div
                        key={index}
                        draggable
                        onDragStart={handleImageDragStart(index)}
                        onDrop={handleImageDrop(index)}
                        onDragOver={(e) => e.preventDefault()}
                        className="relative aspect-video bg-muted rounded-lg overflow-hidden cursor-move border-2 border-dashed hover:border-accent transition-colors group"
                      >
                        <img src={img} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                          <GripVertical className="w-6 h-6 text-white opacity-0 group-hover:opacity-100" />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 w-6 h-6 opacity-0 group-hover:opacity-100"
                          onClick={() => removeImage(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        {index === 0 && (
                          <div className="absolute bottom-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-semibold">
                            Główne
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Pierwsze zdjęcie będzie zdjęciem głównym ogłoszenia
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  <Label htmlFor="featured">Ogłoszenie polecane</Label>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="bg-accent hover:bg-accent/90" disabled={saving}>
                    {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    <Save className="w-4 h-4 mr-2" />
                    {editingId ? 'Zapisz zmiany' : 'Dodaj ogłoszenie'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Anuluj
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin mx-auto" />
            <p className="text-muted-foreground mt-2">Ładowanie ogłoszeń...</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Brak ogłoszeń. Dodaj pierwsze ogłoszenie!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {listings.map((listing) => (
              <Card key={listing.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <img
                      src={listing.mainImage || '/placeholder.svg'}
                      alt={listing.title}
                      className="w-48 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-serif text-xl font-semibold mb-2">{listing.title}</h3>
                          <p className="text-muted-foreground mb-2">{listing.location}</p>
                          <div className="flex gap-4 text-sm text-muted-foreground">
                            <span>{listing.area} m²</span>
                            <span>{listing.bedrooms} syp.</span>
                            <span>{listing.bathrooms} łaz.</span>
                            <span className="font-semibold text-primary">
                              {listing.price.toLocaleString()} zł{listing.offerType === 'wynajem' && '/mies'}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(listing)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(listing.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
