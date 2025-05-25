
import React, { useState } from "react";
import { useTheme } from "./ThemeProvider";

const Header: React.FC = () => {
  const { setTheme, theme } = useTheme();
  const [tapCount, setTapCount] = useState(0);

  const handleBrandDoubleClick = () => {
    setTapCount(prev => prev + 1);
    
    // Reset tap count after 300ms if no second tap
    setTimeout(() => {
      if (tapCount === 0) {
        // This was a double tap
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
      }
      setTapCount(0);
    }, 300);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between p-2 md:p-3">
        {/* Logo */}
        <div 
          className="flex items-center space-x-3 cursor-pointer select-none"
          onClick={handleBrandDoubleClick}
        >
          <img 
            src="/lovable-uploads/128e2bd0-a9d4-4322-96eb-025726e0392b.png" 
            alt="Times Global Logo"
            className="w-6 h-6"
          />
          <h1 className="font-playfair text-lg md:text-xl font-bold text-foreground tracking-wide">
            Times Global
          </h1>
          <img 
            src="/lovable-uploads/76b65860-4d05-47e0-a7d1-2a52286a1e4e.png" 
            alt="Verification Badge"
            className="w-5 h-5"
          />
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-xs font-medium">
            Breaking
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-xs font-medium">
            World
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-xs font-medium">
            Tech
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-xs font-medium">
            Sports
          </a>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2">
          <button className="md:hidden text-foreground p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
