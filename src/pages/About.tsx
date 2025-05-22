import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Award, ArrowRight, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
const About = () => {
  return <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-primary/10 to-accent/10 text-center py-[26px]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-gray-600">Empowering the Logistics Industry Through Smart Back-Office and Digital Solutions

        </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
            <p className="text-gray-600 mb-4">Orange Office Technologies (OOT Pvt. Ltd.) is a specialized back-office service provider catering exclusively to the global shipping, freight forwarding, and third-party warehousing (3PL) industries. With a strong foundation in logistics domain expertise and digital innovation, OOT delivers integrated operational support and IT solutions that streamline processes, enhance productivity, and drive sustainable growth across the logistics value chain.</p>
            <p className="text-gray-600">We support our clients by managing their core non-customer-facing functions  including documentation, sales support, customer service, accounting, and digital services allowing them to focus on their core logistics operations. Our deep industry knowledge combined with a skilled workforce ensures service excellence, operational efficiency, and real-time adaptability in today’s dynamic market. In addition to our back-office services, OOT offers tailored software solutions and digital transformation tools designed specifically for logistics businesses. Our IT capabilities include Freight Management Systems (FMS), Warehouse Management Systems (WMS), and Transport Management Systems (TMS), enabling clients to digitize their operations and gain competitive advantage.</p>
          </div>
          <div className="relative flex justify-center lg:justify-end my-[5px]">
            <div className="w-4/5 max-w-sm overflow-hidden rounded-2xl shadow-xl border-4 border-white">
              <AspectRatio ratio={1} className="bg-muted">
                <img src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=800&h=800&q=80" alt="Modern Office" className="w-full h-full object-cover transition-transform hover:scale-105 duration-700" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-multiply my-0" />
              </AspectRatio>
            </div>
            <div className="absolute -bottom-5 -right-5 bg-white rounded-xl shadow-xl p-3 max-w-xs">
              <div className="flex items-center gap-2">
                <Award className="h-7 w-7 text-amber-500" />
                <p className="font-medium text-gray-800 text-sm">Industry Leader Since 2012</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      

      {/* ORANGE Defined Section */}
    <section className="py-20 bg-orange-50">
  <div className="container mx-auto px-6">
    <h2 className="text-4xl font-extrabold text-center text-orange-600 mb-12">Our Core Values</h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      
      {/* Left: ORANGE Acronym Breakdown with Descriptions */}
      <div className="space-y-6">
        {[{
              letter: "O",
              title: "Operational Excellence",
              description: "Streamlining operations to achieve superior performance and consistency."
            }, {
              letter: "R",
              title: "Resource Optimization",
              description: "Utilizing resources efficiently to maximize value and minimize waste."
            }, {
              letter: "A",
              title: "Automation-Driven Processes",
              description: "Leveraging technology to automate repetitive tasks and increase speed."
            }, {
              letter: "N",
              title: "Next-Gen Technology",
              description: "Integrating the latest technological advancements into logistics solutions."
            }, {
              letter: "G",
              title: "Global Support",
              description: "Providing scalable support and services across international markets."
            }, {
              letter: "E",
              title: "Efficiency in Execution",
              description: "Ensuring timely, cost-effective, and precise execution of operations."
            }].map((item, index) => <div key={index} className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-orange-500 text-white font-bold rounded flex items-center justify-center text-xl">
              {item.letter}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </div>)}
      </div>

      {/* Right: Image Section */}
      <div className="relative">
        <div className="rounded-xl overflow-hidden shadow-lg border-4 border-orange-200 my-0">
          <img
              // Update with actual public image path if needed
              alt="Team working with data" className="object-cover w-full h-full" src="/lovable-uploads/5f253e86-3d8c-47a6-8305-ae76ef30adaf.png" />
        </div>
      </div>

    </div>
  </div>
    </section>


      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Logistics Operations?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Partner with Orange Office Technologies for innovative solutions that drive efficiency and growth.
          </p>
          <Button size="lg" variant="outline" className="border-white hover:bg-white text-orange-500">
            <Link to="/contact" className="flex items-center gap-2">
              Contact Us Today
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>;
};
export default About;