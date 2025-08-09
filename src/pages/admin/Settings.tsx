import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AdminLayout } from "@/layouts/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  Settings as SettingsIcon,
  Globe,
  Mail,
  Shield,
  Database,
  Palette,
  Bell,
  CreditCard,
  Users,
  Package,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  Check,
  X,
  Server,
  Lock,
  Eye,
  EyeOff,
  Key,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Zap,
  HardDrive,
  Activity,
  FileText
} from "lucide-react";

const generalSettingsSchema = z.object({
  siteName: z.string().min(2, "Site name is required"),
  siteDescription: z.string().min(10, "Site description is required"),
  contactEmail: z.string().email("Valid email is required"),
  supportEmail: z.string().email("Valid email is required"),
  timezone: z.string().min(1, "Timezone is required"),
  language: z.string().min(1, "Language is required"),
  currency: z.string().min(1, "Currency is required"),
  maintenanceMode: z.boolean(),
});

const emailSettingsSchema = z.object({
  smtpHost: z.string().min(1, "SMTP host is required"),
  smtpPort: z.number().min(1, "SMTP port is required"),
  smtpUsername: z.string().min(1, "SMTP username is required"),
  smtpPassword: z.string().min(1, "SMTP password is required"),
  fromEmail: z.string().email("Valid from email is required"),
  fromName: z.string().min(1, "From name is required"),
  enableSsl: z.boolean(),
});

const securitySettingsSchema = z.object({
  requireEmailVerification: z.boolean(),
  enableTwoFactorAuth: z.boolean(),
  passwordMinLength: z.number().min(6).max(50),
  maxLoginAttempts: z.number().min(1).max(10),
  sessionTimeout: z.number().min(30).max(1440),
  enableRecaptcha: z.boolean(),
  recaptchaSiteKey: z.string().optional(),
  recaptchaSecretKey: z.string().optional(),
});

type GeneralSettingsFormData = z.infer<typeof generalSettingsSchema>;
type EmailSettingsFormData = z.infer<typeof emailSettingsSchema>;
type SecuritySettingsFormData = z.infer<typeof securitySettingsSchema>;

const AdminSettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showSmtpPassword, setShowSmtpPassword] = useState(false);
  const [showRecaptchaKeys, setShowRecaptchaKeys] = useState(false);

  // Mock current settings - replace with actual API calls
  const [currentSettings, setCurrentSettings] = useState({
    general: {
      siteName: "ClassiMarket",
      siteDescription: "The premier online marketplace for buying and selling items",
      contactEmail: "contact@classimarket.com",
      supportEmail: "support@classimarket.com",
      timezone: "America/New_York",
      language: "en",
      currency: "USD",
      maintenanceMode: false,
    },
    email: {
      smtpHost: "smtp.gmail.com",
      smtpPort: 587,
      smtpUsername: "noreply@classimarket.com",
      smtpPassword: "••••••••••••",
      fromEmail: "noreply@classimarket.com",
      fromName: "ClassiMarket",
      enableSsl: true,
    },
    security: {
      requireEmailVerification: true,
      enableTwoFactorAuth: false,
      passwordMinLength: 8,
      maxLoginAttempts: 5,
      sessionTimeout: 120,
      enableRecaptcha: true,
      recaptchaSiteKey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
      recaptchaSecretKey: "••••••••••••••••••••••••••••",
    },
  });

  const generalForm = useForm<GeneralSettingsFormData>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: currentSettings.general,
  });

  const emailForm = useForm<EmailSettingsFormData>({
    resolver: zodResolver(emailSettingsSchema),
    defaultValues: currentSettings.email,
  });

  const securityForm = useForm<SecuritySettingsFormData>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: currentSettings.security,
  });

  const timezones = [
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
    { value: "Europe/Paris", label: "Central European Time (CET)" },
    { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
  ];

  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "it", label: "Italian" },
    { value: "pt", label: "Portuguese" },
    { value: "zh", label: "Chinese" },
    { value: "ja", label: "Japanese" },
  ];

  const currencies = [
    { value: "USD", label: "US Dollar ($)" },
    { value: "EUR", label: "Euro (€)" },
    { value: "GBP", label: "British Pound (£)" },
    { value: "JPY", label: "Japanese Yen (¥)" },
    { value: "CAD", label: "Canadian Dollar (C$)" },
    { value: "AUD", label: "Australian Dollar (A$)" },
  ];

  const systemStats = {
    uptime: "99.8%",
    totalUsers: "12,547",
    totalAds: "8,934",
    storageUsed: "2.4 TB",
    bandwidthUsed: "847 GB",
    serverLoad: "12%",
    databaseSize: "1.2 GB",
    cacheHitRate: "94.2%",
  };

  const onGeneralSubmit = async (data: GeneralSettingsFormData) => {
    setIsLoading(true);
    try {
      setCurrentSettings(prev => ({ ...prev, general: data }));
      toast({
        title: "Settings updated",
        description: "General settings have been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onEmailSubmit = async (data: EmailSettingsFormData) => {
    setIsLoading(true);
    try {
      setCurrentSettings(prev => ({ ...prev, email: data }));
      toast({
        title: "Email settings updated",
        description: "Email configuration has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update email settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSecuritySubmit = async (data: SecuritySettingsFormData) => {
    setIsLoading(true);
    try {
      setCurrentSettings(prev => ({ ...prev, security: data }));
      toast({
        title: "Security settings updated",
        description: "Security configuration has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update security settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestEmail = async () => {
    setIsLoading(true);
    try {
      // Mock email test
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Test email sent",
        description: "A test email has been sent successfully.",
      });
    } catch (error) {
      toast({
        title: "Email test failed",
        description: "Failed to send test email. Please check your configuration.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearCache = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Cache cleared",
        description: "System cache has been successfully cleared.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear cache. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportSettings = () => {
    const settings = {
      general: currentSettings.general,
      email: { ...currentSettings.email, smtpPassword: "[HIDDEN]" },
      security: { ...currentSettings.security, recaptchaSecretKey: "[HIDDEN]" },
      exportedAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'admin-settings.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Settings exported",
      description: "Settings have been exported successfully.",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">System Settings</h1>
            <p className="text-muted-foreground">Configure system-wide settings and preferences</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="outline" onClick={handleExportSettings} className="w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Export Settings
            </Button>
            <Button variant="outline" onClick={handleClearCache} disabled={isLoading} className="w-full sm:w-auto">
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Clear Cache
            </Button>
          </div>
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Status
            </CardTitle>
            <CardDescription>Current system health and performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Server className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm font-medium">Uptime</span>
                </div>
                <p className="text-lg font-bold text-green-600">{systemStats.uptime}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Users className="h-4 w-4 text-blue-600 mr-1" />
                  <span className="text-sm font-medium">Users</span>
                </div>
                <p className="text-lg font-bold">{systemStats.totalUsers}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Package className="h-4 w-4 text-purple-600 mr-1" />
                  <span className="text-sm font-medium">Ads</span>
                </div>
                <p className="text-lg font-bold">{systemStats.totalAds}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <HardDrive className="h-4 w-4 text-orange-600 mr-1" />
                  <span className="text-sm font-medium">Storage</span>
                </div>
                <p className="text-lg font-bold">{systemStats.storageUsed}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Zap className="h-4 w-4 text-yellow-600 mr-1" />
                  <span className="text-sm font-medium">Bandwidth</span>
                </div>
                <p className="text-lg font-bold">{systemStats.bandwidthUsed}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Monitor className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm font-medium">Server Load</span>
                </div>
                <p className="text-lg font-bold">{systemStats.serverLoad}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Database className="h-4 w-4 text-indigo-600 mr-1" />
                  <span className="text-sm font-medium">Database</span>
                </div>
                <p className="text-lg font-bold">{systemStats.databaseSize}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Zap className="h-4 w-4 text-cyan-600 mr-1" />
                  <span className="text-sm font-medium">Cache Hit</span>
                </div>
                <p className="text-lg font-bold">{systemStats.cacheHitRate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">
              <Globe className="h-4 w-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="email">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="appearance">
              <Palette className="h-4 w-4 mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="advanced">
              <SettingsIcon className="h-4 w-4 mr-2" />
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure basic site information and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={generalForm.handleSubmit(onGeneralSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="siteName">Site Name</Label>
                      <Input
                        id="siteName"
                        {...generalForm.register("siteName")}
                        placeholder="Enter site name"
                      />
                      {generalForm.formState.errors.siteName && (
                        <p className="text-sm text-destructive">
                          {generalForm.formState.errors.siteName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Contact Email</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        {...generalForm.register("contactEmail")}
                        placeholder="contact@example.com"
                      />
                      {generalForm.formState.errors.contactEmail && (
                        <p className="text-sm text-destructive">
                          {generalForm.formState.errors.contactEmail.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Textarea
                      id="siteDescription"
                      {...generalForm.register("siteDescription")}
                      placeholder="Enter site description"
                      rows={3}
                    />
                    {generalForm.formState.errors.siteDescription && (
                      <p className="text-sm text-destructive">
                        {generalForm.formState.errors.siteDescription.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select 
                        onValueChange={(value) => generalForm.setValue("timezone", value)} 
                        value={generalForm.watch("timezone")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          {timezones.map((tz) => (
                            <SelectItem key={tz.value} value={tz.value}>
                              {tz.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language">Default Language</Label>
                      <Select 
                        onValueChange={(value) => generalForm.setValue("language", value)} 
                        value={generalForm.watch("language")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((lang) => (
                            <SelectItem key={lang.value} value={lang.value}>
                              {lang.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select 
                        onValueChange={(value) => generalForm.setValue("currency", value)} 
                        value={generalForm.watch("currency")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((curr) => (
                            <SelectItem key={curr.value} value={curr.value}>
                              {curr.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      {...generalForm.register("supportEmail")}
                      placeholder="support@example.com"
                    />
                    {generalForm.formState.errors.supportEmail && (
                      <p className="text-sm text-destructive">
                        {generalForm.formState.errors.supportEmail.message}
                      </p>
                    )}
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable maintenance mode to prevent users from accessing the site
                      </p>
                    </div>
                    <Switch
                      checked={generalForm.watch("maintenanceMode")}
                      onCheckedChange={(checked) => generalForm.setValue("maintenanceMode", checked)}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                      <Save className="h-4 w-4 mr-2" />
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Configuration</CardTitle>
                <CardDescription>Configure SMTP settings for sending emails</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="smtpHost">SMTP Host</Label>
                      <Input
                        id="smtpHost"
                        {...emailForm.register("smtpHost")}
                        placeholder="smtp.gmail.com"
                      />
                      {emailForm.formState.errors.smtpHost && (
                        <p className="text-sm text-destructive">
                          {emailForm.formState.errors.smtpHost.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="smtpPort">SMTP Port</Label>
                      <Input
                        id="smtpPort"
                        type="number"
                        {...emailForm.register("smtpPort", { valueAsNumber: true })}
                        placeholder="587"
                      />
                      {emailForm.formState.errors.smtpPort && (
                        <p className="text-sm text-destructive">
                          {emailForm.formState.errors.smtpPort.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="smtpUsername">SMTP Username</Label>
                      <Input
                        id="smtpUsername"
                        {...emailForm.register("smtpUsername")}
                        placeholder="your-email@example.com"
                      />
                      {emailForm.formState.errors.smtpUsername && (
                        <p className="text-sm text-destructive">
                          {emailForm.formState.errors.smtpUsername.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="smtpPassword">SMTP Password</Label>
                      <div className="relative">
                        <Input
                          id="smtpPassword"
                          type={showSmtpPassword ? "text" : "password"}
                          {...emailForm.register("smtpPassword")}
                          placeholder="Your SMTP password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowSmtpPassword(!showSmtpPassword)}
                        >
                          {showSmtpPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      {emailForm.formState.errors.smtpPassword && (
                        <p className="text-sm text-destructive">
                          {emailForm.formState.errors.smtpPassword.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fromEmail">From Email</Label>
                      <Input
                        id="fromEmail"
                        type="email"
                        {...emailForm.register("fromEmail")}
                        placeholder="noreply@example.com"
                      />
                      {emailForm.formState.errors.fromEmail && (
                        <p className="text-sm text-destructive">
                          {emailForm.formState.errors.fromEmail.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fromName">From Name</Label>
                      <Input
                        id="fromName"
                        {...emailForm.register("fromName")}
                        placeholder="ClassiMarket"
                      />
                      {emailForm.formState.errors.fromName && (
                        <p className="text-sm text-destructive">
                          {emailForm.formState.errors.fromName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Enable SSL/TLS</Label>
                      <p className="text-sm text-muted-foreground">
                        Use SSL/TLS encryption for secure email transmission
                      </p>
                    </div>
                    <Switch
                      checked={emailForm.watch("enableSsl")}
                      onCheckedChange={(checked) => emailForm.setValue("enableSsl", checked)}
                    />
                  </div>

                  <div className="flex gap-2 justify-end">
                    <Button type="button" variant="outline" onClick={handleTestEmail} disabled={isLoading}>
                      <Mail className="h-4 w-4 mr-2" />
                      Test Email
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      <Save className="h-4 w-4 mr-2" />
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure security policies and authentication settings</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Require Email Verification</Label>
                        <p className="text-sm text-muted-foreground">
                          Users must verify their email before accessing the platform
                        </p>
                      </div>
                      <Switch
                        checked={securityForm.watch("requireEmailVerification")}
                        onCheckedChange={(checked) => securityForm.setValue("requireEmailVerification", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Enable Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow users to enable 2FA for additional security
                        </p>
                      </div>
                      <Switch
                        checked={securityForm.watch("enableTwoFactorAuth")}
                        onCheckedChange={(checked) => securityForm.setValue("enableTwoFactorAuth", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Enable reCAPTCHA</Label>
                        <p className="text-sm text-muted-foreground">
                          Protect forms from spam and automated abuse
                        </p>
                      </div>
                      <Switch
                        checked={securityForm.watch("enableRecaptcha")}
                        onCheckedChange={(checked) => securityForm.setValue("enableRecaptcha", checked)}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                      <Input
                        id="passwordMinLength"
                        type="number"
                        min="6"
                        max="50"
                        {...securityForm.register("passwordMinLength", { valueAsNumber: true })}
                      />
                      {securityForm.formState.errors.passwordMinLength && (
                        <p className="text-sm text-destructive">
                          {securityForm.formState.errors.passwordMinLength.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                      <Input
                        id="maxLoginAttempts"
                        type="number"
                        min="1"
                        max="10"
                        {...securityForm.register("maxLoginAttempts", { valueAsNumber: true })}
                      />
                      {securityForm.formState.errors.maxLoginAttempts && (
                        <p className="text-sm text-destructive">
                          {securityForm.formState.errors.maxLoginAttempts.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        min="30"
                        max="1440"
                        {...securityForm.register("sessionTimeout", { valueAsNumber: true })}
                      />
                      {securityForm.formState.errors.sessionTimeout && (
                        <p className="text-sm text-destructive">
                          {securityForm.formState.errors.sessionTimeout.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {securityForm.watch("enableRecaptcha") && (
                    <div className="space-y-4">
                      <Separator />
                      <h4 className="text-sm font-medium">reCAPTCHA Configuration</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="recaptchaSiteKey">Site Key</Label>
                          <Input
                            id="recaptchaSiteKey"
                            {...securityForm.register("recaptchaSiteKey")}
                            placeholder="Your reCAPTCHA site key"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="recaptchaSecretKey">Secret Key</Label>
                          <div className="relative">
                            <Input
                              id="recaptchaSecretKey"
                              type={showRecaptchaKeys ? "text" : "password"}
                              {...securityForm.register("recaptchaSecretKey")}
                              placeholder="Your reCAPTCHA secret key"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowRecaptchaKeys(!showRecaptchaKeys)}
                            >
                              {showRecaptchaKeys ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                      <Save className="h-4 w-4 mr-2" />
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize the look and feel of your platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable dark theme as the default appearance
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sun className="h-4 w-4" />
                      <Switch defaultChecked={false} />
                      <Moon className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Compact Layout</Label>
                      <p className="text-sm text-muted-foreground">
                        Use a more compact layout to fit more content
                      </p>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Show Category Icons</Label>
                      <p className="text-sm text-muted-foreground">
                        Display icons alongside category names
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Theme Customization</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>Primary Color</Label>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded bg-primary border"></div>
                        <Input type="color" defaultValue="#000000" className="w-16 h-8 p-1" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Accent Color</Label>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded bg-accent border"></div>
                        <Input type="color" defaultValue="#f1f5f9" className="w-16 h-8 p-1" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Success Color</Label>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded bg-green-500 border"></div>
                        <Input type="color" defaultValue="#22c55e" className="w-16 h-8 p-1" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Error Color</Label>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded bg-red-500 border"></div>
                        <Input type="color" defaultValue="#ef4444" className="w-16 h-8 p-1" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Appearance Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>Advanced configuration options and system controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Enable API Access</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow external applications to access the API
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Debug Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable detailed error reporting and logging
                      </p>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Auto Backup</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically backup database daily
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">System Maintenance</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Rebuild Search Index
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Database className="h-4 w-4 mr-2" />
                      Optimize Database
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Sitemap
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Export Database
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-destructive" />
                    Danger Zone
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    These actions are irreversible. Please be certain before proceeding.
                  </p>
                  <div className="space-y-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full justify-start">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Reset All Settings to Default
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Reset All Settings</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will reset all system settings to their default values. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Reset Settings
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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

export default AdminSettings;