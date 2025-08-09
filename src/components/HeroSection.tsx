import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-marketplace.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative bg-gradient-hero min-h-[500px] flex items-center">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-glow/80"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center text-primary-foreground">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up">
            Buy & Sell Everything
            <span className="block text-primary-glow">Near You</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Discover amazing deals from your local community. Post your ads for free!
          </p>
          
          {/* Hero Search */}
          <div className="max-w-md mx-auto mb-8 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="What are you looking for?"
                className="pl-12 h-14 text-lg bg-background/95 backdrop-blur border-0 shadow-elevated"
              />
              <Button variant="hero" size="icon" className="absolute right-2 top-2 h-10 w-10">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-background hover:bg-background/90 text-primary border-0 shadow-elevated"
              onClick={() => navigate("/browse")}
            >
              Browse Categories
            </Button>
            <Button 
              variant="premium" 
              size="lg"
              onClick={() => navigate("/post-ad")}
            >
              Post Your Ad Free
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;