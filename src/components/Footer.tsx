import { Facebook, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Dr Beverage</h3>
            <p className="text-primary-foreground/80 mb-4">
              Professional beverage-only catering for weddings, corporate events, and celebrations. 
              We bring the drinks, you enjoy the party.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href="tel:+20XXXXXXXXXX"
                className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>+20 XXX XXX XXXX</span>
              </a>
              <a
                href="https://wa.me/20XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>WhatsApp: +20 XXX XXX XXXX</span>
              </a>
              <a
                href="mailto:info@drbeverage.com"
                className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>info@drbeverage.com</span>
              </a>
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <MapPin className="h-4 w-4" />
                <span>Cairo & nearby cities</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
            <a
              href="https://www.facebook.com/drbeverage"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors"
            >
              <Facebook className="h-5 w-5" />
              <span>Dr Beverage on Facebook</span>
            </a>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60">
          <p>© {currentYear} Dr Beverage. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
