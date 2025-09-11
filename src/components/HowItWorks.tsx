import { Search, FileText, ShoppingCart, Truck } from "lucide-react";
import processImage from "@/assets/process-steps.jpg";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      number: "01",
      title: "Tell Us What You Need",
      titleUrdu: "بتائیں کہ آپ کو کیا چاہیے",
      description: "Share product details, images, or specifications. Our team will find the best suppliers in China for you.",
    },
    {
      icon: FileText,
      number: "02", 
      title: "Get Detailed Quotation",
      titleUrdu: "تفصیلی قیمت حاصل کریں",
      description: "We provide transparent pricing including product cost, shipping, customs, and our service fee.",
    },
    {
      icon: ShoppingCart,
      number: "03",
      title: "We Purchase for You",
      titleUrdu: "ہم آپ کے لیے خریداری کرتے ہیں", 
      description: "After approval, we handle the entire purchase process, quality checks, and packaging in China.",
    },
    {
      icon: Truck,
      number: "04",
      title: "Delivered to Pakistan",
      titleUrdu: "پاکستان میں ڈیلیوری",
      description: "Your products are shipped safely and delivered to your doorstep anywhere in Pakistan.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-lg font-semibold text-primary mb-2 block">کیسے کام کرتا ہے</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, transparent, and reliable process from China to your doorstep
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Process image */}
          <div className="order-2 lg:order-1">
            <img 
              src={processImage} 
              alt="How our China to Pakistan sourcing process works"
              className="w-full h-auto rounded-2xl shadow-strong"
            />
          </div>

          {/* Steps */}
          <div className="order-1 lg:order-2 space-y-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="flex gap-6 p-6 bg-card rounded-xl shadow-soft hover:shadow-strong transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl font-bold text-primary/30">{step.number}</span>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                      <p className="text-sm text-accent font-medium">{step.titleUrdu}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust statement */}
        <div className="text-center mt-16 p-8 bg-gradient-trust/10 rounded-2xl border border-primary/20">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Why Thousands Trust Us
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From small business owners to large retailers, we've helped Pakistani entrepreneurs 
            source over 50,000+ products from China with 100% success rate and zero fraudulent transactions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;