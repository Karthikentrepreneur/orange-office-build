import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const navItems = [{
    to: "/",
    label: "Home"
  }, {
    to: "/about",
    label: "About Us"
  }, {
    to: "/services",
    label: "Services"
  }, {
    to: "/management",
    label: "Management"
  }, {
    to: "/careers",
    label: "Careers"
  }, {
    to: "/clients",
    label: "Clients"
  }];
  return <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-start">
              <img alt="Orange Office Technologies" className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-110 sm:h-10" src="/lovable-uploads/1c509753-a7c8-4889-be12-c391eed30fe3.png" />
              <div className="ml-2 flex flex-col">
                <Link to="/" className="group" aria-label="Home">
                  <span className="font-heading text-base sm:text-lg md:text-xl font-semibold text-gray-800 group-hover:text-orange-500 transition-colors duration-300">Orange Office Technologies Pvt Ltd</span>
                </Link>
                <p className="font-medium text-gray-800 text-xs sm:text-sm">Logistics KPO Excellence</p>
              </div>
            </div>
            
            <div className="mt-1 ml-0">
              <p className="text-gray-600 text-xs sm:text-sm">Back office, IT Solutions, Digital Marketing, Inside Sales</p>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map(item => <Link key={item.label} to={item.to} className={`font-medium transition-colors duration-300 relative text-gray-800 hover:text-orange-500
                after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 
                after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 
                hover:after:origin-bottom-left after:bg-orange-500 ${location.pathname === item.to ? "text-orange-500 after:scale-x-100 after:bg-orange-500" : ""}`}>
                {item.label}
              </Link>)}

            <Button className="text-sm sm:text-base bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md hover:shadow-lg transition-all duration-300 btn-hover-shine rounded-xl text-white py-0 px-4">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </nav>

          {/* Mobile menu toggle button */}
          <div className="md:hidden flex items-center">
            <button className="ml-2 p-2 hover:bg-gray-100/10 rounded-lg transition-colors text-gray-800" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" aria-expanded={isMenuOpen}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {isMenuOpen && <div className="md:hidden bg-white/95 backdrop-blur-md border-b animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            {navItems.map(item => <Link key={item.label} to={item.to} className={`text-base text-gray-800 hover:text-orange-500 font-medium py-2 transition-colors duration-300 ${location.pathname === item.to ? "text-orange-500" : ""}`} onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </Link>)}
            <Button className="w-full text-base bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md hover:shadow-lg transition-all duration-300 btn-hover-shine rounded-xl text-white">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </nav>
        </div>}
    </header>;
};