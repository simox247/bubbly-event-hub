import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Flawless service and delicious drinks—our guests loved it. The mocktails were the highlight of our wedding!",
      author: "Mariam S.",
      role: "Wedding Client",
      rating: 5,
      initials: "MS",
    },
    {
      quote: "Professional team, clean setup, on time. They handled everything perfectly for our corporate event.",
      author: "Ahmed K.",
      role: "Corporate Event",
      rating: 5,
      initials: "AK",
    },
    {
      quote: "The fresh juice station was a huge hit at our birthday party. Staff was friendly and efficient!",
      author: "Layla M.",
      role: "Birthday Celebration",
      rating: 5,
      initials: "LM",
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
                <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-accent mb-4" />
                <div className="flex gap-0.5 mb-3" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-semibold text-sm flex-shrink-0">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
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
