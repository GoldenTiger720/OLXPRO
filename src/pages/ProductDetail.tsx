import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Clock,
  Eye,
  Heart,
  Share2,
  Flag,
  Phone,
  Mail,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";

// Mock product data - in real app, fetch based on ID
const getProductById = (id: string) => {
  const products: Record<string, any> = {
    "1": {
      id: "1",
      title: "iPhone 14 Pro Max - Like New",
      price: 899,
      description: "Barely used iPhone 14 Pro Max in excellent condition. Comes with original box, charger, and unused earphones. No scratches or dents. Battery health at 98%. Always kept in a protective case and screen protector. Reason for selling: upgraded to iPhone 15.\n\nSpecifications:\n- 256GB Storage\n- Deep Purple Color\n- Unlocked for all carriers\n- iOS 17 installed\n- Face ID working perfectly\n\nIncludes:\n- Original box\n- USB-C charging cable\n- Documentation\n- SIM ejector tool",
      images: [
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop",
      ],
      category: "Electronics",
      location: { city: "New York", state: "NY" },
      postedAt: "2 hours ago",
      views: 234,
      favorites: 12,
      featured: true,
      seller: {
        name: "John Doe",
        avatar: "",
        memberSince: "2022",
        rating: 4.8,
        totalAds: 15,
      },
    },
    "2": {
      id: "2",
      title: "2018 Honda Civic - Excellent Condition",
      price: 18500,
      description: "Well-maintained 2018 Honda Civic with only 45,000 miles. Single owner, garage kept, never been in an accident. All service records available. Recent oil change and new tires installed.\n\nFeatures:\n- Automatic transmission\n- Backup camera\n- Bluetooth connectivity\n- Cruise control\n- Power windows and locks\n- Air conditioning\n- Clean title\n\nPerfect commuter car with excellent fuel economy (30+ MPG). Ready for immediate sale.",
      images: [
        "https://images.unsplash.com/photo-1710271965677-4c802f123d73?w=800&h=600&fit=crop",
      ],
      category: "Vehicles",
      location: { city: "Los Angeles", state: "CA" },
      postedAt: "4 hours ago",
      views: 567,
      favorites: 45,
      featured: true,
      seller: {
        name: "Jane Smith",
        avatar: "",
        memberSince: "2021",
        rating: 4.9,
        totalAds: 8,
      },
    },
    "3": {
      id: "3",
      title: "Modern 2BR Apartment Downtown",
      price: 2500,
      description: "Spacious 2 bedroom apartment in the heart of downtown. Recently renovated with modern amenities.\n\nFeatures:\n- 2 bedrooms, 2 bathrooms\n- Modern kitchen with stainless steel appliances\n- In-unit washer and dryer\n- Hardwood floors throughout\n- Large windows with city views\n- Central heating and AC\n- Building amenities include gym and rooftop terrace\n\nPerfect for professionals or small families. Available immediately.",
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      ],
      category: "Real Estate",
      location: { city: "Chicago", state: "IL" },
      postedAt: "1 day ago",
      views: 1023,
      favorites: 89,
      featured: true,
      seller: {
        name: "Property Manager",
        avatar: "",
        memberSince: "2020",
        rating: 4.9,
        totalAds: 25,
      },
    },
    "4": {
      id: "4",
      title: "Gaming Laptop - RTX 3070",
      price: 1299,
      description: "High-performance gaming laptop with NVIDIA RTX 3070 graphics card. Perfect for gaming, video editing, and 3D rendering.\n\nSpecifications:\n- Intel Core i7-11800H processor\n- NVIDIA GeForce RTX 3070 8GB\n- 16GB DDR4 RAM\n- 1TB NVMe SSD\n- 15.6\" 144Hz Full HD display\n- RGB backlit keyboard\n- Windows 11 Pro\n\nLike new condition, barely used. Comes with original box and charger.",
      images: [
        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=600&fit=crop",
      ],
      category: "Electronics",
      location: { city: "Austin", state: "TX" },
      postedAt: "3 days ago",
      views: 189,
      favorites: 23,
      featured: false,
      seller: {
        name: "Tech Seller",
        avatar: "",
        memberSince: "2023",
        rating: 4.7,
        totalAds: 5,
      },
    },
    "5": {
      id: "5",
      title: "Designer Leather Handbag",
      price: 450,
      description: "Authentic designer handbag in excellent condition. Barely used, comes with dust bag and authenticity certificate.\n\nDetails:\n- Genuine leather\n- Classic design\n- Gold hardware\n- Multiple compartments\n- Adjustable strap\n- Original packaging included\n\nPerfect for everyday use or special occasions.",
      images: [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=600&fit=crop",
      ],
      category: "Fashion",
      location: { city: "Miami", state: "FL" },
      postedAt: "5 days ago",
      views: 345,
      favorites: 67,
      featured: false,
      seller: {
        name: "Fashion Hub",
        avatar: "",
        memberSince: "2022",
        rating: 4.8,
        totalAds: 12,
      },
    },
    "6": {
      id: "6",
      title: "PlayStation 5 Console Bundle",
      price: 550,
      description: "PS5 with extra controller and 3 games included. Excellent condition, barely used.\n\nIncludes:\n- PlayStation 5 Console (Disc Version)\n- 2 DualSense Wireless Controllers\n- 3 AAA Games (Spider-Man, God of War, Horizon)\n- All original cables and packaging\n- 1 year manufacturer warranty remaining\n\nPerfect for gaming enthusiasts!",
      images: [
        "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop",
      ],
      category: "Games & Hobbies",
      location: { city: "Seattle", state: "WA" },
      postedAt: "1 week ago",
      views: 892,
      favorites: 134,
      featured: true,
      seller: {
        name: "Gamer Store",
        avatar: "",
        memberSince: "2021",
        rating: 4.9,
        totalAds: 18,
      },
    },
    "7": {
      id: "7",
      title: "Vintage Leather Sofa",
      price: 680,
      description: "Beautiful vintage leather sofa in great condition. Classic design that fits any decor.\n\nDetails:\n- Genuine leather upholstery\n- Solid wood frame\n- 3-seater (7 feet long)\n- Rich brown color with natural patina\n- Excellent structural integrity\n- Minor wear consistent with age adds character\n\nMust see to appreciate!",
      images: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
      ],
      category: "Home & Kitchen",
      location: { city: "Portland", state: "OR" },
      postedAt: "1 week ago",
      views: 267,
      favorites: 41,
      featured: false,
      seller: {
        name: "Home Decor",
        avatar: "",
        memberSince: "2022",
        rating: 4.6,
        totalAds: 9,
      },
    },
    "8": {
      id: "8",
      title: "Mountain Bike - Trek X-Caliber",
      price: 850,
      description: "Excellent condition mountain bike, perfect for trails and off-road adventures.\n\nSpecifications:\n- Trek X-Caliber 8 model\n- 29\" wheels\n- 12-speed Shimano drivetrain\n- RockShox suspension fork\n- Hydraulic disc brakes\n- Size: Large (fits 5'10\" - 6'2\")\n- Recently serviced\n\nIncludes helmet and bike lock!",
      images: [
        "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800&h=600&fit=crop",
      ],
      category: "Sports",
      location: { city: "Denver", state: "CO" },
      postedAt: "2 weeks ago",
      views: 456,
      favorites: 78,
      featured: false,
      seller: {
        name: "Bike Shop",
        avatar: "",
        memberSince: "2020",
        rating: 4.9,
        totalAds: 22,
      },
    },
    "9": {
      id: "9",
      title: "Canon EOS R6 Camera",
      price: 2100,
      description: "Professional mirrorless camera with 24-105mm lens. Perfect for photography enthusiasts and professionals.\n\nIncludes:\n- Canon EOS R6 Body\n- RF 24-105mm f/4L IS USM Lens\n- 2 batteries\n- Battery charger\n- Camera strap\n- Original box and documentation\n- SD card (64GB)\n- Camera bag\n\nLow shutter count (under 5000). Mint condition!",
      images: [
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop",
      ],
      category: "Electronics",
      location: { city: "San Francisco", state: "CA" },
      postedAt: "3 weeks ago",
      views: 634,
      favorites: 98,
      featured: true,
      seller: {
        name: "Photo Pro",
        avatar: "",
        memberSince: "2019",
        rating: 5.0,
        totalAds: 14,
      },
    },
    "10": {
      id: "10",
      title: "Collectible Books Set",
      price: 320,
      description: "Rare first edition book collection. Perfect for collectors and book enthusiasts.\n\nCollection includes:\n- Classic literature first editions\n- Well-preserved hardcovers\n- Original dust jackets\n- Some signed copies\n- Appraised and authenticated\n\nGreat investment piece or gift for book lovers!",
      images: [
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=600&fit=crop",
      ],
      category: "Books & Media",
      location: { city: "Boston", state: "MA" },
      postedAt: "1 month ago",
      views: 178,
      favorites: 29,
      featured: false,
      seller: {
        name: "Book Lover",
        avatar: "",
        memberSince: "2021",
        rating: 4.7,
        totalAds: 7,
      },
    },
    "11": {
      id: "11",
      title: "Baby Stroller - Premium",
      price: 280,
      description: "Top-rated baby stroller with all accessories. Excellent condition, gently used.\n\nFeatures:\n- Multi-position recline\n- Adjustable handlebar\n- Large storage basket\n- All-terrain wheels\n- Car seat compatible\n- Rain cover included\n- Cup holder and organizer\n- Safety tested and certified\n\nPerfect for newborns to toddlers!",
      images: [
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop",
      ],
      category: "Kids & Baby",
      location: { city: "Atlanta", state: "GA" },
      postedAt: "1 month ago",
      views: 312,
      favorites: 45,
      featured: false,
      seller: {
        name: "Baby Gear",
        avatar: "",
        memberSince: "2023",
        rating: 4.8,
        totalAds: 6,
      },
    },
    "12": {
      id: "12",
      title: "Electric Guitar - Fender",
      price: 980,
      description: "Fender Stratocaster electric guitar with amp. Professional quality instrument.\n\nIncludes:\n- Fender Stratocaster (Made in USA)\n- Fender Blues Junior amp\n- Guitar cable\n- Hard shell case\n- Strap and picks\n- Tuner\n\nExcellent tone and playability. Recently set up by professional luthier.",
      images: [
        "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=600&fit=crop",
      ],
      category: "Music & Arts",
      location: { city: "Nashville", state: "TN" },
      postedAt: "2 months ago",
      views: 523,
      favorites: 89,
      featured: false,
      seller: {
        name: "Music Store",
        avatar: "",
        memberSince: "2020",
        rating: 4.9,
        totalAds: 16,
      },
    },
  };

  return products[id] || null;
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const product = getProductById(id || "1");

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate("/browse")}>Back to Browse</Button>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="hover:text-foreground"
          >
            Home
          </Button>
          <span>/</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/browse")}
            className="hover:text-foreground"
          >
            Browse
          </Button>
          <span>/</span>
          <span className="text-foreground">{product.category}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Images and Description */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={product.images[currentImageIndex]}
                    alt={product.title}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                  {product.featured && (
                    <Badge className="absolute top-4 left-4 bg-warning text-warning-foreground">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}

                  {product.images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur hover:bg-background"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur hover:bg-background"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </>
                  )}

                  <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {product.images.length}
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                {product.images.length > 1 && (
                  <div className="flex gap-2 p-4">
                    {product.images.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === index
                            ? "border-primary"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Product Info and Seller */}
          <div className="space-y-6">
            {/* Product Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <Badge variant="secondary" className="mb-2">
                      {product.category}
                    </Badge>
                    <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {product.location.city}, {product.location.state}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {product.postedAt}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {product.views} views
                  </span>
                  <span className="flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    {product.favorites} favorites
                  </span>
                </div>

                <div className="bg-primary/10 rounded-lg p-4 mb-6">
                  <p className="text-3xl font-bold text-primary">
                    ${product.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-2 mb-4">
                  <Button
                    variant={isFavorited ? "default" : "outline"}
                    size="icon"
                    onClick={() => setIsFavorited(!isFavorited)}
                  >
                    <Heart
                      className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`}
                    />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Seller Information</h3>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={product.seller.avatar} />
                    <AvatarFallback>
                      {product.seller.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{product.seller.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Member since {product.seller.memberSince}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-semibold">{product.seller.rating}</span>
                  </div>
                  <span className="text-muted-foreground">
                    {product.seller.totalAds} ads
                  </span>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <Button className="w-full" size="lg">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Show Phone Number
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card className="border-warning/50 bg-warning/5">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Flag className="h-4 w-4 mr-2 text-warning" />
                  Safety Tips
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Meet in a safe, public location</li>
                  <li>• Check the item before you buy</li>
                  <li>• Pay only after collecting the item</li>
                  <li>• Don't share personal information</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
