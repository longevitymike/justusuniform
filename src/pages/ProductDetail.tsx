import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { getProductByHandle } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Loader2, ShoppingCart, Truck, RefreshCw, Shield, ExternalLink, Star, Ruler, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroKidsUniforms from "@/assets/hero-kids-uniforms.png";
import productGirlJumping from "@/assets/product-girl-jumping.jpg";
import productKidsGrass from "@/assets/product-kids-grass.jpg";

const PRIMARY_CTA = import.meta.env.VITE_PRIMARY_CTA || 'shopify';
const AMAZON_URL = import.meta.env.VITE_AMAZON_STORE_URL || '';

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [showStickyATC, setShowStickyATC] = useState(false);
  const addItem = useCartStore(state => state.addItem);

  // Sticky ATC intersection observer
  useEffect(() => {
    const atcButton = document.getElementById('main-atc-button');
    if (!atcButton) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyATC(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(atcButton);
    return () => observer.disconnect();
  }, [product]);

  // Review carousel auto-scroll
  useEffect(() => {
    let currentIndex = 0;
    const track = document.getElementById('reviewTrack');
    if (!track) return;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % 4; // 4 reviews
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }, 3500);

    return () => clearInterval(interval);
  }, [product]);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      try {
        const productData = await getProductByHandle(handle);
        setProduct(productData);
        
        // Set default selections
        if (productData?.options) {
          const colorOption = productData.options.find((opt: any) => opt.name === "Color");
          const sizeOption = productData.options.find((opt: any) => opt.name === "Size");
          if (colorOption?.values[0]) setSelectedColor(colorOption.values[0]);
          if (sizeOption?.values[0]) setSelectedSize(sizeOption.values[0]);
        }
      } catch (error) {
        console.error('Failed to load product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  const selectedVariant = product?.variants.edges.find((v: any) => {
    const options = v.node.selectedOptions;
    return (
      options.some((opt: any) => opt.name === "Color" && opt.value === selectedColor) &&
      options.some((opt: any) => opt.name === "Size" && opt.value === selectedSize)
    );
  })?.node;

  const handleAddToCart = () => {
    if (!selectedVariant || !product) return;
    
    addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions
    });
    
    // Confetti celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF9E1B', '#59CBE8', '#4A7729']
    });
    
    toast.success("Added to cart!", {
      description: `${product.title} - ${selectedVariant.title}`,
      position: "top-center",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-xl text-muted-foreground">Product not found</p>
        </div>
      </div>
    );
  }

  const colorOption = product.options.find((opt: any) => opt.name === "Color");
  const sizeOption = product.options.find((opt: any) => opt.name === "Size");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto container-spacing section-padding">
        {/* USP Banner */}
        <div className="mb-8 lg:mb-12 text-center">
          <Badge className="bg-primary text-primary-foreground text-sm lg:text-base px-4 py-2 font-bold uppercase">
            ✨ Designed by Kids, for Kids
          </Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 max-w-7xl mx-auto">
          {/* Image Gallery Carousel */}
          <div className="lg:sticky lg:top-24">
            <Carousel className="w-full">
              <CarouselContent>
                <CarouselItem>
                  <div className="aspect-square bg-secondary/5 rounded-2xl overflow-hidden shadow-[0_8px_32px_-8px_hsl(var(--foreground)/0.08)]">
                    <img
                      src={heroKidsUniforms}
                      alt="Just Us Uniform Pants - Kids in School Uniforms"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="aspect-square bg-secondary/5 rounded-2xl overflow-hidden shadow-[0_8px_32px_-8px_hsl(var(--foreground)/0.08)]">
                    <img
                      src={productGirlJumping}
                      alt="Just Us Uniform Pants - Girl Jumping"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="aspect-square bg-secondary/5 rounded-2xl overflow-hidden shadow-[0_8px_32px_-8px_hsl(var(--foreground)/0.08)]">
                    <img
                      src={productKidsGrass}
                      alt="Just Us Uniform Pants - Kids on Grass"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>

          {/* Product Info */}
          <div className="space-y-6 lg:space-y-8 lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-3 lg:space-y-4">
              <h1 className="heading-lg">{product.title}</h1>
              
              {/* Reviews Social Proof */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-sm font-semibold">4.8/5</span>
                <span className="text-sm text-muted-foreground">(1,274 parent tests)</span>
              </div>

              {/* Price Anchoring */}
              <div className="flex items-center gap-3">
                <p className="text-lg lg:text-xl text-muted-foreground line-through">
                  $39.00
                </p>
                <p className="text-3xl lg:text-4xl font-bold text-primary">
                  ${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                </p>
                <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold">
                  SAVE $10
                </span>
              </div>

              {/* Estimated Delivery Date - Research-backed conversion booster */}
              <div className="flex items-center gap-2 text-sm text-foreground/80">
                <Truck className="h-4 w-4 text-primary" />
                <span className="font-medium">
                  Arrives {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' })}–{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
              </div>

              {/* Shipping & Returns Expandable - Total cost clarity */}
              <Accordion type="single" collapsible className="border rounded-lg">
                <AccordionItem value="shipping" className="border-0">
                  <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline">
                    Shipping & Returns
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground space-y-2">
                    <p><strong>Shipping:</strong> Free on orders over $30. Otherwise $4.99 flat rate.</p>
                    <p><strong>Returns:</strong> Free 60-day returns and exchanges. No questions asked.</p>
                    <p><strong>Guarantee:</strong> If recess wins, you don't pay. Knee-blowout protection included.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              {/* Subhead */}
              <p className="text-base lg:text-lg font-semibold text-foreground">
                Stain-resistant, tag-free, 'fits-right' sizing
              </p>
            </div>

            {/* Benefit Bullets */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm lg:text-base font-medium">Built to Move</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm lg:text-base font-medium">Stain-resistant</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm lg:text-base font-medium">Tag-free waistband</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm lg:text-base font-medium">'Fits-Right' size chart</span>
              </div>
            </div>

            {/* Guarantee Box - Risk Reversal */}
            <div className="bg-primary/10 border-2 border-primary rounded-lg p-4 space-y-2">
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-base lg:text-lg text-foreground">
                    Free 30-day exchanges. Made to outlast recess.
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    If recess wins, you don't pay.
                  </p>
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-5 lg:space-y-6 pt-4 border-t">
              {colorOption && (
                <div className="space-y-3">
                  <label className="text-sm lg:text-base font-semibold block">Color</label>
                  <Select value={selectedColor} onValueChange={setSelectedColor}>
                    <SelectTrigger className="h-12 lg:h-14 tap-target text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOption.values.map((color: string) => (
                        <SelectItem key={color} value={color} className="text-base tap-target">
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {sizeOption && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm lg:text-base font-semibold block">Size</label>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-primary font-medium">True to size</span>
                      <Link to="/size-guide" className="text-sm text-primary hover:underline flex items-center gap-1">
                        <Ruler className="h-4 w-4" />
                        Size Guide
                      </Link>
                    </div>
                  </div>
                  {/* Size Button Grid - Research shows buttons outperform dropdowns for apparel */}
                  <div className="grid grid-cols-5 gap-2">
                    {sizeOption.values.map((size: string) => {
                      const isSelected = selectedSize === size;
                      const isAvailable = product.variants.edges.some((v: any) => 
                        v.node.selectedOptions.some((opt: any) => opt.name === "Size" && opt.value === size) &&
                        v.node.selectedOptions.some((opt: any) => opt.name === "Color" && opt.value === selectedColor) &&
                        v.node.availableForSale
                      );
                      
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          disabled={!isAvailable}
                          className={`
                            relative h-12 rounded-md border-2 font-semibold text-sm transition-all tap-target
                            ${isSelected 
                              ? 'border-primary bg-primary text-primary-foreground shadow-md' 
                              : isAvailable
                                ? 'border-input bg-background hover:border-primary/50 hover:bg-primary/5'
                                : 'border-input bg-muted text-muted-foreground opacity-50 cursor-not-allowed'
                            }
                          `}
                        >
                          {size}
                          {!isAvailable && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-full h-0.5 bg-muted-foreground/40 rotate-[-30deg]" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {/* Stock State Messaging */}
                  {selectedVariant?.availableForSale && (
                    <p className="text-xs text-primary font-medium flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      In stock — ships today
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Add to Cart */}
            {PRIMARY_CTA === 'amazon' ? (
              <div className="space-y-3 lg:space-y-4">
                <Button 
                  size="lg" 
                  className="w-full h-14 lg:h-16 text-base lg:text-lg font-bold tap-target shadow-[0_8px_32px_-8px_hsl(var(--primary)/0.4)] hover:shadow-[0_12px_48px_-8px_hsl(var(--primary)/0.5)] hover:-translate-y-1 transition-all duration-300"
                  onClick={() => window.open(AMAZON_URL, '_blank')}
                  aria-label="Buy on Amazon"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Buy on Amazon
                </Button>
                <p className="text-xs lg:text-sm text-center text-muted-foreground">
                  Available now on Amazon
                </p>
              </div>
            ) : (
              <>
                <Button
                  id="main-atc-button"
                  size="lg"
                  className="w-full h-14 lg:h-16 text-base lg:text-lg bg-primary text-primary-foreground font-bold border-4 border-foreground uppercase tracking-wider transition-all duration-200 hover:translate-x-1 hover:translate-y-1 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:shadow-[0px_0px_0px_0px_hsl(var(--foreground))] tap-target"
                  onClick={handleAddToCart}
                  disabled={!selectedVariant}
                  aria-label={`Add ${product.title} to cart`}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart - ${selectedVariant ? parseFloat(selectedVariant.price.amount).toFixed(2) : '0.00'}
                </Button>
                
                {/* Sticky Mobile Add to Cart */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border lg:hidden z-40 shadow-lg">
                  <Button
                    size="lg"
                    className="w-full h-14 text-base bg-primary text-primary-foreground font-bold border-4 border-foreground uppercase tracking-wider transition-all duration-200 hover:translate-x-1 hover:translate-y-1 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:shadow-[0px_0px_0px_0px_hsl(var(--foreground))] tap-target"
                    onClick={handleAddToCart}
                    disabled={!selectedVariant}
                    aria-label={`Add ${product.title} to cart`}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart - ${selectedVariant ? parseFloat(selectedVariant.price.amount).toFixed(2) : '0.00'}
                  </Button>
                </div>
              </>
            )}

            {/* Customer Reviews Carousel */}
            <div className="border-t pt-6 lg:pt-8">
              <h3 className="font-bold text-lg lg:text-xl mb-4">What Parents Are Saying</h3>
              <div className="overflow-hidden">
                <div 
                  id="reviewTrack" 
                  className="flex gap-4 transition-transform duration-500 ease-in-out"
                  style={{ willChange: 'transform' }}
                >
                  {[
                    { text: "My son loves these! Finally found pants that fit properly and last through active play.", author: "Sarah M." },
                    { text: "Great quality and my daughter actually wants to wear them to school!", author: "Jennifer K." },
                    { text: "These survived a full week of recess. I'm ordering 3 more pairs!", author: "Michael T." },
                    { text: "The stain-resistant fabric is a game changer. No more grass stains!", author: "Lisa R." },
                  ].map((review, idx) => (
                    <div key={idx} className="min-w-full bg-secondary/10 rounded-lg p-4 border border-border flex-shrink-0">
                      <div className="flex items-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground italic">
                        "{review.text}"
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">- {review.author}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6 lg:space-y-8 pt-6 lg:pt-8 border-t pb-20 lg:pb-0">
              <div className="space-y-3 lg:space-y-4">
                <h3 className="font-bold text-lg lg:text-xl">Why Kids Love Them</h3>
                <ul className="space-y-2 lg:space-y-3 text-sm lg:text-base text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Trendy designs that let kids express their style</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>All-day comfort perfect for every adventure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Durable, high-quality materials built to last</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Confidence-boosting fit that makes kids feel special</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 lg:space-y-4">
                <h3 className="font-bold text-lg lg:text-xl">Fabric & Care</h3>
                <ul className="space-y-2 lg:space-y-3 text-sm lg:text-base text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Machine washable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Wrinkle-resistant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Easy care materials</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Add to Cart */}
      {showStickyATC && PRIMARY_CTA !== 'amazon' && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-[0_-6px_24px_rgba(0,0,0,0.08)] md:hidden">
          <div className="container-spacing py-3">
            <Button
              size="lg"
              className="w-full h-12 text-base bg-primary text-primary-foreground font-bold border-4 border-foreground uppercase tracking-wider transition-all duration-200 hover:translate-x-1 hover:translate-y-1 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:shadow-[0px_0px_0px_0px_hsl(var(--foreground))]"
              onClick={handleAddToCart}
              disabled={!selectedVariant}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart - ${selectedVariant ? parseFloat(selectedVariant.price.amount).toFixed(2) : '0.00'}
            </Button>
          </div>
        </div>
      )}
      
      <footer className="container-spacing pt-16 lg:pt-24 pb-8 lg:pb-12 border-t">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2024 Just Us Uniform. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            <Link to="/faq" className="hover:text-foreground transition-colors">FAQ</Link>
            <Link to="/size-guide" className="hover:text-foreground transition-colors">Size Guide</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;
