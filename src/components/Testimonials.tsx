import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ahmed Hassan",
      business: "Electronics Shop Owner, Karachi",
      rating: 5,
      text: "They helped me import mobile accessories from China at 40% less cost than local suppliers. Their transparency and reliability is unmatched.",
      urdu: "بہترین سروس، اعتماد کے ساتھ"
    },
    {
      name: "Fatima Khan", 
      business: "Online Fashion Retailer, Lahore",
      rating: 5,
      text: "I was hesitant about importing from China, but they made it so easy. They handled everything and my products arrived exactly as described.",
      urdu: "آسان اور محفوظ"
    },
    {
      name: "Muhammad Ali",
      business: "Wholesale Trader, Islamabad", 
      rating: 5,
      text: "Working with Pak China Trade for 2 years now. They've never disappointed me. Great prices, quality products, and excellent customer support.",
      urdu: "دو سال سے بہترین تجربہ"
    },
    {
      name: "Sarah Ahmad",
      business: "Home Decor Business, Faisalabad",
      rating: 5,
      text: "The team understands our Pakistani market needs. They suggest better alternatives and help me choose products that sell well here.",
      urdu: "پاکستانی مارکیٹ کی سمجھ"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-lg font-semibold text-primary mb-2 block">کسٹمر ریویوز</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from Pakistani entrepreneurs who've grown their businesses with our help
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="shadow-soft hover:shadow-strong transition-all duration-300 border-border/50"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-primary/20" />
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  "{testimonial.text}"
                </p>
                
                <div className="border-t border-border/50 pt-4">
                  <div className="font-semibold text-foreground text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {testimonial.business}
                  </div>
                  <div className="text-xs text-accent font-medium">
                    {testimonial.urdu}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust statement */}
        <div className="text-center mt-16 p-8 bg-gradient-primary/5 rounded-2xl border border-primary/20">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Join 5000+ Satisfied Customers
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            From Karachi to Islamabad, from small retailers to large wholesalers, 
            Pakistani businesses trust us for their China sourcing needs.
          </p>
          <div className="flex justify-center gap-8 text-sm text-muted-foreground">
            <div>⭐ 4.9/5 Average Rating</div>
            <div>📱 98% WhatsApp Response Rate</div>
            <div>🚚 100% Delivery Success</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
