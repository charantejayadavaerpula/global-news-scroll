import React, { useEffect, useState, useCallback } from "react";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import { mockNewsData } from "@/data/newsData";
import { NewsArticle } from "@/types/news";
import { useTranslatedText } from "@/hooks/useTranslatedText";

const Index: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>(mockNewsData);
  const [loading, setLoading] = useState(false);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const { translatedText: loadingText } = useTranslatedText("Loading more stories...");

  // ... keep existing code (loadMoreArticles, handleScroll, useEffect)
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

  // Track which article is currently in view
  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Calculate current article index based on scroll position
    const newCurrentIndex = Math.floor(scrollTop / windowHeight);
    setCurrentArticleIndex(newCurrentIndex);
    
    // Load more when user is near the bottom
    if (scrollTop + windowHeight >= documentHeight - 1000 && !loading) {
      loadMoreArticles();
    }
  }, [loading]);

  // Handle scroll events for infinite loading and video pausing
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* News Feed with proper spacing from header */}
      <main className="pt-16 snap-y snap-mandatory h-screen overflow-y-scroll">
        {articles.map((article, index) => (
          <NewsCard 
            key={article.id} 
            article={article} 
            isInView={index === currentArticleIndex}
          />
        ))}
        
        {/* Loading Indicator */}
        {loading && (
          <div className="h-screen w-full flex items-center justify-center bg-muted snap-start">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-muted-foreground/20 border-t-foreground rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">{loadingText}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
