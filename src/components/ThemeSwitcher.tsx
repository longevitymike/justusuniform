import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<'retro' | 'modern' | 'christmas'>('christmas');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'retro' | 'modern' | 'christmas' || 'christmas';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const themes: Array<'christmas' | 'retro' | 'modern'> = ['christmas', 'retro', 'modern'];
    const currentIndex = themes.indexOf(theme);
    const newTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative"
    >
      {theme === 'christmas' ? (
        <span className="text-xl">🎄</span>
      ) : theme === 'retro' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
};
