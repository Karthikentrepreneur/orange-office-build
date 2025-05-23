import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
  backgroundCaptions = [
    "Documentation Services",
    "Sales Support Desk",
    "Digital Marketing for Logistics",
    "Account Management",
    "Software Solutions",
    "Customer Service & Nomination"
  ]
}: HeroProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [textVisible, setTextVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTextVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, [activeSlide]);

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
      setTextVisible(false);
      setActiveSlide(next);
    }
  };

  return (
    <section className="relative overflow-hidden min-h-[90vh] md:min-h-[100vh] flex flex-col justify-between bg-white">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <Slider {...settings}>
          {backgroundImages.map((img, idx) => (
            <div key={idx} className="relative w-full h-screen">
              <img src={img} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover object-center" />
            </div>
          ))}
        </Slider>
      </div>

      {/* Caption */}
      <div className="absolute bottom-44 left-1/2 transform -translate-x-1/2 z-20">
        <div
          className={`rounded-lg px-6 py-4 backdrop-blur-sm bg-black/30 border-l-4 border-r-4 border-orange-500 
          transition-opacity duration-500 transform ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h2 className="text-xl md:text-3xl font-bold text-white text-center">
            {backgroundCaptions[activeSlide]}
          </h2>
        </div>
      </div>

      {/* Scrolling Services Text */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 z-20">
        <div className="overflow-hidden whitespace-nowrap">
          <div
            className="inline-block text-white text-lg md:text-xl font-semibold px-4 py-2 bg-black/40 rounded-lg border-l-4 border-r-4 border-orange-500"
            style={{
              animation: "marquee 20s linear infinite",
              whiteSpace: "nowrap"
            }}
          >
            All Services: Documentation Services • Sales Support Desk • Digital Marketing • Account Management • Software Solutions • Customer Service & Nomination
          </div>
        </div>
      </div>

      {/* Keyframes for marquee animation */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
    </section>
  );
};
