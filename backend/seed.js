const mongoose = require('mongoose');
require('dotenv').config();

const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  price: Number,
  beds: Number,
  baths: Number,
  sqft: Number,
  propertyType: String,
  listingType: String,
  images: [String],
  ownerId: String
});

const Property = mongoose.model('Property', propertySchema);

const mockProperties = [
    {
      title: "Premium 3BHK Apartment in Hi-Tech City",
      description: "Fully furnished 3BHK apartment with panoramic city views. Walking distance to major IT parks and shopping malls.",
      location: "Hi-Tech City, Hyderabad",
      price: 65000,
      beds: 3,
      baths: 3,
      sqft: 1850,
      propertyType: "Apartment",
      listingType: "Rent",
      images: ["prop-img-1", "prop-interior-1", "prop-interior-2"],
      ownerId: "owner2"
    },
    {
       title: "Spacious 3BHK Independent House in Gachibowli",
       description: "A well-maintained 3BHK independent house with a large backyard, perfect for families. Located in a quiet and secure neighborhood.",
       location: "Gachibowli, Hyderabad",
       price: 35000000,
       beds: 3,
       baths: 3,
       sqft: 2200,
       propertyType: "House",
       listingType: "Sale",
       images: ["prop-img-4", "prop-interior-7", "prop-interior-8"],
       ownerId: "owner3"
    },
    {
      title: "Cozy 1BHK Flat in Jubilee Hills",
      description: "Perfect for young professionals. This 1BHK apartment offers modern amenities and easy access to top restaurants and cafes. Excellent investment opportunity.",
      location: "Jubilee Hills, Hyderabad",
      price: 6500000,
      beds: 1,
      baths: 1,
      sqft: 600,
      propertyType: "Apartment",
      listingType: "Resale",
      images: ["prop-img-2", "prop-interior-5"],
      ownerId: "owner1"
    },
    {
        title: "1RK Premium PG in Madhapur",
        description: "Fully furnished 1RK accommodation with high-speed internet, daily housekeeping, and home-cooked meals.",
        location: "Madhapur, Hyderabad",
        price: 12000,
        beds: 1,
        baths: 1,
        sqft: 200,
        propertyType: "Studio",
        listingType: "Co-living",
        images: ["prop-img-5", "prop-interior-9", "prop-interior-10"],
        ownerId: "owner2"
    }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Property.deleteMany({});
    await Property.insertMany(mockProperties);
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed', error);
    process.exit(1);
  }
}

seed();
