import { Heart, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Sample listing data
const featuredListings = [
  {
    id: 1,
    title: "iPhone 14 Pro Max - Like New",
    price: "$899",
    location: "New York, NY",
    time: "2 hours ago",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
    featured: true,
    category: "Electronics"
  },
  {
    id: 2,
    title: "2018 Honda Civic - Excellent Condition",
    price: "$18,500",
    location: "Los Angeles, CA",
    time: "4 hours ago",
    image: "https://images.unsplash.com/photo-1710271965677-4c802f123d73?w=400&h=300&fit=crop",
    featured: true,
    category: "Vehicles"
  },
  {
    id: 3,
    title: "Gaming Laptop - RTX 3070",
    price: "$1,299",
    location: "Chicago, IL",
    time: "6 hours ago",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop",
    featured: false,
    category: "Electronics"
  },
  {
    id: 4,
    title: "Vintage Leather Sofa",
    price: "$450",
    location: "Miami, FL",
    time: "8 hours ago",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    featured: false,
    category: "Furniture"
  },
  {
    id: 5,
    title: "Professional Camera Kit",
    price: "$2,100",
    location: "Seattle, WA",
    time: "1 day ago",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
    featured: true,
    category: "Electronics"
  },
  {
    id: 6,
    title: "Designer Handbag Collection",
    price: "$320",
    location: "Boston, MA",
    time: "1 day ago",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop",
    featured: false,
    category: "Fashion"
  }
];

const FeaturedListings = () => {
  return (
    <section className="py-16">
      <div className="container px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Listings
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover the best deals and premium listings in your area
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex">
            View All Listings
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredListings.map((listing) => (
            <Card key={listing.id} className="group cursor-pointer hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-gradient-card border-border/50">
              <div className="relative">
                <img 
                  src={listing.image} 
                  alt={listing.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {listing.featured && (
                  <Badge className="absolute top-3 left-3 bg-warning text-warning-foreground">
                    Featured
                  </Badge>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-3 right-3 bg-background/80 backdrop-blur hover:bg-background"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              
              <CardContent className="p-4">
                <div className="mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {listing.category}
                  </Badge>
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {listing.title}
                </h3>
                <p className="text-2xl font-bold text-primary mb-3">
                  {listing.price}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {listing.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {listing.time}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" className="md:hidden">
            View All Listings
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;