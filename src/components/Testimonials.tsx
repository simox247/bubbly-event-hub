import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Flawless service and delicious drinks—our guests loved it. The mocktails were the highlight of our wedding!",
      author: "Mariam S.",
      role: "Wedding Client",
    },
    {
      quote: "Professional team, clean setup, on time. They handled everything perfectly for our corporate event.",
      author: "Ahmed K.",
      role: "Corporate Event",
    },
    {
      quote: "The fresh juice station was a huge hit at our birthday party. Staff was friendly and efficient!",
      author: "Layla M.",
      role: "Birthday Celebration",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Real feedback from real events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.author} className="bg-card border-border">
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-accent mb-4" />
                <p className="text-muted-foreground mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
