import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AdminLayout } from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  MoreHorizontal,
  TrendingUp,
  Eye,
  Car, 
  Home, 
  Smartphone, 
  Gamepad2, 
  Shirt, 
  Book, 
  Baby, 
  Bike, 
  Wrench, 
  ChefHat, 
  Music, 
  Heart,
  Package,
  Filter
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const iconMap = {
  Car, Home, Smartphone, Gamepad2, Shirt, Book, 
  Baby, Bike, Wrench, ChefHat, Music, Heart, Package
};

const colorOptions = [
  { value: "text-blue-600", label: "Blue", bg: "bg-blue-100" },
  { value: "text-green-600", label: "Green", bg: "bg-green-100" },
  { value: "text-purple-600", label: "Purple", bg: "bg-purple-100" },
  { value: "text-red-600", label: "Red", bg: "bg-red-100" },
  { value: "text-pink-600", label: "Pink", bg: "bg-pink-100" },
  { value: "text-orange-600", label: "Orange", bg: "bg-orange-100" },
  { value: "text-yellow-600", label: "Yellow", bg: "bg-yellow-100" },
  { value: "text-indigo-600", label: "Indigo", bg: "bg-indigo-100" },
  { value: "text-gray-600", label: "Gray", bg: "bg-gray-100" },
  { value: "text-emerald-600", label: "Emerald", bg: "bg-emerald-100" },
  { value: "text-cyan-600", label: "Cyan", bg: "bg-cyan-100" },
  { value: "text-rose-600", label: "Rose", bg: "bg-rose-100" },
];

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: keyof typeof iconMap;
  color: string;
  adCount: number;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  icon: z.string().min(1, "Please select an icon"),
  color: z.string().min(1, "Please select a color"),
  status: z.enum(['active', 'inactive']),
});

type CategoryFormData = z.infer<typeof categorySchema>;

const AdminCategories = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data based on the homepage categories
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Vehicles", slug: "vehicles", icon: "Car", color: "text-blue-600", adCount: 2456, status: "active", createdAt: new Date("2024-01-01"), updatedAt: new Date() },
    { id: "2", name: "Real Estate", slug: "real-estate", icon: "Home", color: "text-green-600", adCount: 1234, status: "active", createdAt: new Date("2024-01-02"), updatedAt: new Date() },
    { id: "3", name: "Electronics", slug: "electronics", icon: "Smartphone", color: "text-purple-600", adCount: 3789, status: "active", createdAt: new Date("2024-01-03"), updatedAt: new Date() },
    { id: "4", name: "Games & Hobbies", slug: "games-hobbies", icon: "Gamepad2", color: "text-red-600", adCount: 567, status: "active", createdAt: new Date("2024-01-04"), updatedAt: new Date() },
    { id: "5", name: "Fashion", slug: "fashion", icon: "Shirt", color: "text-pink-600", adCount: 2890, status: "active", createdAt: new Date("2024-01-05"), updatedAt: new Date() },
    { id: "6", name: "Books & Media", slug: "books-media", icon: "Book", color: "text-orange-600", adCount: 1456, status: "active", createdAt: new Date("2024-01-06"), updatedAt: new Date() },
    { id: "7", name: "Kids & Baby", slug: "kids-baby", icon: "Baby", color: "text-yellow-600", adCount: 890, status: "active", createdAt: new Date("2024-01-07"), updatedAt: new Date() },
    { id: "8", name: "Sports", slug: "sports", icon: "Bike", color: "text-indigo-600", adCount: 1234, status: "active", createdAt: new Date("2024-01-08"), updatedAt: new Date() },
    { id: "9", name: "Tools & Garden", slug: "tools-garden", icon: "Wrench", color: "text-gray-600", adCount: 678, status: "inactive", createdAt: new Date("2024-01-09"), updatedAt: new Date() },
    { id: "10", name: "Home & Kitchen", slug: "home-kitchen", icon: "ChefHat", color: "text-emerald-600", adCount: 2345, status: "active", createdAt: new Date("2024-01-10"), updatedAt: new Date() },
    { id: "11", name: "Music & Arts", slug: "music-arts", icon: "Music", color: "text-cyan-600", adCount: 456, status: "active", createdAt: new Date("2024-01-11"), updatedAt: new Date() },
    { id: "12", name: "Health & Beauty", slug: "health-beauty", icon: "Heart", color: "text-rose-600", adCount: 1567, status: "active", createdAt: new Date("2024-01-12"), updatedAt: new Date() },
  ]);

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      icon: "",
      color: "",
      status: "active",
    },
  });

  const filteredCategories = useMemo(() => {
    return categories.filter(category => {
      const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           category.slug.includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || category.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [categories, searchTerm, statusFilter]);

  const totalAds = categories.reduce((sum, cat) => sum + cat.adCount, 0);
  const activeCategories = categories.filter(cat => cat.status === "active").length;
  const topCategory = categories.reduce((prev, current) => 
    prev.adCount > current.adCount ? prev : current
  );

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const onSubmit = async (data: CategoryFormData) => {
    setIsLoading(true);
    try {
      const slug = generateSlug(data.name);
      
      if (editingCategory) {
        // Update existing category
        setCategories(prev => prev.map(cat => 
          cat.id === editingCategory.id 
            ? { ...cat, ...data, slug, updatedAt: new Date() }
            : cat
        ));
        toast({
          title: "Category updated",
          description: "The category has been successfully updated.",
        });
        setEditingCategory(null);
      } else {
        // Create new category
        const newCategory: Category = {
          id: Date.now().toString(),
          ...data,
          slug,
          adCount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setCategories(prev => [...prev, newCategory]);
        toast({
          title: "Category created",
          description: "The new category has been successfully created.",
        });
      }
      
      form.reset();
      setIsCreateModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save category. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    form.reset({
      name: category.name,
      icon: category.icon,
      color: category.color,
      status: category.status,
    });
    setIsCreateModalOpen(true);
  };

  const handleDelete = async (categoryId: string) => {
    try {
      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
      toast({
        title: "Category deleted",
        description: "The category has been successfully deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete category. Please try again.",
        variant: "destructive",
      });
    }
  };

  const IconComponent = ({ icon, className }: { icon: keyof typeof iconMap; className?: string }) => {
    const Component = iconMap[icon] || Package;
    return <Component className={className} />;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Categories</h1>
            <p className="text-muted-foreground">Manage product categories and organize your marketplace</p>
          </div>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button 
                className="w-full md:w-auto"
                onClick={() => {
                  setEditingCategory(null);
                  form.reset({
                    name: "",
                    icon: "",
                    color: "",
                    status: "active",
                  });
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {editingCategory ? "Edit Category" : "Create New Category"}
                </DialogTitle>
                <DialogDescription>
                  {editingCategory 
                    ? "Update the category details below." 
                    : "Add a new category to organize listings."
                  }
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name</Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    placeholder="Enter category name"
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="icon">Icon</Label>
                  <Select onValueChange={(value) => form.setValue("icon", value)} value={form.watch("icon")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an icon">
                        {form.watch("icon") && (
                          <div className="flex items-center gap-2">
                            <IconComponent icon={form.watch("icon") as keyof typeof iconMap} className="h-4 w-4" />
                            {form.watch("icon")}
                          </div>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(iconMap).map((iconName) => (
                        <SelectItem key={iconName} value={iconName}>
                          <div className="flex items-center gap-2">
                            <IconComponent icon={iconName as keyof typeof iconMap} className="h-4 w-4" />
                            {iconName}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.icon && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.icon.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Select onValueChange={(value) => form.setValue("color", value)} value={form.watch("color")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a color">
                        {form.watch("color") && (
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded ${colorOptions.find(c => c.value === form.watch("color"))?.bg}`} />
                            {colorOptions.find(c => c.value === form.watch("color"))?.label}
                          </div>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded ${color.bg}`} />
                            {color.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.color && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.color.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select onValueChange={(value: "active" | "inactive") => form.setValue("status", value)} value={form.watch("status")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : editingCategory ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Categories</p>
                  <p className="text-3xl font-bold">{categories.length}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Categories</p>
                  <p className="text-3xl font-bold">{activeCategories}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Ads</p>
                  <p className="text-3xl font-bold">{totalAds.toLocaleString()}</p>
                </div>
                <Eye className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Top Category</p>
                  <p className="text-lg font-bold">{topCategory.name}</p>
                  <p className="text-sm text-muted-foreground">{topCategory.adCount} ads</p>
                </div>
                <IconComponent icon={topCategory.icon} className={`h-8 w-8 ${topCategory.color}`} />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="grid" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
            </TabsList>

            {/* Search and Filter */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:gap-4 sm:space-y-0">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-full sm:w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={(value: "all" | "active" | "inactive") => setStatusFilter(value)}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="grid" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredCategories.map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                        <Avatar className={`h-10 w-10 md:h-12 md:w-12 flex-shrink-0 ${colorOptions.find(c => c.value === category.color)?.bg}`}>
                          <AvatarFallback className={`${category.color} bg-transparent`}>
                            <IconComponent icon={category.icon} className="h-5 w-5 md:h-6 md:w-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-sm md:text-base truncate">{category.name}</h3>
                          <p className="text-xs md:text-sm text-muted-foreground truncate">{category.slug}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(category)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Category</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{category.name}"? This action cannot be undone and will affect all ads in this category.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(category.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Ads</span>
                        <span className="font-semibold">{category.adCount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Status</span>
                        <Badge variant={category.status === 'active' ? 'default' : 'secondary'}>
                          {category.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Updated</span>
                        <span className="text-sm">{category.updatedAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="table" className="space-y-4">
            {/* Mobile card layout */}
            <div className="block lg:hidden space-y-4">
              {filteredCategories.map((category) => (
                <Card key={category.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Avatar className={`h-12 w-12 flex-shrink-0 ${colorOptions.find(c => c.value === category.color)?.bg}`}>
                          <AvatarFallback className={`${category.color} bg-transparent`}>
                            <IconComponent icon={category.icon} className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold truncate">{category.name}</h3>
                          <p className="text-sm text-muted-foreground font-mono truncate">{category.slug}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(category)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Category</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{category.name}"? This action cannot be undone and will affect all ads in this category.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(category.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Ads:</span>
                        <span className="ml-2 font-medium">{category.adCount.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant={category.status === 'active' ? 'default' : 'secondary'} className="ml-2">
                          {category.status}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Created:</span>
                        <span className="ml-2">{category.createdAt.toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Updated:</span>
                        <span className="ml-2">{category.updatedAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Desktop table */}
            <Card className="hidden lg:block">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Ads</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className={`h-8 w-8 ${colorOptions.find(c => c.value === category.color)?.bg}`}>
                              <AvatarFallback className={`${category.color} bg-transparent`}>
                                <IconComponent icon={category.icon} className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{category.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{category.slug}</TableCell>
                        <TableCell>{category.adCount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={category.status === 'active' ? 'default' : 'secondary'}>
                            {category.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{category.createdAt.toLocaleDateString()}</TableCell>
                        <TableCell>{category.updatedAt.toLocaleDateString()}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(category)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Category</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "{category.name}"? This action cannot be undone and will affect all ads in this category.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(category.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {filteredCategories.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No categories found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by creating your first category"
                }
              </p>
              {!searchTerm && statusFilter === "all" && (
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCategories;