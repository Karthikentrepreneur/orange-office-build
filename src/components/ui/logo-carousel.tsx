import React from "react";
import { cn } from "@/lib/utils";
interface LogoCarouselProps {
  logos: {
    src: string;
    alt: string;
  }[];
  className?: string;
  autoScroll?: boolean;
  speed?: number; // pixels per second for scrolling speed
}
const LogoCarousel = ({
  logos,
  className,
  autoScroll = true,
  speed = 30 // pixels per second
}: LogoCarouselProps) => {
  // Calculate total width of logos block to set animation distance
  // Assume each logo container approx 200px width including margin (from previous code mx-8)
  // For smoother, precise calculation, one could measure but we'll approximate as 200px * logos.length

  const logosCount = logos.length;
  const logoWidthWithMargin = 200; // pixels approx including margin

  // Animation duration = total width / speed px per second
  const animationDuration = logosCount * logoWidthWithMargin * 2 / speed; // times 2 because logos duplicated

  return <>
      <style>
        {`
          @keyframes scrollLogos {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-${logosCount * logoWidthWithMargin}px);
            }
          }
        `}
      </style>
      <div className={cn("w-full overflow-hidden relative", className)}>
        <div className={cn("flex items-center whitespace-nowrap", autoScroll ? "animate-scroll-logos" : "")} style={{
        animationDuration: autoScroll ? `${animationDuration}s` : undefined,
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
        animationName: autoScroll ? "scrollLogos" : undefined,
        willChange: "transform"
      }} aria-label="Company logos carousel" role="region">
          {/* Duplicate logos for infinite scroll effect */}
          {[...logos, ...logos].map((logo, index) => <div key={index} className="mx-8 flex-shrink-0">
              <img src={logo.src} alt={logo.alt} loading="lazy" draggable={false} className="h-20 w-auto object-cover" />
            </div>)}
        </div>
      </div>
    </>;
};
export { LogoCarousel };