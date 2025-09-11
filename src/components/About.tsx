import { Shield, Users, Award, Clock } from "lucide-react";

const About = () => {
  const achievements = [
    {
      icon: Users,
      number: "5000+",
      label: "Happy Customers",
      description: "Served across Pakistan"
    },
    {
      icon: Award,
      number: "50,000+",
      label: "Products Sourced",
      description: "From trusted Chinese suppliers"
    },
    {
      icon: Shield,
      number: "100%",
      label: "Success Rate",
      description: "Zero fraudulent transactions"
    },
    {
      icon: Clock,
      number: "5+",
      label: "Years Experience",
      description: "In China-Pakistan trade"
    }
  ];

  return (
    <section id="about" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-lg font-semibold text-primary mb-2 block">ہمارے بارے میں</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About PakSource
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted Pakistani partner for China imports since 2019
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-foreground">
              Why We Started This Service
            </h3>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                As Pakistani entrepreneurs ourselves, we faced the same challenges you face today - 
                finding reliable suppliers in China, dealing with language barriers, and ensuring 
                product quality while getting competitive prices.
              </p>
              <p>
                After successfully building our own import business, we realized many Pakistani 
                business owners needed the same support. That's why we created PakSource - to be 
                the bridge between Pakistan and China's vast manufacturing ecosystem.
              </p>
              <p>
                Today, we're proud to be 100% Pakistani-owned, with team members in both Pakistan 
                and China, ensuring you get the best of both worlds - local understanding and 
                Chinese market access.
              </p>
            </div>
          </div>

          <div className="bg-card p-8 rounded-2xl shadow-strong">
            <h4 className="text-2xl font-bold text-foreground mb-6 text-center">
              Our Achievements
            </h4>
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <achievement.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-1">
                    {achievement.number}
                  </div>
                  <div className="font-semibold text-foreground text-sm mb-1">
                    {achievement.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {achievement.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust factors */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-card rounded-xl shadow-soft">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-success" />
            </div>
            <h4 className="text-xl font-bold text-foreground mb-2">Transparency</h4>
            <p className="text-muted-foreground">
              No hidden fees. Complete transparency in pricing, including product cost, 
              shipping, customs, and our service charges.
            </p>
          </div>

          <div className="text-center p-6 bg-card rounded-xl shadow-soft">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-accent" />
            </div>
            <h4 className="text-xl font-bold text-foreground mb-2">Pakistani Ownership</h4>
            <p className="text-muted-foreground">
              100% Pakistani-owned business with deep understanding of local market 
              needs and business culture.
            </p>
          </div>

          <div className="text-center p-6 bg-card rounded-xl shadow-soft">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-gold" />
            </div>
            <h4 className="text-xl font-bold text-foreground mb-2">Quality Assurance</h4>
            <p className="text-muted-foreground">
              Rigorous quality checks and supplier verification process to ensure 
              you receive exactly what you ordered.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;