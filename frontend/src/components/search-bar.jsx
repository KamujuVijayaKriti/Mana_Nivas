'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
export function SearchBar({
  onSearch
}) {
  const [activeTab, setActiveTab] = useState('Rent');
  const [city, setCity] = useState('');
  const tabStyle = "text-muted-foreground data-[state=active]:text-foreground data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md px-4";
  const handleSearch = () => {
    onSearch(activeTab, city);
  };
  const handleTabChange = value => {
    const newTab = value;
    setActiveTab(newTab);
    onSearch(newTab, city);
  };
  return <div className="w-full max-w-2xl mx-auto group">
      <div className={cn("rounded-xl p-4 border", "bg-muted/50 dark:bg-muted/20 border-border/50")}>
         <Tabs defaultValue="rent" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="bg-muted p-1 justify-start h-auto rounded-lg">
            <TabsTrigger value="Rent" className={tabStyle}>Rent</TabsTrigger>
            <TabsTrigger value="Sale" className={tabStyle}>Sale</TabsTrigger>
            <TabsTrigger value="Re-sale" className={tabStyle}>Re-Sale</TabsTrigger>
            <TabsTrigger value="pg-coliving" className={tabStyle}>Pg/Coliving</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative flex items-center bg-background rounded-full shadow-lg p-2 mt-4">
          <Select onValueChange={setCity} value={city}>
            <SelectTrigger className="w-full h-12 border-0 focus:ring-0 bg-transparent text-base text-muted-foreground pl-4 pr-10">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hyderabad">Hyderabad</SelectItem>
              <SelectItem value="vijayawada">Vijayawada</SelectItem>
              <SelectItem value="vizag">Vizag</SelectItem>
              <SelectItem value="bangalore">Bangalore</SelectItem>
            </SelectContent>
          </Select>
          <Button size="lg" className="rounded-full h-12 w-32 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-bold ml-2" onClick={handleSearch}>
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </div>
      </div>
    </div>;
}