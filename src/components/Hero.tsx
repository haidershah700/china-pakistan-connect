import { Button } from "@/components/ui/button";
import { MessageSquare, FileText, Shield, DollarSign, Truck } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  const openWhatsApp = () => {
    const message = encodeURIComponent("Hello! I want to get a quotation for products from China to Pakistan.");
    window.open(`https://wa.me/+923001234567?text=${message}`, '_blank');
  };

  const scrollToQuotation = () => {
    document.getElementById('quotation')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-background/80"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Urdu heading for local connection */}
          <div className="mb-4">
            <span className="text-2xl md:text-3xl font-bold bg-gradient-trust bg-clip-text text-transparent">
              چین سے پاکستان - آسان اور محفوظ
            </span>
          </div>
          
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
            Get Any Product From{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">China</span>,
            <br />
            Delivered to Your{" "}
            <span className="text-primary">Doorstep in Pakistan</span>
          </h1>
          
          {/* Sub-headline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Cheapest prices, trusted sourcing, complete service from purchase to delivery.
            Your reliable Pakistani partner for China imports.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              variant="hero" 
              size="lg"
              onClick={scrollToQuotation}
              className="flex items-center gap-3 text-lg px-8 py-6 h-auto"
            >
              <FileText className="w-6 h-6" />
              Get a Quotation
            </Button>
            <Button 
              variant="whatsapp" 
              size="lg"
              onClick={openWhatsApp}
              className="flex items-center gap-3 text-lg px-8 py-6 h-auto"
            >
              <MessageSquare className="w-6 h-6" />
              WhatsApp Us Now
            </Button>
          </div>
          
          {/* Trust badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="flex flex-col items-center p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
              <Shield className="w-8 h-8 text-success mb-2" />
              <span className="font-semibold text-foreground">Secure</span>
              <span className="text-xs text-muted-foreground">100% Safe</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
              <DollarSign className="w-8 h-8 text-gold mb-2" />
              <span className="font-semibold text-foreground">Affordable</span>
              <span className="text-xs text-muted-foreground">Best Prices</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
              <Truck className="w-8 h-8 text-accent mb-2" />
              <span className="font-semibold text-foreground">Reliable</span>
              <span className="text-xs text-muted-foreground">Fast Delivery</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
              <MessageSquare className="w-8 h-8 text-primary mb-2" />
              <span className="font-semibold text-foreground">Support</span>
              <span className="text-xs text-muted-foreground">24/7 Help</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-primary/10 rounded-full animate-float"></div>
      <div className="absolute bottom-32 left-10 w-16 h-16 bg-accent/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};

export default Hero;