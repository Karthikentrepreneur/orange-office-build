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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-orange-50">
      <Header />
      <main className="flex-grow pt-20">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4 text-gradient bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                Meet Our Management Team
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                The driving force behind OOT's innovation and success
              </p>
            </div>

            {/* Director Card */}
            <div className="max-w-5xl mx-auto mb-16">
              <Card className="border-none shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden bg-white rounded-3xl">
                <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2">
                  <div className="relative aspect-[4/3] md:max-h-[400px] overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                    <img
                      src="/lovable-uploads/8c197c79-48aa-49bc-87a8-fbf680fa6afd.png"
                      alt="Mr. Sudhir KU"
                      className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="p-6 text-center absolute bottom-0 w-full">
                      <h3 className="text-3xl font-bold mb-1 text-white">Mr. Sudhir KU</h3>
                      <p className="text-white/90 text-xl">Director</p>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 bg-gradient-to-br from-white to-orange-50/30">
                    <p className="text-gray-700 mb-4">
                      Mr. Sudhir KU, the Director of Orange Office Technologies Pvt Ltd, brings a rich professional journey spanning over 35 years.
                    </p>
                    <p className="text-gray-700 mb-4">
                      Starting in the courier industry in 1991, he progressed into freight forwarding, extending operations to Dubai and Singapore.
                    </p>
                    <p className="text-gray-700 mb-6">
                      In 2012, he founded Orange Office Technologies Pvt Ltd to address back-office support in logistics, setting benchmarks in the industry.
                    </p>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Areas of Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {expertises.map((expertise, index) => (
                        <span key={index} className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
                          {expertise}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Journey Section */}
            <section className="py-10 bg-white">
              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-slate-100 rounded-2xl shadow-xl">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <Award className="text-white bg-gradient-to-br from-amber-500 to-orange-400 p-2 rounded-full w-14 h-14 shadow-lg" />
                      <h4 className="text-xl font-semibold">Key Achievements</h4>
                    </div>
                    <ul className="space-y-3">
                      {achievements.map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <Star className="h-4 w-4 text-amber-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-white/80 rounded-2xl shadow-xl">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <Calendar className="text-white bg-gradient-to-br from-blue-500 to-cyan-400 p-2 rounded-full w-14 h-14 shadow-lg" />
                      <h4 className="text-xl font-semibold">Career Milestones</h4>
                    </div>
                    <div className="border-l-2 border-gray-200 pl-6 space-y-4">
                      {milestones.map((milestone, i) => (
                        <div key={i}>
                          <span className="bg-orange-100 text-orange-500 px-3 py-1 rounded-full text-sm font-medium inline-block mb-1">
                            {milestone.year}
                          </span>
                          <p>{milestone.event}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* CTO Section */}
            <div id="cto" className="max-w-5xl mx-auto mt-12 scroll-mt-24">
              <Card className="border-none shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden bg-white rounded-3xl">
                <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2">
                  <div className="relative aspect-[4/3] md:max-h-[400px] overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                    <img
                      src="/bennetSir.png"
                      alt="Mr. Bennet Rajesh"
                      className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6 md:p-8 bg-gradient-to-br from-white to-blue-50/30">
                    <h3 className="text-3xl font-bold text-orange-500">Mr. Bennet Rajesh</h3>
                    <p className="text-xl text-orange-400 mb-4">Chief Technology Officer</p>
                    <p className="text-gray-700 mb-4">"Architecting cutting-edge solutions to redefine industry standards."</p>
                    <p className="text-gray-700 mb-4">With 27 years of experience in software development, Mr. Bennet is a seasoned Java Enterprise Architect, Developer, and Mentor.</p>
                    <p className="text-gray-700 mb-4">His expertise spans Java, Spring, JPA, MERN stack, Microservices, DevOps, and Cloud Computing. He is a champion of Agile, automation, and product thinking.</p>
                    <p className="text-gray-700 mb-6">As CTO, he steers the technological vision of the company, ensuring seamless integration of advanced enterprise solutions.</p>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Technological Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {ctoExpertises.map((item, index) => (
                        <span key={index} className="px-3 py-1 bg-orange-100 text-orange-500 rounded-full text-sm font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Management;
