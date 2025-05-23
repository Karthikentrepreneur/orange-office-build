import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
interface HeroProps {
  backgroundImages?: string[];
  backgroundCaptions?: string[];
}
export const Hero = ({
  backgroundImages = ["/1h.png", "/15h.png", "/14h.png", "/16h.png", "/18h.png", "/17h.png"],
  backgroundCaptions = ["Documentation Services", "Sales Support Desk", "Digital Marketing for Logistics", "Account Management", "Software Solutions", "Customer Service & Nomination"]
}: HeroProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const settings = {
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true,
    fade: true,
    speed: 1000,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    beforeChange: (_current: number, next: number) => {
      setActiveSlide(next);
    }
  };
  return <section className="relative overflow-hidden min-h-[90vh] md:min-h-[100vh] flex flex-col justify-between bg-white">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <Slider {...settings}>
          {backgroundImages.map((img, idx) => <div key={idx} className="relative w-full h-screen">
              <img src={img} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover object-center" />
            </div>)}
        </Slider>
      </div>

      {/* Marquee Section - Fixed positioning and overflow */}
      <div className="absolute bottom-6 left-0 right-0 z-20 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-4 my-[56px]">
          {/* Duplicate the captions for seamless loop */}
          {[...backgroundCaptions, ...backgroundCaptions, ...backgroundCaptions].map((caption, index) => <div key={index} className="inline-flex items-center mx-6 flex-shrink-0">
              <span className="text-black text-lg md:text-2xl font-semibold bg-white px-6 py-3 rounded-md relative shadow-lg">
                <span className="absolute left-0 top-0 h-full w-1 rounded-l-md bg-orange-500" />
                <span className="absolute right-0 top-0 h-full w-1 rounded-r-md bg-orange-500" />
                {caption}
              </span>
            </div>)}
        </div>
      </div>

      {/* Foreground Content */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col justify-between h-full">
        <div className="flex-grow flex items-center">
          {/* Add your foreground content here */}
        </div>
      </div>

      {/* Marquee animation CSS - Updated for better performance */}
      <style>
        {`
          @keyframes marquee {
            0% { 
              transform: translateX(0); 
            }
            100% { 
              transform: translateX(-33.333%); 
            }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
            display: flex;
            width: max-content;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </section>;
};