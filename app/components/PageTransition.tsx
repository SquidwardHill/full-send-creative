import { useEffect, useState } from "react";
import { useLocation } from "@remix-run/react";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage("fadeOut");
    }
  }, [location, displayLocation]);

  useEffect(() => {
    if (transitionStage === "fadeOut") {
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage("fadeIn");
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [transitionStage, location]);

  useEffect(() => {
    if (transitionStage === "fadeIn") {
      const timer = setTimeout(() => {
        setTransitionStage("idle");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [transitionStage]);

  return (
    <div
      className={`transition-all duration-300 ${
        transitionStage === "fadeOut"
          ? "opacity-0 translate-y-4"
          : transitionStage === "fadeIn"
            ? "opacity-100 translate-y-0"
            : "opacity-100 translate-y-0"
      }`}
    >
      {children}
    </div>
  );
}
