import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, User, Mail, Phone, FileText, X, CheckCircle, AlertCircle } from "lucide-react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadedLink, setUploadedLink] = useState<string>('');
  
  const [formData, setFormData] = useState<ApplicationData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    experience: ""
  });

  const showToast = (title: string, description: string, variant: 'default' | 'destructive' = 'default') => {
    // Simple toast replacement using alert for demo
    alert(`${title}: ${description}`);
  };

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
      
      setResume(file);
      setUploadStatus('idle');
      setUploadedLink('');
    }
  };

  // Multiple file hosting services as fallbacks
  const uploadFileToTempStorage = async (file: File): Promise<string> => {
    const uploadServices = [
      {
        name: 'file.io',
        upload: async (file: File) => {
          const formData = new FormData();
          formData.append('file', file);
          
          const response = await fetch('https://file.io', {
            method: 'POST',
            body: formData
          });
          
          if (!response.ok) throw new Error('file.io upload failed');
          
          const result = await response.json();
          if (!result.success) throw new Error('file.io returned error');
          
          return result.link;
        }
      },
      {
        name: '0x0.st',
        upload: async (file: File) => {
          const formData = new FormData();
          formData.append('file', file);
          
          const response = await fetch('https://0x0.st', {
            method: 'POST',
            body: formData
          });
          
          if (!response.ok) throw new Error('0x0.st upload failed');
          
          return await response.text();
        }
      }
    ];

    // Try each service until one works
    for (const service of uploadServices) {
      try {
        console.log(`Trying ${service.name}...`);
        const link = await service.upload(file);
        console.log(`${service.name} upload successful:`, link);
        return link.trim();
      } catch (error) {
        console.log(`${service.name} failed:`, error);
        continue;
      }
    }
    
    throw new Error('All file upload services failed');
  };

  const uploadResume = async () => {
    if (!resume) return;
    
    setUploadStatus('uploading');
    try {
      const link = await uploadFileToTempStorage(resume);
      setUploadedLink(link);
      setUploadStatus('success');
      showToast("Resume uploaded", "Your resume has been uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus('error');
      showToast("Upload failed", "Failed to upload resume. Please try again.", "destructive");
    }
  };

  const handleSubmit = async () => {
    if (!resume) {
      showToast("Resume required", "Please upload your resume to continue", "destructive");
      return;
    }

    // Upload resume if not already uploaded
    if (uploadStatus !== 'success' || !uploadedLink) {
      showToast("Please upload resume", "Click 'Upload Resume' button first", "destructive");
      return;
    }

    setIsSubmitting(true);
    console.log("Starting submission with resume link:", uploadedLink);

    try {
      // Prepare form data with resume link
      const form = new FormData();
      form.append('firstName', formData.firstName);
      form.append('lastName', formData.lastName);
      form.append('email', formData.email);
      form.append('phone', formData.phone);
      form.append('experience', formData.experience);
      form.append('jobTitle', jobTitle);
      form.append('appliedDate', new Date().toLocaleDateString());
      form.append('resumeLink', uploadedLink);
      form.append('resumeFileName', resume.name);
      form.append('_subject', `Job Application: ${jobTitle} - ${formData.firstName} ${formData.lastName}`);
      form.append('_captcha', 'false');
      form.append('_template', 'table');

      // Create detailed email message
      const emailMessage = `
🎯 NEW JOB APPLICATION RECEIVED

📋 POSITION: ${jobTitle}
👤 APPLICANT: ${formData.firstName} ${formData.lastName}
📧 EMAIL: ${formData.email}
📱 PHONE: ${formData.phone}
💼 EXPERIENCE: ${formData.experience}
📅 APPLIED DATE: ${new Date().toLocaleDateString()}

📎 RESUME DETAILS:
   • File Name: ${resume.name}
   • File Size: ${(resume.size / 1024 / 1024).toFixed(2)} MB
   • Download Link: ${uploadedLink}

🔗 RESUME DOWNLOAD:
Click the link above to download the applicant's resume.
Note: Some temporary links may expire after a certain period.

---
This application was submitted through the career portal.
      `;

      form.append('message', emailMessage);

      console.log("Sending application to email addresses...");

      // Send to email addresses
      const response = await fetch("https://formsubmit.co/karthikjungleemara@gmail.com", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        showToast("Application Submitted!", "Your application with resume download link has been sent successfully!");

        // Reset everything
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          experience: ""
        });
        setResume(null);
        setUploadStatus('idle');
        setUploadedLink('');
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
                />
                <Upload className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              
              {resume && (
                <div className="space-y-2">
                  <div className="text-sm text-gray-600 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>{resume.name} ({(resume.size / 1024 / 1024).toFixed(2)} MB)</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      onClick={uploadResume}
                      disabled={uploadStatus === 'uploading' || uploadStatus === 'success'}
                      className="text-xs px-3 py-1 h-8"
                      variant={uploadStatus === 'success' ? 'default' : 'outline'}
                    >
                      {uploadStatus === 'uploading' && 'Uploading...'}
                      {uploadStatus === 'success' && (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Uploaded
                        </>
                      )}
                      {uploadStatus === 'error' && (
                        <>
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Retry Upload
                        </>
                      )}
                      {uploadStatus === 'idle' && 'Upload Resume'}
                    </Button>
                    
                    {uploadStatus === 'success' && uploadedLink && (
                      <span className="text-xs text-green-600">✓ Resume ready for submission</span>
                    )}
                  </div>
                </div>
              )}
              
              <p className="text-xs text-gray-500">
                Accepted formats: PDF, DOC, DOCX (Max 5MB). Click "Upload Resume" to convert to download link.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting || uploadStatus !== 'success'}
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
