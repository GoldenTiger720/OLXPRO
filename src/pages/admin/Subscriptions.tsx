import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AdminLayout } from "@/layouts/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  Crown, 
  Users, 
  DollarSign, 
  TrendingUp,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  CreditCard,
  Star,
  Check,
  X,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  RefreshCw,
  Download,
  Eye
} from "lucide-react";

interface Subscription {
  id: string;
  userId: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  plan: 'free' | 'premium' | 'pro';
  status: 'active' | 'cancelled' | 'expired' | 'pending';
  startDate: Date;
  endDate: Date;
  amount: number;
  paymentMethod: string;
  autoRenew: boolean;
  features: string[];
  lastPayment?: Date;
  nextBilling?: Date;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
  isActive: boolean;
  subscriberCount: number;
  revenue: number;
  color: string;
}

const planSchema = z.object({
  name: z.string().min(2, "Plan name is required"),
  price: z.number().min(0, "Price must be 0 or greater"),
  interval: z.enum(['monthly', 'yearly']),
  features: z.string().min(10, "Features description is required"),
  isActive: z.boolean(),
});

type PlanFormData = z.infer<typeof planSchema>;

const AdminSubscriptions = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("subscribers");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "cancelled" | "expired" | "pending">("all");
  const [planFilter, setPlanFilter] = useState<"all" | "free" | "premium" | "pro">("all");
  const [isCreatePlanModalOpen, setIsCreatePlanModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock subscription data
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: "1",
      userId: "user1",
      user: { name: "Sarah Johnson", email: "sarah@example.com", avatar: "" },
      plan: "premium",
      status: "active",
      startDate: new Date("2024-01-15"),
      endDate: new Date("2024-02-15"),
      amount: 9.99,
      paymentMethod: "Visa ****1234",
      autoRenew: true,
      features: ["Featured listings", "Priority support", "Advanced analytics"],
      lastPayment: new Date("2024-01-15"),
      nextBilling: new Date("2024-02-15"),
    },
    {
      id: "2",
      userId: "user2",
      user: { name: "Mike Chen", email: "mike@example.com" },
      plan: "pro",
      status: "active",
      startDate: new Date("2023-12-01"),
      endDate: new Date("2024-12-01"),
      amount: 99.99,
      paymentMethod: "PayPal",
      autoRenew: true,
      features: ["All premium features", "Unlimited listings", "API access", "White-label option"],
      lastPayment: new Date("2023-12-01"),
      nextBilling: new Date("2024-12-01"),
    },
    {
      id: "3",
      userId: "user3",
      user: { name: "Alex Rivera", email: "alex@example.com" },
      plan: "premium",
      status: "cancelled",
      startDate: new Date("2023-11-10"),
      endDate: new Date("2024-01-10"),
      amount: 9.99,
      paymentMethod: "Mastercard ****5678",
      autoRenew: false,
      features: ["Featured listings", "Priority support", "Advanced analytics"],
      lastPayment: new Date("2023-12-10"),
    },
    {
      id: "4",
      userId: "user4",
      user: { name: "Emma Davis", email: "emma@example.com" },
      plan: "free",
      status: "active",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      amount: 0,
      paymentMethod: "N/A",
      autoRenew: true,
      features: ["Basic listings", "Standard support"],
    },
  ]);

  const [plans, setPlans] = useState<Plan[]>([
    {
      id: "1",
      name: "Free",
      price: 0,
      interval: "monthly",
      features: ["Up to 5 listings per month", "Basic search visibility", "Email support"],
      isActive: true,
      subscriberCount: 8945,
      revenue: 0,
      color: "text-gray-600",
    },
    {
      id: "2",
      name: "Premium",
      price: 9.99,
      interval: "monthly",
      features: ["Unlimited listings", "Featured placement", "Priority support", "Advanced analytics"],
      isActive: true,
      subscriberCount: 2890,
      revenue: 28900,
      color: "text-blue-600",
    },
    {
      id: "3",
      name: "Pro",
      price: 99.99,
      interval: "yearly",
      features: ["Everything in Premium", "API access", "White-label option", "Dedicated account manager"],
      isActive: true,
      subscriberCount: 712,
      revenue: 71200,
      color: "text-purple-600",
    },
  ]);

  const planForm = useForm<PlanFormData>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: "",
      price: 0,
      interval: "monthly",
      features: "",
      isActive: true,
    },
  });

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter(sub => {
      const matchesSearch = sub.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           sub.user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
      const matchesPlan = planFilter === "all" || sub.plan === planFilter;
      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [subscriptions, searchTerm, statusFilter, planFilter]);

  const totalRevenue = subscriptions
    .filter(sub => sub.status === 'active')
    .reduce((sum, sub) => sum + sub.amount, 0);

  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active').length;
  const churnRate = (subscriptions.filter(sub => sub.status === 'cancelled').length / subscriptions.length) * 100;

  const getStatusBadge = (status: Subscription['status']) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      case "expired":
        return <Badge variant="outline">Expired</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPlanBadge = (plan: Subscription['plan']) => {
    switch (plan) {
      case "free":
        return <Badge variant="outline">Free</Badge>;
      case "premium":
        return <Badge className="bg-blue-100 text-blue-800">Premium</Badge>;
      case "pro":
        return <Badge className="bg-purple-100 text-purple-800">Pro</Badge>;
      default:
        return <Badge variant="outline">{plan}</Badge>;
    }
  };

  const onPlanSubmit = async (data: PlanFormData) => {
    setIsLoading(true);
    try {
      const featuresArray = data.features.split('\n').filter(f => f.trim());
      
      if (editingPlan) {
        setPlans(prev => prev.map(plan => 
          plan.id === editingPlan.id 
            ? { ...plan, ...data, features: featuresArray }
            : plan
        ));
        toast({
          title: "Plan updated",
          description: "The subscription plan has been successfully updated.",
        });
        setEditingPlan(null);
      } else {
        const newPlan: Plan = {
          id: Date.now().toString(),
          ...data,
          features: featuresArray,
          subscriberCount: 0,
          revenue: 0,
          color: data.name.toLowerCase().includes('pro') ? 'text-purple-600' : 
                 data.name.toLowerCase().includes('premium') ? 'text-blue-600' : 'text-gray-600',
        };
        setPlans(prev => [...prev, newPlan]);
        toast({
          title: "Plan created",
          description: "The new subscription plan has been successfully created.",
        });
      }
      
      planForm.reset();
      setIsCreatePlanModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPlan = (plan: Plan) => {
    setEditingPlan(plan);
    planForm.reset({
      name: plan.name,
      price: plan.price,
      interval: plan.interval,
      features: plan.features.join('\n'),
      isActive: plan.isActive,
    });
    setIsCreatePlanModalOpen(true);
  };

  const handleDeletePlan = async (planId: string) => {
    try {
      setPlans(prev => prev.filter(plan => plan.id !== planId));
      toast({
        title: "Plan deleted",
        description: "The subscription plan has been successfully deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete plan. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleTogglePlanStatus = (planId: string) => {
    setPlans(prev => prev.map(plan => 
      plan.id === planId 
        ? { ...plan, isActive: !plan.isActive }
        : plan
    ));
  };

  const handleCancelSubscription = async (subscriptionId: string) => {
    try {
      setSubscriptions(prev => prev.map(sub => 
        sub.id === subscriptionId 
          ? { ...sub, status: 'cancelled', autoRenew: false }
          : sub
      ));
      toast({
        title: "Subscription cancelled",
        description: "The subscription has been successfully cancelled.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel subscription. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Subscriptions</h1>
            <p className="text-muted-foreground">Manage subscription plans and user subscriptions</p>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Subscribers</p>
                  <p className="text-3xl font-bold">{subscriptions.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Subscriptions</p>
                  <p className="text-3xl font-bold">{activeSubscriptions}</p>
                </div>
                <Crown className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                  <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Churn Rate</p>
                  <p className="text-3xl font-bold">{churnRate.toFixed(1)}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="subscribers" className="space-y-4">
            {/* Search and Filters */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search subscribers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={(value: typeof statusFilter) => setStatusFilter(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={planFilter} onValueChange={(value: typeof planFilter) => setPlanFilter(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plans</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="pro">Pro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Subscribers Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subscriber</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Auto Renew</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubscriptions.map((subscription) => (
                      <TableRow key={subscription.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={subscription.user.avatar} />
                              <AvatarFallback>
                                {subscription.user.name.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{subscription.user.name}</div>
                              <div className="text-sm text-muted-foreground">{subscription.user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getPlanBadge(subscription.plan)}</TableCell>
                        <TableCell>{getStatusBadge(subscription.status)}</TableCell>
                        <TableCell>
                          {subscription.amount === 0 ? 'Free' : `$${subscription.amount}`}
                        </TableCell>
                        <TableCell>{subscription.startDate.toLocaleDateString()}</TableCell>
                        <TableCell>{subscription.endDate.toLocaleDateString()}</TableCell>
                        <TableCell>
                          {subscription.autoRenew ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <X className="h-4 w-4 text-red-600" />
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="h-4 w-4 mr-2" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {subscription.status === 'active' && (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                                      <X className="h-4 w-4 mr-2" />
                                      Cancel Subscription
                                    </DropdownMenuItem>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to cancel {subscription.user.name}'s subscription? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleCancelSubscription(subscription.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                        Cancel Subscription
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              )}
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

          <TabsContent value="plans" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Subscription Plans</h3>
                <p className="text-sm text-muted-foreground">Manage your subscription plans and pricing</p>
              </div>
              <Dialog open={isCreatePlanModalOpen} onOpenChange={setIsCreatePlanModalOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => {
                    setEditingPlan(null);
                    planForm.reset({
                      name: "",
                      price: 0,
                      interval: "monthly",
                      features: "",
                      isActive: true,
                    });
                  }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Plan
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>
                      {editingPlan ? "Edit Plan" : "Create New Plan"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingPlan 
                        ? "Update the plan details below." 
                        : "Create a new subscription plan for your users."
                      }
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={planForm.handleSubmit(onPlanSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Plan Name</Label>
                        <Input
                          id="name"
                          {...planForm.register("name")}
                          placeholder="e.g., Premium"
                        />
                        {planForm.formState.errors.name && (
                          <p className="text-sm text-destructive">
                            {planForm.formState.errors.name.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="price">Price</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          {...planForm.register("price", { valueAsNumber: true })}
                          placeholder="9.99"
                        />
                        {planForm.formState.errors.price && (
                          <p className="text-sm text-destructive">
                            {planForm.formState.errors.price.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="interval">Billing Interval</Label>
                      <Select onValueChange={(value: "monthly" | "yearly") => planForm.setValue("interval", value)} value={planForm.watch("interval")}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select interval" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="features">Features (one per line)</Label>
                      <Textarea
                        id="features"
                        {...planForm.register("features")}
                        placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                        rows={5}
                      />
                      {planForm.formState.errors.features && (
                        <p className="text-sm text-destructive">
                          {planForm.formState.errors.features.message}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isActive"
                        checked={planForm.watch("isActive")}
                        onCheckedChange={(checked) => planForm.setValue("isActive", checked)}
                      />
                      <Label htmlFor="isActive">Active plan</Label>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsCreatePlanModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : editingPlan ? "Update" : "Create"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card key={plan.id} className={`relative ${!plan.isActive ? 'opacity-50' : ''}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className={`text-xl ${plan.color}`}>{plan.name}</CardTitle>
                        <CardDescription>
                          ${plan.price} / {plan.interval}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditPlan(plan)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleTogglePlanStatus(plan.id)}>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            {plan.isActive ? 'Deactivate' : 'Activate'}
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
                                <AlertDialogTitle>Delete Plan</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete the "{plan.name}" plan? This action cannot be undone and will affect all subscribers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeletePlan(plan.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    {!plan.isActive && (
                      <Badge variant="outline" className="w-fit">Inactive</Badge>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Features:</h4>
                        <ul className="space-y-1">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm">
                              <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4 border-t space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Subscribers</span>
                          <span className="font-medium">{plan.subscriberCount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Revenue</span>
                          <span className="font-medium">
                            {plan.revenue === 0 ? 'Free' : `$${plan.revenue.toLocaleString()}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Growth</CardTitle>
                  <CardDescription>Monthly recurring revenue trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600">${totalRevenue.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">Monthly Recurring Revenue</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Growth Rate</span>
                        <span className="text-sm font-medium text-green-600">+15.3%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Churn Rate</span>
                        <span className="text-sm font-medium">{churnRate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">ARPU</span>
                        <span className="text-sm font-medium">$12.45</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Plan Distribution</CardTitle>
                  <CardDescription>Subscriber distribution across plans</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {plans.map((plan) => (
                      <div key={plan.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Crown className={`h-4 w-4 ${plan.color}`} />
                            <span className="font-medium">{plan.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{plan.subscriberCount.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">
                              {((plan.subscriberCount / plans.reduce((sum, p) => sum + p.subscriberCount, 0)) * 100).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Subscription Metrics</CardTitle>
                <CardDescription>Key performance indicators for subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold">76.8%</p>
                    <p className="text-sm text-muted-foreground">Retention Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">$127.45</p>
                    <p className="text-sm text-muted-foreground">LTV</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">$23.12</p>
                    <p className="text-sm text-muted-foreground">CAC</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">5.51</p>
                    <p className="text-sm text-muted-foreground">LTV/CAC</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSubscriptions;