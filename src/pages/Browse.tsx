import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  Filter, 
  Grid, 
  List, 
  MapPin, 
  DollarSign, 
  Eye, 
  Heart,
  Star,
  Clock
} from "lucide-react";
import { Ad, Category, AdFilters } from "@/types/ad";

const categories: Category[] = [
  { id: "1", name: "Electronics", slug: "electronics", icon: "📱", color: "blue" },
  { id: "2", name: "Vehicles", slug: "vehicles", icon: "🚗", color: "green" },
  { id: "3", name: "Real Estate", slug: "real-estate", icon: "🏠", color: "purple" },
  { id: "4", name: "Fashion", slug: "fashion", icon: "👕", color: "pink" },
  { id: "5", name: "Home & Garden", slug: "home-garden", icon: "🪴", color: "emerald" },
  { id: "6", name: "Services", slug: "services", icon: "🛠️", color: "orange" },
];

const Browse = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<AdFilters>({
    category: "",
    minPrice: 0,
    maxPrice: 10000,
    location: "",
    radius: 25,
    sortBy: "newest",
  });

  // Mock data - replace with actual API calls
  const ads: Ad[] = [
    {
      id: "1",
      title: "iPhone 13 Pro Max - Like New",
      description: "Barely used iPhone 13 Pro Max in excellent condition",
      price: 899,
      images: ["/placeholder.svg"],
      category: categories[0],
      tags: ["phone", "iphone", "mobile"],
      location: { city: "New York", state: "NY", country: "USA" },
      userId: "1",
      user: { id: "1", name: "John Doe", avatar: "" },
      status: "approved",
      featured: true,
      premium: true,
      views: 234,
      favorites: 12,
      createdAt: new Date("2024-03-01"),
      updatedAt: new Date(),
      expiresAt: new Date("2024-04-01"),
    },
    {
      id: "2",
      title: "2019 Honda Civic - Low Mileage",
      description: "Well maintained Honda Civic with only 25,000 miles",
      price: 18500,
      images: ["/placeholder.svg"],
      category: categories[1],
      tags: ["car", "honda", "sedan"],
      location: { city: "Los Angeles", state: "CA", country: "USA" },
      userId: "2",
      user: { id: "2", name: "Jane Smith", avatar: "" },
      status: "approved",
      featured: false,
      premium: true,
      views: 567,
      favorites: 45,
      createdAt: new Date("2024-02-15"),
      updatedAt: new Date(),
      expiresAt: new Date("2024-03-15"),
    },
    {
      id: "3",
      title: "Modern 2BR Apartment Downtown",
      description: "Spacious 2 bedroom apartment in the heart of downtown",
      price: 2500,
      images: ["/placeholder.svg"],
      category: categories[2],
      tags: ["apartment", "rental", "downtown"],
      location: { city: "Chicago", state: "IL", country: "USA" },
      userId: "3",
      user: { id: "3", name: "Property Manager", avatar: "" },
      status: "approved",
      featured: true,
      premium: false,
      views: 1023,
      favorites: 89,
      createdAt: new Date("2024-03-05"),
      updatedAt: new Date(),
      expiresAt: new Date("2024-04-05"),
    },
  ];

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <Label
              key={category.id}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Checkbox
                checked={filters.category === category.id}
                onCheckedChange={(checked) =>
                  setFilters({ ...filters, category: checked ? category.id : "" })
                }
              />
              <span className="flex items-center">
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </span>
            </Label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <Input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters({ ...filters, minPrice: parseInt(e.target.value) || 0 })
              }
            />
            <span>-</span>
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: parseInt(e.target.value) || 10000 })
              }
            />
          </div>
          <Slider
            value={[filters.minPrice || 0, filters.maxPrice || 10000]}
            max={10000}
            step={100}
            className="mt-2"
            onValueChange={(value) =>
              setFilters({ ...filters, minPrice: value[0], maxPrice: value[1] })
            }
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <h3 className="font-semibold mb-3">Location</h3>
        <div className="space-y-3">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="City or ZIP code"
              className="pl-10"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            />
          </div>
          <div>
            <Label className="text-sm">Within {filters.radius} miles</Label>
            <Slider
              value={[filters.radius || 25]}
              max={100}
              step={5}
              className="mt-2"
              onValueChange={(value) =>
                setFilters({ ...filters, radius: value[0] })
              }
            />
          </div>
        </div>
      </div>

      {/* Additional Filters */}
      <div>
        <h3 className="font-semibold mb-3">Show only</h3>
        <div className="space-y-2">
          <Label className="flex items-center space-x-2 cursor-pointer">
            <Checkbox />
            <span>Featured ads</span>
          </Label>
          <Label className="flex items-center space-x-2 cursor-pointer">
            <Checkbox />
            <span>Ads with photos</span>
          </Label>
          <Label className="flex items-center space-x-2 cursor-pointer">
            <Checkbox />
            <span>Urgent sales</span>
          </Label>
        </div>
      </div>

      <Button className="w-full">Apply Filters</Button>
    </div>
  );

  const AdCard = ({ ad }: { ad: Ad }) => {
    if (viewMode === "list") {
      return (
        <Card className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <img
                src={ad.images[0]}
                alt={ad.title}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{ad.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {ad.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3" />
                        {ad.location.city}, {ad.location.state}
                      </span>
                      <span className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {ad.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">${ad.price.toLocaleString()}</p>
                    <div className="flex gap-1 mt-2">
                      {ad.featured && <Badge variant="secondary">Featured</Badge>}
                      {ad.premium && <Badge variant="default">Premium</Badge>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center">
                      <Eye className="mr-1 h-3 w-3" />
                      {ad.views}
                    </span>
                    <span className="flex items-center">
                      <Heart className="mr-1 h-3 w-3" />
                      {ad.favorites}
                    </span>
                  </div>
                  <Button size="sm">View Details</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative">
          <img
            src={ad.images[0]}
            alt={ad.title}
            className="w-full h-48 object-cover"
          />
          {ad.featured && (
            <Badge className="absolute top-2 left-2" variant="secondary">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-1 line-clamp-1">{ad.title}</h3>
          <p className="text-2xl font-bold text-primary mb-2">
            ${ad.price.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {ad.description}
          </p>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="flex items-center">
              <MapPin className="mr-1 h-3 w-3" />
              {ad.location.city}
            </span>
            <span className="flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              {ad.createdAt.toLocaleDateString()}
            </span>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold mb-4">Filters</h2>
                <FilterSidebar />
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar and Controls */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search for anything..."
                  className="w-full"
                />
              </div>
              <Select
                value={filters.sortBy}
                onValueChange={(value) =>
                  setFilters({ ...filters, sortBy: value as AdFilters["sortBy"] })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden">
                    <Filter className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Refine your search results
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Results Info */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Showing {ads.length} results
              </p>
            </div>

            {/* Ad Grid/List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  : "space-y-4"
              }
            >
              {ads.map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Browse;