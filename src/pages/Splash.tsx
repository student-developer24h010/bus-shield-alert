import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bus, Shield, MapPin } from "lucide-react";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-8">
      <div className="relative mb-8">
        <div className="relative flex items-center justify-center">
          <Shield className="w-32 h-32 text-primary-foreground absolute" strokeWidth={1.5} />
          <Bus className="w-16 h-16 text-primary-foreground z-10" />
          <MapPin className="w-12 h-12 text-[hsl(var(--sos-red))] absolute -bottom-2 -right-2" />
        </div>
      </div>
      <h1 className="text-4xl font-bold text-primary-foreground mb-2 tracking-wider">
        GN TRVELS
      </h1>
      <p className="text-primary-foreground/80 text-sm">Safe Travel. Smart System.</p>
    </div>
  );
};

export default Splash;
