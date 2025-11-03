import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoriesGrid from "@/components/CategoriesGrid";
import FeaturedListings from "@/components/FeaturedListings";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CategoriesGrid />
        <FeaturedListings />
      </main>
    </div>
  );
};

export default Index;
