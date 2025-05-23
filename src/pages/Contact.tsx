import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import LocationsSection from './components/MapComponent';
import { Phone, Mail, MapPin, Send, User, Clock, Facebook, Linkedin, ContactIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { GradientBackground } from "@/components/GradientBackground";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
const Contact = () => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  // Animation states
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  useEffect(() => {
    setIsPageLoaded(true);
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

    // Show success toast with enhanced styling
    toast({
      title: "Message Sent Successfully!",
      description: "We'll get back to you as soon as possible.",
      duration: 5000
    });

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  // Map locations for Chennai and Kochi offices
  const officeLocations = [{
    title: "Chennai - Headquarters",
    description: "KAIZEN 2nd & 3rd Floor, New No.G3 (Old No.G1), G Block, Plot No.565Q, 18th Street, Chinthamani, Anna Nagar East, Chennai: 600102",
    coordinates: [80.2707, 13.0827],
    timing: "Mon - Fri: 9:00 AM - 6:00 PM",
    phone: "+91 44 4796 5437",
    email: "info@orangeot.com"
  }, {
    title: "Kochi Office",
    description: "No 34/656, Neelima, Toll Jn, Edappally, Ernakulam, Kochi, Kerala 682024, (Landmark: OPP Metro Pillar 394)",
    coordinates: [76.3219, 9.9816],
    timing: "Mon - Fri: 9:00 AM - 6:00 PM",
    phone: "+91 44 4796 5437",
    email: "info@orangeot.com"
  }, {
    title: "Kochi Office",
    description: "C.V.M Arcade, 1st & 2nd Floor , Club Junction Pukkattupady Road, Edappally - 682024",
    coordinates: [76.3219, 9.9816],
    timing: "Mon - Fri: 9:00 AM - 6:00 PM",
    phone: "+91 44 4796 5437",
    email: "info@orangeot.com"
  }];

  // Social media icons with updated links
  const socialIcons = {
    facebook: <a href="https://www.facebook.com/people/Orange-Office-Technologies-Pvt-Ltd/61566454888473/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Facebook size={20} /></a>,
    linkedin: <a href="https://www.linkedin.com/company/orange-office-technologies-pvt-ltd/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Linkedin size={20} /></a>
  };
  return <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-orange-50">
      <Header />
      
      {/* Enhanced Hero Section with Gradient */}
      <GradientBackground variant="primary" intensity="medium" animated={true} className="pt-28 pb-16">
        <section className="container mx-auto px-4 mt-20">
          <div className="max-w-4xl mx-auto text-center">
            
            
            <h1 className={cn("font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-4 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent transform transition-all duration-700", isPageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5")}>
              Let's Start a Conversation
            </h1>
            
            <p className={cn("text-xl mb-6 text-gray-700 max-w-2xl mx-auto transform transition-all duration-700 delay-100", isPageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5")}>
              Discover how our innovative solutions can transform your logistics operations 
              and drive business growth
            </p>
          </div>
        </section>
      </GradientBackground>

      {/* Contact Form & Info Section */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Form - Wider */}
            <div className={cn("lg:col-span-3 transform transition-all duration-700 delay-200", isPageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5")}>
              <Card className="overflow-hidden border-none rounded-2xl shadow-2xl backdrop-blur-lg bg-white/90 hover:shadow-orange-200/20 hover:shadow-2xl transition-all duration-500">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2"></div>
                <CardContent className="p-6 md:p-8">
                  <h2 className="font-heading font-bold text-2xl md:text-3xl mb-5 text-gray-800">Send Us a Message</h2>
                  
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1 group">
                        <label htmlFor="firstName" className="text-sm font-medium text-gray-700 transition-colors group-focus-within:text-primary">
                          First Name
                        </label>
                        <div className="relative">
                          <Input id="firstName" name="firstName" placeholder="John" className="pl-10 bg-gray-50/50 border-gray-200 focus:border-primary transition-all h-11" value={formData.firstName} onChange={handleInputChange} required />
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                      
                      <div className="space-y-1 group">
                        <label htmlFor="lastName" className="text-sm font-medium text-gray-700 transition-colors group-focus-within:text-primary">
                          Last Name
                        </label>
                        <div className="relative">
                          <Input id="lastName" name="lastName" placeholder="Doe" className="pl-10 bg-gray-50/50 border-gray-200 focus:border-primary transition-all h-11" value={formData.lastName} onChange={handleInputChange} required />
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1 group">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700 transition-colors group-focus-within:text-primary">
                        Email Address
                      </label>
                      <div className="relative">
                        <Input id="email" name="email" placeholder="you@example.com" type="email" className="pl-10 bg-gray-50/50 border-gray-200 focus:border-primary transition-all h-11" value={formData.email} onChange={handleInputChange} required />
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="space-y-1 group">
                      <label htmlFor="phone" className="text-sm font-medium text-gray-700 transition-colors group-focus-within:text-primary">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Input id="phone" name="phone" placeholder="+91 98765 43210" type="tel" className="pl-10 bg-gray-50/50 border-gray-200 focus:border-primary transition-all h-11" value={formData.phone} onChange={handleInputChange} />
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                        Subject
                      </label>
                      <Input id="subject" name="subject" placeholder="How can we help you?" className="bg-gray-50/50 border-gray-200 focus:border-primary transition-all h-11" value={formData.subject} onChange={handleInputChange} required />
                    </div>
                    
                    <div className="space-y-1">
                      <label htmlFor="message" className="text-sm font-medium text-gray-700">
                        Your Message
                      </label>
                      <Textarea id="message" name="message" placeholder="Please provide details about your inquiry..." className="bg-gray-50/50 border-gray-200 focus:border-primary transition-all min-h-[120px] resize-none" value={formData.message} onChange={handleInputChange} required />
                    </div>
                    
                    <Button type="submit" className="w-full h-11 text-base group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300">
                      <span className="relative z-10 flex items-center gap-2">
                        Send Message
                        <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information - Narrower */}
            <div className={cn("lg:col-span-2 space-y-6", isPageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5")}>
              <div>
                <h2 className="font-heading font-bold text-2xl mb-5 text-gray-800">Our Offices</h2>
                
                <div className="space-y-5 mb-6">
                  {officeLocations.map((office, index) => <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group">
                      <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                      <CardContent className="p-5">
                        <h3 className="font-bold text-lg mb-2 flex items-center text-gray-800 group-hover:text-orange-500 transition-colors">
                          <MapPin className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                          {office.title}
                        </h3>
                        <div className="pl-7">
                          <p className="text-gray-600 mb-2 text-sm">
                            {office.description}
                          </p>
                          
                          <div className="flex items-center text-gray-500 mb-1">
                            <Clock className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-sm">{office.timing}</span>
                          </div>
                          
                          <div className="flex items-center text-gray-500 mb-1">
                            <Phone className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-sm">{office.phone}</span>
                          </div>
                          
                          <div className="flex items-center text-gray-500">
                            <Mail className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-sm">{office.email}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>)}
                </div>
              </div>
              
              {/* Connect With Us - Social Media */}
              <Card className="border-none shadow-lg overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <CardContent className="p-5">
                  <h2 className="font-bold text-xl mb-3">Connect With Us</h2>
                  <p className="text-white/90 mb-4 text-sm">Follow us on social media to stay updated with our latest news and offers</p>
                  
                  <div className="flex space-x-3 bg-inherit">
                    {socialIcons.facebook}
                    {socialIcons.linkedin}
                  </div>
                </CardContent>
              </Card>
              
              {/* Quick Contact Card */}
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-500">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-1"></div>
                
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Full Width with Proper Styling */}
      {/* Map Section - Full Width with Proper Styling */}
    <section className="py-12 bg-white relative">
  <div className="container mx-auto px-4 mb-8">
    <div className="text-center max-w-3xl mx-auto mb-8">
      <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3 text-gray-800">Visit Our Locations</h2>
      <p className="text-lg text-gray-600">Find us at our convenient office locations in Chennai and Kochi</p>
    </div>
  </div>

  <div className="relative w-full h-[450px] overflow-hidden shadow-2xl rounded-none md:rounded-lg mx-auto max-w-7xl">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.1544442225477!2d80.22267627572437!3d13.089396612283391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52642e68adc059%3A0x44809bfe043deede!2sOrange%20Office%20Technologies%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1746282320085!5m2!1sen!2sin" width="100%" height="100%" style={{
          border: 0
        }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Chennai Location" className="absolute inset-0" />
  </div>

  <div className="relative w-full h-[450px] overflow-hidden shadow-2xl rounded-none md:rounded-lg mx-auto max-w-7xl mt-10">
    <iframe src="https://www.google.com/maps/d/embed?mid=1P9GHdOjApQAyc4RCcuOEXbXNjpzfy_Y&ehbc=2E312F" width="100%" height="100%" style={{
          border: 0
        }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Kochi Location" className="absolute inset-0" />
  </div>


      {/* Other content */}
      <LocationsSection />
      
    </section>

      <Footer />
    </div>;
};
export default Contact;
