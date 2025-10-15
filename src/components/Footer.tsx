import { MessageSquare, Phone, Mail } from "lucide-react";

const Footer = () => {
  const openWhatsApp = () => {
    const message = encodeURIComponent("Hello! I'm interested in your China sourcing services.");
    window.open(`https://wa.me/+8615650730016?text=${message}`, '_blank');
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">PCT</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Pak China Trade</h3>
                <p className="text-sm text-primary-foreground/80">China to Pakistan</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Your trusted Pakistani partner for sourcing high-quality products 
              from China at the best prices.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#home" className="hover:text-primary-foreground transition-colors">Home</a></li>
              <li><a href="#how-it-works" className="hover:text-primary-foreground transition-colors">How It Works</a></li>
              <li><a href="#about" className="hover:text-primary-foreground transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-primary-foreground transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Services</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Product Sourcing</li>
              <li>Quality Assurance</li>
              <li>Shipping & Customs</li>
              <li>Door-to-Door Delivery</li>
            </ul>
          </div>

          {/* Our Team */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Team</h4>
            <div className="space-y-2 text-primary-foreground/80">
              <p>Fahad Rafique</p>
              <p>CEO - Pak China Trade</p>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <button 
                onClick={openWhatsApp}
                className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors w-full text-left"
              >
                <MessageSquare className="w-4 h-4" />
                +861 565 0730 016
              </button>
              <a 
                href="tel:+8615650730016"
                className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Phone className="w-4 h-4" />
                +861 565 0730 016
              </a>
              <a 
                href="mailto:Pakchinatrade007@gmail.com"
                className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
                Pakchinatrade007@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/80 text-sm">
              © 2025 Pak China Trade. All rights reserved.
            </p>
            /*
            <div className="flex gap-6 text-sm text-primary-foreground/80">
                <a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
           </div> 
           */
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
