
import React, { useState } from "react";
import { NewsArticle } from "@/types/news";
import { Heart, Share, Bookmark, ChevronDown, ChevronUp } from "lucide-react";

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.content,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const truncatedContent = article.content.length > 150 
    ? article.content.substring(0, 150) + "..."
    : article.content;

  return (
    <div className="h-screen w-full relative overflow-hidden snap-start bg-background">
      {/* Top Half - Image */}
      <div className="h-1/2 w-full relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${article.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
            {article.category}
          </span>
        </div>
      </div>
      
      {/* Bottom Half - Content */}
      <div className="h-1/2 w-full p-6 flex flex-col justify-between text-foreground">
        {/* Title */}
        <h1 className="text-xl md:text-2xl font-bold mb-3 leading-tight">
          {article.title}
        </h1>
        
        {/* Content */}
        <div className="flex-1">
          <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed">
            {isExpanded ? article.content : truncatedContent}
          </p>
          
          {article.content.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary text-sm font-medium flex items-center gap-1 mb-4"
            >
              {isExpanded ? (
                <>Read Less <ChevronUp size={16} /></>
              ) : (
                <>Read More <ChevronDown size={16} /></>
              )}
            </button>
          )}
        </div>
        
        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center space-x-2">
            <span className="font-medium">{article.author}</span>
            <span>•</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span>•</span>
            <span>{article.readTime} min read</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
              isLiked 
                ? 'text-red-500 bg-red-50 dark:bg-red-950' 
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
            <span className="text-sm">Like</span>
          </button>
          
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <Share size={18} />
            <span className="text-sm">Share</span>
          </button>
          
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
              isSaved 
                ? 'text-blue-500 bg-blue-50 dark:bg-blue-950' 
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
            <span className="text-sm">Save</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
