import { AppShell, AppShellContent, AppShellHeader } from '@/components/app-shell';
import { PropertyForm } from '@/components/property-form';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function AddPropertyPage() {
  return (
    <AppShell>
      <AppShellHeader className="px-4 md:px-8 border-b">
         <div className="flex items-center">
            <Link to="/manage/properties" className="mr-4 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-headline font-bold">Add New Property</h1>
         </div>
      </AppShellHeader>
      <AppShellContent>
        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
           <PropertyForm />
        </div>
      </AppShellContent>
    </AppShell>
  );
}
