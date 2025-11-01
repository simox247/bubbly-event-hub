import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Menu, X } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Home", id: "hero" },
    { label: "Services", id: "services" },
    { label: "Packages", id: "packages" },
    { label: "Gallery", id: "gallery" },
    { label: "FAQ", id: "faq" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-md shadow-md" 
          : "bg-gradient-to-b from-black/40 to-transparent backdrop-blur-sm"
      }`}
      style={{ position: 'fixed', zIndex: 100 }}
    >
      <div className="container mx-auto px-4 py-4 relative z-[101]">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection("hero")}
            className={`text-2xl md:text-3xl font-black tracking-wide transition-all duration-300 ${
              isScrolled 
                ? "text-[#94793D] hover:text-[#7a6333]" 
                : "text-white hover:text-[#94793D] drop-shadow-lg"
            }`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            DR-BEVERAGE
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-sm font-medium transition-colors ${
                  isScrolled
                    ? "text-foreground hover:text-accent"
                    : "text-white hover:text-accent drop-shadow-lg"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className={`gap-2 ${
                isScrolled 
                  ? "" 
                  : "text-white hover:text-white hover:bg-white/20 border-white/30"
              }`}
            >
              <a href="tel:+201110548715" aria-label="Call us">
                <Phone className="h-4 w-4" />
                Call Us
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="gap-2"
            >
              <a href="https://wa.me/201110548715" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp us">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={() => scrollToSection("contact")}
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 transition-colors ${
              isScrolled ? "text-foreground" : "text-white"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden mt-4 pb-4 space-y-4 pt-4 relative z-[110] ${
            isScrolled 
              ? "border-t border-border bg-background/95" 
              : "border-t border-white/30 bg-black/40 backdrop-blur-md"
          }`}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`block w-full text-left py-2 transition-colors ${
                  isScrolled
                    ? "text-foreground hover:text-accent"
                    : "text-white hover:text-accent"
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="outline" size="sm" asChild className="gap-2 w-full">
                <a href="tel:+201110548715">
                  <Phone className="h-4 w-4" />
                  Call Us
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild className="gap-2 w-full">
                <a href="https://wa.me/201110548715" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
              <Button
                variant="accent"
                size="sm"
                onClick={() => scrollToSection("contact")}
                className="w-full"
              >
                Get a Quote
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
