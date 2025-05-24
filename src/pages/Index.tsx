
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import { mockNewsData } from "@/data/newsData";
import { NewsArticle } from "@/types/news";

const Index: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>(mockNewsData);
  const [loading, setLoading] = useState(false);

  // Simulate infinite scroll by loading more articles
  const loadMoreArticles = () => {
    if (loading) return;
    
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newArticles = mockNewsData.map((article, index) => ({
        ...article,
        id: `${article.id}-${Date.now()}-${index}`,
      }));
      
      setArticles(prev => [...prev, ...newArticles]);
      setLoading(false);
    }, 1000);
  };

  // Handle scroll events for infinite loading
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Load more when user is near the bottom
      if (scrollTop + windowHeight >= documentHeight - 1000 && !loading) {
        loadMoreArticles();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* News Feed */}
      <main className="snap-y snap-mandatory h-screen overflow-y-scroll">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
        
        {/* Loading Indicator */}
        {loading && (
          <div className="h-screen w-full flex items-center justify-center bg-muted snap-start">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-muted-foreground/20 border-t-foreground rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">Loading more stories...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
