import { useState, useEffect } from "react";
import productSinglePeach from "@/assets/branding/product-single-peach.webp";
import productStyledDrinks from "@/assets/branding/product-styled-drinks.webp";

const images = [
  { src: productSinglePeach, alt: "Fresh signature mocktail with peach garnish - Dr Beverage specialty drink", label: "Signature Mocktails" },
  { src: productStyledDrinks, alt: "Styled beverage display with multiple drinks on serving tray", label: "Event Ready Service" },
];

const About = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Auto-crossfade on mobile only (no hover on mobile so auto is needed)
  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Text Content */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Your Complete Beverage Solution
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Dr Beverage is a beverage-only catering team. We handle setup, service, and cleanup
            so you can enjoy your event. From specialty coffee to handcrafted mocktails and fresh
            juice stations—we've got your drinks covered.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            With years of experience serving weddings, corporate events, and celebrations across Cairo,
            we bring professional service, premium ingredients, and stunning presentations to every occasion.
          </p>
        </div>

        {/* Desktop: 2-col side-by-side */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {images.map((img) => (
            <div key={img.label} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 aspect-[3/4]">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-semibold text-lg">{img.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: auto-crossfade carousel */}
        <div className="md:hidden max-w-sm mx-auto">
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
            {images.map((img, i) => (
              <img
                key={img.label}
                src={img.src}
                alt={img.alt}
                className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${
                  i === activeIndex ? "opacity-100" : "opacity-0"
                }`}
                loading={i === 0 ? "eager" : "lazy"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
