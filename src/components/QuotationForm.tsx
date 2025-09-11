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
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string | undefined;
  const [formData, setFormData] = useState({
    name: "",
    email: "", 
    whatsapp: "",
    productDescription: "",
    quantity: "",
    notes: ""
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxFiles = 5;
    const maxSizeBytes = 5 * 1024 * 1024; // 5MB per image
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]; 

    const validFiles = files
      .filter(f => allowedTypes.includes(f.type))
      .filter(f => f.size <= maxSizeBytes)
      .slice(0, maxFiles);

    if (files.length !== validFiles.length) {
      toast({
        title: "Some files were skipped",
        description: "Only images up to 5MB (JPG, PNG, WEBP, GIF) are allowed. Max 5 files.",
        variant: "destructive",
      });
    }

    setSelectedFiles(validFiles);
    setPreviewUrls(validFiles.map(f => URL.createObjectURL(f)));
  };

  const uploadImagesAndGetUrls = async (): Promise<string[]> => {
    if (!selectedFiles.length) return [];
    if (!cloudName || !uploadPreset) {
      toast({
        title: "Image upload not configured",
        description: "Images will not be uploaded because Cloudinary env vars are missing.",
      });
      return [];
    }

    try {
      setIsUploading(true);
      const uploadEndpoint = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
      const urlPromises = selectedFiles.map(async (file) => {
        const form = new FormData();
        form.append("file", file);
        form.append("upload_preset", uploadPreset);
        const resp = await fetch(uploadEndpoint, { method: "POST", body: form });
        if (!resp.ok) throw new Error("Upload failed");
        const json = await resp.json();
        return json.secure_url as string;
      });
      const urls = await Promise.all(urlPromises);
      return urls;
    } catch (err) {
      console.error("Image upload error:", err);
      toast({
        title: "Failed to upload images",
        description: "You can still submit the form or send images via WhatsApp.",
        variant: "destructive",
      });
      return [];
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Upload images first (if any)
    const imageUrls = await uploadImagesAndGetUrls();

    // Create WhatsApp message with form data
    const message = `Hello! I would like a quotation for:

Name: ${formData.name}
Email: ${formData.email}
WhatsApp: ${formData.whatsapp}
Product: ${formData.productDescription}
Quantity: ${formData.quantity}
Additional Notes: ${formData.notes}
${imageUrls.length ? `\nImages:\n${imageUrls.join("\n")}` : ""}

Please provide me with a detailed quotation including shipping to Pakistan.`;

    const whatsappUrl = `https://wa.me/+923001234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Create Drive PDF via Netlify function (calls Google Apps Script)
    let attachmentUrl: string | undefined;
    try {
      const resp = await fetch("/.netlify/functions/create-attachment-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          productDescription: formData.productDescription,
          quantity: formData.quantity,
          notes: formData.notes,
          imageUrls,
        }),
      });
      const json = await resp.json();
      if (json && json.success && json.downloadUrl) {
        attachmentUrl = json.downloadUrl as string;
      } else {
        console.warn("Apps Script did not return downloadUrl", json);
      }
    } catch (err) {
      console.error("Failed to create attachment via Apps Script:", err);
    }

    // Send the same data via EmailJS in the background, include attachment_url if available
    const templateParams = {
      full_name: formData.name,
      whatsapp_number: formData.whatsapp,
      email_address: formData.email,
      product_description: formData.productDescription,
      quantity_needed: formData.quantity,
      additional_notes: formData.notes,
      attachment_url: attachmentUrl,
      image_urls: imageUrls.join("\n"),
    } as Record<string, unknown>;

    if (serviceId && templateId && publicKey) {
      emailjs
        .send(serviceId, templateId, templateParams, { publicKey })
        .then(() => {
          toast({
            title: "Email received as well!",
            description: attachmentUrl
              ? "We've also received your request with the attachment."
              : "We've also received your request via email.",
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
      description: imageUrls.length
        ? "We received your request and images. We'll respond within 2 hours."
        : "We'll respond within 2 hours with your detailed quotation.",
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
                  <div className="flex items-center gap-3 mb-3">
                    <Upload className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">Upload product images (optional)</span>
                  </div>
                  <input
                    id="images"
                    name="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFilesSelected}
                    className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-border file:text-sm file:font-semibold file:bg-background file:text-foreground hover:file:bg-muted"
                  />
                  <p className="text-xs text-muted-foreground mt-2">JPG, PNG, WEBP, GIF up to 5MB each. Max 5 files.</p>
                  {previewUrls.length > 0 && (
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {previewUrls.map((src, idx) => (
                        <img key={idx} src={src} alt={`preview-${idx}`} className="h-20 w-full object-cover rounded-md border border-border/50" />
                      ))}
                    </div>
                  )}
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full text-lg py-6 h-auto"
                  disabled={isUploading}
                >
                  <Send className="w-5 h-5 mr-2" />
                  {isUploading ? "Uploading images..." : "Send Quotation Request"}
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