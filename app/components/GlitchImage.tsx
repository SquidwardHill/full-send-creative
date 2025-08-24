import { useEffect, useRef, useState } from "react";
import "~/assets/styles/animations/glitch.css";

interface GlitchImageProps {
  srcTop: string;
  srcBottom: string;
  srcDecorator?: string; 
  alt?: string;
  className?: string;
}

export function GlitchImage({
  srcTop,
  srcBottom,
  srcDecorator,
  alt = "",
  className = "",
}: GlitchImageProps) {
  const [glitchActive, setGlitchActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startGlitchLoop = () => {
      intervalRef.current = setInterval(
        () => {
          setGlitchActive(true);
          timeoutRef.current = setTimeout(
            () => {
              setGlitchActive(false);
            },
            Math.random() * 100 + 100
          ); // glitch duration
        },
        Math.random() * 1200 + 800
      ); // glitch interval
    };

    startGlitchLoop();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className={`relative inline-block overflow-hidden ${className} `}>
      {srcDecorator && (
        <img
          src={srcDecorator}
          alt="Decorator"
          className="absolute top-0 left-0 z-10 animate-pulse-subtle"
        />
      )}

      {/* Red-shifted glitch layer */}
      <img
        src={srcTop}
        alt=""
        aria-hidden
        className="absolute top-1 left-1 z-1 glitch-1 w-full h-full p-4"
      />

      {/* Blue-shifted glitch layer */}
      <img
        src={srcBottom}
        alt=""
        aria-hidden
        className="absolute top-0 left-0 z-0 glitch-2 w-full h-full p-4"
      />
    </div>
  );
}
