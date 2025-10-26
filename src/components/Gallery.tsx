import { Facebook } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import gallery9 from "@/assets/gallery-9.jpg";
import gallery10 from "@/assets/gallery-10.jpg";
import gallery11 from "@/assets/gallery-11.jpg";
import gallery12 from "@/assets/gallery-12.jpg";

const Gallery = () => {
  const images = [
    { src: gallery1, alt: "Fresh orange juice being poured" },
    { src: gallery2, alt: "Colorful signature mocktail with garnish" },
    { src: gallery3, alt: "Specialty coffee latte art" },
    { src: gallery4, alt: "Watermelon juice in mason jar" },
    { src: gallery5, alt: "Multiple colorful mocktails on tray" },
    { src: gallery6, alt: "Cucumber mint infused water dispenser" },
    { src: gallery7, alt: "Pomegranate juice" },
    { src: gallery8, alt: "Professional beverage bar setup at event" },
    { src: gallery9, alt: "Cold brew coffee" },
    { src: gallery10, alt: "Fresh mango smoothie" },
    { src: gallery11, alt: "Elegant wedding beverage station" },
    { src: gallery12, alt: "Colorful layered mocktail" },
  ];

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Gallery
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            See our beautiful setups and delicious beverages
          </p>
          <a
            href="https://www.facebook.com/drbeverage"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
          >
            <Facebook className="h-5 w-5" />
            See more on our Facebook page
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 group"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
