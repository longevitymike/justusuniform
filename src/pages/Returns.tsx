import { Header } from "@/components/Header";
import { Mail, Clock, PackageX, AlertCircle } from "lucide-react";

const Returns = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-supreme text-4xl md:text-5xl font-bold text-primary mb-8">
          Returns & Refunds
        </h1>

        {/* Overview */}
        <div className="bg-muted/30 border-2 border-primary/20 rounded-2xl p-6 mb-8">
          <h2 className="font-supreme text-2xl font-bold text-primary mb-4 flex items-center gap-2">
            <AlertCircle className="w-6 h-6" />
            Important Policy
          </h2>
          <p className="text-foreground/90 text-lg leading-relaxed">
            We only accept returns for <strong>defective or damaged products</strong>. Returns for change of mind or incorrect sizing are not accepted.
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-8">
          <h2 className="font-supreme text-2xl font-bold text-primary mb-4 flex items-center gap-2">
            <Clock className="w-6 h-6" />
            Return Window
          </h2>
          <p className="text-foreground/90 text-lg leading-relaxed">
            Return requests must be submitted <strong>within 7 days</strong> of receiving your order.
          </p>
        </div>

        {/* Return Guidelines */}
        <div className="mb-8">
          <h2 className="font-supreme text-2xl font-bold text-primary mb-4 flex items-center gap-2">
            <PackageX className="w-6 h-6" />
            Return Guidelines
          </h2>
          <ul className="space-y-3 text-foreground/90 text-lg">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Items must be <strong>unworn, unwashed, and in original condition</strong> with all tags attached</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Minor imperfections (small stains, slight color variations) do not qualify as defects</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>International orders may have round-trip shipping costs deducted from refunds</span>
            </li>
          </ul>
        </div>

        {/* How to Request */}
        <div className="mb-8">
          <h2 className="font-supreme text-2xl font-bold text-primary mb-4 flex items-center gap-2">
            <Mail className="w-6 h-6" />
            How to Request a Refund
          </h2>
          <p className="text-foreground/90 text-lg leading-relaxed mb-4">
            Email <a href="mailto:returns@justusuniforms.com" className="text-primary font-bold hover:underline">returns@justusuniforms.com</a> with:
          </p>
          <ul className="space-y-3 text-foreground/90 text-lg ml-6">
            <li className="flex gap-3">
              <span className="text-primary font-bold">1.</span>
              <span>Your order number</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">2.</span>
              <span>Clear photos/videos showing the defect (front & back)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">3.</span>
              <span>Brief description of the issue</span>
            </li>
          </ul>
          <p className="text-foreground/90 text-lg leading-relaxed mt-4">
            Our team will review your request and confirm approval via email.
          </p>
        </div>

        {/* Processing Time */}
        <div className="mb-8">
          <h2 className="font-supreme text-2xl font-bold text-primary mb-4">
            Refund Processing
          </h2>
          <p className="text-foreground/90 text-lg leading-relaxed">
            Approved refunds take <strong>10-30 business days</strong> depending on your payment method. If your original payment method is unavailable, refunds will be processed via bank transfer.
          </p>
        </div>

        {/* Exchanges */}
        <div className="bg-muted/30 border-2 border-primary/20 rounded-2xl p-6">
          <h2 className="font-supreme text-2xl font-bold text-primary mb-4">
            Exchanges
          </h2>
          <p className="text-foreground/90 text-lg leading-relaxed">
            We do not offer exchanges for any reason, including incorrect sizing. Please place a new order if you need a different size.
          </p>
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <p className="text-foreground/70 text-lg">
            Questions? Contact us at{" "}
            <a href="mailto:returns@justusuniforms.com" className="text-primary font-bold hover:underline">
              returns@justusuniforms.com
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Returns;
