import { useState, useEffect, useCallback } from "react";
import { Facebook, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
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
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState<{ [key: number]: boolean }>({});
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

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const goToPrevious = useCallback(() => {
    setSelectedImage((current) => {
      if (current === null) return null;
      return (current - 1 + images.length) % images.length;
    });
  }, [images.length]);

  const goToNext = useCallback(() => {
    setSelectedImage((current) => {
      if (current === null) return null;
      return (current + 1) % images.length;
    });
  }, [images.length]);

  const handleImageLoad = (index: number) => {
    setImageLoaded(prev => ({ ...prev, [index]: true }));
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, goToPrevious, goToNext, closeLightbox]);

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
            href="https://www.facebook.com/profile.php?id=61580929321620"
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
              className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer relative"
              onClick={() => openLightbox(index)}
            >
              {!imageLoaded[index] && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
              )}
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                onLoad={() => handleImageLoad(index)}
                className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ${
                  imageLoaded[index] ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                  View
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Dialog */}
        <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
          <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black/95 border-none">
            <VisuallyHidden>
              <DialogTitle>
                {selectedImage !== null ? images[selectedImage].alt : "Gallery Image"}
              </DialogTitle>
            </VisuallyHidden>
            <div className="relative w-full h-full flex items-center justify-center z-[115]">
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="h-6 w-6 text-white" />
              </button>

              {/* Previous button */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-8 w-8 text-white" />
              </button>

              {/* Next button */}
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-8 w-8 text-white" />
              </button>

              {/* Image */}
              {selectedImage !== null && (
                <div className="relative max-w-full max-h-full p-8">
                  <img
                    src={images[selectedImage].src}
                    alt={images[selectedImage].alt}
                    className="max-w-full max-h-[80vh] object-contain rounded-lg"
                  />
                  <p className="text-center text-white/80 mt-4 text-sm">
                    {images[selectedImage].alt}
                  </p>
                  <p className="text-center text-white/60 text-xs mt-2">
                    {selectedImage + 1} / {images.length}
                  </p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Gallery;
