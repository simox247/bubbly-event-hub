import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wine, Droplets, Coffee, IceCreamCone, Cookie, Snowflake, Package, Users, Briefcase } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const Services = () => {
  const services = [
    {
      icon: Wine,
      title: "Signature Mocktail Bar",
      description: "Mojitos, refreshers & creative mocktails with fresh garnishes and elegant presentation",
    },
    {
      icon: Coffee,
      title: "Specialty Coffee Bar",
      description: "Espresso, Spanish latte, matcha & iced drinks served by professional baristas",
    },
    {
      icon: Droplets,
      title: "Fresh Juice Station",
      description: "Orange, mango, strawberry & seasonal juices made fresh on-site",
    },
    {
      icon: IceCreamCone,
      title: "Ice Cream Station",
      description: "6 premium flavors with toppings, sauces & a charming ice cream cart",
    },
    {
      icon: Cookie,
      title: "Taiyaki & Soft Serve",
      description: "Japanese taiyaki ice cream in black sesame & biscuit editions with 5 soft serve flavors",
    },
    {
      icon: Snowflake,
      title: "Frozen Drinks Station",
      description: "Colorful slush flavors with a professional slush machine — perfect for summer events",
    },
    {
      icon: Package,
      title: "Canzzzz — Ready to Go",
      description: "Sealed canned coffee, mojitos, juices & signature blends — fresh, portable, branded",
    },
    {
      icon: Briefcase,
      title: "Bar Setup & Staffing",
      description: "Complete bar counters, premium glassware, trained baristas & on-site supervisors",
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.08}>
              <Card
                className="border-border hover:shadow-lg transition-shadow duration-300 bg-card h-full"
              >
                <CardHeader>
                  <div className="mb-4 p-3 bg-accent/10 rounded-lg w-fit">
                    <service.icon className="h-7 w-7 text-accent" />
                  </div>
                  <CardTitle className="text-lg mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-muted-foreground text-base leading-relaxed">
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
