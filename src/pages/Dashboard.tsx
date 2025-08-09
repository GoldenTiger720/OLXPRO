import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Package, 
  Eye, 
  Heart, 
  MessageSquare, 
  Settings, 
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  TrendingUp,
  Star
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Ad } from "@/types/ad";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("ads");

  // Mock data - replace with actual API calls
  const userAds: Ad[] = [
    {
      id: "1",
      title: "iPhone 13 Pro Max - Like New",
      description: "Barely used iPhone 13 Pro Max",
      price: 899,
      images: ["/placeholder.svg"],
      category: { id: "1", name: "Electronics", slug: "electronics", icon: "📱", color: "blue" },
      tags: ["phone", "iphone"],
      location: { city: "New York", state: "NY", country: "USA" },
      userId: user?.id || "1",
      user: { id: user?.id || "1", name: user?.name || "User" },
      status: "approved",
      featured: false,
      premium: true,
      views: 234,
      favorites: 12,
      createdAt: new Date("2024-03-01"),
      updatedAt: new Date(),
      expiresAt: new Date("2024-04-01"),
    },
    {
      id: "2",
      title: "Gaming Laptop - RTX 3080",
      description: "High-end gaming laptop",
      price: 1599,
      images: ["/placeholder.svg"],
      category: { id: "1", name: "Electronics", slug: "electronics", icon: "📱", color: "blue" },
      tags: ["laptop", "gaming"],
      location: { city: "New York", state: "NY", country: "USA" },
      userId: user?.id || "1",
      user: { id: user?.id || "1", name: user?.name || "User" },
      status: "pending",
      featured: false,
      premium: false,
      views: 45,
      favorites: 3,
      createdAt: new Date("2024-03-10"),
      updatedAt: new Date(),
      expiresAt: new Date("2024-04-10"),
    },
  ];

  const stats = {
    totalAds: 12,
    activeAds: 8,
    totalViews: 1234,
    totalFavorites: 67,
    messages: 23,
    sold: 4,
  };

  const getStatusIcon = (status: Ad["status"]) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: Ad["status"]) => {
    switch (status) {
      case "approved":
        return <Badge variant="default">Active</Badge>;
      case "pending":
        return <Badge variant="secondary">Under Review</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "sold":
        return <Badge variant="outline">Sold</Badge>;
      case "expired":
        return <Badge variant="outline">Expired</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* User Profile Card */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold">{user?.name}</h1>
                    <p className="text-muted-foreground">{user?.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={user?.subscriptionStatus === "free" ? "outline" : "default"}>
                        {user?.subscriptionStatus?.toUpperCase()} Member
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Member since {user?.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => navigate("/settings")}>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Button onClick={() => navigate("/post-ad")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Post New Ad
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <Package className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{stats.totalAds}</p>
                <p className="text-sm text-muted-foreground">Total Ads</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold">{stats.activeAds}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Eye className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold">{stats.totalViews}</p>
                <p className="text-sm text-muted-foreground">Views</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Heart className="h-8 w-8 mx-auto mb-2 text-red-600" />
                <p className="text-2xl font-bold">{stats.totalFavorites}</p>
                <p className="text-sm text-muted-foreground">Favorites</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <p className="text-2xl font-bold">{stats.messages}</p>
                <p className="text-sm text-muted-foreground">Messages</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold">{stats.sold}</p>
                <p className="text-sm text-muted-foreground">Sold</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="ads">My Ads</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="purchases">Purchases</TabsTrigger>
            </TabsList>

            <TabsContent value="ads" className="mt-6">
              <div className="space-y-4">
                {userAds.map((ad) => (
                  <Card key={ad.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img
                            src={ad.images[0]}
                            alt={ad.title}
                            className="h-20 w-20 rounded-lg object-cover"
                          />
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{ad.title}</h3>
                              {getStatusIcon(ad.status)}
                              {getStatusBadge(ad.status)}
                              {ad.premium && <Badge variant="secondary">Premium</Badge>}
                              {ad.featured && <Badge variant="secondary">Featured</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              ${ad.price.toLocaleString()} • {ad.category.name} • {ad.location.city}, {ad.location.state}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <Eye className="mr-1 h-3 w-3" />
                                {ad.views} views
                              </span>
                              <span className="flex items-center">
                                <Heart className="mr-1 h-3 w-3" />
                                {ad.favorites} favorites
                              </span>
                              <span>Posted {ad.createdAt.toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            Boost
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="favorites" className="mt-6">
              <Card>
                <CardContent className="p-8 text-center">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
                  <p className="text-muted-foreground">
                    Items you favorite will appear here
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages" className="mt-6">
              <Card>
                <CardContent className="p-8 text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
                  <p className="text-muted-foreground">
                    When someone contacts you about your ads, messages will appear here
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="purchases" className="mt-6">
              <Card>
                <CardContent className="p-8 text-center">
                  <DollarSign className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No purchases yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Upgrade your ads to reach more buyers
                  </p>
                  <Button>
                    <Star className="h-4 w-4 mr-2" />
                    View Premium Plans
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;