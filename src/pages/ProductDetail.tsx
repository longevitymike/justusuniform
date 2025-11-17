import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { getProductByHandle } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Loader2, ShoppingCart, Truck, RefreshCw, Shield } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-secondary/10 rounded-[var(--radius)] overflow-hidden">
              {product.images.edges[0]?.node ? (
                <img
                  src={product.images.edges[0].node.url}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No image
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div>
              <h1 className="text-4xl font-black text-foreground mb-2">
                {product.title}
              </h1>
              <p className="text-3xl font-bold text-primary">
                ${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Options */}
            <div className="space-y-4 pt-4 border-t">
              {colorOption && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Color</label>
                  <Select value={selectedColor} onValueChange={setSelectedColor}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOption.values.map((color: string) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {sizeOption && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Size</label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sizeOption.values.map((size: string) => (
                        <SelectItem key={size} value={size}>
                          Size {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Add to Cart */}
            <Button
              size="lg"
              className="w-full text-lg py-6"
              onClick={handleAddToCart}
              disabled={!selectedVariant}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart - ${selectedVariant ? parseFloat(selectedVariant.price.amount).toFixed(2) : '0.00'}
            </Button>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center space-y-2">
                <Truck className="h-6 w-6 mx-auto text-primary" />
                <p className="text-xs font-medium">Free Shipping</p>
              </div>
              <div className="text-center space-y-2">
                <RefreshCw className="h-6 w-6 mx-auto text-primary" />
                <p className="text-xs font-medium">Easy Returns</p>
              </div>
              <div className="text-center space-y-2">
                <Shield className="h-6 w-6 mx-auto text-primary" />
                <p className="text-xs font-medium">Quality Guarantee</p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4 pt-6 border-t">
              <div>
                <h3 className="font-bold mb-2">Why Kids Love Them</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Perfect fit designed by real kids</li>
                  <li>• All-day comfort with stretchy waistband</li>
                  <li>• Durable fabric that holds up to playground action</li>
                  <li>• Available in classic uniform colors</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2">Fabric & Care</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Machine washable</li>
                  <li>• Wrinkle-resistant</li>
                  <li>• Easy care materials</li>
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
