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

  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    fade: true,
    speed: 1000,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    beforeChange: (_current: number, next: number) => setActiveSlide(next)
  };

  return (
    <section className="relative overflow-hidden min-h-[90vh] md:min-h-[100vh] flex items-center justify-start bg-black text-white">
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0">
        <Slider {...settings}>
          {backgroundImages.map((img, idx) => (
            <div key={idx} className="relative w-full h-screen">
              <img
                src={img}
                alt={`Slide ${idx + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Left Aligned Content */}
      <div className="z-20 px-6 md:px-16 max-w-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
          Orange Office Technologies Pvt Ltd
        </h1>

        {/* Buttons for services */}
        <div className="flex flex-col gap-2 mb-6">
          {backgroundCaptions.map((caption, idx) => (
            <div
              key={idx}
              className={`w-fit px-5 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
                idx === activeSlide
                  ? "bg-orange-500 text-white border-orange-600 shadow-lg scale-105"
                  : "bg-white/10 text-white/80 border-white/20"
              }`}
            >
              {caption}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link to="/services">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-lg rounded-xl shadow-lg transition-all duration-300">
            Explore Services <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
};
