
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
export const Footer = () => {
  return <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-500/20 to-transparent" />
      
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img alt="Orange Office Technologies" className="h-12 w-auto bg-white/10 p-2 rounded-lg backdrop-blur-sm" src="/lovable-uploads/8b06ebf9-b79a-4441-9151-cb857e520c88.png" />
            </Link>
            <p className="text-sm text-gray-400">
              Orange Office Technologies Pvt Ltd. is a Neutral KPO Service Provider offering expert services in logistics operations.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/people/Orange-Office-Technologies-Pvt-Ltd/61566454888473/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/orange-office-technologies-pvt-ltd/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[{
              to: "/about",
              label: "About Us"
            }, {
              to: "/services",
              label: "Our Services"
            }, {
              to: "/clients",
              label: "Clients"
            }, {
              to: "/careers",
              label: "Careers"
            }, {
              to: "/contact",
              label: "Contact"
            }].map((link, index) => <li key={index}>
                  <Link to={link.to} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-gray-400">
                <MapPin size={20} className="text-primary flex-shrink-0 mt-1" />
                <span>KAIZEN" 2nd &amp; 3rd Floor ,New No.G3 (Old No.G1), G Block, Plot No.565Q, 18th Street, Chinthamani, Anna Nagar East, 
   Chennai 600102.</span>
              </li>
              {/* Added Kochi Office address */}
              <li className="flex items-start space-x-3 text-sm text-gray-400">
                <MapPin size={20} className="text-primary flex-shrink-0 mt-1" />
                <span>
                  No 34/656, Neelima, Toll Jn, Edappally, Ernakulam, Kochi, Kerala 682024.
                  <div className="text-xs text-gray-500">(Landmark: OPP Metro Pillar 394)</div>
                </span>
              </li>
              {/* Added Kochi Office 2 address */}
              <li className="flex items-start space-x-3 text-sm text-gray-400">
                <MapPin size={20} className="text-primary flex-shrink-0 mt-1" />
                <span>
                 C.V.M Arcade, 1st & 2nd Floor , Club Junction Pukkattupady Road,Edappally - 682024.
                  <div className="text-xs text-gray-500"></div>
                </span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <Phone size={20} className="text-primary flex-shrink-0" />
                <span>+91 44 4796 5437</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <Mail size={20} className="text-primary flex-shrink-0" />
                <span>info@orangeot.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to our newsletter for updates and insights.
            </p>
            <div className="space-y-3">
              <Input type="email" placeholder="Your email" className="bg-white/5 border-gray-800 text-white placeholder:text-gray-500" />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Orange Office Technologies Pvt Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
