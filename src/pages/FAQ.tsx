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
