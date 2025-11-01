import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const Packages = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const packages = [
    {
      name: "Essential",
      price: "from EGP ___",
      description: "Perfect for intimate gatherings",
      features: [
        "2 drink stations",
        "Basic glassware & ice",
        "2 professional staff",
        "Setup & cleanup included",
        "3-hour service",
      ],
      highlight: false,
    },
    {
      name: "Premium",
      price: "from EGP ___",
      description: "Most popular for events",
      features: [
        "3 drink stations",
        "Signature mocktails included",
        "Premium glassware & display",
        "3-4 professional staff",
        "Setup & cleanup included",
        "5-hour service",
      ],
      highlight: true,
    },
    {
      name: "Elite",
      price: "Custom Quote",
      description: "Full-service luxury experience",
      features: [
        "Full beverage mix available",
        "Coffee + mocktails + juices",
        "Premium bar displays",
        "5+ professional staff",
        "Setup & cleanup included",
        "Unlimited service hours",
        "Custom menu design",
      ],
      highlight: false,
    },
  ];

  return (
    <section id="packages" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Packages
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect package for your event size and needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <ScrollReveal key={pkg.name} delay={index * 0.15}>
              <Card
                className={`relative ${
                  pkg.highlight
                    ? "border-accent border-2 shadow-xl scale-105"
                    : "border-border"
                } bg-card transition-transform hover:scale-105 duration-300 h-full`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-accent mb-2">{pkg.price}</div>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant={pkg.highlight ? "accent" : "outline"}
                  className="w-full"
                  size="lg"
                  onClick={scrollToContact}
                >
                  Request Quote
                </Button>
              </CardFooter>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
