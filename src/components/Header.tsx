
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between p-4 md:p-6">
        {/* Logo */}
        <div 
          className="flex items-center space-x-2 cursor-pointer select-none"
          onClick={handleBrandDoubleClick}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <h1 className="font-playfair text-xl md:text-2xl font-bold text-foreground">
            Times Global
          </h1>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Breaking
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            World
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Tech
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Sports
          </a>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2">
          <button className="md:hidden text-foreground p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
