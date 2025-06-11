
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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
      setArticles(data || []);
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-orange-50">
      <Header />
      <main className="flex-grow pt-20 py-0">
        {/* Hero Section */}
        <section className="py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-10">
              <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4 text-gradient bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent animate-fade-in">
                Employee's Corner
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg animate-fade-in delay-75">
                Stay updated with the latest news, announcements, and insights from our team
              </p>
            </div>

            {/* Articles Grid */}
            <div className="max-w-6xl mx-auto">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">Loading articles...</p>
                </div>
              ) : articles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">No articles published yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article) => (
                    <Card key={article.id} className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white rounded-2xl">
                      {article.image_url && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={article.image_url}
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-3 text-gray-900">
                          {article.title}
                        </h3>
                        <p className="text-gray-700 mb-4 line-clamp-3">
                          {article.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(article.created_at)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EmployeesCorner;
