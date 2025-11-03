import { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { ShoppingBag, Sparkles } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "login" | "register";
}

export const AuthModal = ({ open, onOpenChange, defaultTab = "login" }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleSuccess = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 gap-0 overflow-hidden">
        {/* Header with gradient background */}
        <div className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 px-8 py-10 text-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />

          <div className="relative flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold">ClassiMarket</h2>
          </div>

          <p className="relative text-white/90 text-sm leading-relaxed">
            {activeTab === "login"
              ? "Welcome back! Login to continue buying and selling amazing products."
              : "Join our community and start discovering great deals today."}
          </p>

          {activeTab === "register" && (
            <div className="relative mt-4 flex items-center gap-2 text-xs text-white/80">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Free to join • Secure • Trusted by thousands</span>
            </div>
          )}
        </div>

        {/* Form Content */}
        <div className="px-8 py-6">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "register")}>
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-0">
              <LoginForm onSuccess={handleSuccess} />
            </TabsContent>

            <TabsContent value="register" className="mt-0">
              <RegisterForm onSuccess={handleSuccess} />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};