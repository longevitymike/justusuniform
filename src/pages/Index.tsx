import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { EmailSignup } from "@/components/EmailSignup";
import { ShopifyProduct, getProducts } from "@/lib/shopify";
import { Loader2, Package } from "lucide-react";
import logo from "@/assets/logo.png";
import logoHero from "@/assets/logo-hero.png";
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
            <div className="flex justify-center mb-6 lg:mb-8">
              <img 
                src={logoHero} 
                alt="Just Us Uniform" 
                className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-contain"
              />
            </div>
            <p className="body-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Fun and stylish uniform pants where comfort meets confidence
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center pt-4 lg:pt-6">
              <a 
                href="/product/just-us-uniform-pants"
                className="group relative inline-flex items-center justify-center tap-target h-14 sm:h-16 px-8 lg:px-12 bg-primary text-primary-foreground font-bold text-base sm:text-lg border-4 border-foreground uppercase tracking-wider transition-all duration-200 hover:translate-x-1 hover:translate-y-1 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:shadow-[0px_0px_0px_0px_hsl(var(--foreground))]"
                aria-label="Shop now"
              >
                Shop Now
              </a>
              <a 
                href={import.meta.env.VITE_AMAZON_STORE_URL || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center tap-target h-14 sm:h-16 px-8 lg:px-12 bg-background text-foreground font-bold text-base sm:text-lg border-4 border-foreground uppercase tracking-wider transition-all duration-200 hover:translate-x-1 hover:translate-y-1 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:shadow-[0px_0px_0px_0px_hsl(var(--foreground))]"
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
            <h2 className="heading-md">Where Comfort Meets Confidence</h2>
            <p className="body-lg text-muted-foreground leading-relaxed">
              At Just Us, we believe every child deserves to <span className="text-primary font-semibold">sparkle in comfort and style</span>. 
              Our playful yet sleek pants are crafted with high-quality materials, ensuring durability and all-day comfort. 
              Designed for kids who want to stand out and feel confident, Just Us makes every pair an expression of fun and individuality.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            <div className="premium-card text-center space-y-4 p-6 lg:p-8 group">
              <div className="text-5xl lg:text-6xl transition-transform duration-300 group-hover:scale-110">✨</div>
              <h3 className="font-bold text-lg lg:text-xl">Stylish & Trendy</h3>
              <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">Playful designs that let kids express their unique personality and stand out</p>
            </div>
            <div className="premium-card text-center space-y-4 p-6 lg:p-8 group">
              <div className="text-5xl lg:text-6xl transition-transform duration-300 group-hover:scale-110">💪</div>
              <h3 className="font-bold text-lg lg:text-xl">Built to Last</h3>
              <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">Durable, high-quality materials ready for every adventure and playtime</p>
            </div>
            <div className="premium-card text-center space-y-4 p-6 lg:p-8 group sm:col-span-2 lg:col-span-1">
              <div className="text-5xl lg:text-6xl transition-transform duration-300 group-hover:scale-110">🎯</div>
              <h3 className="font-bold text-lg lg:text-xl">Confidence Boost</h3>
              <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">Empowering kids to feel special and confident in their everyday wear</p>
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
                Dressing the future with confidence and joy. Because when kids feel good, they do great.
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
