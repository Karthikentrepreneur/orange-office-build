
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, Briefcase, Users, Clock, MapPin } from "lucide-react";
import JobApplicationForm from "@/components/JobApplicationForm";
import { useState } from "react";

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const jobs = [
    {
      title: "Full Stack Developer",
      location: "Chennai (Anna Nagar)",
      type: "Full Time",
      experience: "3+ years"
    }, 
    {
      title: "Ocean Freight- Export Customer Service",
      location: "Chennai",
      type: "Full Time",
      experience: "5+ years"
    }
  ];

  const handleApplyClick = (jobTitle: string) => {
    setSelectedJob(jobTitle);
  };

  const handleCloseForm = () => {
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6 animate-fade-in">
              Join Our Team
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in">
              Be part of our innovative team and help shape the future of logistics technology
            </p>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-3xl mb-12 text-center">Current Openings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {jobs.map((job, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-none animate-fade-in" style={{
                animationDelay: `${index * 100}ms`
              }}>
                <CardContent className="p-8 rounded-lg bg-slate-200">
                  <div className="space-y-4">
                    <h3 className="font-heading font-bold text-xl group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{job.experience} experience</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full mt-4" 
                      onClick={() => handleApplyClick(job.title)}
                    >
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl mb-12">Why Join Us?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg">Great Team</h3>
                <p className="text-gray-600">Work with talented professionals who are passionate about technology</p>
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg my-[18px]">Growth Opportunities</h3>
                <p className="text-gray-600">Continuous learning and career advancement opportunities</p>
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <BadgeCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg">Work-Life Balance</h3>
                <p className="text-gray-600">Flexible work environment that respects your personal time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Application Form Modal */}
      {selectedJob && (
        <JobApplicationForm 
          jobTitle={selectedJob} 
          onClose={handleCloseForm}
        />
      )}

      <Footer />
    </div>
  );
};

export default Careers;
