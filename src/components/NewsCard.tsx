import React, { useState, useRef, useEffect } from "react";
import { NewsArticle } from "@/types/news";
import { Heart, Share, Bookmark, ChevronDown, ChevronUp, Languages } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useTranslation } from "@/contexts/TranslationContext";
import { useTranslatedText } from "@/hooks/useTranslatedText";
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
  const {
    currentLanguage,
    setCurrentLanguage
  } = useTranslation();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const lastTapTimeRef = useRef<number>(0);
  const languages = ["English", "Hindi", "Spanish", "Telugu", "Tamil", "German", "Japanese", "Chinese", "Korean", "Arabic"];

  // Translate all text content
  const {
    translatedText: translatedTitle
  } = useTranslatedText(article.title);
  const {
    translatedText: translatedContent
  } = useTranslatedText(article.content);
  const {
    translatedText: translatedCategory
  } = useTranslatedText(article.category);
  const {
    translatedText: likeText
  } = useTranslatedText("Like");
  const {
    translatedText: shareText
  } = useTranslatedText("Share");
  const {
    translatedText: saveText
  } = useTranslatedText("Save");
  const {
    translatedText: readMoreText
  } = useTranslatedText("Read More");
  const {
    translatedText: readLessText
  } = useTranslatedText("Read Less");
  const {
    translatedText: minReadText
  } = useTranslatedText("min read");
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
        title: translatedTitle,
        text: translatedContent,
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
    setCurrentLanguage(language);
    console.log(`Translating to ${language}`);
  };
  const twoLinesLength = 120;
  const truncatedContent = translatedContent.length > twoLinesLength ? translatedContent.substring(0, twoLinesLength) + "..." : translatedContent;
  const isVideo = article.imageUrl.includes('youtube.com') || article.imageUrl.includes('youtu.be');

  // Create multiple images for demonstration (some articles will have multiple images)
  const getArticleImages = () => {
    const baseImages = [article.imageUrl];

    // Add multiple images for certain articles to demonstrate horizontal scroll
    if (article.id === "1" || article.id === "3" || article.id === "5") {
      const additionalImages = ["https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop"];
      return [...baseImages, ...additionalImages];
    }
    return baseImages;
  };
  const articleImages = getArticleImages();
  const hasMultipleImages = articleImages.length > 1;
  useEffect(() => {
    if (isVideo && iframeRef.current) {
      if (!isInView) {
        // Send pause command to YouTube iframe
        iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      }
    }
  }, [isInView, isVideo]);
  return <div className="h-screen w-full relative overflow-hidden snap-start bg-background cursor-pointer select-none" onTouchEnd={handleDoubleTap} onDoubleClick={handleDoubleTap}>
      {/* Top Half - Image or Video */}
      <div className="h-1/2 w-full relative">
        {isVideo ? <iframe ref={iframeRef} className="w-full h-full object-cover" src={`${article.imageUrl}${article.imageUrl.includes('?') ? '&' : '?'}enablejsapi=1`} title={translatedTitle} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> : hasMultipleImages ? <Carousel className="w-full h-full my-[41px]">
            <CarouselContent className="h-full">
              {articleImages.map((imageUrl, index) => <CarouselItem key={index} className="h-full">
                  <div style={{
              backgroundImage: `url(${imageUrl})`
            }} className="w-full h-full bg-cover bg-center" />
                </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel> : <div style={{
        backgroundImage: `url(${article.imageUrl})`
      }} className="w-full h-full bg-cover bg-center my-[41px]" />}
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
            {translatedCategory}
          </span>
        </div>

        {/* Language Translate Button */}
        <div className="absolute top-4 right-4 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 px-3 py-1 text-xs font-medium bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors" onClick={e => e.stopPropagation()}>
                <Languages size={14} />
                {currentLanguage}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              {languages.map(language => <DropdownMenuItem key={language} onClick={e => {
              e.stopPropagation();
              handleLanguageChange(language);
            }} className={currentLanguage === language ? "bg-accent" : ""}>
                  {language}
                </DropdownMenuItem>)}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Action Buttons - Below image, above text */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-border">
        <button onClick={e => {
        e.stopPropagation();
        handleLike();
      }} className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${isLiked ? 'text-red-500 bg-red-100 dark:bg-red-900/30 scale-105' : 'text-muted-foreground hover:text-foreground hover:bg-accent'}`}>
          <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
          <span className="text-sm">{likeText}</span>
        </button>
        
        <button onClick={e => {
        e.stopPropagation();
        handleShare();
      }} className="flex items-center gap-2 px-4 py-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
          <Share size={18} />
          <span className="text-sm">{shareText}</span>
        </button>
        
        <button onClick={e => {
        e.stopPropagation();
        setIsSaved(!isSaved);
      }} className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${isSaved ? 'text-blue-500 bg-blue-50 dark:bg-blue-950' : 'text-muted-foreground hover:text-foreground hover:bg-accent'}`}>
          <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
          <span className="text-sm">{saveText}</span>
        </button>
      </div>
      
      {/* Bottom Half - Content */}
      <div className="h-1/2 w-full p-6 flex flex-col justify-between text-foreground">
        {/* Title */}
        <h1 className="text-xl md:text-2xl font-bold mb-3 leading-tight">
          {translatedTitle}
        </h1>
        
        {/* Content */}
        <div className="flex-1 mx-0 px-0">
          <p className={`text-sm md:text-base text-muted-foreground mb-2 leading-relaxed ${!isExpanded ? 'line-clamp-2' : ''}`}>
            {isExpanded ? translatedContent : truncatedContent}
          </p>
          
          {translatedContent.length > twoLinesLength && <button onClick={e => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }} className="text-primary text-sm font-medium flex items-center gap-1 mb-2">
              {isExpanded ? <>{readLessText} <ChevronUp size={16} /></> : <>{readMoreText} <ChevronDown size={16} /></>}
            </button>}
        </div>
        
        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            <span className="font-medium">{article.author}</span>
            <span>•</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span>•</span>
            <span>{article.readTime} {minReadText}</span>
          </div>
        </div>
      </div>
    </div>;
};
export default NewsCard;