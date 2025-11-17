import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { getProductByHandle } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Loader2, ShoppingCart, Truck, RefreshCw, Shield, ExternalLink, Star, Ruler } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import productKidsStanding from "@/assets/product-kids-standing.jpg";
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
  const addItem = useCartStore(state => state.addItem);

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
                      src={productKidsStanding}
                      alt="Just Us Uniform Pants - Kids Standing"
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
              
              {/* Reviews Placeholder */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-sm font-semibold">4.9/5</span>
                <span className="text-sm text-muted-foreground">(215 reviews)</span>
              </div>

              <p className="text-3xl lg:text-4xl font-bold text-primary">
                ${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
              </p>
            </div>

            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Shipping & Returns Info */}
            <div className="bg-secondary/20 rounded-lg p-4 space-y-2 border border-border">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-primary" />
                <span className="font-semibold">Free shipping over $30</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RefreshCw className="h-4 w-4 text-primary" />
                <span className="font-semibold">60-day easy returns</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span className="font-semibold">Perfect fit guarantee</span>
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
                    <Link to="/size-guide" className="text-sm text-primary hover:underline flex items-center gap-1">
                      <Ruler className="h-4 w-4" />
                      Size Guide
                    </Link>
                  </div>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger className="h-12 lg:h-14 tap-target text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sizeOption.values.map((size: string) => (
                        <SelectItem key={size} value={size} className="text-base tap-target">
                          Size {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

            {/* Customer Reviews Highlight */}
            <div className="border-t pt-6 lg:pt-8">
              <h3 className="font-bold text-lg lg:text-xl mb-4">What Parents Are Saying</h3>
              <div className="space-y-4">
                <div className="bg-secondary/10 rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "My son loves these! Finally found pants that fit properly and last through active play."
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">- Sarah M.</p>
                </div>
                <div className="bg-secondary/10 rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "Great quality and my daughter actually wants to wear them to school!"
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">- Jennifer K.</p>
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
    </div>
  );
};

export default ProductDetail;
