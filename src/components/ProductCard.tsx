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
      className="group block bg-card rounded-[var(--radius)] overflow-hidden border hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-[4/3] bg-secondary/10 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.node.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition">
            {product.node.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {product.node.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
          </span>
          
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
};
