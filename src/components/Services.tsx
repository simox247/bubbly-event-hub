import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wine, Droplets, Coffee, Sparkles, Briefcase, Users } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const Services = () => {
  const services = [
    {
      icon: Wine,
      title: "Signature Mocktail Bar",
      description: "Seasonal menus with fresh garnishes and creative presentations",
    },
    {
      icon: Droplets,
      title: "Fresh Juice Station",
      description: "Orange, pomegranate, sugarcane, watermelon, and seasonal mango",
    },
    {
      icon: Coffee,
      title: "Specialty Coffee Bar",
      description: "Espresso-based drinks served hot and iced by professional baristas",
    },
    {
      icon: Sparkles,
      title: "Infused Water & Soda Bar",
      description: "Cucumber-mint, lemon-basil, berries, and artisan sodas",
    },
    {
      icon: Briefcase,
      title: "Ice, Glassware & Bar Setup",
      description: "Complete bar counters, dispensers, and elegant displays",
    },
    {
      icon: Users,
      title: "Professional Staffing",
      description: "Trained baristas, mixologists, and on-site supervisors",
    },
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for exceptional beverage service at your event
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.1}>
              <Card
                className="border-border hover:shadow-lg transition-shadow duration-300 bg-card h-full"
              >
                <CardHeader>
                  <div className="mb-4 p-3 bg-accent/10 rounded-lg w-fit">
                    <service.icon className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
