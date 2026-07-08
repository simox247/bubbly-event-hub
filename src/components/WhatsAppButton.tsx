import { useState, useEffect } from "react";
import { MessageCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const [hideBar, setHideBar] = useState(false);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Hide sticky bar when contact form is in view
  useEffect(() => {
    const contactEl = document.getElementById("contact");
    if (!contactEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHideBar(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(contactEl);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Mobile: sticky bottom bar with both CTAs */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[90] sm:hidden flex gap-2 px-4 py-3 bg-background/95 backdrop-blur-md border-t border-border transition-transform duration-300 ${
          hideBar ? "translate-y-full" : "translate-y-0"
        }`}
        style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom, 12px))' }}
      >
        <Button
          variant="accent"
          className="flex-1 h-12 rounded-xl font-semibold text-sm gap-2"
          onClick={scrollToContact}
        >
          <FileText className="h-4 w-4" />
          Get a Quote
        </Button>
        <a
          href="https://wa.me/201110548715"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0"
          aria-label="Contact us on WhatsApp"
        >
          <Button
            variant="outline"
            className="h-12 w-12 rounded-xl border-green-500 text-green-600 hover:bg-green-50"
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
        </a>
      </div>

      {/* Desktop: floating WhatsApp FAB only */}
      <a
        href="https://wa.me/201110548715"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:block fixed bottom-6 right-6 z-[90]"
        aria-label="Contact us on WhatsApp"
      >
        <Button
          variant="accent"
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </a>
    </>
  );
};

export default WhatsAppButton;
