
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
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
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 2MB",
          variant: "destructive",
        });
        return;
      }
      
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

  const uploadFileToTempStorage = async (file: File): Promise<string> => {
    // Using file.io for temporary file hosting (files are deleted after 1 download or 14 days)
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('https://file.io', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload file');
    }
    
    const result = await response.json();
    if (!result.success) {
      throw new Error('File upload service returned error');
    }
    
    return result.link;
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
    console.log("Starting form submission with file upload");

    try {
      // Upload file to temporary storage and get download link
      console.log("Uploading resume file...");
      const resumeLink = await uploadFileToTempStorage(resume);
      console.log("Resume uploaded successfully, link:", resumeLink);

      // Prepare form data with resume link
      const form = new FormData();
      form.append('firstName', formData.firstName);
      form.append('lastName', formData.lastName);
      form.append('email', formData.email);
      form.append('phone', formData.phone);
      form.append('experience', formData.experience);
      form.append('jobTitle', jobTitle);
      form.append('appliedDate', new Date().toLocaleDateString());
      form.append('resumeLink', resumeLink);
      form.append('resumeFileName', resume.name);
      form.append('_subject', `Job Application: ${jobTitle} - ${formData.firstName} ${formData.lastName}`);
      form.append('_captcha', 'false');
      form.append('_template', 'table');

      // Create email message with resume download link
      const emailMessage = `
New Job Application Received

Position: ${jobTitle}
Applicant: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Experience: ${formData.experience}
Applied Date: ${new Date().toLocaleDateString()}

Resume Download Link: ${resumeLink}
Resume File Name: ${resume.name}

Please download the resume using the link above. The link will expire after one download or 14 days for security purposes.
      `;

      form.append('message', emailMessage);

      console.log("Sending applications to both emails...");

      // Send to both email addresses
      const submissions = [
        fetch("https://formsubmit.co/karthikjungleemara@gmail.com", {
          method: "POST",
          body: form,
        }),
        fetch("https://formsubmit.co/karthiktrendsandtactics@gmail.com", {
          method: "POST", 
          body: form,
        })
      ];

      const results = await Promise.allSettled(submissions);
      console.log("Submission results:", results);

      const successCount = results.filter(result => 
        result.status === 'fulfilled' && result.value.ok
      ).length;

      if (successCount > 0) {
        toast({
          title: "Application Submitted!",
          description: `Your application with resume download link has been sent successfully${successCount === 2 ? ' to both email addresses' : ' (1 email sent)'}.`,
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
        throw new Error('All submissions failed');
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: "Unable to submit application. Please try again or contact us directly.",
        duration: 7000,
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
                <div className="text-sm text-green-600 flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span>{resume.name} ({(resume.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
              )}
              <p className="text-xs text-gray-500">Accepted formats: PDF, DOC, DOCX (Max 2MB). Resume will be converted to a download link.</p>
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
