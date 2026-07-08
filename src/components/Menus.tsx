import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import ScrollReveal from "./ScrollReveal";

const menus = [
  {
    src: "/menus/beverages.jpg",
    title: "Beverages",
    description: "Coffee, matcha, mojitos, juices & boba",
  },
  {
    src: "/menus/ice-cream.jpg",
    title: "Ice Cream",
    description: "6 flavors, toppings & ice cream cart",
  },
  {
    src: "/menus/taiyaki.jpg",
    title: "Taiyaki & Soft Serve",
    description: "Japanese taiyaki & 5 soft serve flavors",
  },
  {
    src: "/menus/frozen-drinks.jpg",
    title: "Frozen Drinks",
    description: "Slush flavors & slush machine station",
  },
  {
    src: "/menus/canzzzz.jpg",
    title: "Canzzzz",
    description: "Canned coffee, mojitos & juices",
  },
];

const Menus = () => {
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);

  const navigate = useCallback(
    (direction: "prev" | "next") => {
      if (selectedMenu === null) return;
      if (direction === "prev") {
        setSelectedMenu(selectedMenu === 0 ? menus.length - 1 : selectedMenu - 1);
      } else {
        setSelectedMenu(selectedMenu === menus.length - 1 ? 0 : selectedMenu + 1);
      }
    },
    [selectedMenu]
  );

  useEffect(() => {
    if (selectedMenu === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
      if (e.key === "Escape") setSelectedMenu(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedMenu, navigate]);

  return (
    <section id="menus" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
              Our Menus
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Tap any menu to view full details
            </p>
          </div>
        </ScrollReveal>

        {/* Horizontal scroll on mobile, 5-col grid on desktop */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0 max-w-6xl mx-auto">
          {menus.map((menu, index) => (
            <ScrollReveal key={menu.title} delay={index * 0.08}>
              <button
                onClick={() => setSelectedMenu(index)}
                className="group flex-shrink-0 w-[200px] sm:w-[220px] lg:w-full snap-center focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-2xl transition-transform hover:-translate-y-1 duration-300"
                aria-label={`View ${menu.title} menu`}
              >
                {/* Image container */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={menu.src}
                    alt={`${menu.title} menu`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle hover scrim */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                  {/* View indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-white/90 text-stone-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
                      View Menu
                    </span>
                  </div>
                </div>
                {/* Label below */}
                <div className="mt-3 text-center px-1">
                  <h3 className="font-bold text-foreground text-base lg:text-lg">
                    {menu.title}
                  </h3>
                  <p className="text-muted-foreground text-xs lg:text-sm mt-0.5 leading-snug">
                    {menu.description}
                  </p>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-xs mt-2 lg:hidden">Swipe to see more →</p>
      </div>

      {/* Lightbox */}
      <Dialog
        open={selectedMenu !== null}
        onOpenChange={(open) => !open && setSelectedMenu(null)}
      >
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-black/95 border-none overflow-hidden">
          <VisuallyHidden>
            <DialogTitle>
              {selectedMenu !== null ? menus[selectedMenu].title : "Menu"}
            </DialogTitle>
          </VisuallyHidden>

          {selectedMenu !== null && (
            <div className="relative flex items-center justify-center min-h-[50vh] max-h-[90vh]">
              <img
                src={menus[selectedMenu].src}
                alt={`${menus[selectedMenu].title} menu`}
                className="w-full h-full object-contain max-h-[85vh]"
              />

              {/* Nav arrows */}
              <button
                onClick={() => navigate("prev")}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label="Previous menu"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => navigate("next")}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label="Next menu"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Counter + title */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm flex items-center gap-2">
                <span className="font-medium">{menus[selectedMenu].title}</span>
                <span className="text-white/50">|</span>
                <span className="text-white/70">{selectedMenu + 1}/{menus.length}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Menus;
