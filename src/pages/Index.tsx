import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { EmailSignup } from "@/components/EmailSignup";
import { ShopifyProduct, getProducts } from "@/lib/shopify";
import { Loader2, Package } from "lucide-react";
import logo from "@/assets/logo.png";
import heroImage from "@/assets/hero-grass-kids.jpg";

const Index = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await getProducts(10);
        setProducts(productsData);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background/60" />
        </div>
        
        <div className="container mx-auto container-spacing relative z-10 text-center">
          <div className="max-w-5xl mx-auto space-y-6 lg:space-y-8">
            <h1 className="heading-xl mb-6 lg:mb-8">
              Just Us Uniform
            </h1>
            <p className="body-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Fit, comfort, and designed by kids for kids
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 lg:pt-6">
              <a 
                href="/product/just-us-uniform-pants"
                className="inline-flex items-center justify-center tap-target h-14 sm:h-16 px-8 lg:px-10 rounded-full bg-primary text-primary-foreground font-bold text-base sm:text-lg shadow-[0_8px_32px_-8px_hsl(var(--primary)/0.4)] hover:shadow-[0_12px_48px_-8px_hsl(var(--primary)/0.5)] transition-all duration-300 hover:-translate-y-1"
                aria-label="Shop now"
              >
                Shop Now
              </a>
              <a 
                href={import.meta.env.VITE_AMAZON_STORE_URL || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center tap-target h-14 sm:h-16 px-8 lg:px-10 rounded-full bg-secondary text-secondary-foreground font-bold text-base sm:text-lg shadow-[0_8px_32px_-8px_hsl(var(--foreground)/0.1)] hover:shadow-[0_12px_48px_-8px_hsl(var(--foreground)/0.15)] transition-all duration-300 hover:-translate-y-1"
                aria-label="Buy on Amazon"
              >
                Buy on Amazon
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-gradient-to-b from-card/30 to-background">
        <div className="container mx-auto container-spacing">
          <div className="max-w-4xl mx-auto text-center space-y-6 lg:space-y-8 mb-12 lg:mb-16">
            <h2 className="heading-md">Designed by Kids, for Kids</h2>
            <p className="body-lg text-muted-foreground leading-relaxed">
              We understand what matters most: <span className="text-primary font-semibold">fit, comfort, and freedom to move</span>. 
              Every pair is thoughtfully designed with input from the kids who actually wear them every day.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            <div className="premium-card text-center space-y-4 p-6 lg:p-8 group">
              <div className="text-5xl lg:text-6xl transition-transform duration-300 group-hover:scale-110">👖</div>
              <h3 className="font-bold text-lg lg:text-xl">Perfect Fit</h3>
              <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">Sizes that actually fit growing bodies</p>
            </div>
            <div className="premium-card text-center space-y-4 p-6 lg:p-8 group">
              <div className="text-5xl lg:text-6xl transition-transform duration-300 group-hover:scale-110">☁️</div>
              <h3 className="font-bold text-lg lg:text-xl">All-Day Comfort</h3>
              <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">Soft fabrics that move with you</p>
            </div>
            <div className="premium-card text-center space-y-4 p-6 lg:p-8 group sm:col-span-2 lg:col-span-1">
              <div className="text-5xl lg:text-6xl transition-transform duration-300 group-hover:scale-110">🎨</div>
              <h3 className="font-bold text-lg lg:text-xl">Kid-Approved</h3>
              <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">Designed with real kid feedback</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section-padding">
        <div className="container mx-auto container-spacing">
          <h2 className="heading-md text-center mb-12 lg:mb-16">Our Uniforms</h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-20 lg:py-32">
              <Loader2 className="h-12 w-12 lg:h-16 lg:w-16 animate-spin text-primary" />
            </div>
          ) : products.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {products.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 lg:py-32 space-y-6">
              <Package className="h-16 w-16 lg:h-20 lg:w-20 text-muted-foreground mx-auto" />
              <p className="text-xl lg:text-2xl text-muted-foreground">No products found</p>
            </div>
          )}
        </div>
      </section>

      {/* Email Signup */}
      <EmailSignup />

      {/* Footer */}
      <footer className="border-t bg-gradient-to-b from-card/30 to-card/50">
        <div className="container mx-auto container-spacing py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 max-w-6xl mx-auto">
            <div className="col-span-2 md:col-span-1 space-y-4">
              <img src={logo} alt="Just Us Uniform" className="h-12 w-12 lg:h-14 lg:w-14 rounded-full" />
              <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                Uniforms designed by kids, for kids. Perfect fit, all-day comfort.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-base lg:text-lg">Shop</h4>
              <ul className="space-y-3 text-sm lg:text-base text-muted-foreground">
                <li><a href="/" className="hover:text-primary transition-colors tap-target inline-block">All Products</a></li>
                <li><a href="/size-guide" className="hover:text-primary transition-colors tap-target inline-block">Size Guide</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-base lg:text-lg">Support</h4>
              <ul className="space-y-3 text-sm lg:text-base text-muted-foreground">
                <li><a href="/faq" className="hover:text-primary transition-colors tap-target inline-block">FAQ</a></li>
                <li><a href="/contact" className="hover:text-primary transition-colors tap-target inline-block">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-base lg:text-lg">Legal</h4>
              <ul className="space-y-3 text-sm lg:text-base text-muted-foreground">
                <li><a href="/legal/privacy" className="hover:text-primary transition-colors tap-target inline-block">Privacy Policy</a></li>
                <li><a href="/legal/terms" className="hover:text-primary transition-colors tap-target inline-block">Terms of Service</a></li>
                <li><a href="/legal/returns" className="hover:text-primary transition-colors tap-target inline-block">Returns</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 text-center text-sm lg:text-base text-muted-foreground">
            <p>&copy; 2025 Just Us Uniform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
