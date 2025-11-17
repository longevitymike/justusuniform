import { Header } from "@/components/Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-black text-foreground">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about Just Us Uniform pants
            </p>
          </div>

          <div className="bg-card rounded-[var(--radius)] border p-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  What makes Just Us Uniform pants different?
                </AccordionTrigger>
                <AccordionContent>
                  Our pants are designed by kids, for kids! We gather real feedback from children to ensure 
                  the perfect fit, all-day comfort, and durability for active play. Every detail is thoughtfully 
                  crafted based on what kids actually want and need in their school uniforms.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  What sizes are available?
                </AccordionTrigger>
                <AccordionContent>
                  We offer sizes 4 through 18, covering ages 3-4 years through teens. Check our Size Guide 
                  for detailed measurements to find the perfect fit. Our pants feature adjustable waistbands 
                  to grow with your child!
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  What colors do you offer?
                </AccordionTrigger>
                <AccordionContent>
                  Currently, we offer three classic uniform colors: Navy, Khaki, and Black. 
                  These versatile colors meet most school uniform requirements.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  How do I care for my Just Us Uniform pants?
                </AccordionTrigger>
                <AccordionContent>
                  Our pants are machine washable and wrinkle-resistant for easy care! Simply machine wash 
                  cold with like colors and tumble dry low. No need for ironing - they're designed for 
                  busy families and active kids.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  Do you offer free shipping?
                </AccordionTrigger>
                <AccordionContent>
                  Yes! We offer free standard shipping on all orders. Your Just Us Uniform pants will 
                  arrive ready for the first day of school.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left">
                  What is your return policy?
                </AccordionTrigger>
                <AccordionContent>
                  We want you to love your Just Us Uniform pants! If you're not completely satisfied, 
                  we accept returns within 30 days of purchase for a full refund. Items must be unworn 
                  with tags attached. See our Returns page for complete details.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left">
                  Are these pants durable for everyday wear?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely! Our pants are designed to withstand the rigors of playground action, 
                  classroom sitting, and everything in between. Made with high-quality, durable fabrics 
                  that maintain their shape and color wash after wash.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left">
                  When will these be available for purchase?
                </AccordionTrigger>
                <AccordionContent>
                  We're launching soon! Sign up for our email newsletter to be notified when Just Us Uniform 
                  pants become available and receive exclusive launch deals. You can also check us out on Amazon!
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
