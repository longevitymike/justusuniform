import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import confetti from "canvas-confetti";

type CTAVariant = 'pill' | 'soft-card' | 'ghost-outline';

interface EmailSignupProps {
  variant?: CTAVariant;
}

export const EmailSignup = ({ variant = 'pill' }: EmailSignupProps) => {
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
        description: "Check your email for exclusive offers and prizes!",
        position: "top-center",
      });
      
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  const getButtonClasses = () => {
    switch (variant) {
      case 'pill':
        return 'cta-pill bg-primary text-primary-foreground hover:bg-primary/90';
      case 'soft-card':
        return 'cta-soft-card text-primary';
      case 'ghost-outline':
        return 'cta-ghost-outline text-foreground hover:text-primary';
      default:
        return 'cta-pill bg-primary text-primary-foreground hover:bg-primary/90';
    }
  };

  return (
    <section className="section-padding bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto container-spacing max-w-4xl">
        <div className="text-center space-y-6 lg:space-y-8">
          <div className="space-y-3 lg:space-y-4">
            <h2 className="heading-md">
              Join the Club! 🎉
            </h2>
            <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
              Get exclusive prizes, rewards, and early access to new styles. Join our community of parents dressing the future with confidence!
            </p>
          </div>
          
          <form 
            onSubmit={handleSubmit} 
            className="flex flex-col sm:flex-row gap-3 lg:gap-4 max-w-xl mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 sm:h-14 text-base tap-target"
              disabled={isLoading}
              aria-label="Email address"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className={getButtonClasses()}
              aria-label="Sign up for newsletter"
            >
              {isLoading ? "Joining..." : "Sign Up"}
            </Button>
          </form>
          
          <p className="text-xs sm:text-sm text-muted-foreground mt-4">
            By signing up, you agree to receive marketing emails.{" "}
            <a href="/terms" className="underline hover:text-primary transition-colors">
              View terms
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
