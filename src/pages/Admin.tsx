import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, GripVertical, Save, X, LogIn, LogOut, Loader2, Mail, Eye, Check, MapPin, Home, MessageSquare, Building, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useListings, Listing } from "@/hooks/useListings";
import { useMessages } from "@/hooks/useMessages";
import { toast } from "@/hooks/use-toast";

const ADMIN_PASSWORD = "admin123";

const AdminPage = () => {
  const { listings, loading, addListing, updateListing, deleteListing, refreshListings } = useListings();
  const { messages, loading: messagesLoading, markAsRead, deleteMessage, refreshMessages } = useMessages();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
    googleMapsUrl: '',
  });
  const [draggedImages, setDraggedImages] = useState<string[]>([]);

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setAuthError("");
      toast({ title: "Zalogowano pomyślnie" });
      refreshListings();
      refreshMessages();
    } else {
      setAuthError("Nieprawidłowe hasło");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
    setPassword("");
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
      googleMapsUrl: formData.googleMapsUrl || '',
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
      toast({ title: "Błąd", description: "Nie udało się zapisać ogłoszenia.", variant: "destructive" });
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
      googleMapsUrl: '',
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
        toast({ title: "Błąd", description: "Nie udało się usunąć ogłoszenia.", variant: "destructive" });
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

  const handleMarkAsRead = async (id: string) => {
    const result = await markAsRead(id);
    if (!result.error) {
      toast({ title: "Oznaczono jako przeczytane" });
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (window.confirm('Czy na pewno chcesz usunąć tę wiadomość?')) {
      const result = await deleteMessage(id);
      if (!result.error) {
        toast({ title: "Usunięto wiadomość" });
      }
    }
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

  // Not logged in - show login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-navy-light rounded-xl flex items-center justify-center mx-auto mb-4">
              <Home className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="font-serif text-2xl">Panel Administratora</CardTitle>
            <CardDescription>
              Dom Nieruchomości
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label>Hasło</Label>
                <Input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1"
                  required
                />
              </div>
              {authError && (
                <p className="text-sm text-destructive bg-destructive/10 p-2 rounded">{authError}</p>
              )}
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                <LogIn className="w-4 h-4 mr-2" />
                Zaloguj
              </Button>
              <Button variant="ghost" className="w-full" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Powrót do strony głównej
                </Link>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/50 via-background to-muted/50">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-navy-light rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-serif text-xl font-bold">Panel Administratora</h1>
                <p className="text-xs text-muted-foreground">Dom Nieruchomości</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Strona główna
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Wyloguj
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList className="bg-card border">
            <TabsTrigger value="listings" className="gap-2">
              <Building className="w-4 h-4" />
              Ogłoszenia
            </TabsTrigger>
            <TabsTrigger value="messages" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Wiadomości
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 justify-center text-xs">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Listings Tab */}
          <TabsContent value="listings" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold">Zarządzaj ogłoszeniami</h2>
                <p className="text-muted-foreground">Łącznie: {listings.length} ofert</p>
              </div>
              <Button onClick={() => setShowForm(!showForm)} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Dodaj ogłoszenie
              </Button>
            </div>

            {showForm && (
              <Card className="border-accent/20">
                <CardHeader className="bg-accent/5 border-b">
                  <CardTitle className="flex items-center gap-2">
                    {editingId ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    {editingId ? 'Edytuj ogłoszenie' : 'Nowe ogłoszenie'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <Label>Tytuł *</Label>
                        <Input
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="np. Przestronne mieszkanie w centrum"
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
                        <Label>Lokalizacja *</Label>
                        <Input
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="np. Warszawa, Mokotów"
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
                      <Label>Link do Google Maps</Label>
                      <Input
                        value={formData.googleMapsUrl}
                        onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                        placeholder="https://www.google.com/maps/embed?pb=... lub zwykły link Google Maps"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Dla osadzenia mapy: Google Maps → Udostępnij → Umieść mapę → kopiuj adres src z kodu iframe.<br />
                        Możesz też wkleić zwykły link do Google Maps - wyświetli się przycisk "Otwórz w Google Maps".
                      </p>
                    </div>

                    <div>
                      <Label>Opis *</Label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={5}
                        placeholder="Szczegółowy opis nieruchomości..."
                        required
                      />
                    </div>

                    <div>
                      <Label>Udogodnienia (każde w nowej linii)</Label>
                      <Textarea
                        value={formData.features?.join('\n') || ''}
                        onChange={(e) => setFormData({ ...formData, features: e.target.value.split('\n').map(f => f.trim()).filter(Boolean) })}
                        placeholder="Klimatyzacja&#10;Balkon&#10;Garaż&#10;Winda"
                        rows={4}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Wpisz każde udogodnienie w osobnej linii (Enter = nowa linia)
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Label>Zdjęcia (przeciągnij, aby zmienić kolejność)</Label>
                        <Button type="button" variant="outline" size="sm" onClick={addImageUrl}>
                          <Plus className="w-4 h-4 mr-2" />
                          Dodaj zdjęcie
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
                              className="absolute top-1 right-1 w-6 h-6 opacity-0 group-hover:opacity-100"
                              onClick={() => removeImage(index)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                            {index === 0 && (
                              <Badge className="absolute bottom-1 left-1 bg-accent text-accent-foreground text-xs">
                                Główne
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="featured" className="cursor-pointer">Ogłoszenie polecane (wyświetlane na stronie głównej)</Label>
                    </div>

                    <div className="flex gap-4 pt-4 border-t">
                      <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={saving}>
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
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                <p className="text-muted-foreground mt-2">Ładowanie ogłoszeń...</p>
              </div>
            ) : listings.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Building className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Brak ogłoszeń. Dodaj pierwsze ogłoszenie!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {listings.map((listing) => (
                  <Card key={listing.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <img
                          src={listing.mainImage || '/placeholder.svg'}
                          alt={listing.title}
                          className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <h3 className="font-semibold text-lg truncate">{listing.title}</h3>
                              <p className="text-muted-foreground text-sm flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {listing.location}
                              </p>
                              <p className="font-bold text-primary mt-1">
                                {listing.price.toLocaleString('pl-PL')} zł
                                {listing.offerType === 'wynajem' && '/mies.'}
                              </p>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              <Button variant="outline" size="sm" onClick={() => handleEdit(listing)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => handleDelete(listing.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            <Badge variant="secondary">{listing.area} m²</Badge>
                            <Badge variant="secondary">{listing.bedrooms} pok.</Badge>
                            <Badge variant="secondary">{listing.propertyType}</Badge>
                            <Badge variant="outline" className="capitalize">{listing.offerType}</Badge>
                            {listing.featured && (
                              <Badge className="bg-accent text-accent-foreground">Polecane</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold">Wiadomości od klientów</h2>
              <p className="text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} nieprzeczytanych wiadomości` : 'Wszystkie wiadomości przeczytane'}
              </p>
            </div>

            {messagesLoading ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                <p className="text-muted-foreground mt-2">Ładowanie wiadomości...</p>
              </div>
            ) : messages.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Mail className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Brak wiadomości</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {messages.map((msg) => (
                  <Card key={msg.id} className={`transition-all ${!msg.isRead ? 'border-primary/50 bg-primary/5' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{msg.name}</h3>
                            {!msg.isRead && (
                              <Badge variant="default" className="text-xs">Nowa</Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p className="flex items-center gap-2">
                              <Mail className="w-3 h-3" />
                              {msg.email}
                            </p>
                            {msg.phone && (
                              <p>Tel: {msg.phone}</p>
                            )}
                            {msg.listingTitle && (
                              <p className="text-primary">
                                Dotyczy: {msg.listingTitle}
                              </p>
                            )}
                            {msg.subject && (
                              <p>Temat: {msg.subject}</p>
                            )}
                          </div>
                          <p className="mt-3 text-foreground bg-muted/50 p-3 rounded-lg">
                            {msg.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(msg.createdAt).toLocaleString('pl-PL')}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 flex-shrink-0">
                          {!msg.isRead && (
                            <Button variant="outline" size="sm" onClick={() => handleMarkAsRead(msg.id)}>
                              <Check className="w-4 h-4" />
                            </Button>
                          )}
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteMessage(msg.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
