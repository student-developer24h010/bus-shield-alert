import { useEffect, useState } from "react";
import { AlertTriangle, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const EngineControl = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Please log in to access this page");
        navigate("/auth");
        return;
      }

      // Check if user has admin role
      const { data: roles, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (error || !roles) {
        toast.error("Access denied. Admin privileges required.");
        navigate("/dashboard");
        return;
      }

      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background/50 backdrop-blur-sm flex items-center justify-center p-8">
      <div className="bg-card rounded-2xl p-8 max-w-md w-full shadow-2xl border-2 border-[hsl(var(--sos-red))]/20">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-[hsl(var(--sos-red))]/10 flex items-center justify-center mb-6 animate-pulse">
            <AlertTriangle className="w-12 h-12 text-[hsl(var(--sos-red))]" strokeWidth={2} />
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-2">System Alert</h2>
          
          <div className="bg-muted rounded-lg p-4 mb-6 w-full">
            <p className="text-sm text-muted-foreground mb-1">Bus ID</p>
            <p className="font-semibold text-foreground">TN 22 EF 9012</p>
          </div>

          <div className="bg-[hsl(var(--sos-red))]/5 border border-[hsl(var(--sos-red))]/20 rounded-lg p-4 mb-6 w-full">
            <div className="flex items-start gap-3">
              <Power className="w-5 h-5 text-[hsl(var(--sos-red))] mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className="font-semibold text-foreground mb-1">GPS Device Disconnected</p>
                <p className="text-sm text-muted-foreground">
                  Engine has been automatically disabled for safety. The vehicle cannot be started until the GPS device is reconnected and verified.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 w-full">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate("/admin")}
            >
              Back to Dashboard
            </Button>
            <Button 
              variant="default" 
              className="w-full bg-[hsl(var(--sos-red))] hover:bg-[hsl(var(--sos-red))]/90"
            >
              Contact Technical Support
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            Safety system active • GN TRVELS
          </p>
        </div>
      </div>
    </div>
  );
};

export default EngineControl;
