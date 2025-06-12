import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Upload, Save, LogOut, Edit, Trash2, Plus, Briefcase, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Article {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  published: boolean;
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

const AdminEditor = () => {
  // Article states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [showArticleForm, setShowArticleForm] = useState(false);

  // Career opportunity states
  const [careerTitle, setCareerTitle] = useState("");
  const [careerLocation, setCareerLocation] = useState("");
  const [careerType, setCareerType] = useState("");
  const [careerExperience, setCareerExperience] = useState("");
  const [careerDescription, setCareerDescription] = useState("");
  const [careerRequirements, setCareerRequirements] = useState("");
  const [careerOpportunities, setCareerOpportunities] = useState<CareerOpportunity[]>([]);
  const [editingCareer, setEditingCareer] = useState<CareerOpportunity | null>(null);
  const [showCareerForm, setShowCareerForm] = useState(false);
  const [careerLoading, setCareerLoading] = useState(false);

  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.email !== "admin@orangeot.com") {
      navigate("/admin/login");
    } else {
      fetchArticles();
      fetchCareerOpportunities();
    }
  }, [user, navigate]);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const fetchCareerOpportunities = async () => {
    try {
      const { data, error } = await supabase
        .from('career_opportunities')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCareerOpportunities(data || []);
    } catch (error) {
      console.error('Error fetching career opportunities:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('article-images')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('article-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleArticleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let imageUrl = editingArticle?.image_url || null;
      
      if (image) {
        imageUrl = await uploadImage(image);
        if (!imageUrl) {
          setError("Failed to upload image");
          setLoading(false);
          return;
        }
      }

      if (editingArticle) {
        const { error } = await supabase
          .from('articles')
          .update({
            title,
            description,
            image_url: imageUrl,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingArticle.id);

        if (error) throw error;
        setSuccess("Article updated successfully!");
      } else {
        const { error } = await supabase
          .from('articles')
          .insert([
            {
              title,
              description,
              image_url: imageUrl,
              published: true
            }
          ]);

        if (error) throw error;
        setSuccess("Article published successfully!");
      }

      resetArticleForm();
      fetchArticles();
    } catch (error) {
      setError(editingArticle ? "Failed to update article" : "Failed to publish article");
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCareerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCareerLoading(true);
    setError("");
    setSuccess("");

    try {
      if (editingCareer) {
        const { error } = await supabase
          .from('career_opportunities')
          .update({
            title: careerTitle,
            location: careerLocation,
            type: careerType,
            experience: careerExperience,
            description: careerDescription,
            requirements: careerRequirements,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingCareer.id);

        if (error) throw error;
        setSuccess("Career opportunity updated successfully!");
      } else {
        const { error } = await supabase
          .from('career_opportunities')
          .insert([
            {
              title: careerTitle,
              location: careerLocation,
              type: careerType,
              experience: careerExperience,
              description: careerDescription,
              requirements: careerRequirements,
              is_active: true
            }
          ]);

        if (error) throw error;
        setSuccess("Career opportunity created successfully!");
      }

      resetCareerForm();
      fetchCareerOpportunities();
    } catch (error) {
      setError(editingCareer ? "Failed to update career opportunity" : "Failed to create career opportunity");
      console.error('Error:', error);
    } finally {
      setCareerLoading(false);
    }
  };

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setTitle(article.title);
    setDescription(article.description);
    setShowArticleForm(true);
    setImage(null);
  };

  const handleEditCareer = (career: CareerOpportunity) => {
    setEditingCareer(career);
    setCareerTitle(career.title);
    setCareerLocation(career.location);
    setCareerType(career.type);
    setCareerExperience(career.experience);
    setCareerDescription(career.description || "");
    setCareerRequirements(career.requirements || "");
    setShowCareerForm(true);
  };

  const handleDeleteArticle = async (articleId: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', articleId);

      if (error) throw error;
      setSuccess("Article deleted successfully!");
      fetchArticles();
    } catch (error) {
      setError("Failed to delete article");
      console.error('Error:', error);
    }
  };

  const handleDeleteCareer = async (careerId: string) => {
    if (!confirm("Are you sure you want to delete this career opportunity?")) return;

    try {
      const { error } = await supabase
        .from('career_opportunities')
        .delete()
        .eq('id', careerId);

      if (error) throw error;
      setSuccess("Career opportunity deleted successfully!");
      fetchCareerOpportunities();
    } catch (error) {
      setError("Failed to delete career opportunity");
      console.error('Error:', error);
    }
  };

  const toggleCareerStatus = async (careerId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('career_opportunities')
        .update({ is_active: !currentStatus })
        .eq('id', careerId);

      if (error) throw error;
      setSuccess(`Career opportunity ${!currentStatus ? 'activated' : 'deactivated'} successfully!`);
      fetchCareerOpportunities();
    } catch (error) {
      setError("Failed to update career opportunity status");
      console.error('Error:', error);
    }
  };

  const resetArticleForm = () => {
    setTitle("");
    setDescription("");
    setImage(null);
    setEditingArticle(null);
    setShowArticleForm(false);
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const resetCareerForm = () => {
    setCareerTitle("");
    setCareerLocation("");
    setCareerType("");
    setCareerExperience("");
    setCareerDescription("");
    setCareerRequirements("");
    setEditingCareer(null);
    setShowCareerForm(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  if (!user || user.email !== "admin@orangeot.com") {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-orange-50">
      <Header />
      <main className="flex-grow pt-20 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>

          <Tabs defaultValue="articles" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="articles" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Articles
              </TabsTrigger>
              <TabsTrigger value="careers" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Career Opportunities
              </TabsTrigger>
            </TabsList>

            <TabsContent value="articles">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Manage Articles</h2>
                <Button
                  onClick={() => setShowArticleForm(!showArticleForm)}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  {showArticleForm ? "Cancel" : "New Article"}
                </Button>
              </div>

              {showArticleForm && (
                <Card className="shadow-xl mb-8">
                  <CardHeader>
                    <CardTitle>{editingArticle ? "Edit Article" : "Create New Article"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleArticleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                          placeholder="Enter article title"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                          placeholder="Enter article description"
                          rows={6}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="image">Image {editingArticle ? "(Optional - leave empty to keep current)" : "(Optional)"}</Label>
                        <div className="flex items-center gap-4">
                          <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="flex-1"
                          />
                          <Upload className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>

                      {error && <div className="text-red-600 text-sm">{error}</div>}
                      {success && <div className="text-green-600 text-sm">{success}</div>}

                      <div className="flex gap-4">
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 flex items-center gap-2"
                          disabled={loading}
                        >
                          <Save className="h-4 w-4" />
                          {loading ? (editingArticle ? "Updating..." : "Publishing...") : (editingArticle ? "Update Article" : "Publish Article")}
                        </Button>
                        <Button type="button" variant="outline" onClick={resetArticleForm}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle>Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {articles.map((article) => (
                        <TableRow key={article.id}>
                          <TableCell className="font-medium">{article.title}</TableCell>
                          <TableCell className="max-w-xs truncate">{article.description}</TableCell>
                          <TableCell>{new Date(article.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditArticle(article)}
                                className="flex items-center gap-1"
                              >
                                <Edit className="h-3 w-3" />
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteArticle(article.id)}
                                className="flex items-center gap-1 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {articles.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No articles found. Create your first article!
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="careers">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Manage Career Opportunities</h2>
                <Button
                  onClick={() => setShowCareerForm(!showCareerForm)}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  {showCareerForm ? "Cancel" : "New Career Opportunity"}
                </Button>
              </div>

              {showCareerForm && (
                <Card className="shadow-xl mb-8">
                  <CardHeader>
                    <CardTitle>{editingCareer ? "Edit Career Opportunity" : "Create New Career Opportunity"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCareerSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="careerTitle">Job Title</Label>
                          <Input
                            id="careerTitle"
                            value={careerTitle}
                            onChange={(e) => setCareerTitle(e.target.value)}
                            required
                            placeholder="Enter job title"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="careerLocation">Location</Label>
                          <Input
                            id="careerLocation"
                            value={careerLocation}
                            onChange={(e) => setCareerLocation(e.target.value)}
                            required
                            placeholder="Enter location"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="careerType">Job Type</Label>
                          <Select value={careerType} onValueChange={setCareerType}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select job type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Full Time">Full Time</SelectItem>
                              <SelectItem value="Part Time">Part Time</SelectItem>
                              <SelectItem value="Contract">Contract</SelectItem>
                              <SelectItem value="Internship">Internship</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="careerExperience">Experience Required</Label>
                          <Input
                            id="careerExperience"
                            value={careerExperience}
                            onChange={(e) => setCareerExperience(e.target.value)}
                            required
                            placeholder="e.g., 2-3 years"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="careerDescription">Job Description</Label>
                        <Textarea
                          id="careerDescription"
                          value={careerDescription}
                          onChange={(e) => setCareerDescription(e.target.value)}
                          placeholder="Enter job description"
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="careerRequirements">Requirements</Label>
                        <Textarea
                          id="careerRequirements"
                          value={careerRequirements}
                          onChange={(e) => setCareerRequirements(e.target.value)}
                          placeholder="Enter job requirements"
                          rows={4}
                        />
                      </div>

                      {error && <div className="text-red-600 text-sm">{error}</div>}
                      {success && <div className="text-green-600 text-sm">{success}</div>}

                      <div className="flex gap-4">
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 flex items-center gap-2"
                          disabled={careerLoading}
                        >
                          <Save className="h-4 w-4" />
                          {careerLoading ? (editingCareer ? "Updating..." : "Creating...") : (editingCareer ? "Update Opportunity" : "Create Opportunity")}
                        </Button>
                        <Button type="button" variant="outline" onClick={resetCareerForm}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle>Career Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {careerOpportunities.map((career) => (
                        <TableRow key={career.id}>
                          <TableCell className="font-medium">{career.title}</TableCell>
                          <TableCell>{career.location}</TableCell>
                          <TableCell>{career.type}</TableCell>
                          <TableCell>{career.experience}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              career.is_active 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {career.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditCareer(career)}
                                className="flex items-center gap-1"
                              >
                                <Edit className="h-3 w-3" />
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => toggleCareerStatus(career.id, career.is_active)}
                                className={`flex items-center gap-1 ${
                                  career.is_active 
                                    ? 'text-red-600 hover:text-red-700' 
                                    : 'text-green-600 hover:text-green-700'
                                }`}
                              >
                                {career.is_active ? 'Deactivate' : 'Activate'}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteCareer(career.id)}
                                className="flex items-center gap-1 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {careerOpportunities.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No career opportunities found. Create your first opportunity!
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminEditor;
