import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, DollarSign, TrendingUp, Eye, Heart, ShoppingCart, UserCheck } from "lucide-react";
import { AdminLayout } from "@/layouts/AdminLayout";

const Dashboard = () => {
  // Mock data - replace with actual API calls
  const stats = [
    {
      title: "Total Users",
      value: "12,543",
      change: "+12%",
      icon: Users,
      description: "Active users this month",
    },
    {
      title: "Active Ads",
      value: "3,456",
      change: "+23%",
      icon: Package,
      description: "Currently listed",
    },
    {
      title: "Revenue",
      value: "$45,678",
      change: "+18%",
      icon: DollarSign,
      description: "This month",
    },
    {
      title: "Conversion Rate",
      value: "4.5%",
      change: "+0.8%",
      icon: TrendingUp,
      description: "Ad to sale conversion",
    },
  ];

  const recentActivity = [
    { id: 1, type: "new_user", message: "John Doe registered", time: "5 minutes ago", icon: UserCheck },
    { id: 2, type: "new_ad", message: "New ad posted in Electronics", time: "10 minutes ago", icon: Package },
    { id: 3, type: "purchase", message: "Premium subscription purchased", time: "15 minutes ago", icon: ShoppingCart },
    { id: 4, type: "view", message: "Ad #1234 reached 1000 views", time: "30 minutes ago", icon: Eye },
    { id: 5, type: "favorite", message: "Ad #5678 favorited 50 times", time: "1 hour ago", icon: Heart },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your marketplace.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity & Charts */}
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions on your platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <activity.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Popular Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Categories</CardTitle>
              <CardDescription>Top performing categories this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Electronics", ads: 892, percentage: 35 },
                  { name: "Vehicles", ads: 654, percentage: 25 },
                  { name: "Real Estate", ads: 432, percentage: 20 },
                  { name: "Fashion", ads: 321, percentage: 15 },
                  { name: "Others", ads: 123, percentage: 5 },
                ].map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{category.name}</p>
                      <p className="text-sm text-muted-foreground">{category.ads} ads</p>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
              <button className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-4 hover:bg-muted transition-colors">
                <Users className="h-6 w-6" />
                <span className="text-sm font-medium">Manage Users</span>
              </button>
              <button className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-4 hover:bg-muted transition-colors">
                <Package className="h-6 w-6" />
                <span className="text-sm font-medium">Review Ads</span>
              </button>
              <button className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-4 hover:bg-muted transition-colors">
                <DollarSign className="h-6 w-6" />
                <span className="text-sm font-medium">View Revenue</span>
              </button>
              <button className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-4 hover:bg-muted transition-colors">
                <TrendingUp className="h-6 w-6" />
                <span className="text-sm font-medium">Analytics</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;