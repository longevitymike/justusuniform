import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { ShopifyProduct, getProducts } from "@/lib/shopify";
import { Loader2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

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
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block animate-bounce">
              <img src={logo} alt="Just Us Uniform" className="h-32 w-32 mx-auto rounded-full shadow-xl" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-foreground leading-tight">
              Uniforms Made by Kids,<br />
              <span className="text-primary">for Kids</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The perfect fit and all-day comfort in every pair. Because we know what kids really need.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button size="lg" className="text-lg px-8 py-6">
                Shop Now
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Size Guide
              </Button>
            </div>
            
            <div className="inline-block bg-accent text-accent-foreground px-6 py-2 rounded-full font-bold text-sm shadow-md rotate-2 transform hover:rotate-0 transition-transform">
              🎉 Coming Soon! Sign up for launch deals
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Designed by Kids, for Kids</h2>
            <p className="text-lg text-muted-foreground">
              We understand what matters most: <span className="text-primary font-semibold">fit, comfort, and freedom to move</span>. 
              Every pair is thoughtfully designed with input from the kids who actually wear them every day.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-12">
            <div className="text-center space-y-3 p-6 rounded-[var(--radius)] bg-background border">
              <div className="text-4xl">👖</div>
              <h3 className="font-bold text-lg">Perfect Fit</h3>
              <p className="text-sm text-muted-foreground">Sizes that actually fit growing bodies</p>
            </div>
            <div className="text-center space-y-3 p-6 rounded-[var(--radius)] bg-background border">
              <div className="text-4xl">☁️</div>
              <h3 className="font-bold text-lg">All-Day Comfort</h3>
              <p className="text-sm text-muted-foreground">Soft fabrics that move with you</p>
            </div>
            <div className="text-center space-y-3 p-6 rounded-[var(--radius)] bg-background border">
              <div className="text-4xl">🎨</div>
              <h3 className="font-bold text-lg">Kid-Approved</h3>
              <p className="text-sm text-muted-foreground">Designed with real kid feedback</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Uniforms</h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : products.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {products.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 space-y-4">
              <Package className="h-16 w-16 text-muted-foreground mx-auto" />
              <p className="text-xl text-muted-foreground">No products found</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <img src={logo} alt="Just Us Uniform" className="h-12 w-12 rounded-full" />
              <p className="text-sm text-muted-foreground">
                Uniforms designed by kids, for kids. Perfect fit, all-day comfort.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Shop</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/" className="hover:text-primary transition">All Products</a></li>
                <li><a href="/size-guide" className="hover:text-primary transition">Size Guide</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/faq" className="hover:text-primary transition">FAQ</a></li>
                <li><a href="/contact" className="hover:text-primary transition">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/legal/privacy" className="hover:text-primary transition">Privacy Policy</a></li>
                <li><a href="/legal/terms" className="hover:text-primary transition">Terms of Service</a></li>
                <li><a href="/legal/returns" className="hover:text-primary transition">Returns</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Just Us Uniform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
