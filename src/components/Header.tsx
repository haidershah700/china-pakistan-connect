import { Button } from "@/components/ui/button";
import { MessageSquare, Phone } from "lucide-react";

const Header = () => {
  const openWhatsApp = () => {
    // WhatsApp Business API integration - opens group chat with admin and team member
    const message = encodeURIComponent("Hello! I'm interested in your product sourcing service from China to Pakistan.");
    window.open(`https://wa.me/+923234922778?text=${message}`, '_blank');
  };

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">PS</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">PakSource</h1>
              <p className="text-xs text-muted-foreground">China to Pakistan</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">How It Works</a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
          </nav>

          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => document.getElementById('quotation')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Quote
            </Button>
            <Button 
              variant="whatsapp" 
              size="sm"
              onClick={openWhatsApp}
              className="flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
