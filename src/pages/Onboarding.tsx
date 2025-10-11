import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Shield, AlertCircle, ChevronRight } from "lucide-react";

const onboardingData = [
  {
    icon: MapPin,
    title: "Track your bus in real time",
    description: "Know exactly where your ride is anytime.",
  },
  {
    icon: Shield,
    title: "Automatic safety control",
    description: "Bus won't start or stops automatically if GPS fails.",
  },
  {
    icon: AlertCircle,
    title: "Instant help when it matters",
    description: "Send an alert to police, office, and family in one tap.",
  },
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < onboardingData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/login");
    }
  };

  const CurrentIcon = onboardingData[currentStep].icon;

  return (
    <div className="min-h-screen bg-background flex flex-col p-8">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-12 bg-primary/5 rounded-full p-16">
          <CurrentIcon className="w-24 h-24 text-primary" strokeWidth={1.5} />
        </div>
        
        <h2 className="text-3xl font-bold text-foreground text-center mb-4">
          {onboardingData[currentStep].title}
        </h2>
        
        <p className="text-muted-foreground text-center max-w-sm mb-12">
          {onboardingData[currentStep].description}
        </p>

        <div className="flex gap-2 mb-12">
          {onboardingData.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentStep ? "w-8 bg-primary" : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      <Button onClick={handleNext} size="lg" className="w-full">
        {currentStep === onboardingData.length - 1 ? "Get Started" : "Next"}
        <ChevronRight className="ml-2" />
      </Button>
    </div>
  );
};

export default Onboarding;
