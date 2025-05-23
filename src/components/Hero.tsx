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
    autoplaySpeed: 5000,
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
    <section className="relative overflow-hidden min-h-[90vh] md:min-h-[100vh] flex items-center justify-center bg-black text-white">
      {/* Background Carousel */}
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

      {/* Overlay Content */}
      <div className="z-20 text-center px-4 max-w-3xl">
        <h1
          className={`text-3xl md:text-5xl font-extrabold tracking-tight mb-4 transition-all duration-700 ${
            textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {backgroundCaptions[activeSlide]}
        </h1>

        <p className="text-md md:text-lg mb-6 text-white/90">
          Empowering Logistics and Digital Services with Smart, Scalable Solutions.
        </p>

        <Link to="/services">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-lg rounded-xl shadow-lg transition-all duration-300">
            Explore Services <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>

      {/* Service Buttons */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-wrap justify-center gap-2 px-4">
        {backgroundCaptions.map((caption, idx) => (
          <div
            key={idx}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
              idx === activeSlide
                ? "bg-orange-500 text-white border-orange-600 shadow-lg scale-105"
                : "bg-white/10 text-white/80 border-white/20 hover:bg-white/20"
            }`}
          >
            {caption}
          </div>
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
    </section>
  );
};
