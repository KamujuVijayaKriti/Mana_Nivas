'use client';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, ListPlus, MessageSquare, PanelLeft, Shield, User, LogOut, Heart, Eye, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useUser } from '@/contexts/auth-context';
import { ThemeToggle } from '@/components/theme-toggle';
import { useProperties } from '@/contexts/property-context';

const allNavItems = [{
  to: '/',
  label: 'Home',
  icon: Home,
  roles: ['buyer', 'owner', 'admin']
}, {
  to: '/profile',
  label: 'Profile',
  icon: User,
  roles: ['buyer', 'owner', 'admin']
}, {
  to: '/saved',
  label: 'Saved',
  icon: Heart,
  roles: ['buyer']
}, {
  to: '/manage/properties/new',
  label: 'New Listing',
  icon: ListPlus,
  roles: ['owner']
}, {
  to: '/manage/properties',
  label: 'Manage Properties',
  icon: Settings,
  roles: ['owner']
}, {
  to: '/chat',
  label: 'Messages',
  icon: MessageSquare,
  roles: ['buyer', 'owner']
}, {
  to: '/manage/views',
  label: 'Property Views',
  icon: Eye,
  roles: ['owner']
}, {
  to: '/admin',
  label: 'Admin',
  icon: Shield,
  roles: ['admin']
}];

function MainNav({
  className
}) {
  const { pathname } = useLocation();
  const {
    data: userProfile
  } = useProperties();
  if (!userProfile) {
    return null;
  }
  const navItems = allNavItems.filter(item => userProfile && item.roles.includes(userProfile.role));
  return <nav className={className}>
      {navItems.map(item => <Link key={item.label} to={item.to} className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors
            ${pathname === item.to ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}>
          <item.icon className="mr-3 h-5 w-5" />
          {item.label}
        </Link>)}
    </nav>;
}

function UserMenu() {
  const {
    user,
    logout
  } = useUser();
  const {
    data: userProfile
  } = useProperties();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const avatarData = userProfile && userProfile.avatarUrl ? PlaceHolderImages.find(p => p.id === userProfile.avatarUrl) : null;
  if (!user || !userProfile) {
    return <Button asChild variant="outline">
            <Link to="/login">
                Sign In / Sign Up
            </Link>
        </Button>;
  }
  
  return <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage src={avatarData?.imageUrl} alt={userProfile?.name || 'User'}  />
              <AvatarFallback>{(userProfile?.name || 'U').charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{userProfile?.name || 'User'}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {userProfile?.email || ''}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/profile" className="flex items-center w-full">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
             <LogOut className="mr-2 h-4 w-4" />
             <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>;
}

export function AppShell({
  children
}) {
  const {
    user
  } = useUser();
  if (!user) {
    return <div className="flex flex-col min-h-screen">
             <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <Link to="/" className="flex items-center gap-2 font-headline font-semibold">
                    <Logo className="h-6 w-6 text-primary" />
                    <span className="text-lg">Mana Nivas</span>
                </Link>
                <div className="ml-auto flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link to="/">
                            <Home className="h-5 w-5" />
                            <span className="sr-only">Home</span>
                        </Link>
                    </Button>
                    <ThemeToggle />
                    <UserMenu />
                </div>
            </header>
            <main className="flex-1">{children}</main>
        </div>;
  }
  return <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-headline font-semibold">
              <Logo className="h-6 w-6 text-primary" />
              <span className="">Mananivas</span>
            </Link>
          </div>
          <div className="flex-1">
            <MainNav className="grid items-start px-2 text-sm font-medium lg:px-4" />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link to="#" className="flex items-center gap-2 text-lg font-semibold mb-4">
                  <Logo className="h-6 w-6 text-primary" />
                  <span className="font-headline">Mananivas</span>
                </Link>
                <MainNav className="flex flex-col gap-1" />
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* Header content can go here if needed */}
          </div>
           <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                    <Link to="/">
                        <Home className="h-5 w-5" />
                        <span className="sr-only">Home</span>
                    </Link>
                </Button>
                <ThemeToggle />
                <UserMenu />
           </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 bg-background overflow-auto">
          {children}
        </main>
      </div>
    </div>;
}

export function AppShellHeader({
  children
}) {
  return <div className="p-4 sm:p-6 lg:p-8 border-b">{children}</div>;
}

export function AppShellContent({
  children
}) {
  return <div className="flex-1">{children}</div>;
}