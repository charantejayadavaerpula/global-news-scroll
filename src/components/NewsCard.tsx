
import React from "react";
import { NewsArticle } from "@/types/news";

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="h-screen w-full relative overflow-hidden snap-start">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${article.imageUrl})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8 text-white">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full">
            {article.category}
          </span>
        </div>
        
        {/* Title */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          {article.title}
        </h1>
        
        {/* Content */}
        <p className="text-sm md:text-base lg:text-lg text-gray-200 mb-6 leading-relaxed line-clamp-4">
          {article.content}
        </p>
        
        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs md:text-sm text-gray-300">
          <div className="flex items-center space-x-4">
            <span className="font-medium">{article.author}</span>
            <span>•</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span>•</span>
            <span>{article.readTime} min read</span>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-4 right-6 z-20">
        <div className="w-6 h-10 border border-white/30 rounded-full flex items-end justify-center p-1">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
