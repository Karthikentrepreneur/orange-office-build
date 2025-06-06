
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, User, Mail, Phone, FileText, X, CheckCircle, AlertCircle } from "lucide-react";

export interface JobApplicationFormProps {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const [resumeDataUrl, setResumeDataUrl] = useState<string>('');
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  
  const [formData, setFormData] = useState<ApplicationData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    experience: ""
  });

  const showToast = (title: string, description: string, variant: 'default' | 'destructive' = 'default') => {
    alert(`${title}: ${description}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const convertFileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert file'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showToast("File too large", "Please upload a file smaller than 5MB", "destructive");
        return;
      }
      
      const allowedTypes = [
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      if (!allowedTypes.includes(file.type)) {
        showToast("Invalid file type", "Please upload a PDF, DOC, or DOCX file", "destructive");
        return;
      }
      
      setIsProcessingFile(true);
      try {
        const dataUrl = await convertFileToDataUrl(file);
        setResume(file);
        setResumeDataUrl(dataUrl);
        showToast("Resume processed", "Your resume is ready for submission!");
      } catch (error) {
        console.error("Error processing file:", error);
        showToast("Processing failed", "Failed to process resume. Please try again.", "destructive");
      } finally {
        setIsProcessingFile(false);
      }
    }
  };

  const handleSubmit = async () => {
    if (!resume || !resumeDataUrl) {
      showToast("Resume required", "Please upload your resume to continue", "destructive");
      return;
    }

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.experience) {
      showToast("Missing information", "Please fill in all required fields", "destructive");
      return;
    }

    setIsSubmitting(true);
    console.log("Starting submission with resume data URL");

    try {
      // Create HTML email with clickable resume link
      const resumeLink = `<a href="${resumeDataUrl}" download="${resume.name}" style="background-color: #3b82f6; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 10px 0;">📎 Download ${resume.name}</a>`;
      
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">🎯 New Job Application</h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Position Applied For</h3>
            <p style="font-size: 18px; font-weight: bold; color: #333; margin: 5px 0;">${jobTitle}</p>
          </div>

          <div style="background-color: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">📋 Applicant Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 30%;">Name:</td>
                <td style="padding: 8px 0; color: #333;">${formData.firstName} ${formData.lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td>
                <td style="padding: 8px 0; color: #333;">${formData.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone:</td>
                <td style="padding: 8px 0; color: #333;">${formData.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Experience:</td>
                <td style="padding: 8px 0; color: #333;">${formData.experience}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Applied Date:</td>
                <td style="padding: 8px 0; color: #333;">${new Date().toLocaleDateString()}</td>
              </tr>
            </table>
          </div>

          <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #92400e; margin-top: 0;">📎 Resume/CV</h3>
            <p style="margin: 10px 0; color: #92400e;">File: ${resume.name} (${(resume.size / 1024 / 1024).toFixed(2)} MB)</p>
            <p style="margin: 10px 0; color: #92400e;">Click the button below to download the resume:</p>
            ${resumeLink}
            <p style="font-size: 12px; color: #92400e; margin-top: 15px; font-style: italic;">
              💡 Right-click the download button and select "Save link as..." if the file opens in browser instead of downloading.
            </p>
          </div>

          <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; margin-top: 30px; text-align: center;">
            <p style="color: #64748b; font-size: 14px; margin: 0;">
              This application was submitted through the career portal at ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `;

      // Prepare form data for FormSubmit
      const form = new FormData();
      form.append('_subject', `Job Application: ${jobTitle} - ${formData.firstName} ${formData.lastName}`);
      form.append('_captcha', 'false');
      form.append('_template', 'box');
      form.append('message', emailHtml);

      console.log("Sending application to email...");

      const response = await fetch("https://formsubmit.co/karthikjungleemara@gmail.com", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        showToast("Application Submitted!", "Your application with resume download link has been sent successfully!");

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          experience: ""
        });
        setResume(null);
        setResumeDataUrl('');
        onClose();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error("Submission error:", error);
      showToast("Submission Failed", "Unable to submit application. Please try again or contact us directly.", "destructive");
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

            <div className="space-y-3">
              <label htmlFor="resume" className="text-sm font-medium text-gray-700">Resume/CV</label>
              <div className="relative">
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="pl-10"
                  required
                  disabled={isProcessingFile}
                />
                <Upload className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              
              {isProcessingFile && (
                <div className="text-sm text-blue-600 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 animate-spin" />
                  <span>Processing file...</span>
                </div>
              )}
              
              {resume && resumeDataUrl && (
                <div className="space-y-2">
                  <div className="text-sm text-green-600 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <FileText className="h-4 w-4" />
                    <span>{resume.name} ({(resume.size / 1024 / 1024).toFixed(2)} MB) - Ready for submission</span>
                  </div>
                  
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-xs text-green-700">
                      ✓ Resume processed successfully. It will be sent as a downloadable link in the email notification.
                    </p>
                  </div>
                </div>
              )}
              
              <p className="text-xs text-gray-500">
                Accepted formats: PDF, DOC, DOCX (Max 5MB). File will be converted to a downloadable link.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting || !resume || !resumeDataUrl || isProcessingFile}
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

// Demo wrapper to test the component
const App = () => {
  const [showForm, setShowForm] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Job Application Demo</h1>
        
        {!showForm && (
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Open Application Form
          </Button>
        )}
        
        {showForm && (
          <JobApplicationForm 
            jobTitle="Senior React Developer"
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default App;
