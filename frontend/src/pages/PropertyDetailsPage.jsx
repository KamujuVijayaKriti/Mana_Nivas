import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppShell, AppShellContent } from '@/components/app-shell';
import { useProperties } from '@/contexts/property-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Home, ArrowLeft, Heart, Share2, CalendarDays, Phone, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const { getPropertyById, isPropertiesLoading, saveProperty, unsaveProperty, isPropertySaved } = useProperties();
  const [property, setProperty] = useState(null);
  
  useEffect(() => {
    if (!isPropertiesLoading) {
      setProperty(getPropertyById(id));
    }
  }, [id, getPropertyById, isPropertiesLoading]);

  if (isPropertiesLoading) {
    return (
      <AppShell>
        <AppShellContent>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <Skeleton className="w-full h-[50vh] rounded-xl" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                 <Skeleton className="w-2/3 h-12" />
                 <Skeleton className="w-1/2 h-6" />
                 <Skeleton className="w-full h-40" />
              </div>
              <div className="space-y-6">
                <Skeleton className="w-full h-64 rounded-xl" />
              </div>
            </div>
          </div>
        </AppShellContent>
      </AppShell>
    );
  }

  if (!property) {
    return (
      <AppShell>
        <AppShellContent>
          <div className="max-w-7xl mx-auto px-4 py-16 text-center">
            <h1 className="text-3xl font-bold font-headline mb-4">Property Not Found</h1>
            <p className="text-muted-foreground mb-8">The property you are looking for does not exist or has been removed.</p>
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </AppShellContent>
      </AppShell>
    );
  }

  const saved = isPropertySaved(property.id);
  const handleSaveToggle = () => saved ? unsaveProperty(property.id) : saveProperty(property.id);

  // We will simply display a series of placeholders if the property doesn't have real images
  const images = property.images?.length > 0 
    ? property.images.map(imgId => PlaceHolderImages.find(i => i.id === imgId)?.imageUrl || PlaceHolderImages.find(i => i.id === 'prop-img-1')?.imageUrl) 
    : [PlaceHolderImages.find(i => i.id === 'prop-img-1')?.imageUrl];

  return (
    <AppShell>
      <AppShellContent>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          <Link to="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to properties
          </Link>

          {/* Hero Image Section */}
          <div className="relative w-full h-[50vh] min-h-[400px] mb-8 group rounded-2xl overflow-hidden shadow-lg">
             <img src={images[0]} alt={property.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
             <div className="absolute top-4 right-4 flex gap-2">
                <Button variant="secondary" size="icon" className="rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm" onClick={handleSaveToggle}>
                   <Heart className={`w-5 h-5 ${saved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </Button>
                <Button variant="secondary" size="icon" className="rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
                   <Share2 className="w-5 h-5 text-gray-600" />
                </Button>
             </div>
             <div className="absolute bottom-4 left-4 flex gap-2">
               <Badge variant="default" className="text-sm font-semibold shadow-md bg-white/90 text-black hover:bg-white">{property.listingType}</Badge>
               <Badge variant="secondary" className="text-sm font-semibold shadow-md bg-white/90 text-black hover:bg-white">{property.propertyType}</Badge>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h1 className="text-3xl sm:text-4xl font-headline font-bold mb-4">{property.title}</h1>
                <p className="text-lg text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" /> {property.location}
                </p>
              </div>

              <div className="flex flex-wrap gap-6 py-6 border-y border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bed className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Bedrooms</p>
                    <p className="font-semibold text-lg">{property.beds}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bath className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Bathrooms</p>
                    <p className="font-semibold text-lg">{property.baths}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Home className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Square Feet</p>
                    <p className="font-semibold text-lg">{property.sqft}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-headline font-semibold mb-4">Description</h2>
                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                  <p>{property.description}</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="sticky top-24 border-primary/10 shadow-xl overflow-hidden">
                <div className="bg-primary/5 p-6 border-b border-border">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Price</p>
                  <p className="text-4xl font-bold font-headline text-primary">
                    ₹{property.price?.toLocaleString('en-IN')}
                    {property.listingType === 'Rent' && <span className="text-lg text-muted-foreground font-normal">/mo</span>}
                  </p>
                </div>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <Button className="w-full" size="lg">Contact Owner</Button>
                    <Button variant="outline" className="w-full" size="lg">
                      <CalendarDays className="w-4 h-4 mr-2" /> Schedule Visit
                    </Button>
                  </div>
                  
                  <div className="pt-6 border-t border-border space-y-4">
                     <p className="font-headline font-semibold">Owner Details</p>
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">
                          {property.ownerId ? property.ownerId.substring(0, 2).toUpperCase() : 'OW'}
                        </div>
                        <div>
                          <p className="font-medium text-sm">Verified Owner</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><Mail className="w-3 h-3"/> Contact to view</p>
                        </div>
                     </div>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </AppShellContent>
    </AppShell>
  );
}
