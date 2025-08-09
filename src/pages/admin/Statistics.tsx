import { useState } from "react";
import { AdminLayout } from "@/layouts/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Package, 
  DollarSign, 
  Eye, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  MapPin,
  Star,
  MessageSquare,
  Heart,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Crown,
  Smartphone,
  Car,
  Home
} from "lucide-react";

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ComponentType<any>;
  color: string;
}

interface ChartData {
  name: string;
  value: number;
  color?: string;
}

const AdminStatistics = () => {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "1y">("30d");

  // Mock data - replace with actual API calls
  const overviewStats: StatCard[] = [
    {
      title: "Total Users",
      value: "12,547",
      change: "+12.5%",
      changeType: "increase",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Ads",
      value: "8,934",
      change: "+8.2%",
      changeType: "increase",
      icon: Package,
      color: "text-green-600",
    },
    {
      title: "Revenue",
      value: "$45,678",
      change: "+15.3%",
      changeType: "increase",
      icon: DollarSign,
      color: "text-emerald-600",
    },
    {
      title: "Total Views",
      value: "1.2M",
      change: "-2.4%",
      changeType: "decrease",
      icon: Eye,
      color: "text-purple-600",
    },
  ];

  const adStatusData: ChartData[] = [
    { name: "Active", value: 5234, color: "text-green-600" },
    { name: "Pending", value: 1892, color: "text-yellow-600" },
    { name: "Sold", value: 2456, color: "text-blue-600" },
    { name: "Expired", value: 892, color: "text-gray-600" },
    { name: "Rejected", value: 234, color: "text-red-600" },
  ];

  const categoryPerformance: ChartData[] = [
    { name: "Electronics", value: 3789 },
    { name: "Fashion", value: 2890 },
    { name: "Vehicles", value: 2456 },
    { name: "Real Estate", value: 1234 },
    { name: "Home & Kitchen", value: 2345 },
  ];

  const recentActivity = [
    { type: "user", action: "New user registration", user: "Sarah Johnson", time: "2 minutes ago", status: "success" },
    { type: "ad", action: "Ad approved", user: "Mike Chen", time: "5 minutes ago", status: "success" },
    { type: "payment", action: "Premium subscription", user: "Alex Rivera", time: "12 minutes ago", status: "success" },
    { type: "ad", action: "Ad flagged for review", user: "Emma Davis", time: "18 minutes ago", status: "warning" },
    { type: "user", action: "Account suspended", user: "John Smith", time: "25 minutes ago", status: "error" },
    { type: "ad", action: "Ad expired", user: "Lisa Wong", time: "32 minutes ago", status: "neutral" },
  ];

  const topLocations = [
    { city: "New York", state: "NY", ads: 1245, percentage: 15.2 },
    { city: "Los Angeles", state: "CA", ads: 1089, percentage: 13.3 },
    { city: "Chicago", state: "IL", ads: 892, percentage: 10.9 },
    { city: "Houston", state: "TX", ads: 756, percentage: 9.2 },
    { city: "Miami", state: "FL", ads: 634, percentage: 7.7 },
  ];

  const subscriptionStats = [
    { plan: "Free", users: 8945, revenue: 0, color: "text-gray-600" },
    { plan: "Premium", users: 2890, revenue: 28900, color: "text-blue-600" },
    { plan: "Pro", users: 712, revenue: 21360, color: "text-purple-600" },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user":
        return <Users className="h-4 w-4" />;
      case "ad":
        return <Package className="h-4 w-4" />;
      case "payment":
        return <DollarSign className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatTimeRange = (range: string) => {
    switch (range) {
      case "7d":
        return "Last 7 days";
      case "30d":
        return "Last 30 days";
      case "90d":
        return "Last 90 days";
      case "1y":
        return "Last year";
      default:
        return "Last 30 days";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Statistics</h1>
            <p className="text-muted-foreground">Comprehensive analytics and insights</p>
          </div>
          <Select value={timeRange} onValueChange={(value: "7d" | "30d" | "90d" | "1y") => setTimeRange(value)}>
            <SelectTrigger className="w-full md:w-48">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {overviewStats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        {stat.changeType === 'increase' ? (
                          <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                        ) : stat.changeType === 'decrease' ? (
                          <ArrowDownRight className="h-4 w-4 text-red-600 mr-1" />
                        ) : null}
                        <span className={`text-sm font-medium ${
                          stat.changeType === 'increase' ? 'text-green-600' : 
                          stat.changeType === 'decrease' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {stat.change}
                        </span>
                        <span className="text-sm text-muted-foreground ml-1">vs last period</span>
                      </div>
                    </div>
                    <IconComponent className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
            <TabsTrigger value="overview" className="text-xs md:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="ads" className="text-xs md:text-sm">Ads</TabsTrigger>
            <TabsTrigger value="users" className="text-xs md:text-sm">Users</TabsTrigger>
            <TabsTrigger value="revenue" className="text-xs md:text-sm">Revenue</TabsTrigger>
            <TabsTrigger value="geography" className="col-span-2 md:col-span-1 text-xs md:text-sm">Geography</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Ad Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Ad Status Distribution</CardTitle>
                  <CardDescription>Current status of all advertisements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {adStatusData.map((item, index) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full bg-current ${item.color}`} />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">{item.value.toLocaleString()}</span>
                          <div className="w-20">
                            <Progress value={(item.value / 10708) * 100} className="h-2" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest platform activities and events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {activity.action}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            by {activity.user} • {activity.time}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          {getStatusIcon(activity.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Category Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Categories</CardTitle>
                <CardDescription>Categories with the most active advertisements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {categoryPerformance.map((category, index) => (
                    <div key={category.name} className="text-center p-3 md:p-4 rounded-lg border">
                      <div className="flex justify-center mb-2">
                        {category.name === "Electronics" && <Smartphone className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />}
                        {category.name === "Vehicles" && <Car className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />}
                        {category.name === "Real Estate" && <Home className="h-6 w-6 md:h-8 md:w-8 text-green-600" />}
                        {!["Electronics", "Vehicles", "Real Estate"].includes(category.name) && <Package className="h-6 w-6 md:h-8 md:w-8 text-gray-600" />}
                      </div>
                      <h3 className="font-semibold text-xs md:text-sm truncate">{category.name}</h3>
                      <p className="text-lg md:text-2xl font-bold">{category.value.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">active ads</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ads" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ad Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Ads Posted</span>
                    <span className="font-bold">10,708</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg. Views per Ad</span>
                    <span className="font-bold">156</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Conversion Rate</span>
                    <span className="font-bold">12.4%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg. Time to Sell</span>
                    <span className="font-bold">18 days</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm">Featured Ads</span>
                    </div>
                    <span className="font-bold">1,245</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Crown className="h-4 w-4 text-purple-600" />
                      <span className="text-sm">Premium Ads</span>
                    </div>
                    <span className="font-bold">892</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-red-600" />
                      <span className="text-sm">Favorited</span>
                    </div>
                    <span className="font-bold">15,678</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Messages Sent</span>
                    </div>
                    <span className="font-bold">8,934</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quality Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Approval Rate</span>
                      <span className="text-sm font-medium">94.2%</span>
                    </div>
                    <Progress value={94.2} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">User Satisfaction</span>
                      <span className="text-sm font-medium">87.5%</span>
                    </div>
                    <Progress value={87.5} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Report Resolution</span>
                      <span className="text-sm font-medium">91.8%</span>
                    </div>
                    <Progress value={91.8} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>New registrations over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">New Users (30d)</span>
                      <span className="font-bold text-green-600">+1,247</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Active Users</span>
                      <span className="font-bold">8,934</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Retention Rate</span>
                      <span className="font-bold">76.8%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Avg. Session Time</span>
                      <span className="font-bold">12m 34s</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subscription Distribution</CardTitle>
                  <CardDescription>User distribution across plans</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subscriptionStats.map((sub) => (
                      <div key={sub.plan} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Crown className={`h-4 w-4 ${sub.color}`} />
                            <span className="font-medium">{sub.plan}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{sub.users.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">
                              {sub.revenue > 0 ? `$${sub.revenue.toLocaleString()}` : 'Free'}
                            </div>
                          </div>
                        </div>
                        <Progress value={(sub.users / 12547) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">$45,678</p>
                    <p className="text-sm text-muted-foreground">Total Revenue ({formatTimeRange(timeRange)})</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">MRR</span>
                      <span className="font-bold">$12,345</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">ARR</span>
                      <span className="font-bold">$148,140</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Growth Rate</span>
                      <span className="font-bold text-green-600">+15.3%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Sources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Premium Subscriptions</span>
                      <span className="font-bold">$28,900</span>
                    </div>
                    <Progress value={63.2} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Pro Subscriptions</span>
                      <span className="font-bold">$21,360</span>
                    </div>
                    <Progress value={46.8} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Featured Ads</span>
                      <span className="font-bold">$8,745</span>
                    </div>
                    <Progress value={19.1} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Financial Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">ARPU</span>
                    <span className="font-bold">$3.64</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">LTV</span>
                    <span className="font-bold">$127.45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">CAC</span>
                    <span className="font-bold">$23.12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">LTV/CAC Ratio</span>
                    <span className="font-bold text-green-600">5.51</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="geography" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Locations</CardTitle>
                <CardDescription>Cities with the highest ad activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topLocations.map((location, index) => (
                    <div key={`${location.city}-${location.state}`} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 text-center">
                          <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <span className="font-medium">{location.city}</span>
                            <span className="text-muted-foreground">, {location.state}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-bold">{location.ads.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">{location.percentage}%</div>
                        </div>
                        <div className="w-24">
                          <Progress value={location.percentage} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminStatistics;