import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GradientBackground } from "@/components/GradientBackground";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, FileText, Receipt, Calculator, FileCheck, Clock, CheckCircle, CreditCard, BarChart3, Database } from "lucide-react";
const AccountsManagement = () => {
  const services = [{
    icon: FileText,
    title: "Freight Invoice Generation & Verification",
    description: "We prepare and validate invoices based on shipping instructions, tariffs, and service agreements, reducing disputes and delays."
  }, {
    icon: Receipt,
    title: "Receivables Management",
    description: "From tracking outstanding invoices to following up with clients, we streamline your collections process to improve cash flow and reduce DSO."
  }, {
    icon: CreditCard,
    title: "Bank Reconciliation & Ledger Management",
    description: "We maintain accurate records by reconciling bank statements, customer payments, and accounting entries, ensuring books are always audit-ready."
  }, {
    icon: Database,
    title: "Customer Account Maintenance",
    description: "We monitor customer account activity, resolve billing issues, and manage credit terms to support sustainable client relationships."
  }, {
    icon: BarChart3,
    title: "Customized Financial Reporting",
    description: "Receive periodic reports on aging, collections, revenue summaries, and cash flow to support informed decision-making and strategic planning."
  }];
  const benefits = ["Domain Expertise in logistics and freight finance", "Seamless Integration with your existing ERP or accounting software", "Real-Time Reporting and dashboards for better visibility", "Dedicated Support Team for issue resolution and escalation", "Reduced operational load while enhancing transparency"];
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section with proper padding and alignment */}
      <GradientBackground className="pt-32 pb-20 flex items-center justify-center" variant="primary" intensity="medium" animated={true}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            
            <h1 className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl mb-6 animate-fade-in mt-10">Financial Management</h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 animate-fade-in delay-75">
              From freight invoicing to payment follow-ups, our account management team ensures financial accuracy and transparency
            </p>
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-8 py-3" asChild>
              <Link to="/contact" className="flex items-center gap-2">
                Consult Our Experts
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </GradientBackground>

      {/* Service Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
                Comprehensive Financial Oversight
              </h2>
              <p className="text-gray-600 mb-6">
                At Orange Office Technologies, our dedicated Account Management services are tailored to support the financial operations of logistics and freight forwarding companies with precision, transparency, and consistency.
              </p>
              <p className="text-gray-600 mb-6">Our experienced back-office team manages every aspect of your accounts lifecycle  from freight invoicing to payment follow-ups, ensuring your billing processes are accurate, timely, and fully compliant with global standards. We work closely with your operations and customer service teams to ensure that invoicing aligns with service delivery and contractual terms.</p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600" asChild>
                  <Link to="/contact">Get Started</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/services">View All Services</Link>
                </Button>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img alt="Accounts Management" className="w-full h-full object-cover" src="/lovable-uploads/1b594179-11a8-4158-8891-0d269d378ec2.jpg" />
              
              <div className="absolute bottom-8 left-8 right-8 text-white">
                
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Key Services Offered
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive financial management solutions tailored for logistics and freight forwarding companies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => <Card key={index} className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white hover:-translate-y-1 rounded-2xl">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-6">
                    <service.icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-2">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-xl relative">
                  <img alt="Financial Growth" className="w-full h-full object-cover" src="/lovable-uploads/067f7800-e861-47eb-bc5c-35218f9f6d34.jpg" />
                  
                </div>
              </div>
              <div className="md:col-span-3">
                <h2 className="font-heading font-bold text-3xl mb-6">
                  Why Choose Us?
                </h2>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-600">{benefit}</span>
                    </li>)}
                </ul>
                <p className="mt-6 text-gray-600">
                  With Orange Office Technologies as your KPO partner, you gain access to reliable account management solutions that reduce operational load, enhance transparency, and allow your core team to focus on business growth.
                </p>
                <Button className="mt-8 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600" asChild>
                  <Link to="/contact" className="flex items-center gap-2">
                    Contact Us
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-500 to-violet-500 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl mb-6">
              Ready to Streamline Your Financial Operations?
            </h2>
            <p className="text-white/90 mb-8 text-lg">
              Whether you're a mid-size forwarder or a global 3PL provider, we help you maintain financial discipline without increasing internal overhead.
            </p>
            <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50" asChild>
              <Link to="/contact">Schedule a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default AccountsManagement;