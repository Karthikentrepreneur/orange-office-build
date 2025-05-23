import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Star, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const management = () => {
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
    "Back-office operations",
    "Supply chain management",
    "Digital transformation",
    "Global logistics",
    "Strategic partnerships",
    "IT solutions"
  ];

  const ctoExpertises = [
    "Java, Spring, JPA",
    "MERN Stack",
    "Microservices & DevOps",
    "Cloud Computing",
    "Enterprise Integration",
    "Security & Automation"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-orange-50">
      <Header />
      <main className="flex-grow pt-20 py-0">

        {/* ...Hero Section and Director Card... */}

        {/* CTO Section */}
        <div className="max-w-5xl mx-auto">
          <Card className="border-none shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden bg-white rounded-3xl animate-fade-in delay-200">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                  <div className="p-8 text-center">
                    <h3 className="text-3xl font-bold mb-1 text-blue-800">Mr. Bennet Rajesh</h3>
                    <p className="text-blue-600 text-xl">Chief Technology Officer</p>
                  </div>
                </div>
                <div className="p-6 md:p-8 bg-gradient-to-br from-white to-blue-50/30">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 mb-4">
                      "Architecting cutting-edge solutions to redefine industry standards."
                    </p>
                    <p className="text-gray-700 mb-4">
                      With 27 years of experience in software development, Mr. Bennet is a seasoned Java Enterprise Architect, Developer, and Mentor.
                    </p>
                    <p className="text-gray-700 mb-4">
                      His expertise spans Java, Spring, JPA, MERN stack, Microservices, DevOps, and Cloud Computing. He is a champion of Agile, automation, and product thinking.
                    </p>
                    <p className="text-gray-700 mb-6">
                      As CTO, he steers the technological vision of the company, ensuring seamless integration of advanced enterprise solutions.
                    </p>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Technological Expertise</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {ctoExpertises.map((item, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Journey and Impact Section */}
        <section className="py-12 md:py-16 bg-white relative">
          <div className="container mx-auto px-4">
            {/* ...existing Journey and Legacy Section... */}

            {/* Legacy and Vision */}
            <Card className="border-none shadow-xl hover:shadow-2xl bg-gradient-to-br from-amber-50 to-white mt-8 max-w-5xl mx-auto rounded-2xl">
              <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Legacy</h3>
                    <p className="text-gray-700 mb-4">
                      His strategic foresight has expanded Orange Office Technologies into a global service provider.
                    </p>
                    <p className="text-gray-700">
                      Today, Orange Office Technologies empowers businesses worldwide with reliable and innovative solutions.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Vision</h3>
                    <p className="text-gray-700 mb-4">
                      Mr. Sudhir envisions logistics companies outsourcing operational complexity to specialized partners like Orange.
                    </p>
                    <p className="text-gray-700">
                      His leadership drives innovation, customer satisfaction, and expansion into new markets and services.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* --- CTO Section Again Before Footer --- */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-5xl">
            <Card className="border-none shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden bg-white rounded-3xl">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                    <div className="p-8 text-center">
                      <h3 className="text-3xl font-bold mb-1 text-blue-800">Mr. Bennet Rajesh</h3>
                      <p className="text-blue-600 text-xl">Chief Technology Officer</p>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 bg-gradient-to-br from-white to-blue-50/30">
                    <div className="prose max-w-none">
                      <p className="text-gray-700 mb-4">
                        "Architecting cutting-edge solutions to redefine industry standards."
                      </p>
                      <p className="text-gray-700 mb-4">
                        With 27 years of experience in software development, Mr. Bennet is a seasoned Java Enterprise Architect, Developer, and Mentor.
                      </p>
                      <p className="text-gray-700 mb-4">
                        His expertise spans Java, Spring, JPA, MERN stack, Microservices, DevOps, and Cloud Computing. He is a champion of Agile, automation, and product thinking.
                      </p>
                      <p className="text-gray-700 mb-6">
                        As CTO, he steers the technological vision of the company, ensuring seamless integration of advanced enterprise solutions.
                      </p>
                      <h3 className="text-xl font-semibold mb-3 text-gray-800">Technological Expertise</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {ctoExpertises.map((item, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
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

export default management;
