'use client';

import { useState, useEffect, useTransition } from 'react';
import { useNavigate as useRouter } from 'react-router-dom';
import { Wand2, Loader2 } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useProperties } from '@/contexts/property-context';
import { useUser } from '@/contexts/auth-context';
const propertyFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  location: z.string().min(1, 'Location is required'),
  propertyType: z.enum(['Apartment', 'House', 'Condo', 'Villa']),
  listingType: z.enum(['Rent', 'Sale', 'Re-sale', 'Co-living']),
  price: z.coerce.number().min(1, 'Price is required'),
  beds: z.coerce.number().min(0),
  baths: z.coerce.number().min(0),
  sqft: z.coerce.number().min(1, 'Square footage is required'),
  description: z.string().min(1, 'Description is required'),
  keyFeatures: z.string(),
  photos: z.any()
});
export function PropertyForm({
  propertyToEdit
}) {
  const {
    toast
  } = useToast();
  const {
    user
  } = useUser();
  const router = useRouter();
  const {
    addProperty,
    updateProperty
  } = useProperties();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isEditing = !!propertyToEdit;
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: {
      errors
    }
  } = useForm({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: propertyToEdit?.title || '',
      location: propertyToEdit?.location || '',
      propertyType: propertyToEdit?.propertyType || 'Apartment',
      listingType: propertyToEdit?.listingType || 'Rent',
      price: propertyToEdit?.price || 0,
      beds: propertyToEdit?.beds || 0,
      baths: propertyToEdit?.baths || 0,
      sqft: propertyToEdit?.sqft || 0,
      description: propertyToEdit?.description || '',
      keyFeatures: ''
    }
  });
  const formValues = watch();
  useEffect(() => {
    if (propertyToEdit) {
      Object.entries(propertyToEdit).forEach(([key, value]) => {
        if (key in formValues) {
          setValue(key, value);
        }
      });
    }
  }, [propertyToEdit, setValue]);
  const handleGenerateDescription = async formData => {
    startTransition(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setValue('description', 'A beautiful ' + formValues.propertyType + ' located in ' + formValues.location + '. Features: ' + formValues.keyFeatures);
      toast({
        title: 'Description Generated',
        description: 'The AI-powered description has been added.'
      });
    });
  };
  const onSubmit = async data => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "You must be logged in to create a listing."
      });
      return;
    }
    setIsSubmitting(true);
    const propertyId = isEditing ? propertyToEdit.id : '';
    const imageUrls = propertyToEdit?.images || [];
    if (data.photos && data.photos.length > 0) {
      console.log("Mock uploading photos:", Array.from(data.photos).map(f => f.name));
      toast({
        title: 'Note: Image upload is mocked.',
        description: 'In a real app, images would be uploaded here.'
      });
    }
    const propertyData = {
      title: data.title,
      location: data.location,
      propertyType: data.propertyType,
      listingType: data.listingType,
      price: data.price,
      beds: data.beds,
      baths: data.baths,
      sqft: data.sqft,
      description: data.description,
      images: imageUrls,
      listerId: user.id,
      amenities: propertyToEdit?.amenities || ['wifi', 'ac'],
      rating: propertyToEdit?.rating || parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
      reviewsCount: propertyToEdit?.reviewsCount || Math.floor(Math.random() * 150)
    };
    try {
      if (isEditing) {
        await updateProperty(propertyId, propertyData);
        toast({
          title: "Property Updated!",
          description: "Your listing has been successfully updated."
        });
      } else {
        await addProperty(propertyData);
        toast({
          title: "Property Published!",
          description: "Your new listing is now live."
        });
      }
      router('/manage/properties');
    } catch (error) {
      console.error("Failed to publish property:", error);
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: "Could not save your property. Please try again."
      });
      setIsSubmitting(false);
    }
  };
  return <Card>
      <CardHeader>
        <CardTitle className="font-headline">{isEditing ? 'Edit Listing' : 'Create New Listing'}</CardTitle>
        <CardDescription>{isEditing ? 'Update the details of your property.' : 'Fill out the details below to add a new property.'}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          
          <div className="grid gap-3">
            <Label htmlFor="title">Property Title</Label>
            <Input id="title" {...register('title')} placeholder="e.g., Sunny Modern Apartment" />
            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="grid gap-3">
                <Label htmlFor="location">Location</Label>
                <Input id="location" {...register('location')} placeholder="e.g., Downtown, Metropolis" />
                {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="propertyType">Property Type</Label>
              <Controller name="propertyType" control={control} render={({
              field
            }) => <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger><SelectValue placeholder="Select a type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Apartment">Apartment</SelectItem>
                      <SelectItem value="House">House</SelectItem>
                      <SelectItem value="Condo">Condo</SelectItem>
                      <SelectItem value="Villa">Villa</SelectItem>
                    </SelectContent>
                  </Select>} />
              {errors.propertyType && <p className="text-sm text-destructive">{errors.propertyType.message}</p>}
            </div>
          </div>
          
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="grid gap-3">
                <Label htmlFor="listingType">Listing Type</Label>
                 <Controller name="listingType" control={control} render={({
              field
            }) => <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger><SelectValue placeholder="Select a listing type" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Rent">For Rent</SelectItem>
                                <SelectItem value="Sale">For Sale</SelectItem>
                                <SelectItem value="Re-sale">For Re-sale</SelectItem>
                                <SelectItem value="Co-living">Co-living</SelectItem>
                            </SelectContent>
                        </Select>} />
                 {errors.listingType && <p className="text-sm text-destructive">{errors.listingType.message}</p>}
            </div>
             <div className="grid gap-3">
                <Label htmlFor="price">Amount</Label>
                <Input id="price" type="number" {...register('price')} placeholder="e.g., 3500" />
                {errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
            </div>
           </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="grid gap-3">
                <Label htmlFor="beds">Bedrooms</Label>
                <Input id="beds" type="number" {...register('beds')} />
                {errors.beds && <p className="text-sm text-destructive">{errors.beds.message}</p>}
            </div>
            <div className="grid gap-3">
                <Label htmlFor="baths">Bathrooms</Label>
                <Input id="baths" type="number" {...register('baths')} />
                {errors.baths && <p className="text-sm text-destructive">{errors.baths.message}</p>}
            </div>
            <div className="grid gap-3">
                <Label htmlFor="sqft">Square Feet</Label>
                <Input id="sqft" type="number" {...register('sqft')} placeholder="e.g., 1200" />
                {errors.sqft && <p className="text-sm text-destructive">{errors.sqft.message}</p>}
            </div>
          </div>
          
          <div className="grid gap-3">
            <div className="flex items-center justify-between">
                <Label htmlFor="description">Description</Label>
                <form action={handleGenerateDescription}>
                    {/* Hidden inputs to pass data to the server action */}
                    <input type="hidden" name="title" value={formValues.title} />
                    <input type="hidden" name="location" value={formValues.location} />
                    <input type="hidden" name="propertyType" value={formValues.propertyType} />
                    <input type="hidden" name="keyFeatures" value={formValues.keyFeatures} />
                    <input type="hidden" name="numberOfBedrooms" value={formValues.beds} />
                    <input type="hidden" name="numberOfBathrooms" value={formValues.baths} />
                    <Button type="submit" variant="ghost" size="sm" disabled={isPending}>
                        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                        Generate with AI
                    </Button>
                </form>
            </div>
            <Textarea id="description" placeholder="A compelling description will be generated here..." className="min-h-32" {...register('description')} />
            {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
          </div>

           <div className="grid gap-3">
            <Label htmlFor="keyFeatures">Key Features (for AI)</Label>
            <Input id="keyFeatures" name="keyFeatures" type="text" placeholder="e.g., city views, open kitchen, great for families" {...register('keyFeatures')} />
             <p className="text-sm text-muted-foreground">
                Enter a few comma-separated keywords for the AI description generator.
            </p>
            {errors.keyFeatures && <p className="text-sm text-destructive">{errors.keyFeatures.message}</p>}
          </div>


          <div className="grid gap-3">
            <Label htmlFor="photos">Property Photos</Label>
            <Input id="photos" type="file" multiple {...register('photos')} accept="image/png, image/jpeg, image/webp" />
            <p className="text-sm text-muted-foreground">
              This is for demonstration. In a real app, these images would be uploaded.
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" disabled={isSubmitting}>Save as Draft</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Publishing...' : isEditing ? 'Update Listing' : 'Publish Listing'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>;
}