import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, MessageSquare, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const QuotationForm = () => {
  const { toast } = useToast();
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;
  const [formData, setFormData] = useState({
    name: "",
    email: "", 
    whatsapp: "",
    productDescription: "",
    quantity: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create WhatsApp message with form data
    const message = `Hello! I would like a quotation for:

Name: ${formData.name}
Email: ${formData.email}
WhatsApp: ${formData.whatsapp}
Product: ${formData.productDescription}
Quantity: ${formData.quantity}
Additional Notes: ${formData.notes}

Please provide me with a detailed quotation including shipping to Pakistan.`;

    const whatsappUrl = `https://wa.me/+923001234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Send the same data via EmailJS in the background
    const templateParams = {
      full_name: formData.name,
      whatsapp_number: formData.whatsapp,
      email_address: formData.email,
      product_description: formData.productDescription,
      quantity_needed: formData.quantity,
      additional_notes: formData.notes,
    };

    if (serviceId && templateId && publicKey) {
      emailjs
        .send(serviceId, templateId, templateParams, { publicKey })
        .then(() => {
          toast({
            title: "Email received as well!",
            description: "We've also received your request via email.",
          });
        })
        .catch((error) => {
          console.error("EmailJS send error:", error);
          toast({
            title: "Email failed to send",
            description: "We still received your WhatsApp message.",
            variant: "destructive",
          });
        });
    } else {
      console.warn("Missing EmailJS env vars. Skipping email send.");
    }

    toast({
      title: "Quotation Request Sent!",
      description: "We'll respond within 2 hours with your detailed quotation.",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="quotation" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-lg font-semibold text-primary mb-2 block">مفت قیمت حاصل کریں</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get Your Free Quotation
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tell us what you need and we'll find the best price in China for you
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="shadow-strong border-primary/10">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl text-foreground">Request Quotation</CardTitle>
              <CardDescription className="text-lg">
                Fill out the form below and we'll send you a detailed quote via WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground font-medium">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="border-border focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp" className="text-foreground font-medium">
                      WhatsApp Number *
                    </Label>
                    <Input
                      id="whatsapp"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="+92 300 1234567"
                      required
                      className="border-border focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="border-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productDescription" className="text-foreground font-medium">
                    Product Description *
                  </Label>
                  <Textarea
                    id="productDescription"
                    name="productDescription"
                    value={formData.productDescription}
                    onChange={handleChange}
                    placeholder="Describe the product you want to source from China..."
                    rows={4}
                    required
                    className="border-border focus:border-primary resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-foreground font-medium">
                    Quantity Needed
                  </Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="e.g., 100 pieces, 50 kg, 1 container"
                    className="border-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-foreground font-medium">
                    Additional Notes
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any specific requirements, budget, or timeline..."
                    rows={3}
                    className="border-border focus:border-primary resize-none"
                  />
                </div>

                <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
                  <div className="flex items-center gap-3 mb-2">
                    <Upload className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">Have product images?</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Send us product images via WhatsApp after submitting this form for more accurate quotations.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full text-lg py-6 h-auto"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Quotation Request
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  <p>
                    🔒 Your information is secure. We'll respond within 2 hours.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QuotationForm;