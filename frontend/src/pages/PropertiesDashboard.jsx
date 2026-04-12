import { Link } from 'react-router-dom';
import { AppShell, AppShellContent, AppShellHeader } from '@/components/app-shell';
import { useProperties } from '@/contexts/property-context';
import { useUser } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function PropertiesDashboard() {
  const { properties, isPropertiesLoading } = useProperties();
  const { user } = useUser();

  // Filter properties by logged in user (owner)
  // Currently mock using user.id. Ensure listerId is stored/checked properly.
  const myProperties = properties.filter(p => p.ownerId === user?.id || p.listerId === user?.id) || properties.slice(0, 2);

  return (
    <AppShell>
      <AppShellHeader className="justify-between items-center px-4 md:px-8 border-b">
        <h1 className="text-xl font-headline font-bold">Owner Dashboard</h1>
        <Button asChild size="sm">
          <Link to="/manage/properties/new">
            <Plus className="w-4 h-4 mr-2" /> Add Property
          </Link>
        </Button>
      </AppShellHeader>
      <AppShellContent>
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-primary/5 border-none shadow-sm">
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-muted-foreground">Total Listings</p>
                  <p className="text-3xl font-bold mt-2">{myProperties.length}</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-500/5 border-none shadow-sm">
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                  <p className="text-3xl font-bold mt-2">1,245</p>
                </CardContent>
              </Card>
              <Card className="bg-green-500/5 border-none shadow-sm">
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-muted-foreground">Active Leads</p>
                  <p className="text-3xl font-bold mt-2">12</p>
                </CardContent>
              </Card>
           </div>

           <div>
              <h2 className="text-2xl font-headline font-semibold mb-6">My Properties</h2>
              {isPropertiesLoading ? (
                 <p>Loading...</p>
              ) : myProperties.length === 0 ? (
                 <div className="text-center py-16 border rounded-xl border-dashed">
                   <h3 className="text-xl font-medium mb-2">No properties listed yet</h3>
                   <p className="text-muted-foreground mb-4">You haven't added any properties to your portfolio.</p>
                   <Button asChild><Link to="/manage/properties/new">List your first property</Link></Button>
                 </div>
              ) : (
                <div className="grid gap-4">
                  {myProperties.map((property) => (
                    <Card key={property.id} className="overflow-hidden">
                         <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-48 h-48 sm:h-auto bg-muted">
                           <img 
                              src={(property.images && property.images.length > 0) ? PlaceHolderImages.find(i => i.id === property.images[0])?.imageUrl || PlaceHolderImages.find(i => i.id === 'prop-img-1')?.imageUrl : PlaceHolderImages.find(i => i.id === 'prop-img-1')?.imageUrl} 
                              alt={property.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                            <div>
                               <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-lg font-headline font-semibold">{property.title}</h3>
                                  <span className="font-bold text-primary">₹{(property.price || 0).toLocaleString('en-IN')}</span>
                               </div>
                               <p className="text-sm text-muted-foreground">
                                  {property.location} • {property.listingType}
                               </p>
                            </div>
                            <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                              <Button variant="outline" size="sm" asChild>
                                 <Link to={`/properties/${property.id}`}><Eye className="w-4 h-4 mr-2" /> View</Link>
                              </Button>
                              <Button variant="outline" size="sm" asChild>
                                 <Link to={`/manage/properties/edit/${property.id}`}><Edit className="w-4 h-4 mr-2" /> Edit</Link>
                              </Button>
                              <Button variant="destructive" size="sm" className="ml-auto flex items-center">
                                 <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                       </div>
                    </Card>
                  ))}
                </div>
              )}
           </div>

        </div>
      </AppShellContent>
    </AppShell>
  );
}
