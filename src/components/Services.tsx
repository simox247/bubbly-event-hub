import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wine, Droplets, Coffee, IceCreamCone, Cookie, Snowflake, Package, Briefcase } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

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

const ServiceCard = ({ service }: { service: typeof services[0] }) => (
  <Card className="flex-shrink-0 w-[70vw] sm:w-full border-border hover:shadow-lg transition-shadow duration-300 bg-card h-[200px] sm:h-[240px]">
    <CardHeader className="p-4 sm:p-6">
      <div className="mb-3 p-2.5 sm:p-3 bg-accent/10 rounded-lg w-fit">
        <service.icon className="h-5 w-5 sm:h-7 sm:w-7 text-accent" />
      </div>
      <CardTitle className="text-base sm:text-lg mb-1 sm:mb-2">{service.title}</CardTitle>
      <CardDescription className="text-muted-foreground text-sm sm:text-base leading-relaxed">
        {service.description}
      </CardDescription>
    </CardHeader>
  </Card>
);

const Services = () => {
  return (
    <section id="services" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need for exceptional beverage service at your event
          </p>
        </div>

        {/* Desktop: 4-col grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.06}>
              <ServiceCard service={service} />
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile: CSS marquee — no JS needed */}
        <div
          className="sm:hidden overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          }}
        >
          <div className="flex gap-3 animate-marquee">
            {[...services, ...services].map((service, index) => (
              <ServiceCard key={`${service.title}-${index}`} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
