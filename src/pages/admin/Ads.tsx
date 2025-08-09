import { useState } from "react";
import { AdminLayout } from "@/layouts/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MoreVertical, Check, X, Eye, Star, Trash2 } from "lucide-react";
import { Ad } from "@/types/ad";

const Ads = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Mock data - replace with actual API calls
  const ads: Ad[] = [
    {
      id: "1",
      title: "iPhone 13 Pro Max - Like New",
      description: "Barely used iPhone 13 Pro Max in excellent condition",
      price: 899,
      images: ["/placeholder.svg"],
      category: { id: "1", name: "Electronics", slug: "electronics", icon: "📱", color: "blue" },
      tags: ["phone", "iphone", "mobile"],
      location: { city: "New York", state: "NY", country: "USA" },
      userId: "1",
      user: { id: "1", name: "John Doe", avatar: "" },
      status: "pending",
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
      title: "2019 Honda Civic - Low Mileage",
      description: "Well maintained Honda Civic with low mileage",
      price: 18500,
      images: ["/placeholder.svg"],
      category: { id: "2", name: "Vehicles", slug: "vehicles", icon: "🚗", color: "green" },
      tags: ["car", "honda", "sedan"],
      location: { city: "Los Angeles", state: "CA", country: "USA" },
      userId: "2",
      user: { id: "2", name: "Jane Smith", avatar: "" },
      status: "approved",
      featured: true,
      premium: true,
      views: 567,
      favorites: 45,
      createdAt: new Date("2024-02-15"),
      updatedAt: new Date(),
      expiresAt: new Date("2024-03-15"),
    },
    {
      id: "3",
      title: "Gaming PC - RTX 4080",
      description: "High-end gaming PC with RTX 4080",
      price: 2499,
      images: ["/placeholder.svg"],
      category: { id: "1", name: "Electronics", slug: "electronics", icon: "📱", color: "blue" },
      tags: ["computer", "gaming", "pc"],
      location: { city: "Chicago", state: "IL", country: "USA" },
      userId: "3",
      user: { id: "3", name: "Bob Johnson", avatar: "" },
      status: "rejected",
      featured: false,
      premium: false,
      views: 89,
      favorites: 5,
      createdAt: new Date("2024-03-05"),
      updatedAt: new Date(),
      expiresAt: new Date("2024-04-05"),
    },
  ];

  const filteredAds = ads.filter((ad) => {
    const matchesSearch = ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || ad.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Ad["status"]) => {
    switch (status) {
      case "approved":
        return <Badge variant="default">Approved</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "sold":
        return <Badge variant="outline">Sold</Badge>;
      case "expired":
        return <Badge variant="outline">Expired</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Ad Management</h1>
          <p className="text-muted-foreground">Review and manage all marketplace listings</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Ads</CardTitle>
            <CardDescription>
              Review, approve, or reject ads posted by users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search ads by title or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mobile card layout */}
            <div className="block lg:hidden space-y-4">
              {filteredAds.map((ad) => (
                <Card key={ad.id}>
                  <CardContent className="p-4">
                    <div className="flex space-x-3 mb-3">
                      <img
                        src={ad.images[0]}
                        alt={ad.title}
                        className="h-16 w-16 rounded object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm truncate">{ad.title}</h3>
                            <p className="text-xs text-muted-foreground">
                              {ad.location.city}, {ad.location.state}
                            </p>
                            <div className="flex gap-1 mt-1 flex-wrap">
                              {ad.featured && <Badge variant="outline" className="text-xs">Featured</Badge>}
                              {ad.premium && <Badge variant="outline" className="text-xs">Premium</Badge>}
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              {ad.status === "pending" && (
                                <>
                                  <DropdownMenuItem className="text-green-600">
                                    <Check className="mr-2 h-4 w-4" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">
                                    <X className="mr-2 h-4 w-4" />
                                    Reject
                                  </DropdownMenuItem>
                                </>
                              )}
                              <DropdownMenuItem>
                                <Star className="mr-2 h-4 w-4" />
                                {ad.featured ? "Remove from Featured" : "Make Featured"}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Ad
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Category:</span>
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {ad.category.icon} {ad.category.name}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Price:</span>
                        <span className="ml-2 font-medium">${ad.price.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">User:</span>
                        <span className="ml-2">{ad.user.name}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Status:</span>
                        <span className="ml-2">{getStatusBadge(ad.status)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Views:</span>
                        <span className="ml-2 flex items-center">
                          <Eye className="mr-1 h-3 w-3" />
                          {ad.views}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Favorites:</span>
                        <span className="ml-2 flex items-center">
                          <Star className="mr-1 h-3 w-3" />
                          {ad.favorites}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Created:</span>
                        <span className="ml-2">{ad.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden lg:block rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ad Details</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Stats</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAds.map((ad) => (
                    <TableRow key={ad.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={ad.images[0]}
                            alt={ad.title}
                            className="h-12 w-12 rounded object-cover"
                          />
                          <div>
                            <div className="font-medium">{ad.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {ad.location.city}, {ad.location.state}
                            </div>
                            <div className="flex gap-1 mt-1">
                              {ad.featured && <Badge variant="outline" className="text-xs">Featured</Badge>}
                              {ad.premium && <Badge variant="outline" className="text-xs">Premium</Badge>}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {ad.category.icon} {ad.category.name}
                        </Badge>
                      </TableCell>
                      <TableCell>${ad.price.toLocaleString()}</TableCell>
                      <TableCell>{ad.user.name}</TableCell>
                      <TableCell>{getStatusBadge(ad.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center">
                            <Eye className="mr-1 h-3 w-3" />
                            {ad.views}
                          </span>
                          <span className="flex items-center">
                            <Star className="mr-1 h-3 w-3" />
                            {ad.favorites}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{ad.createdAt.toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            {ad.status === "pending" && (
                              <>
                                <DropdownMenuItem className="text-green-600">
                                  <Check className="mr-2 h-4 w-4" />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <X className="mr-2 h-4 w-4" />
                                  Reject
                                </DropdownMenuItem>
                              </>
                            )}
                            <DropdownMenuItem>
                              <Star className="mr-2 h-4 w-4" />
                              {ad.featured ? "Remove from Featured" : "Make Featured"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Ad
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Ads;