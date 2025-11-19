import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { CartDrawer } from "./CartDrawer";

export const Header = () => {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto container-spacing py-3 lg:py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity tap-target" aria-label="Go to homepage">
          <img src={logo} alt="Just Us Uniform" className="h-10 w-10 lg:h-12 lg:w-12 rounded-full" />
        </Link>
        
        <nav className="flex items-center gap-2 lg:gap-4" aria-label="Main navigation">
          <Link to="/size-guide" className="text-sm lg:text-base font-medium hover:text-primary transition-colors hidden md:block tap-target px-2 py-2">
            Size Guide
          </Link>
          <Link to="/faq" className="text-sm lg:text-base font-medium hover:text-primary transition-colors hidden md:block tap-target px-2 py-2">
            FAQ
          </Link>
          <Link to="/contact" className="text-sm lg:text-base font-medium hover:text-primary transition-colors hidden lg:block tap-target px-2 py-2">
            Contact
          </Link>
          <CartDrawer />
        </nav>
      </div>
    </header>
  );
};
