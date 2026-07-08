import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
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
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

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

  const close = useCallback(() => setSelectedMenu(null), []);

  // Keyboard nav
  useEffect(() => {
    if (selectedMenu === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
      if (e.key === "Escape") close();
    };
    // Lock body scroll
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [selectedMenu, navigate, close]);

  // Touch swipe handlers for lightbox
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    // Only trigger if horizontal swipe > 50px and more horizontal than vertical
    if (absX > 50 && absX > absY * 1.5) {
      if (deltaX > 0) navigate("prev");
      else navigate("next");
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

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

        {/* Mobile: 2-col grid. Desktop: 5-col grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 max-w-6xl mx-auto">
          {menus.map((menu, index) => (
            <ScrollReveal key={menu.title} delay={index * 0.08}>
              <button
                onClick={() => setSelectedMenu(index)}
                className="group w-full focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-2xl transition-transform hover:-translate-y-1 active:scale-[0.98] duration-200"
                aria-label={`View ${menu.title} menu`}
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={menu.src}
                    alt={`${menu.title} menu`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 hidden sm:block" />
                  <div className="absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex">
                    <span className="bg-white/90 text-stone-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
                      View Menu
                    </span>
                  </div>
                </div>
                <div className="mt-3 text-center px-1">
                  <h3 className="font-bold text-foreground text-sm sm:text-base lg:text-lg">
                    {menu.title}
                  </h3>
                  <p className="text-muted-foreground text-xs lg:text-sm mt-0.5 leading-snug hidden sm:block">
                    {menu.description}
                  </p>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      {selectedMenu !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label={menus[selectedMenu].title}
        >
          {/* Close button — safe area aware */}
          <button
            onClick={close}
            className="absolute right-4 z-10 bg-white/15 hover:bg-white/25 active:bg-white/30 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
            style={{ top: 'max(16px, env(safe-area-inset-top, 16px))' }}
            aria-label="Close menu viewer"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Image */}
          <img
            src={menus[selectedMenu].src}
            alt={`${menus[selectedMenu].title} menu`}
            className="max-w-[95vw] max-h-[85vh] object-contain select-none"
            draggable={false}
          />

          {/* Nav arrows — hidden on mobile (swipe instead) */}
          <button
            onClick={() => navigate("prev")}
            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/25 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
            aria-label="Previous menu"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => navigate("next")}
            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/25 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
            aria-label="Next menu"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Bottom bar: dots + title — safe area aware */}
          <div
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ bottom: 'max(24px, calc(env(safe-area-inset-bottom, 0px) + 12px))' }}
          >
            <div className="flex items-center gap-1">
              {menus.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedMenu(i)}
                  className="flex items-center justify-center w-8 h-8"
                  aria-label={`Go to ${menus[i].title}`}
                >
                  <span
                    className={`rounded-full transition-all duration-200 ${
                      i === selectedMenu
                        ? "w-6 h-2 bg-white"
                        : "w-2 h-2 bg-white/40"
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-white/70 text-sm font-medium">
              {menus[selectedMenu].title}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Menus;
