'use client';


import { Link } from 'react-router-dom';
import { AppShell, AppShellHeader, AppShellContent } from '@/components/app-shell';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bed, Bath, Home, MapPin, Search, Building, UserCheck, Wallet, ArrowRight } from 'lucide-react';
import { SearchBar } from '@/components/search-bar';
import { useUser } from '@/contexts/auth-context';
import { Hero } from '@/components/hero';
import { Button } from '@/components/ui/button';
import { useProperties } from '@/contexts/property-context';
import { Footer } from '@/components/footer';
import { teamMembers } from '@/lib/team-data';
import { Skeleton } from '@/components/ui/skeleton';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useState } from 'react';
function PropertyCard({
  property
}) {
  const firstImageId = property.images && property.images.length > 0 ? property.images[0] : null;
  const firstImage = firstImageId ? PlaceHolderImages.find(i => i.id === firstImageId) : null;
  const getBadgeText = () => {
    switch (property.listingType) {
      case 'Rent':
        return 'FOR RENT';
      case 'Sale':
        return 'FOR SALE';
      case 'Re-sale':
        return 'RE-SALE';
      case 'Co-living':
        return 'CO-LIVING';
      default:
        return 'FOR RENT';
    }
  };
  return <Card className="overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <Link href={`/properties/${property.id}`} className="block">
        <CardContent className="p-0">
          <div className="relative">
            <img src={firstImage?.imageUrl || PlaceHolderImages.find(i => i.id === 'prop-img-1')?.imageUrl} alt={property.title} width={600} height={400} className="w-full h-48 object-cover bg-muted"  />
            <Badge className="absolute top-3 right-3" variant="secondary">
              {getBadgeText()}
            </Badge>
          </div>
          <div className="p-4 space-y-2">
            <h3 className="text-lg font-headline font-semibold truncate">{property.title}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1 truncate">
              <MapPin className="w-4 h-4" /> 
              {property.location}
            </p>
            <div className="flex items-center text-sm font-medium">
              <span className="font-bold text-primary">₹{property.price.toLocaleString('en-IN')}</span>
              {property.listingType === 'Rent' && <span className="text-muted-foreground">/month</span>}
            </div>
            <div className="flex items-center text-sm text-muted-foreground pt-2 border-t mt-2">
              <div className="flex items-center gap-1 mr-4">
                <Bed size={16} />
                <span>{property.beds} Beds</span>
              </div>
              <div className="flex items-center gap-1 mr-4">
                <Bath size={16} />
                <span>{property.baths} Baths</span>
              </div>
              <div className="flex items-center gap-1">
                <Home size={16} />
                <span>{property.sqft} sqft</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>;
}
function PropertiesGrid({
  properties,
  loading
}) {
  if (loading) {
    return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({
        length: 8
      }).map((_, i) => <Card key={i}>
            <Skeleton className="w-full h-48" />
            <CardContent className="p-4 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/4" />
            </CardContent>
          </Card>)}
      </div>;
  }
  if (properties.length === 0) {
    return <div className="flex flex-col items-center justify-center text-center py-16">
        <Search className="w-16 h-16 text-muted-foreground" />
        <h2 className="text-2xl font-bold mt-4">No Properties Found</h2>
        <p className="text-muted-foreground mt-2">Try adjusting your search filters to find what you're looking for.</p>
      </div>;
  }
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {properties.map(property => <PropertyCard key={property.id} property={property} />)}
    </div>;
}
function LoggedInDashboard() {
  const {
    properties,
    isPropertiesLoading
  } = useProperties();
  return <AppShell>
      <AppShellHeader>
        <SearchBar onSearch={() => {}} />
      </AppShellHeader>
      <AppShellContent>
        <div className="p-4 sm:p-6 lg:p-8">
          <h1 className="text-2xl font-headline font-bold mb-6">Featured Properties in India</h1>
          <PropertiesGrid properties={properties} loading={isPropertiesLoading} />
        </div>
      </AppShellContent>
    </AppShell>;
}
const howItWorksData = {
  buyer: [{
    icon: Search,
    title: 'Find Property',
    description: 'Search through a wide range of properties to find your perfect home.'
  }, {
    icon: UserCheck,
    title: 'Contact Owner',
    description: 'Directly contact the property owners to get more details and schedule a visit.'
  }, {
    icon: Home,
    title: 'Move In',
    description: 'Finalize the deal and move into your new home with ease.'
  }],
  owner: [{
    icon: Building,
    title: 'List Property',
    description: 'Create a listing for your property with all the necessary details and photos.'
  }, {
    icon: UserCheck,
    title: 'Connect with Tenants',
    description: 'Get connected with potential tenants who are interested in your property.'
  }, {
    icon: Wallet,
    title: 'Close the Deal',
    description: 'Finalize the rental agreement and welcome your new tenants.'
  }]
};
function HowItWorksSection() {
  return <div className="py-12 sm:py-16 lg:py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-headline font-bold mb-12 text-center">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="space-y-10">
                        <h3 className="text-2xl font-semibold font-headline text-center text-primary">For Renters & Buyers</h3>
                        {howItWorksData.buyer.map((step, index) => <div key={index} className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <step.icon className="w-6 h-6 text-primary" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg">{step.title}</h4>
                                    <p className="text-muted-foreground mt-1">{step.description}</p>
                                </div>
                            </div>)}
                    </div>
                     <div className="space-y-10">
                        <h3 className="text-2xl font-semibold font-headline text-center text-primary">For Owners</h3>
                        {howItWorksData.owner.map((step, index) => <div key={index} className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <step.icon className="w-6 h-6 text-primary" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg">{step.title}</h4>
                                    <p className="text-muted-foreground mt-1">{step.description}</p>
                                </div>
                            </div>)}
                    </div>
                </div>
            </div>
        </div>;
}
function TeamSection() {
  return <div className="bg-muted/40 py-12 sm:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-headline font-bold mb-8 text-center">Meet Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {teamMembers.map(member => <Card key={member.name} className="text-center">
                            <CardContent className="pt-6">
                                <h3 className="text-xl font-headline font-semibold">{member.name}</h3>
                                <p className="text-primary font-medium">{member.role}</p>
                                <p className="text-sm text-muted-foreground mt-2">{member.contribution}</p>
                            </CardContent>
                        </Card>)}
                </div>
            </div>
        </div>;
}
function GetStartedSection() {
  return <div className="bg-primary/5">
            <div className="max-w-4xl mx-auto py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">Find Your Dream Home Today</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    Join thousands of users who have found their perfect place with Mana Nivas. Get started now and unlock a world of possibilities.
                </p>
                <div className="mt-8">
                    <Button size="lg" asChild>
                        <Link href="/signup">
                            Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>;
}
function LoggedOutLandingPage() {
  const {
    properties,
    isPropertiesLoading
  } = useProperties();
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const handleSearch = (listingType, city) => {
    setHasSearched(true);
    let filtered = properties;
    const effectiveListingType = listingType === 'pg-coliving' ? 'Co-living' : listingType;
    if (effectiveListingType) {
      filtered = filtered.filter(p => p.listingType === effectiveListingType);
    }
    if (city) {
      filtered = filtered.filter(p => p.location.toLowerCase().includes(city.toLowerCase()));
    }
    setSearchResults(filtered);
  };
  return <AppShell>
      <AppShellContent>
        <Hero title="More than a House, it's Home" description="The best place to find your next rental property. We provide a seamless experience for both property owners and tenants, connecting them in a secure and efficient marketplace." imageUrl={PlaceHolderImages.find(i => i.id === 'prop-interior-3')?.imageUrl || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop'} imageHint="luxury interior">
            <div className="mt-8 flex flex-col w-full max-w-4xl px-4" data-in-hero="true">
                <div className="backdrop-blur-md bg-background/50 p-2 rounded-2xl shadow-2xl border border-white/20">
                    <SearchBar onSearch={handleSearch} />
                </div>
            </div>
        </Hero>

        {hasSearched && <div id="search-results" className="py-12 sm:py-16 lg:py-20 bg-background scroll-mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-headline font-bold mb-8 text-center">Search Results</h2>
                    <PropertiesGrid properties={searchResults} loading={isPropertiesLoading} />
                </div>
            </div>}

        <div id="featured-properties" className="py-12 sm:py-16 lg:py-20 bg-muted/20 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-headline font-bold mb-8 text-center">Featured Properties</h2>
                <PropertiesGrid properties={properties.slice(0, 8)} loading={isPropertiesLoading} />
            </div>
        </div>
        <HowItWorksSection />
        <TeamSection />
        <GetStartedSection />
        <Footer />
      </AppShellContent>
    </AppShell>;
}
export default function HomePage() {
  const {
    user,
    isUserLoading
  } = useUser();
  const {
    data: userProfile
  } = useProperties();
  if (isUserLoading) {
    return <AppShell>
            <AppShellContent>
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">Loading...</h1>
                    </div>
                </div>
            </AppShellContent>
        </AppShell>;
  }
  if (user && userProfile) {
    // Buyers see the rich landing page, others see the functional dashboard.
    if (userProfile.role === 'buyer') {
      return <LoggedOutLandingPage />;
    }
    return <LoggedInDashboard />;
  }
  return <LoggedOutLandingPage />;
}
