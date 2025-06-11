import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Star, Calendar } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Management = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  const achievements = [
    "35+ years of industry experience",
    "Pioneered specialized back-office services for freight forwarding",
    "Expanded operations across multiple global locations",
    "Led digital transformation initiatives in logistics sector"
  ];

  const milestones = [
    { year: "1991", event: "Started professional journey in the courier industry" },
    { year: "1990s-2000s", event: "Advanced into logistics and freight forwarding sector" },
    { year: "2012", event: "Founded Orange Office Technologies Pvt Ltd" },
    { year: "Present", event: "Leading global expansion and digital transformation initiatives" }
  ];

  const expertises = [
    "Back-office operations", "Supply chain management", "Digital transformation",
    "Global logistics", "Strategic partnerships", "IT solutions"
  ];

  const ctoExpertises = [
    "Java, Spring, JPA", "MERN Stack", "Microservices & DevOps",
    "Cloud Computing", "Enterprise Integration", "Security & Automation"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-orange-50 to-orange-100 text-gray-800">
      <Header />
      <main className="flex-grow pt-24">
        {/* Hero */}
        <section className="relative w-full">
          <div className="w-full h-64 md:h-96 overflow-hidden">
            <img
              src="/lovable-uploads/8c197c79-48aa-49bc-87a8-fbf680fa6afd.png"
              alt="Management Team"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center px-4">
              <h1 className="text-4xl md:text-5xl font-bold animate-fade-in mb-3">
                Meet Our Management Team
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl animate-fade-in delay-100">
                The driving force behind OOT's innovation and success
              </p>
            </div>
          </div>
        </section>

        {/* Director */}
        <section className="px-4 py-16 container mx-auto max-w-6xl">
          <Card className="shadow-2xl rounded-3xl bg-white transition-transform hover:scale-[1.01]">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="/lovable-uploads/8c197c79-48aa-49bc-87a8-fbf680fa6afd.png"
                    alt="Mr. Sudhir KU"
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl md:text-4xl font-bold mb-2">Mr. Sudhir KU</h3>
                  <p className="text-orange-600 text-xl font-semibold mb-4">Director</p>
                  <p className="mb-3 text-gray-700">
                    Mr. Sudhir KU brings a rich professional journey spanning over 35 years. From the courier industry in 1991, he moved into global freight forwarding.
                  </p>
                  <p className="mb-3 text-gray-700">
                    In 2012, he founded Orange Office Technologies Pvt Ltd, revolutionizing back-office support in logistics.
                  </p>
                  <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Areas of Expertise</h4>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {expertises.map((item, idx) => (
                      <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Journey */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              Professional Journey & Impact
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Achievements */}
              <Card className="bg-amber-50 shadow-xl rounded-2xl">
                <CardContent className="p-6 md:p-8 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="text-orange-600" />
                    <h3 className="text-xl font-semibold">Key Achievements</h3>
                  </div>
                  <ul className="space-y-3">
                    {achievements.map((a, i) => (
                      <li key={i} className="flex gap-3 items-center">
                        <Star className="text-amber-500 w-5 h-5" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Milestones */}
              <Card className="bg-blue-50 shadow-xl rounded-2xl">
                <CardContent className="p-6 md:p-8 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="text-blue-600" />
                    <h3 className="text-xl font-semibold">Career Milestones</h3>
                  </div>
                  <div className="border-l-2 pl-6 space-y-6 border-blue-200">
                    {milestones.map((m, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-3 top-1.5 w-3 h-3 rounded-full bg-blue-500 border-white border-2"></div>
                        <p className="text-sm font-medium text-blue-600">{m.year}</p>
                        <p className="text-gray-700">{m.event}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Vision */}
            <Card className="mt-10 bg-gradient-to-br from-amber-100 to-white rounded-2xl shadow-xl">
              <CardContent className="p-8 grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Legacy</h3>
                  <p className="text-gray-700">His strategic foresight expanded Orange Office into a global service provider, empowering logistics worldwide.</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Vision</h3>
                  <p className="text-gray-700">Mr. Sudhir envisions logistics firms outsourcing complexity to specialized experts, driving innovation and satisfaction.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTO */}
        <section id="cto" className="py-16 bg-white px-4">
          <div className="container mx-auto max-w-6xl">
            <Card className="shadow-2xl rounded-3xl">
              <CardContent className="p-8 flex flex-col md:flex-row gap-8 items-center">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="/lovable-uploads/9c915285-b3ef-47f9-b225-6e1d0680e58a.png"
                    alt="Mr. Bennet Rajesh"
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-bold text-orange-600 mb-1">Mr. Bennet Rajesh</h3>
                  <p className="text-xl text-orange-500 font-medium mb-4">Chief Technology Officer</p>
                  <p className="mb-3">"Architecting cutting-edge solutions to redefine industry standards."</p>
                  <p className="mb-3 text-gray-700">With 27 years in software, Mr. Bennet excels as a Java Enterprise Architect and mentor, proficient in Spring, MERN, Microservices, and Cloud.</p>
                  <h4 className="mt-6 mb-3 font-semibold text-gray-800">Technological Expertise</h4>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {ctoExpertises.map((item, i) => (
                      <span key={i} className="px-3 py-1 bg-orange-100 text-orange-600 text-sm rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Management;
