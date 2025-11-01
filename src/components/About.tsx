import productSinglePeach from "@/assets/branding/product-single-peach.webp";
import productMockupCups from "@/assets/branding/product-mockup-cups.webp";
import productStyledDrinks from "@/assets/branding/product-styled-drinks.webp";

const About = () => {
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

        {/* Product Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 aspect-[3/4]">
            <img
              src={productSinglePeach}
              alt="Fresh signature mocktail with peach garnish - Dr Beverage specialty drink"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-white font-semibold text-lg">Signature Mocktails</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 aspect-[3/4]">
            <img
              src={productMockupCups}
              alt="Dr Beverage branded cups with logo - professional beverage catering"
              className="w-full h-full object-contain bg-muted scale-150 group-hover:scale-[1.55] transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-white font-semibold text-lg">Premium Presentation</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 aspect-[3/4]">
            <img
              src={productStyledDrinks}
              alt="Styled beverage display with multiple drinks on serving tray"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-white font-semibold text-lg">Event Ready Service</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
