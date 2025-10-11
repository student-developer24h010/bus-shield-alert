import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Phone, Users } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [busStatus] = useState("online");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 pb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold">Bus TN 22 AB 1234</h1>
          <Badge variant={busStatus === "online" ? "default" : "destructive"} className="bg-green-500">
            {busStatus === "online" ? "Online" : "Offline"}
          </Badge>
        </div>
        <p className="text-primary-foreground/80 text-sm">Route: Chennai → Coimbatore</p>
      </div>

      {/* Map View */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
            </div>
            <p className="text-muted-foreground text-sm">Live GPS Tracking</p>
            <p className="text-xs text-muted-foreground mt-1">Bus location updated in real-time</p>
          </div>
        </div>

        {/* SOS Button */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2">
          <button
            onClick={() => navigate("/sos")}
            className="w-32 h-32 rounded-full bg-[hsl(var(--sos-red))] text-[hsl(var(--sos-red-foreground))] shadow-2xl flex flex-col items-center justify-center font-bold text-xl animate-pulse hover:scale-105 transition-transform"
          >
            <AlertCircle className="w-12 h-12 mb-2" />
            SOS
          </button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-6 bg-card border-t space-y-3">
        <Button variant="outline" className="w-full" size="lg">
          <Phone className="mr-2" />
          Contact Travel Office
        </Button>
        <Button variant="outline" className="w-full" size="lg">
          <Users className="mr-2" />
          My Family Contacts
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
