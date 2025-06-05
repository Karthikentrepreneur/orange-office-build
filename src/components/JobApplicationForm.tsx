
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Upload, User, Mail, Phone, FileText, X } from "lucide-react";

interface JobApplicationFormProps {
  jobTitle: string;
  onClose: () => void;
}

interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  coverLetter: string;
  experience: string;
}

const JobApplicationForm = ({ jobTitle, onClose }: JobApplicationFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  
  const [formData, setFormData] = useState<ApplicationData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    coverLetter: "",
    experience: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit for better compatibility
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 2MB",
          variant: "destructive",
        });
        return;
      }
      setResume(file);
    }
  };

  const submitToFormSubmit = async (url: string, data: any) => {
    console.log(`Submitting to ${url}:`, data);
    
    const formData = new FormData();
    
    // Add all form fields
    Object.keys(data).forEach(key => {
      if (key !== 'resume') {
        formData.append(key, data[key]);
      }
    });
    
    // Add resume file if exists
    if (resume) {
      formData.append('resume', resume);
    }

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    return response;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!resume) {
      toast({
        title: "Resume required",
        description: "Please upload your resume to continue",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    console.log("Starting form submission...");

    try {
      const applicationData = {
        ...formData,
        jobTitle,
        appliedAt: new Date().toISOString(),
        _subject: `New Job Application: ${jobTitle}`,
        _template: "table"
      };

      console.log("Application data:", applicationData);

      // Submit to both emails using FormData
      const [response1, response2] = await Promise.allSettled([
        submitToFormSubmit("https://formsubmit.co/ajax/karthikjungleemara@gmail.com", applicationData),
        submitToFormSubmit("https://formsubmit.co/ajax/karthiktrendsandtactics@gmail.com", applicationData)
      ]);

      console.log("Response 1:", response1);
      console.log("Response 2:", response2);

      // Check if at least one submission was successful
      const hasSuccess = [response1, response2].some(result => 
        result.status === 'fulfilled' && (result.value.ok || result.value.status === 200)
      );

      if (hasSuccess) {
        toast({
          title: "Application Submitted!",
          description: "We've received your application and will review it shortly.",
          duration: 5000,
        });

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          coverLetter: "",
          experience: ""
        });
        setResume(null);
        onClose();
      } else {
        console.error("Both submissions failed");
        throw new Error("Both email submissions failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: "Unable to submit application. Please try again or contact us directly.",
        duration: 5000,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-bold">Apply for {jobTitle}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</label>
                <div className="relative">
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    className="pl-10"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="space-y-1">
                <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</label>
                <div className="relative">
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    className="pl-10"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
              <div className="relative">
                <Input
                  id="phone"
                  name="phone"
                  placeholder="+91 98765 43210"
                  className="pl-10"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="experience" className="text-sm font-medium text-gray-700">Years of Experience</label>
              <Input
                id="experience"
                name="experience"
                placeholder="e.g., 3 years"
                value={formData.experience}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="resume" className="text-sm font-medium text-gray-700">Resume/CV</label>
              <div className="relative">
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="pl-10"
                  required
                />
                <Upload className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {resume && (
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  {resume.name}
                </p>
              )}
              <p className="text-xs text-gray-500">Accepted formats: PDF, DOC, DOCX (Max 2MB)</p>
            </div>

            <div className="space-y-1">
              <label htmlFor="coverLetter" className="text-sm font-medium text-gray-700">Cover Letter</label>
              <Textarea
                id="coverLetter"
                name="coverLetter"
                placeholder="Tell us why you're interested in this position..."
                className="min-h-[100px] resize-none"
                value={formData.coverLetter}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobApplicationForm;
