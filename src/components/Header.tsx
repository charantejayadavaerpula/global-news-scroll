
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
      <div className="flex items-center justify-between p-0 md:p-0 relative">
        {/* Logo and Brand Name - Stacked Vertically on Left */}
        <div className="flex items-center space-x-3 py-[5px] my-0 px-[5px]">
          <div onClick={handleBrandDoubleClick} className="flex flex-col items-center space-y-1 cursor-pointer select-none">
            <img 
              alt="Brand Logo" 
              src="https://cdn-icons-png.flaticon.com/128/1444/1444890.png" 
              className="w-8 h-8" 
            />
            <h1 className="font-audiowide text-lg md:text-xl font-bold text-foreground tracking-wide">
              NETIZEN
            </h1>
          </div>
          
          {/* Verification Badge - positioned to the right of the stacked logo/name */}
          <img 
            alt="Verification Badge" 
            src="https://cdn-icons-gif.flaticon.com/15747/15747340.gif" 
            className="w-8 h-8" 
          />
        </div>
        
        {/* Navigation - positioned on the right */}
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
        <div className="flex items-center space-x-2 md:hidden">
          <button className="text-foreground p-1">
            
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
