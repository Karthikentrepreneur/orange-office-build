import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Star, Calendar } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

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
    "Led digital transformation initiatives in logistics sector",
  ];

  const milestones = [
    { year: "1991", event: "Started professional journey in the courier industry" },
    { year: "1990s-2000s", event: "Advanced into logistics and freight forwarding sector" },
    { year: "2012", event: "Founded Orange Office Technologies Pvt Ltd" },
    { year: "Present", event: "Leading global expansion and digital transformation initiatives" },
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
        <section className="py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-5" />
          <div className="container mx-auto px-4 relative z-10">

            {/* Page Header */}
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 text-transparent bg-clip-text animate-fade-in">
                Meet Our Management Team
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg animate-fade-in delay-75">
                The driving force behind OOT's innovation and success
              </p>
            </div>

            {/* Director Card */}
            <div className="max-w-5xl mx-auto mb-16">
              <Card className="border-none shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden rounded-3xl bg-white">
                <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2">
                  <div className="relative max-h-[450px] overflow-hidden">
                    <img
                      src="/lovable-uploads/8c197c79-48aa-49bc-87a8-fbf680fa6afd.png"
                      alt="Mr. Sudhir KU"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="p-6 md:p-8 text-center absolute bottom-0 w-full">
                      <h3 className="text-3xl font-bold text-white">Mr. Sudhir KU</h3>
                      <p className="text-white/90 text-xl">Director</p>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 bg-gradient-to-br from-white to-orange-50/30">
                    <p className="text-gray-700 mb-4">
                      Mr. Sudhir KU, Director of Orange Office Technologies, has 35+ years in logistics and tech.
                    </p>
                    <p className="text-gray-700 mb-4">
                      Starting in courier services, he expanded into freight forwarding across Dubai & Singapore.
                    </p>
                    <p className="text-gray-700 mb-6">
                      He founded Orange Office in 2012 to transform logistics support and global back-office services.
                    </p>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Areas of Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {expertises.map((item, i) => (
                        <span key={i} className="px-3 py-1 text-sm bg-orange-100 text-orange-600 rounded-full">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Journey and Impact */}
            <section className="py-12 md:py-[75px] bg-white">
              <div className="container mx-auto px-4 text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 text-transparent bg-clip-text">
                  Professional Journey & Impact
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Decades of expertise and innovation transforming the logistics industry
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {/* Achievements */}
                <Card className="shadow-xl bg-slate-100 rounded-2xl border-none">
                  <CardContent className="p-6 md:p-8 space-y-6">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-400 shadow-lg">
                      <Award className="text-white" />
                    </div>
                    <h4 className="text-xl font-semibold">Key Achievements</h4>
                    <ul className="space-y-3">
                      {achievements.map((item, i) => (
                        <li key={i} className="flex gap-3 items-center">
                          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-amber-100">
                            <Star className="w-4 h-4 text-amber-500" />
                          </span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Milestones */}
                <Card className="shadow-xl bg-white/80 rounded-2xl border-none">
                  <CardContent className="p-6 md:p-8 space-y-6">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg">
                      <Calendar className="text-white" />
                    </div>
                    <h4 className="text-xl font-semibold">Career Milestones</h4>
                    <div className="border-l-2 border-gray-200 pl-6 space-y-6">
                      {milestones.map((m, i) => (
                        <div key={i} className="relative">
                          <div className="absolute -left-[30px] w-6 h-6 bg-white border-2 border-orange-400 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-orange-500 rounded-full" />
                          </div>
                          <div>
                            <span className="bg-orange-100 text-orange-500 px-3 py-1 text-sm rounded-full inline-block mb-2">
                              {m.year}
                            </span>
                            <p className="text-gray-700">{m.event}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Legacy and Vision */}
              <Card className="shadow-xl bg-gradient-to-br from-amber-50 to-white rounded-2xl border-none mt-8 max-w-5xl mx-auto">
                <CardContent className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Legacy</h3>
                    <p className="text-gray-700 mb-4">
                      Mr. Sudhir’s leadership has positioned Orange Office as a global tech-enabled logistics partner.
                    </p>
                    <p className="text-gray-700">
                      The company empowers businesses globally with strategic back-office innovation.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Vision</h3>
                    <p className="text-gray-700 mb-4">
                      He envisions logistics companies outsourcing complex operations to agile partners like OOT.
                    </p>
                    <p className="text-gray-700">
                      His mission is to expand globally while delivering consistent innovation and value.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* CTO Section */}
            <div id="cto" className="max-w-5xl mx-auto mt-12 scroll-mt-24">
              <Card className="border-none shadow-2xl hover:shadow-3xl overflow-hidden bg-white rounded-3xl">
                <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2">
                  <div className="relative max-h-[450px] overflow-hidden">
                    <img
                      src="/bennetSir.png"
                      alt="Mr. Bennet Rajesh"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:p-8 bg-gradient-to-br from-white to-blue-50/30">
                    <h3 className="text-3xl font-bold text-orange-500 mb-1">Mr. Bennet Rajesh</h3>
                    <p className="text-xl text-orange-400 mb-4">Chief Technology Officer</p>
                    <p className="text-gray-700 mb-4">
                      "Architecting cutting-edge solutions to redefine industry standards."
                    </p>
                    <p className="text-gray-700 mb-4">
                      With 27+ years in software, Mr. Bennet is a master of Java, MERN, Microservices, and Cloud.
                    </p>
                    <p className="text-gray-700 mb-6">
                      As CTO, he leads innovation, security, and seamless enterprise integration.
                    </p>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Technological Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {ctoExpertises.map((item, i) => (
                        <span key={i} className="px-3 py-1 text-sm bg-orange-100 text-orange-500 rounded-full">
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
