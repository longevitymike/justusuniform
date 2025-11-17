import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const firstVariant = product.node.variants.edges[0]?.node;
  const imageUrl = product.node.images.edges[0]?.node.url;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!firstVariant) return;
    
    addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions
    });
    
    toast.success("Added to cart!", {
      description: `${product.node.title} - ${firstVariant.title}`,
      position: "top-center",
    });
  };

  return (
    <Link 
      to={`/product/${product.node.handle}`} 
      className="group block premium-card overflow-hidden tap-target"
      aria-label={`View ${product.node.title}`}
    >
      <div className="aspect-[4/3] bg-secondary/5 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.node.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
      </div>
      
      <div className="p-5 lg:p-6 space-y-3">
        <div>
          <h3 className="font-bold text-lg lg:text-xl text-foreground group-hover:text-primary transition-colors">
            {product.node.title}
          </h3>
          <p className="text-sm lg:text-base text-muted-foreground line-clamp-2 mt-2 leading-relaxed">
            {product.node.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl lg:text-3xl font-bold text-primary">
            ${parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
          </span>
          
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="gap-2 tap-target hover:-translate-y-0.5 transition-transform"
            aria-label={`Add ${product.node.title} to cart`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Add to Cart</span>
          </Button>
        </div>
      </div>
    </Link>
  );
};
