import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoriesGrid from "@/components/CategoriesGrid";
import FeaturedListings from "@/components/FeaturedListings";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CategoriesGrid />
        <FeaturedListings />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
