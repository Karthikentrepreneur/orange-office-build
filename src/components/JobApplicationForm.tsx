
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Upload, User, Mail, Phone, FileText, X } from "lucide-react";
import emailjs from '@emailjs/browser';

interface JobApplicationFormProps {
  jobTitle: string;
  onClose: () => void;
}

interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
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
    experience: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, DOC, or DOCX file",
          variant: "destructive",
        });
        return;
      }
      
      setResume(file);
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
    console.log("Starting form submission with EmailJS");

    try {
      // Initialize EmailJS (you'll need to set these in your EmailJS dashboard)
      emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
      
      // Convert file to base64 for attachment
      const resumeBase64 = await convertFileToBase64(resume);
      
      const templateParams = {
        to_email_1: "karthikjungleemara@gmail.com",
        to_email_2: "karthiktrendsandtactics@gmail.com",
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: formData.phone,
        experience: formData.experience,
        job_title: jobTitle,
        applied_date: new Date().toLocaleDateString(),
        resume_name: resume.name,
        resume_attachment: resumeBase64,
        subject: `Job Application: ${jobTitle} - ${formData.firstName} ${formData.lastName}`
      };

      console.log("Sending email with EmailJS...");
      
      // Send email using EmailJS
      const response = await emailjs.send(
        "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
        templateParams
      );

      console.log("EmailJS response:", response);

      if (response.status === 200) {
        toast({
          title: "Application Submitted!",
          description: "Your application with resume has been sent successfully to both email addresses.",
          duration: 5000,
        });

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          experience: ""
        });
        setResume(null);
        onClose();
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error("EmailJS submission error:", error);
      
      // Fallback to simple notification without attachment
      try {
        console.log("Trying fallback method without attachment...");
        
        const fallbackData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          experience: formData.experience,
          jobTitle: jobTitle,
          appliedAt: new Date().toISOString(),
          resumeName: resume.name,
          message: `Resume file: ${resume.name} (${(resume.size / 1024 / 1024).toFixed(2)} MB) - Please contact applicant for resume file.`,
          _subject: `Job Application: ${jobTitle} - ${formData.firstName} ${formData.lastName}`,
          _captcha: 'false',
          _template: 'table'
        };

        const submissions = [
          fetch("https://formsubmit.co/ajax/karthikjungleemara@gmail.com", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fallbackData),
          }),
          fetch("https://formsubmit.co/ajax/karthiktrendsandtactics@gmail.com", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fallbackData),
          })
        ];

        const results = await Promise.allSettled(submissions);
        const successCount = results.filter(result => 
          result.status === 'fulfilled' && result.value.ok
        ).length;

        if (successCount > 0) {
          toast({
            title: "Application Submitted!",
            description: `Your application details have been sent${successCount === 1 ? ' (1 email sent)' : ' (both emails sent)'}. Please note: Resume file attachment failed, so you may need to send it separately.`,
            duration: 8000,
          });
          
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            experience: ""
          });
          setResume(null);
          onClose();
        } else {
          throw new Error('All fallback submissions failed');
        }
      } catch (fallbackError) {
        console.error("Fallback submission error:", fallbackError);
        toast({
          title: "Submission Failed",
          description: "Unable to submit application. Please try again or contact us directly with your resume.",
          duration: 7000,
          variant: "destructive",
        });
      }
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
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Setup Required:</strong> To enable email functionality with resume attachments, please:
              <br />1. Create an EmailJS account at emailjs.com
              <br />2. Replace YOUR_PUBLIC_KEY, YOUR_SERVICE_ID, and YOUR_TEMPLATE_ID in the code
              <br />3. Configure your email template to include resume attachments
            </p>
          </div>
          
          <div className="space-y-4">
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
                <div className="text-sm text-green-600 flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span>{resume.name} ({(resume.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
              )}
              <p className="text-xs text-gray-500">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobApplicationForm;
