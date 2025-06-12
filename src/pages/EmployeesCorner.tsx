
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Article {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  published: boolean;
}

const EmployeesCorner = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const articlesData = data || [];
      setArticles(articlesData);

      // Set the most recent article as featured
      if (articlesData.length > 0) {
        setFeaturedArticle(articlesData[0]);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Filter articles for sidebar (exclude featured article and apply search)
  const sidebarArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const isNotFeatured = featuredArticle ? article.id !== featuredArticle.id : true;
    return matchesSearch && isNotFeatured;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-orange-50">
        <Header />
        <main className="flex-grow pt-20 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <p className="text-gray-600">Loading articles...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-orange-50">
      <Header />
      <main className="flex-grow pt-20 py-0">
        {/* Hero Section */}
        <section className="py-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-8">
              <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4 text-gradient bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent animate-fade-in">
                Employee's Corner
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg animate-fade-in delay-75">
                Stay updated with the latest news, announcements, and insights from our team
              </p>
            </div>

            {articles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No articles published yet.</p>
              </div>
            ) : (
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content - Featured Article */}
                <div className="lg:col-span-2">
                  {featuredArticle && (
                    <Card className="border-none shadow-xl overflow-hidden bg-white rounded-2xl">
                      {featuredArticle.image_url && (
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={featuredArticle.image_url} 
                            alt={featuredArticle.title} 
                            className="w-full h-full object-contain" 
                          />
                        </div>
                      )}
                      <CardContent className="p-8">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">
                          {featuredArticle.title}
                        </h2>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(featuredArticle.created_at)}</span>
                        </div>
                        <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                          {featuredArticle.description}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Sidebar - All Articles with Search */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <Card className="border-none shadow-xl bg-white rounded-2xl">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-4 text-gray-900 border-b border-orange-200 pb-3">
                          All Articles
                        </h3>
                        
                        {/* Search Input */}
                        <div className="relative mb-6">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>

                        {/* Scrollable Articles List */}
                        <ScrollArea className="h-96">
                          <div className="space-y-4 pr-4">
                            {sidebarArticles.map((article) => (
                              <div 
                                key={article.id} 
                                className="flex gap-4 cursor-pointer hover:bg-gray-50 p-3 rounded-xl transition-colors" 
                                onClick={() => setFeaturedArticle(article)}
                              >
                                {article.image_url && (
                                  <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg">
                                    <img 
                                      src={article.image_url} 
                                      alt={article.title} 
                                      className="w-full h-full object-cover" 
                                    />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-2">
                                    {article.title}
                                  </h4>
                                  <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                                    {article.description}
                                  </p>
                                  <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <Calendar className="h-3 w-3" />
                                    <span>{formatDate(article.created_at)}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                            
                            {sidebarArticles.length === 0 && (
                              <p className="text-gray-500 text-sm text-center py-4">
                                {searchTerm ? "No articles found matching your search." : "No other articles available."}
                              </p>
                            )}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>

                    {/* Advertisement Placeholder */}
                    <Card className="border-none shadow-xl bg-white rounded-2xl mt-6">
                      
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EmployeesCorner;
