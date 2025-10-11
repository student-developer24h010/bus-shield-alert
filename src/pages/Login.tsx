import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bus, Shield, MapPin } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("passenger");

  const handleLogin = () => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-8">
      <div className="flex flex-col items-center mb-12 mt-8">
        <div className="relative mb-6">
          <div className="relative flex items-center justify-center">
            <Shield className="w-20 h-20 text-primary absolute" strokeWidth={1.5} />
            <Bus className="w-10 h-10 text-primary z-10" />
            <MapPin className="w-8 h-8 text-[hsl(var(--sos-red))] absolute -bottom-1 -right-1" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground tracking-wider">GN TRVELS</h1>
      </div>

      <div className="flex-1">
        <h2 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h2>
        <p className="text-muted-foreground mb-8">Login to continue your journey</p>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email / Phone</Label>
            <Input id="email" type="text" placeholder="Enter your email or phone" className="mt-2" />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" className="mt-2" />
          </div>

          <div>
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="passenger">Passenger</SelectItem>
                <SelectItem value="parent">Parent</SelectItem>
                <SelectItem value="driver">Driver</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleLogin} className="w-full mt-6" size="lg">
            Login
          </Button>

          <div className="text-center mt-4">
            <button className="text-primary text-sm hover:underline">
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
