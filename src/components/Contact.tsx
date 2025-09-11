import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const openWhatsApp = () => {
    const message = encodeURIComponent("Hello! I have questions about your sourcing service from China to Pakistan.");
    window.open(`https://wa.me/+923001234567?text=${message}`, '_blank');
  };

  const contactMethods = [
    {
      icon: MessageSquare,
      title: "WhatsApp",
      subtitle: "Fastest Response", 
      value: "+92 300 123 4567",
      action: openWhatsApp,
      available: "24/7 Available",
      color: "text-success"
    },
    {
      icon: Phone,
      title: "Phone",
      subtitle: "Direct Call",
      value: "+92 21 1234 5678", 
      action: () => window.open("tel:+922112345678"),
      available: "9 AM - 6 PM",
      color: "text-accent"
    },
    {
      icon: Mail,
      title: "Email",
      subtitle: "Detailed Inquiries",
      value: "info@paksource.com",
      action: () => window.open("mailto:info@paksource.com"),
      available: "Response in 2 hours",
      color: "text-primary"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-lg font-semibold text-primary mb-2 block">رابطہ کریں</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to start sourcing from China? We're here to help you every step of the way
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <Card key={index} className="shadow-soft hover:shadow-strong transition-all duration-300 cursor-pointer" onClick={method.action}>
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center`}>
                  <method.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">{method.title}</h3>
                <p className="text-sm text-accent font-medium mb-3">{method.subtitle}</p>
                <p className="text-lg font-semibold text-foreground mb-2">{method.value}</p>
                <p className="text-sm text-muted-foreground">{method.available}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Office info and quick contact */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Office Information */}
          <Card className="shadow-soft">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-primary" />
                Our Office
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground">Pakistan Office</h4>
                  <p className="text-muted-foreground">
                    Main Boulevard, Gulberg III<br />
                    Lahore, Punjab, Pakistan
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">China Office</h4>
                  <p className="text-muted-foreground">
                    Guangzhou Trading Center<br />
                    Guangdong Province, China
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-4">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Business Hours</p>
                    <p className="text-sm text-muted-foreground">Monday - Saturday: 9:00 AM - 6:00 PM (PKT)</p>
                    <p className="text-sm text-muted-foreground">WhatsApp Support: 24/7</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Contact Card */}
          <Card className="shadow-soft bg-gradient-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Start?
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Join thousands of Pakistani entrepreneurs who are already sourcing 
                products from China with our help. Get your free quotation today!
              </p>
              
              <div className="space-y-4">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full text-lg py-6 h-auto"
                  onClick={() => document.getElementById('quotation')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Free Quotation
                </Button>
                
                <Button 
                  variant="whatsapp" 
                  size="lg" 
                  className="w-full text-lg py-6 h-auto"
                  onClick={openWhatsApp}
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </Button>
              </div>

              <div className="mt-6 p-4 bg-card/50 rounded-lg border border-border/50">
                <p className="text-sm text-muted-foreground text-center">
                  <span className="font-semibold text-success">Free consultation</span> • 
                  <span className="font-semibold text-accent"> No obligation</span> • 
                  <span className="font-semibold text-primary"> Expert advice</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;