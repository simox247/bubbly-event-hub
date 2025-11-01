import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coffee, Droplets, Sparkles, Wine, Users } from "lucide-react";
import heroImage from "@/assets/hero-beverage.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const badges = [
    { icon: Droplets, label: "Fresh Juices" },
    { icon: Wine, label: "Signature Mocktails" },
    { icon: Coffee, label: "Coffee Bar" },
    { icon: Sparkles, label: "Ice & Glassware" },
    { icon: Users, label: "Trained Staff" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Professional beverage catering setup with colorful mocktails"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
          Beverage Catering for Events—Done Right.
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
          We serve premium non-alcoholic bars for weddings, corporate events, engagements, birthdays, and launches.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            variant="hero"
            size="xl"
            onClick={() => scrollToSection("contact")}
            className="shadow-lg"
          >
            Get a Quote
          </Button>
          <Button
            size="xl"
            asChild
            className="bg-white text-foreground hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <a href="https://wa.me/201110548715" target="_blank" rel="noopener noreferrer">
              WhatsApp Us
            </a>
          </Button>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {badges.map((badge) => (
            <Badge
              key={badge.label}
              variant="secondary"
              className="px-4 py-2 text-sm font-medium bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 transition-colors"
            >
              <badge.icon className="h-4 w-4 mr-2" />
              {badge.label}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
