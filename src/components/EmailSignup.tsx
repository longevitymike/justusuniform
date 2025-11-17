import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import confetti from "canvas-confetti";

export const EmailSignup = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call - in production this would connect to Shopify customer marketing
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      toast.success("You're signed up!", {
        description: "Check your email for exclusive offers and prizes!"
      });
      
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Join the Club! 🎉
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Sign up for exclusive prizes, rewards, and first access to new styles
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-12 sm:h-14"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="lg"
            disabled={isLoading}
            className="h-12 sm:h-14 px-8 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {isLoading ? "Joining..." : "Sign Up"}
          </Button>
        </form>
        
        <p className="text-xs text-muted-foreground mt-4">
          By signing up, you agree to receive marketing emails. 
          <a href="/terms" className="underline ml-1">View terms</a>
        </p>
      </div>
    </section>
  );
};
