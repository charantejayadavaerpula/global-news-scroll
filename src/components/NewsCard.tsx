
import React, { useState, useRef, useEffect } from "react";
import { NewsArticle } from "@/types/news";
import { Heart, Share, Bookmark, ChevronDown, ChevronUp, Languages } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface NewsCardProps {
  article: NewsArticle;
  isInView?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({
  article,
  isInView = true
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const lastTapTimeRef = useRef<number>(0);
  const languages = ["English", "Hindi", "Spanish", "Telugu", "Tamil", "German", "Japanese", "Chinese", "Korean", "Arabic"];

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
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleDoubleTap = (e: React.TouchEvent | React.MouseEvent) => {
    const currentTime = Date.now();
    const timeDiff = currentTime - lastTapTimeRef.current;
    if (timeDiff < 300 && timeDiff > 0) {
      // Double tap detected
      e.preventDefault();
      handleLike();
    }
    lastTapTimeRef.current = currentTime;
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    console.log(`Translating to ${language}`);
    // Here you would implement actual translation logic
  };

  // Estimate 2 lines worth of text (approximately 120-140 characters)
  const twoLinesLength = 120;
  const truncatedContent = article.content.length > twoLinesLength ? article.content.substring(0, twoLinesLength) + "..." : article.content;
  const isVideo = article.imageUrl.includes('youtube.com') || article.imageUrl.includes('youtu.be');

  // Pause video when not in view
  useEffect(() => {
    if (isVideo && iframeRef.current) {
      if (!isInView) {
        // Send pause command to YouTube iframe
        iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      }
    }
  }, [isInView, isVideo]);

  return (
    <div className="h-screen w-full relative overflow-hidden snap-start bg-background cursor-pointer select-none" onTouchEnd={handleDoubleTap} onDoubleClick={handleDoubleTap}>
      {/* Top Half - Image or Video */}
      <div className="h-1/2 w-full relative">
        {isVideo ? (
          <iframe 
            ref={iframeRef} 
            className="w-full h-full object-cover" 
            src={`${article.imageUrl}${article.imageUrl.includes('?') ? '&' : '?'}enablejsapi=1`} 
            title={article.title} 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen 
          />
        ) : (
          <div 
            style={{
              backgroundImage: `url(${article.imageUrl})`
            }} 
            className="w-full h-full bg-cover bg-center my-[41px]" 
          />
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
            {article.category}
          </span>
        </div>

        {/* Language Translate Button */}
        <div className="absolute top-4 right-4 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 px-3 py-1 text-xs font-medium bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors" onClick={e => e.stopPropagation()}>
                <Languages size={14} />
                {selectedLanguage}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              {languages.map(language => (
                <DropdownMenuItem key={language} onClick={e => {
                  e.stopPropagation();
                  handleLanguageChange(language);
                }} className={selectedLanguage === language ? "bg-accent" : ""}>
                  {language}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Action Buttons - Moved below image */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-border">
        <button onClick={e => {
          e.stopPropagation();
          handleLike();
        }} className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${isLiked ? 'text-red-500 bg-red-100 dark:bg-red-900/30 scale-105' : 'text-muted-foreground hover:text-foreground hover:bg-accent'}`}>
          <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
          <span className="text-sm">Like</span>
        </button>
        
        <button onClick={e => {
          e.stopPropagation();
          handleShare();
        }} className="flex items-center gap-2 px-4 py-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
          <Share size={18} />
          <span className="text-sm">Share</span>
        </button>
        
        <button onClick={e => {
          e.stopPropagation();
          setIsSaved(!isSaved);
        }} className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${isSaved ? 'text-blue-500 bg-blue-50 dark:bg-blue-950' : 'text-muted-foreground hover:text-foreground hover:bg-accent'}`}>
          <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
          <span className="text-sm">Save</span>
        </button>
      </div>
      
      {/* Bottom Half - Content */}
      <div className="h-1/2 w-full p-6 flex flex-col justify-between text-foreground">
        {/* Title */}
        <h1 className="text-xl md:text-2xl font-bold mb-3 leading-tight">
          {article.title}
        </h1>
        
        {/* Content */}
        <div className="flex-1 mx-0 px-0">
          <p className={`text-sm md:text-base text-muted-foreground mb-2 leading-relaxed ${!isExpanded ? 'line-clamp-2' : ''}`}>
            {isExpanded ? article.content : truncatedContent}
          </p>
          
          {article.content.length > twoLinesLength && (
            <button onClick={e => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }} className="text-primary text-sm font-medium flex items-center gap-1 mb-2">
              {isExpanded ? (
                <>Read Less <ChevronUp size={16} /></>
              ) : (
                <>Read More <ChevronDown size={16} /></>
              )}
            </button>
          )}
        </div>
        
        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            <span className="font-medium">{article.author}</span>
            <span>•</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span>•</span>
            <span>{article.readTime} min read</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
