import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, CheckCircle } from "lucide-react";

const SOS = () => {
  const navigate = useNavigate();
  const [alertSent, setAlertSent] = useState(false);

  const handleSOS = () => {
    setAlertSent(true);
  };

  useEffect(() => {
    if (alertSent) {
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertSent, navigate]);

  return (
    <div className="min-h-screen bg-[hsl(var(--sos-red))]/10 flex flex-col items-center justify-center p-8">
      {!alertSent ? (
        <>
          <button
            onClick={handleSOS}
            className="w-64 h-64 rounded-full bg-[hsl(var(--sos-red))] text-[hsl(var(--sos-red-foreground))] shadow-2xl flex flex-col items-center justify-center font-bold text-3xl animate-pulse hover:scale-105 transition-transform mb-8"
          >
            <AlertCircle className="w-24 h-24 mb-4" strokeWidth={2} />
            SOS
          </button>
          <p className="text-center text-muted-foreground max-w-sm">
            Tap only in an emergency
          </p>
          <p className="text-center text-sm text-muted-foreground mt-2">
            This will alert police, travel office, and your emergency contacts
          </p>
        </>
      ) : (
        <div className="text-center">
          <div className="w-32 h-32 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-16 h-16" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Alert Sent Successfully</h2>
          <p className="text-muted-foreground mb-4">
            Emergency services have been notified
          </p>
          <p className="text-sm text-muted-foreground">
            Returning to dashboard...
          </p>
        </div>
      )}
    </div>
  );
};

export default SOS;
