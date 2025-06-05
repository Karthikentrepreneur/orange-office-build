// imports
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import LocationsSection from "@/components/LocationsSection";
import { Phone, Mail, MapPin, Send, User, Clock, Facebook, Linkedin } from "lucide-react";
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
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    setIsPageLoaded(true);
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  cconst handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    // Add the additional recipient email to the form data
    const formDataWithRecipient = {
      ...formData,
      _cc: "karthiktrendsandtactics@gmail.com", // Replace with your desired email
      _subject: `New Contact Form Submission: ${formData.subject}`,
      _template: "table", // Optional: formats the email nicely
      _captcha: "false" // Disable captcha for better UX
    };

    const response = await fetch("https://formsubmit.co/ajax/karthikjungleemara@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formDataWithRecipient),
    });

    const result = await response.json();

    if (result.success === "true") {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
        duration: 5000,
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } else {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        duration: 5000,
        variant: "destructive",
      });
    }
  } catch (error) {
    toast({
      title: "Something went wrong",
      description: "Unable to submit form. Try again later.",
      duration: 5000,
      variant: "destructive",
    });
  }
};

  // ... your officeLocations and socialIcons remain unchanged ...

  // return JSX starts here (shortened, rest remains unchanged)
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-orange-50">
      <Header />
      <GradientBackground variant="primary" intensity="medium" animated className="pt-28 pb-16">
        <section className="container mx-auto px-4 mt-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className={cn(
              "font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-4 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent transform transition-all duration-700",
              isPageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            )}>
              Let's Start a Conversation
            </h1>
            <p className={cn(
              "text-xl mb-6 text-gray-700 max-w-2xl mx-auto transform transition-all duration-700 delay-100",
              isPageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            )}>
              Discover how our innovative solutions can transform your logistics operations 
              and drive business growth
            </p>
          </div>
        </section>
      </GradientBackground>

      {/* continue rendering Contact form, office info, LocationsSection, Footer etc. as before */}
      
      {/* Don't forget to close return and component */}
      <Footer />
    </div>
  );
};

export default Contact;
