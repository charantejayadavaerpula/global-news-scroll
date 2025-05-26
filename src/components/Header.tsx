import React, { useState } from "react";
import { useTheme } from "./ThemeProvider";
const Header: React.FC = () => {
  const {
    setTheme,
    theme
  } = useTheme();
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
  return <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between p-2 md:p-3">
        {/* Logo */}
        <div onClick={handleBrandDoubleClick} className="flex items-center space-x-3 cursor-pointer select-none mx-0">
          
          <h1 className="font-playfair text-lg md:text-xl font-bold text-foreground tracking-wide">
            Times Global
          </h1>
          <img alt="Verification Badge" className="w-6 h-6" src="https://cdn-icons-gif.flaticon.com/15747/15747340.gif" />
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
            
          </button>
        </div>
      </div>
    </header>;
};
export default Header;