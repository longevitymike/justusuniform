import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { SchoolFinder } from "@/components/SchoolFinder";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { UGCCarousel } from "@/components/UGCCarousel";
import { Button } from "@/components/ui/button";
import { getProductByHandle } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Loader2, ShoppingCart, Truck, RefreshCw, Shield, ExternalLink, Star, Ruler, Check, AlertCircle, Package, TrendingUp, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import ugcParent1 from "@/assets/ugc-parent-1.png";
import ugcParent2 from "@/assets/ugc-parent-2.png";
import ugcParent3 from "@/assets/ugc-parent-3.png";
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
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 14 });
  const [selectedSchool, setSelectedSchool] = useState<any>(null);
  const addItem = useCartStore(state => state.addItem);

  // Load selected school from localStorage
  useEffect(() => {
    const schoolData = localStorage.getItem("selectedSchool");
    if (schoolData) {
      setSelectedSchool(JSON.parse(schoolData));
    }
  }, []);

  // Countdown timer for EDD
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59 };
        }
        return prev;
      });
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

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
        {/* USP Banner with School-Approved Badge */}
        <div className="mb-8 lg:mb-12 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Badge className="bg-secondary text-secondary-foreground text-sm lg:text-base px-4 py-2 font-bold uppercase">
            ✓ School-Approved
          </Badge>
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
              
              {/* School Compliance Badge */}
              {selectedSchool && (
                <div className="inline-flex items-center gap-2 bg-accent/20 border-2 border-accent rounded-lg px-4 py-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span className="font-semibold text-sm">
                    Compliant for {selectedSchool.name} in {selectedSchool.allowedColors.join(", ")}
                  </span>
                </div>
              )}
              
              {/* Reviews Social Proof with Photo Reviews */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-[hsl(var(--brand-orange))] stroke-[hsl(var(--brand-navy))] stroke-[1.5]" style={{ filter: 'drop-shadow(0 1px 0 rgba(255,158,27,0.12))' }} />
                  ))}
                </div>
                <span className="text-sm font-semibold">4.8/5</span>
                <span className="text-sm text-muted-foreground">(1,274 parent tests)</span>
                <button className="text-sm text-primary hover:underline font-medium">
                  Read all reviews →
                </button>
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

              {/* Enhanced EDD with countdown - Research-backed conversion booster */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-foreground/90">
                  <Truck className="h-4 w-4 text-primary" />
                  <span className="font-semibold">
                    Arrives {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' })}–{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <p className="text-xs text-primary font-medium">
                  Order in {timeLeft.hours}h {timeLeft.minutes}m for same-day shipping
                </p>
              </div>

              {/* One-line policy row - Total cost clarity at decision point */}
              <div className="flex flex-wrap items-center gap-2 text-xs lg:text-sm text-foreground/80 border rounded-lg px-4 py-3 bg-muted/30">
                <span className="font-semibold">Free shipping $30+</span>
                <span className="text-muted-foreground">•</span>
                <span className="font-semibold">Free 60-day returns</span>
                <span className="text-muted-foreground">•</span>
                <span className="font-semibold">Free exchanges</span>
              </div>

              {/* Free Shipping Progress on PDP */}
              {selectedVariant && parseFloat(selectedVariant.price.amount) < 30 && (
                <div className="space-y-2 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground/80">
                      Add ${(30 - parseFloat(selectedVariant.price.amount)).toFixed(2)} more for FREE shipping
                    </span>
                    <TrendingUp className="h-3 w-3 text-primary" />
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(parseFloat(selectedVariant.price.amount) / 30) * 100}%` }}
                    />
                  </div>
                </div>
              )}
              
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
                  {/* Stock State & Low-Stock Messaging */}
                  {selectedVariant?.availableForSale ? (
                    <div className="space-y-1">
                      <p className="text-xs text-primary font-medium flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        In stock — ships today
                      </p>
                      {/* Low stock urgency - shown when inventory < 10 */}
                      <p className="text-xs text-destructive font-medium flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Only 6 left in this size/color
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">Out of stock</p>
                      <button 
                        className="text-xs text-primary hover:underline font-medium"
                        onClick={() => toast.info("Back-in-stock alerts coming soon!", { position: "top-center" })}
                      >
                        Notify me when available
                      </button>
                    </div>
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

                {/* Shop Pay Installments Mention */}
                <p className="text-xs text-center text-muted-foreground">
                  or pay in 4 interest-free installments with <span className="font-semibold text-foreground">Shop Pay</span>
                </p>
                
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

            {/* Complementary Products - "Complete the Uniform" */}
            <div className="border-t pt-6 lg:pt-8 space-y-4">
              <h3 className="font-bold text-lg lg:text-xl flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Complete the Uniform
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: "Classic Belt", price: 12.99 },
                  { name: "Uniform Socks (3-pack)", price: 14.99 },
                  { name: "Polo Shirt", price: 19.99 }
                ].map((item, idx) => (
                  <div key={idx} className="premium-card p-3 text-center space-y-2 hover:border-primary/50 cursor-pointer transition-all">
                    <div className="aspect-square bg-muted/50 rounded-lg" />
                    <p className="text-xs font-semibold">{item.name}</p>
                    <p className="text-xs text-primary font-bold">${item.price}</p>
                    <button className="text-xs text-primary hover:underline">+ Add</button>
                  </div>
                ))}
              </div>
            </div>

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
                          <Star key={star} className="h-4 w-4 fill-[hsl(var(--brand-orange))] stroke-[hsl(var(--brand-navy))] stroke-[1.5]" style={{ filter: 'drop-shadow(0 1px 0 rgba(255,158,27,0.12))' }} />
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
          <div className="container-spacing py-3 space-y-2">
            {/* Enhanced Sticky ATC showing variant details */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-muted-foreground">
                {selectedColor && selectedSize ? `${selectedColor} • Size ${selectedSize}` : 'Select options'}
              </span>
              <span className="font-bold text-foreground">
                ${selectedVariant ? parseFloat(selectedVariant.price.amount).toFixed(2) : '0.00'}
              </span>
            </div>
            <Button
              size="lg"
              className="w-full h-12 text-base bg-primary text-primary-foreground font-bold border-4 border-foreground uppercase tracking-wider transition-all duration-200 hover:translate-x-1 hover:translate-y-1 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:shadow-[0px_0px_0px_0px_hsl(var(--foreground))]"
              onClick={handleAddToCart}
              disabled={!selectedVariant}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      )}

      {/* Comparison Table */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto container-spacing">
          <h2 className="heading-md text-center mb-8 lg:mb-12">Just Us vs Standard Uniform Pants</h2>
          
          <div className="max-w-4xl mx-auto premium-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm lg:text-base">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left p-4 lg:p-6 font-bold text-base lg:text-lg">Feature</th>
                    <th className="text-center p-4 lg:p-6 font-bold text-primary text-base lg:text-lg">Just Us Uniform</th>
                    <th className="text-center p-4 lg:p-6 font-bold text-muted-foreground text-base lg:text-lg">Standard Pants</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-4 lg:p-6 font-medium">Tag-free waistband</td>
                    <td className="p-4 lg:p-6 text-center">
                      <Check className="h-5 w-5 lg:h-6 lg:w-6 text-primary mx-auto" />
                    </td>
                    <td className="p-4 lg:p-6 text-center text-muted-foreground">—</td>
                  </tr>
                  <tr className="border-b border-border bg-muted/20">
                    <td className="p-4 lg:p-6 font-medium">Stain-resistant</td>
                    <td className="p-4 lg:p-6 text-center">
                      <Check className="h-5 w-5 lg:h-6 lg:w-6 text-primary mx-auto" />
                    </td>
                    <td className="p-4 lg:p-6 text-center text-muted-foreground">—</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 lg:p-6 font-medium">Reinforced knees</td>
                    <td className="p-4 lg:p-6 text-center">
                      <Check className="h-5 w-5 lg:h-6 lg:w-6 text-primary mx-auto" />
                    </td>
                    <td className="p-4 lg:p-6 text-center text-muted-foreground">—</td>
                  </tr>
                  <tr className="border-b border-border bg-muted/20">
                    <td className="p-4 lg:p-6 font-medium">Fits-Right sizing</td>
                    <td className="p-4 lg:p-6 text-center">
                      <Check className="h-5 w-5 lg:h-6 lg:w-6 text-primary mx-auto" />
                    </td>
                    <td className="p-4 lg:p-6 text-center text-muted-foreground">—</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 lg:p-6 font-medium">30-day exchanges</td>
                    <td className="p-4 lg:p-6 text-center">
                      <Check className="h-5 w-5 lg:h-6 lg:w-6 text-primary mx-auto" />
                    </td>
                    <td className="p-4 lg:p-6 text-center text-muted-foreground">Limited</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="p-4 lg:p-6 font-medium">Designed by kids</td>
                    <td className="p-4 lg:p-6 text-center">
                      <Check className="h-5 w-5 lg:h-6 lg:w-6 text-primary mx-auto" />
                    </td>
                    <td className="p-4 lg:p-6 text-center text-muted-foreground">—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* UGC Strip with Fit Data */}
      <section className="section-padding bg-background">
        <div className="container mx-auto container-spacing">
          <div className="text-center mb-8 lg:mb-10">
            <h2 className="heading-md mb-4">How Parents Say They Fit</h2>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-full">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="font-bold text-base lg:text-lg">82% say: <span className="text-primary">True to size</span></span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4 max-w-6xl mx-auto">
            <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <img src={ugcParent1} alt="Parent testimonial photo 1" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <img src={ugcParent2} alt="Parent testimonial photo 2" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <img src={ugcParent3} alt="Parent testimonial photo 3" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <img src={ugcParent1} alt="Parent testimonial photo 4" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <img src={ugcParent2} alt="Parent testimonial photo 5" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <img src={ugcParent3} alt="Parent testimonial photo 6" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto container-spacing">
          <h2 className="heading-md text-center mb-8 lg:mb-12">Common Questions</h2>
          
          <Accordion type="single" collapsible className="max-w-3xl mx-auto space-y-4">
            <AccordionItem value="returns" className="premium-card border-0">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <span className="text-left font-semibold text-base lg:text-lg">What is your return policy?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-sm lg:text-base text-muted-foreground">
                We offer free 60-day returns and free exchanges. If your child outgrows them or you need a different size, we make it easy. Just reach out to our team and we will take care of everything.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="compliance" className="premium-card border-0">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <span className="text-left font-semibold text-base lg:text-lg">Are these school dress-code compliant?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-sm lg:text-base text-muted-foreground">
                Yes! Just Us Uniform pants are designed to meet standard school dress codes. They feature no logos, come in approved colors (Navy, Khaki, Black), have proper belt loops, and are made from wrinkle-resistant, appropriate fabric. Accepted at 37+ schools.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="measuring" className="premium-card border-0">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <span className="text-left font-semibold text-base lg:text-lg">How do I measure my child for the right size?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-sm lg:text-base text-muted-foreground">
                We recommend ordering your child&apos;s typical size—82% of parents say our pants fit true to size. For the most accurate fit, measure their waist at the belly button and check our size guide. If between sizes, we suggest sizing up for growing room.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="care" className="premium-card border-0">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <span className="text-left font-semibold text-base lg:text-lg">How do I care for these pants?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-sm lg:text-base text-muted-foreground">
                Super easy! Machine wash cold with like colors, tumble dry low. The fabric is wrinkle-resistant and stain-resistant, so they look great wash after wash. No special treatment needed—just toss them in with the regular laundry.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="durability" className="premium-card border-0">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <span className="text-left font-semibold text-base lg:text-lg">Will they survive recess and rough play?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-sm lg:text-base text-muted-foreground">
                Absolutely! Our pants feature reinforced knees and are built to handle slides, grass stains, and all-day active play. We stand behind our Play-Hard Guarantee—if they don&apos;t last, we&apos;ll make it right.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Guarantee Row */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container mx-auto container-spacing">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h2 className="text-2xl lg:text-4xl font-bold">Our Play-Hard Guarantee</h2>
            <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-8 text-sm lg:text-base">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 lg:h-6 lg:w-6" />
                <span className="font-semibold">Play-Hard Guarantee</span>
              </div>
              <span className="hidden sm:inline text-primary-foreground/60">•</span>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 lg:h-6 lg:w-6" />
                <span className="font-semibold">30-day free exchanges</span>
              </div>
              <span className="hidden sm:inline text-primary-foreground/60">•</span>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 lg:h-6 lg:w-6" />
                <span className="font-semibold">Free returns</span>
              </div>
            </div>
            <p className="text-base lg:text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              If they don&apos;t survive recess, we&apos;ll make it right. Made to outlast every adventure.
            </p>
          </div>
        </div>
      </section>

      {/* Final Static CTA */}
      <section className="section-padding bg-background">
        <div className="container mx-auto container-spacing">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl lg:text-3xl font-bold">Ready to Try Recess-Proof Pants?</h2>
            <p className="text-base lg:text-lg text-muted-foreground">
              Join 1,274+ parents who chose comfort, durability, and confidence for their kids.
            </p>
            {PRIMARY_CTA === 'amazon' ? (
              <Button 
                size="lg" 
                className="h-14 lg:h-16 px-8 lg:px-12 text-base lg:text-lg font-bold shadow-[0_8px_32px_-8px_hsl(var(--primary)/0.4)] hover:shadow-[0_12px_48px_-8px_hsl(var(--primary)/0.5)] hover:-translate-y-1 transition-all duration-300"
                onClick={() => window.open(AMAZON_URL, '_blank')}
                aria-label="Buy on Amazon"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Buy on Amazon — ${selectedVariant ? parseFloat(selectedVariant.price.amount).toFixed(2) : '34.99'}
              </Button>
            ) : (
              <Button
                size="lg"
                className="h-14 lg:h-16 px-8 lg:px-12 text-base lg:text-lg bg-primary text-primary-foreground font-bold border-4 border-foreground uppercase tracking-wider transition-all duration-200 hover:translate-x-1 hover:translate-y-1 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:shadow-[0px_0px_0px_0px_hsl(var(--foreground))]"
                onClick={handleAddToCart}
                disabled={!selectedVariant}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart — ${selectedVariant ? parseFloat(selectedVariant.price.amount).toFixed(2) : '34.99'}
              </Button>
            )}
            <p className="text-xs lg:text-sm text-muted-foreground">
              Free shipping on orders $30+ • 30-day exchanges
            </p>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* UGC Parent Photos */}
      <UGCCarousel />

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
