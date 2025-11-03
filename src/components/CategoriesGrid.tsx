import {
  Car, Home, Smartphone, Gamepad2, Shirt, Book,
  Baby, Bike, Wrench, ChefHat, Music, Heart
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const categories = [
  { icon: Car, name: "Vehicles", count: "2,456", color: "text-blue-600" },
  { icon: Home, name: "Real Estate", count: "1,234", color: "text-green-600" },
  { icon: Smartphone, name: "Electronics", count: "3,789", color: "text-purple-600" },
  { icon: Gamepad2, name: "Games & Hobbies", count: "567", color: "text-red-600" },
  { icon: Shirt, name: "Fashion", count: "2,890", color: "text-pink-600" },
  { icon: Book, name: "Books & Media", count: "1,456", color: "text-orange-600" },
  { icon: Baby, name: "Kids & Baby", count: "890", color: "text-yellow-600" },
  { icon: Bike, name: "Sports", count: "1,234", color: "text-indigo-600" },
  { icon: Wrench, name: "Tools & Garden", count: "678", color: "text-gray-600" },
  { icon: ChefHat, name: "Home & Kitchen", count: "2,345", color: "text-emerald-600" },
  { icon: Music, name: "Music & Arts", count: "456", color: "text-cyan-600" },
  { icon: Heart, name: "Health & Beauty", count: "1,567", color: "text-rose-600" },
];

const CategoriesGrid = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/browse?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find exactly what you're looking for in our organized categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={category.name}
                className="group cursor-pointer hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50"
                onClick={() => handleCategoryClick(category.name)}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <IconComponent className={`h-8 w-8 mx-auto ${category.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {category.count} ads
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesGrid;