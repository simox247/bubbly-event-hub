import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Do you serve alcohol?",
      answer: "No, we are beverage-only and specialize exclusively in non-alcoholic drinks including mocktails, fresh juices, specialty coffee, and infused waters.",
    },
    {
      question: "Which areas do you cover?",
      answer: "We primarily serve Cairo and nearby cities. Contact us to confirm service availability for your specific location.",
    },
    {
      question: "What do you need from the venue?",
      answer: "We need power outlets and a small prep area. We handle all bar setup, glassware, ice, and cleanup—everything else is on us!",
    },
    {
      question: "How far in advance should we book?",
      answer: "1-2 weeks is ideal for standard bookings. For large events or peak seasons (weddings, holidays), we recommend booking as soon as possible.",
    },
    {
      question: "Can you customize the menu?",
      answer: "Absolutely! We can create custom drink menus tailored to your event theme, preferences, and dietary requirements. Just let us know what you're envisioning.",
    },
    {
      question: "What's included in your packages?",
      answer: "All packages include setup, cleanup, professional staff, and service for the duration specified. Glassware, ice, and bar equipment are provided. Specific drink stations vary by package.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-foreground font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
