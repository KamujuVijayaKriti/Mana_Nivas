// This file is the central source for most of the application's mock data.
//
// To edit user information (Admins, Owners, Buyers):
// - You can modify the `users` array below.
// - For easy testing, a default buyer and owner are also added in `src/contexts/auth-context.tsx`.
//
// To edit property information:
// - You can modify the `properties` array below.
//
// To edit team member information (for the landing page):
// - See `src/lib/team-data.ts`.
//
// To edit images for users or properties:
// - See `src/lib/placeholder-images.json`.

export const genericLister = {
  id: 'user-2',
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@example.com',
  avatarUrl: 'avatar-2',
  bio: 'Property owner with several listings across Andhra Pradesh and Hyderabad.',
  role: 'owner',
  dob: '1988-11-20',
  phone: '+91 99887 76655',
  location: 'Vijayawada, Andhra Pradesh'
};
export const properties = [{
  //1
  title: 'Krishna Residency Apartment',
  description: 'A comfortable 3BHK apartment located near Benz Circle, offering spacious rooms and easy access to schools and shopping areas',
  location: 'Benz Circle, Vijayawada',
  propertyType: 'Apartment',
  listingType: 'Rent',
  price: 30000,
  beds: 3,
  baths: 3,
  sqft: 1200,
  amenities: ['wifi', 'ac', 'parking', 'gym'],
  images: ['prop-img-1', 'prop-interior-1', 'prop-interior-2'],
  listerId: 'user-2',
  // Will be genericLister
  rating: 4.8,
  reviewsCount: 120
}, {
  //2
  title: 'Sri Sai Meadows Flat',
  description: 'A well-ventilated 3HK flat with easy access to schools, hospitals, and bus stations.',
  location: 'MVP Colony, Visakhapatnam',
  propertyType: 'Apartment',
  listingType: 'Rent',
  price: 35000,
  beds: 3,
  baths: 3,
  sqft: 2000,
  amenities: ['wifi', 'ac', 'parking', 'pool', 'gym'],
  images: ['prop-img-2', 'prop-interior-3', 'prop-interior-4'],
  listerId: 'user-2',
  rating: 4.9,
  reviewsCount: 85
}, {
  //3
  title: 'Classic Heritage ',
  description: 'A well-maintained resale House with marble flooring and excellent ventilation, located in a calm neighborhood..',
  location: 'Kukatpally, Hyderabad',
  propertyType: 'House',
  listingType: 'Re-sale',
  price: 7000000,
  beds: 3,
  baths: 3,
  sqft: 1100,
  amenities: ['wifi', 'parking', 'tv'],
  images: ['prop-img-3', 'prop-interior-5', 'prop-interior-6'],
  listerId: 'user-2',
  rating: 4.6,
  reviewsCount: 45
}, {
  //4
  title: 'Rama Enclave Flat',
  description: 'A 2BHK resale flat in a gated community with access to a park and gym. Recently renovated and ready to move in',
  location: 'Vijayawada, Andhra Pradesh',
  propertyType: 'Apartment',
  listingType: 'Re-sale',
  price: 3500000,
  beds: 2,
  baths: 2,
  sqft: 3000,
  amenities: ['parking', 'pet-friendly', 'washer-dryer'],
  images: ['prop-img-4', 'prop-interior-7', 'prop-interior-8'],
  listerId: 'user-2',
  rating: 4.7,
  reviewsCount: 60
}, {
  title: 'Comfort Stay',
  description: 'Fully furnished co-living space with all modern amenities. Ideal for students and young professionals.',
  location: 'Madhapur, Hyderabad',
  propertyType: 'Apartment',
  listingType: 'Co-living',
  price: 15000,
  beds: 3,
  baths: 3,
  sqft: 500,
  amenities: ['wifi', 'ac', 'gym', 'tv'],
  images: ['prop-img-5', 'prop-interior-9', 'prop-interior-10'],
  listerId: 'user-2',
  rating: 4.5,
  reviewsCount: 95
}, {
  //6
  title: 'Lakshmi Homes',
  description: 'A safe and comfortable co-living space  with home-cooked meals and 24/7 security.',
  location: 'Guntur, Andhra Pradesh',
  propertyType: 'Apartment',
  listingType: 'Co-living',
  price: 18000,
  beds: 2,
  baths: 2,
  sqft: 5000,
  amenities: ['wifi', 'ac', 'parking', 'pool', 'gym', 'pet-friendly'],
  images: ['prop-img-6', 'prop-interior-11', 'prop-interior-12'],
  listerId: 'user-2',
  rating: 4.9,
  reviewsCount: 70
}, {
  //7
  title: 'Green Valley Villa',
  description: 'A spacious independent villa with a private garden, perfect for a peaceful lifestyle near the city',
  location: 'Gachibowli, Hyderabad',
  propertyType: 'House',
  listingType: 'Sale',
  price: 145000000,
  beds: 4,
  baths: 4,
  sqft: 1500,
  amenities: ['wifi', 'ac', 'parking', 'gym'],
  images: ['prop-img-7', 'prop-interior-13', 'prop-interior-14'],
  listerId: 'user-2',
  rating: 4.6,
  reviewsCount: 110
}, {
  //8
  title: 'Sundar Residency House',
  description: 'A newly built house in a quiet residential area with good water supply and road connectivity.',
  location: 'Rajamahendravaram, Andhra Pradesh',
  propertyType: 'House',
  listingType: 'Sale',
  price: 60000,
  beds: 3,
  baths: 2,
  sqft: 1800,
  amenities: ['wifi', 'parking', 'pet-friendly', 'tv'],
  images: ['prop-img-8', 'prop-interior-15', 'prop-interior-16'],
  listerId: 'user-2',
  rating: 4.7,
  reviewsCount: 55
}];
export const users = [{
  id: 'user-admin',
  name: 'Admin User',
  email: 'admin@mananivas.com',
  avatarUrl: 'avatar-admin',
  bio: 'System Administrator for the Mananivas platform.',
  role: 'admin',
  dob: '1980-01-01',
  phone: '+91 12345 67890',
  location: 'Corporate Office'
}, {
  id: 'user-admin-main',
  name: 'Mana Nivas Admin',
  email: 'mananivas@gmail.com',
  avatarUrl: 'avatar-admin',
  bio: 'Main administrator for the Mana Nivas platform.',
  role: 'admin',
  dob: '1980-01-01',
  phone: '+91 12345 67890',
  location: 'Corporate Office'
}, genericLister];