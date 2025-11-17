import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { CartDrawer } from "./CartDrawer";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const Header = () => {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <img src={logo} alt="Just Us Uniform" className="h-12 w-12 rounded-full" />
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-foreground">Just Us Uniform</h1>
            <p className="text-xs text-muted-foreground">By kids, for kids</p>
          </div>
        </Link>
        
        <nav className="flex items-center gap-4">
          <Link to="/" className="text-sm font-medium hover:text-primary transition hidden sm:block">
            Shop
          </Link>
          <Link to="/size-guide" className="text-sm font-medium hover:text-primary transition hidden sm:block">
            Size Guide
          </Link>
          <Link to="/faq" className="text-sm font-medium hover:text-primary transition hidden sm:block">
            FAQ
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-primary transition hidden sm:block">
            Contact
          </Link>
          <ThemeSwitcher />
          <CartDrawer />
        </nav>
      </div>
    </header>
  );
};
