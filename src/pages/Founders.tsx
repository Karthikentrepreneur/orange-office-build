import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Star, Calendar } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const management = () => {
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
      <main className="flex-grow pt-20 py-0">
        <section className="py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-10">
              <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4 text-gradient bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent animate-fade-in">
                Meet Our Management Team
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg animate-fade-in delay-75">
                The driving force behind OOT's innovation and success
              </p>
            </div>

            {/* Director Card */}
            <div className="max-w-6xl mx-auto mb-16">
              <Card className="border-none shadow-2xl hover:shadow-3xl bg-white rounded-3xl transition-all duration-500 animate-fade-in delay-100">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center gap-6">
                    <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-xl">
                      <img 
                        alt="Mr. Sudhir KU" 
                        className="w-full h-full object-cover" 
                        src="/lovable-uploads/8c197c79-48aa-49bc-87a8-fbf680fa6afd.png" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </div>

                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Mr. Sudhir KU</h3>
                      <p className="text-orange-600 text-xl md:text-2xl font-semibold mb-4">Director</p>
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
                      <div className="flex flex-wrap justify-center gap-2">
                        {expertises.map((exp, idx) => (
                          <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Journey & Milestones */}
            <section className="py-12 bg-white relative md:py-[75px]">
              <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                  <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-gradient bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                    Professional Journey & Impact
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Decades of expertise and innovation transforming the logistics industry
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                  {/* Achievements */}
                  <Card className="border-none shadow-xl bg-slate-100 rounded-2xl">
                    <CardContent className="p-6 md:p-8 space-y-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-400 rounded-full flex justify-center items-center shadow-lg">
                        <Award className="text-white w-6 h-6" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900">Key Achievements</h4>
                      <ul className="space-y-3">
                        {achievements.map((a, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                              <Star className="w-4 h-4 text-amber-500" />
                            </div>
                            <span className="text-gray-700">{a}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Milestones */}
                  <Card className="border-none shadow-xl bg-white/80 rounded-2xl">
                    <CardContent className="p-6 md:p-8 space-y-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex justify-center items-center shadow-lg">
                        <Calendar className="text-white w-6 h-6" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900">Career Milestones</h4>
                      <div className="border-l-2 border-gray-200 pl-6 space-y-6">
                        {milestones.map((m, i) => (
                          <div key={i} className="relative">
                            <div className="absolute -left-[30px] w-6 h-6 rounded-full bg-white border-2 border-orange-400 flex items-center justify-center">
                              <div className="w-2 h-2 bg-orange-500 rounded-full" />
                            </div>
                            <div>
                              <div className="bg-orange-100 rounded-full px-3 py-1 text-sm text-orange-500 font-medium inline-block mb-2">
                                {m.year}
                              </div>
                              <p className="text-gray-700">{m.event}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Legacy & Vision */}
                <Card className="border-none shadow-xl mt-8 bg-gradient-to-br from-amber-50 to-white rounded-2xl max-w-5xl mx-auto">
                  <CardContent className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-3 text-gray-900">Legacy</h3>
                      <p className="text-gray-700 mb-4">
                        His strategic foresight has expanded Orange Office Technologies Pvt Ltd into a global service provider.
                      </p>
                      <p className="text-gray-700">
                        Today, Orange Office Technologies Pvt Ltd empowers businesses worldwide with reliable and innovative solutions.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3 text-gray-900">Vision</h3>
                      <p className="text-gray-700 mb-4">
                        Mr. Sudhir envisions logistics companies outsourcing operational complexity to specialized partners like Orange Office Technologies Pvt Ltd.
                      </p>
                      <p className="text-gray-700">
                        His leadership drives innovation, customer satisfaction, and expansion into new markets and services.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* CTO Card */}
            <div id="cto" className="max-w-6xl mx-auto mt-12 scroll-mt-24">
              <Card className="border-none shadow-2xl hover:shadow-3xl bg-white rounded-3xl transition-all duration-500 animate-fade-in delay-200">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center gap-6">
                    <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-xl">
                      <img 
                        alt="Mr. Bennet Rajesh" 
                        className="w-full h-full object-cover" 
                        src="/bennetSir.png" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </div>

                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold text-orange-600">Mr. Bennet Rajesh</h3>
                      <p className="text-xl md:text-2xl text-orange-500 font-semibold mb-4">Chief Technology Officer</p>
                      <p className="text-gray-700 mb-4">
                        "Architecting cutting-edge solutions to redefine industry standards."
                      </p>
                      <p className="text-gray-700 mb-4">
                        With 27 years of experience in software development, Mr. Bennet is a seasoned Java Enterprise Architect, Developer, and Mentor.
                      </p>
                      <p className="text-gray-700 mb-4">
                        His expertise spans Java, Spring, JPA, MERN stack, Microservices, DevOps, and Cloud Computing.
                      </p>
                      <p className="text-gray-700 mb-6">
                        As CTO, he steers the technological vision of the company, ensuring seamless integration of advanced enterprise solutions.
                      </p>

                      <h3 className="text-xl font-semibold mb-3 text-gray-800">Technological Expertise</h3>
                      <div className="flex flex-wrap justify-center gap-2">
                        {ctoExpertises.map((tech, idx) => (
                          <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-500 rounded-full text-sm font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
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

export default management;
