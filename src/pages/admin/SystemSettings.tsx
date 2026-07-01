import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    companyName: "Amass Middle East",
    supportEmail: "admin@amassmiddleeast.com",
    timezone: "utc",
    dateFormat: "dmy",
    systemAnnouncement: "Scheduled maintenance on June 30th from 2AM to 4AM UTC. Some services may be unavailable during this time.",
    showAnnouncement: true,
    userRegistration: true,
    shipmentTracking: true,
    onlinePayments: true,
    customerReviews: true,
    maintenanceMode: false,
    sessionTimeout: 30,
    require2fa: true,
    passwordComplexity: true,
    loginAttempts: 5,
    passwordExpiry: 90,
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: true,
    webhookUrl: "https://api.amassmiddleeast.com/webhooks"
  });

  useEffect(() => {
    const saved = localStorage.getItem("admin_system_settings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("admin_system_settings", JSON.stringify(settings));
    toast.success("System settings updated successfully!");
  };

  const handleCancel = () => {
    const saved = localStorage.getItem("admin_system_settings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
    toast.info("Changes discarded.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground">Configure system-wide settings and preferences in localStorage</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        
        {/* General Tab */}
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>Basic system configuration and information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input 
                    id="company-name" 
                    value={settings.companyName} 
                    onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input 
                    id="support-email" 
                    value={settings.supportEmail} 
                    onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select 
                    value={settings.timezone} 
                    onValueChange={(val) => setSettings({ ...settings, timezone: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                      <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                      <SelectItem value="cst">CST (Central Standard Time)</SelectItem>
                      <SelectItem value="mst">MST (Mountain Standard Time)</SelectItem>
                      <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select 
                    value={settings.dateFormat} 
                    onValueChange={(val) => setSettings({ ...settings, dateFormat: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="system-announcement">System Announcement</Label>
                <Textarea 
                  id="system-announcement" 
                  placeholder="Enter a system-wide announcement message"
                  value={settings.systemAnnouncement}
                  onChange={(e) => setSettings({ ...settings, systemAnnouncement: e.target.value })}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="show-announcement" 
                  checked={settings.showAnnouncement} 
                  onCheckedChange={(checked) => setSettings({ ...settings, showAnnouncement: checked })}
                />
                <Label htmlFor="show-announcement">Display announcement banner</Label>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Feature Configuration</CardTitle>
              <CardDescription>Enable or disable system features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">User Registration</h4>
                  <p className="text-sm text-muted-foreground">Allow new users to register accounts</p>
                </div>
                <Switch 
                  id="user-registration" 
                  checked={settings.userRegistration} 
                  onCheckedChange={(checked) => setSettings({ ...settings, userRegistration: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Shipment Tracking</h4>
                  <p className="text-sm text-muted-foreground">Enable shipment tracking features</p>
                </div>
                <Switch 
                  id="shipment-tracking" 
                  checked={settings.shipmentTracking} 
                  onCheckedChange={(checked) => setSettings({ ...settings, shipmentTracking: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Online Payments</h4>
                  <p className="text-sm text-muted-foreground">Allow users to make payments online</p>
                </div>
                <Switch 
                  id="online-payments" 
                  checked={settings.onlinePayments} 
                  onCheckedChange={(checked) => setSettings({ ...settings, onlinePayments: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Customer Reviews</h4>
                  <p className="text-sm text-muted-foreground">Enable customer review functionality</p>
                </div>
                <Switch 
                  id="customer-reviews" 
                  checked={settings.customerReviews} 
                  onCheckedChange={(checked) => setSettings({ ...settings, customerReviews: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Maintenance Mode</h4>
                  <p className="text-sm text-muted-foreground">Put the system in maintenance mode</p>
                </div>
                <Switch 
                  id="maintenance-mode" 
                  checked={settings.maintenanceMode} 
                  onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Settings</CardTitle>
              <CardDescription>Configure login and authentication options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input 
                  id="session-timeout" 
                  type="number" 
                  value={settings.sessionTimeout} 
                  onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) || 30 })}
                />
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">Require 2FA for administrator accounts</p>
                </div>
                <Switch 
                  id="require-2fa" 
                  checked={settings.require2fa} 
                  onCheckedChange={(checked) => setSettings({ ...settings, require2fa: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Password Complexity</h4>
                  <p className="text-sm text-muted-foreground">Enforce strong password requirements</p>
                </div>
                <Switch 
                  id="password-complexity" 
                  checked={settings.passwordComplexity} 
                  onCheckedChange={(checked) => setSettings({ ...settings, passwordComplexity: checked })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-attempts">Maximum Login Attempts</Label>
                <Input 
                  id="login-attempts" 
                  type="number" 
                  value={settings.loginAttempts} 
                  onChange={(e) => setSettings({ ...settings, loginAttempts: parseInt(e.target.value) || 5 })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                <Input 
                  id="password-expiry" 
                  type="number" 
                  value={settings.passwordExpiry} 
                  onChange={(e) => setSettings({ ...settings, passwordExpiry: parseInt(e.target.value) || 90 })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
              <CardDescription>Enable or disable communication channels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">Send email updates for key events</p>
                </div>
                <Switch 
                  id="email-notifications" 
                  checked={settings.emailNotifications} 
                  onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Push Notifications</h4>
                  <p className="text-sm text-muted-foreground">Send real-time browser notifications</p>
                </div>
                <Switch 
                  id="push-notifications" 
                  checked={settings.pushNotifications} 
                  onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">SMS Notifications</h4>
                  <p className="text-sm text-muted-foreground">Send text updates for urgent events</p>
                </div>
                <Switch 
                  id="sms-notifications" 
                  checked={settings.smsNotifications} 
                  onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Webhook Configuration</CardTitle>
              <CardDescription>Deliver real-time payloads to external endpoints</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Endpoint URL</Label>
                <Input 
                  id="webhook-url" 
                  placeholder="https://yourdomain.com/webhook"
                  value={settings.webhookUrl} 
                  onChange={(e) => setSettings({ ...settings, webhookUrl: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Integrations</CardTitle>
              <CardDescription>Manage third-party tools and services connected to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <div>
                    <h4 className="font-medium">Supabase</h4>
                    <p className="text-sm text-muted-foreground">Database & Auth services</p>
                  </div>
                </div>
                <Badge variant="default">Connected</Badge>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <div>
                    <h4 className="font-medium">Stripe</h4>
                    <p className="text-sm text-muted-foreground">Payment processor gateway</p>
                  </div>
                </div>
                <Badge variant="default">Connected</Badge>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <div>
                    <h4 className="font-medium">Google Analytics</h4>
                    <p className="text-sm text-muted-foreground">Usage tracking & statistics</p>
                  </div>
                </div>
                <Badge variant="default">Connected</Badge>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <div>
                    <h4 className="font-medium">DHL</h4>
                    <p className="text-sm text-muted-foreground">International shipping api</p>
                  </div>
                </div>
                <Badge variant="default">Connected</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={handleCancel}>Cancel Changes</Button>
        <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700">Save Settings</Button>
      </div>
    </div>
  );
};

export default SystemSettings;
