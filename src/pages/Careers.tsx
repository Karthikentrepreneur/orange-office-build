
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeCheck, Briefcase, Users, Clock, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    Tally: {
      loadEmbeds: () => void;
    };
  }
}

interface CareerOpportunity {
  id: string;
  title: string;
  location: string;
  type: string;
  experience: string;
  description: string | null;
  requirements: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [careerOpportunities, setCareerOpportunities] = useState<CareerOpportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCareerOpportunities();
  }, []);

  const fetchCareerOpportunities = async () => {
    try {
      const { data, error } = await supabase
        .from('career_opportunities')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCareerOpportunities(data || []);
    } catch (error) {
      console.error('Error fetching career opportunities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyClick = (jobTitle: string) => {
    setSelectedJob(jobTitle);
  };

  const handleCloseForm = () => {
    setSelectedJob(null);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => {
      if (window.Tally) {
        window.Tally.loadEmbeds();
      }
    };
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (selectedJob && window.Tally) {
      setTimeout(() => {
        window.Tally.loadEmbeds();
      }, 100);
    }
  }, [selectedJob]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

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

      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="openings" className="max-w-6xl mx-auto">
            <TabsContent value="openings">
              <h2 className="font-heading font-bold text-3xl mb-12 text-center">Current Openings</h2>
              
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">Loading career opportunities...</p>
                </div>
              ) : careerOpportunities.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No current openings available. Please check back later!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {careerOpportunities.map((job, index) => (
                    <Card 
                      key={job.id} 
                      className="group hover:shadow-xl transition-all duration-300 border-none animate-fade-in" 
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-8 rounded-lg bg-slate-200">
                        <div className="space-y-4">
                          <h3 className="font-heading font-bold text-xl group-hover:text-primary transition-colors">
                            {job.title}
                          </h3>
                          <div className="space-y-2 text-gray-600">
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>{job.type}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4" />
                              <span>{job.experience} experience</span>
                            </div>
                          </div>
                          
                          {job.description && (
                            <div className="mt-4">
                              <p className="text-gray-700 text-sm line-clamp-3">
                                {job.description}
                              </p>
                            </div>
                          )}
                          
                          {job.requirements && (
                            <div className="mt-3">
                              <h4 className="font-semibold text-sm text-gray-800 mb-1">Requirements:</h4>
                              <p className="text-gray-600 text-xs line-clamp-2">
                                {job.requirements}
                              </p>
                            </div>
                          )}
                          
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
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

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

      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b flex-shrink-0">
              <h2 className="text-xl font-bold">Apply for {selectedJob}</h2>
              <button 
                onClick={handleCloseForm} 
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <iframe 
                data-tally-src="https://tally.so/embed/mOeXGa?alignLeft=1&hideTitle=1&transparentBackground=1" 
                loading="lazy" 
                width="100%" 
                height="800" 
                frameBorder="0" 
                marginHeight={0} 
                marginWidth={0} 
                title="Application Form" 
                className="w-full min-h-[800px] my-0 mx-[16px]" 
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Careers;
