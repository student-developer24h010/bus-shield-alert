import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, AlertCircle, Power } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const buses = [
  { id: "TN 22 AB 1234", driver: "Raj Kumar", status: "online" },
  { id: "TN 22 CD 5678", driver: "Vijay Anand", status: "online" },
  { id: "TN 22 EF 9012", driver: "Kumar Swamy", status: "alert" },
  { id: "TN 22 GH 3456", driver: "Senthil Kumar", status: "offline" },
];

const alerts = [
  { bus: "TN 22 EF 9012", type: "GPS Device Disconnected", time: "2 min ago" },
  { bus: "TN 22 AB 1234", type: "Route deviation detected", time: "15 min ago" },
];

const Admin = () => {
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
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground p-6">
        <h1 className="text-2xl font-bold">Bus Control Panel</h1>
        <p className="text-primary-foreground/80 text-sm mt-1">GN TRVELS Admin Dashboard</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Real-time Alerts */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[hsl(var(--sos-red))]" />
            Active Alerts
          </h2>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <Card key={index} className="p-4 border-l-4 border-l-[hsl(var(--sos-red))]">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{alert.bus}</p>
                    <p className="text-sm text-muted-foreground">{alert.type}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="mt-3"
                  onClick={() => navigate("/engine-control")}
                >
                  View Details
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Bus Fleet */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Fleet Status</h2>
          <div className="space-y-3">
            {buses.map((bus) => (
              <Card key={bus.id} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-foreground">{bus.id}</p>
                    <p className="text-sm text-muted-foreground">{bus.driver}</p>
                  </div>
                  <Badge 
                    variant={bus.status === "online" ? "default" : bus.status === "alert" ? "destructive" : "secondary"}
                    className={bus.status === "online" ? "bg-green-500" : ""}
                  >
                    {bus.status}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    View Route
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Power className="w-4 h-4 mr-1" />
                    Engine Off
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
