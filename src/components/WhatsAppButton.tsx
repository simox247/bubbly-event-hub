import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const [showCta, setShowCta] = useState(false);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const heroEl = document.getElementById("hero");
    const contactEl = document.getElementById("contact");
    if (!heroEl || !contactEl) return;

    let pastHero = false;
    let atContact = false;

    const heroObs = new IntersectionObserver(
      ([entry]) => { pastHero = !entry.isIntersecting; setShowCta(pastHero && !atContact); },
      { threshold: 0.1 }
    );
    const contactObs = new IntersectionObserver(
      ([entry]) => { atContact = entry.isIntersecting; setShowCta(pastHero && !atContact); },
      { threshold: 0.1 }
    );

    heroObs.observe(heroEl);
    contactObs.observe(contactEl);
    return () => { heroObs.disconnect(); contactObs.disconnect(); };
  }, []);

  return (
    <>
      {/* Mobile: unified floating pill */}
      <div
        className={`fixed z-[90] sm:hidden left-1/2 -translate-x-1/2 transition-all duration-300 ${
          showCta ? "bottom-6 opacity-100 scale-100" : "-bottom-20 opacity-0 scale-90"
        }`}
        style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="flex items-stretch bg-accent rounded-full shadow-lg shadow-accent/20">
          <button
            onClick={scrollToContact}
            className="text-white font-semibold text-sm px-5 py-3 rounded-l-full active:bg-accent/80 transition-colors whitespace-nowrap"
          >
            Get a Quote
          </button>
          <div className="w-px my-2 bg-white/25" />
          <a
            href="https://wa.me/201110548715"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white font-semibold text-sm px-5 py-3 rounded-r-full active:bg-accent/80 transition-colors whitespace-nowrap"
            aria-label="WhatsApp us"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Desktop: floating WhatsApp FAB */}
      <a
        href="https://wa.me/201110548715"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:flex fixed bottom-6 right-6 z-[90] items-center justify-center h-14 w-14 rounded-full bg-accent text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </>
  );
};

export default WhatsAppButton;
