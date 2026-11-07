"use client";

import DishOrbitCarousel, { type Dish } from "@/components/ui/dish-orbit-carousel";

// Culinary dish collection with verified Unsplash high-resolution photography
const SAMPLE_DISHES: Dish[] = [
  {
    title: "Dry Aged",
    subtitle: "Prime Ribeye",
    eyebrow: "#1 Chef's Signature Cut",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    rating: 4.9,
    chef: "Marco Laurent",
    kitchen: "Atelier Fire & Oak",
    description: "45-day dry-aged bone-in ribeye seared over white binchotan charcoal, glazed with bone marrow jus and smoked sea salt.",
    likes: 1240,
    ingredients: ["Prime Black Angus", "Binchotan Smoke", "Marrow Butter", "Thyme Essence"],
    accent: "#ff5e36",
  },
  {
    title: "Wild Caught",
    subtitle: "Ora King Salmon",
    eyebrow: "#2 Coastal Catch",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop&q=80",
    rating: 4.8,
    chef: "Elena Rostova",
    kitchen: "Nordic Waters Bistro",
    description: "Pan-roasted crisp skin New Zealand salmon with dill emulsion, pickled shallots, and shaved fennel salad.",
    likes: 980,
    ingredients: ["Ora King Salmon", "Dill Oil", "Pickled Shallots", "Cured Roe"],
    accent: "#06b6d4",
  },
  {
    title: "Handcrafted",
    subtitle: "Truffle Tagliolini",
    eyebrow: "#3 Pastificio Specialty",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=80",
    rating: 5.0,
    chef: "Gianluca Moretti",
    kitchen: "Trattoria Della Spiga",
    description: "30-yolk fresh tagliolini ribbons tossed in cultured mountain butter, topped with 24-month Parmigiano and shaved Umbrian winter black truffle.",
    likes: 2150,
    ingredients: ["Umbrian Truffle", "30-Yolk Pasta", "Vacche Rosse Butter", "Aged Reggiano"],
    accent: "#d97706",
  },
  {
    title: "Botanical",
    subtitle: "Garden Burrata",
    eyebrow: "#4 Summer Crudo",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6910985b?w=800&auto=format&fit=crop&q=80",
    rating: 4.7,
    chef: "Sophie Chen",
    kitchen: "Verdant Table",
    description: "Pugliese creamy burrata paired with heirloom tomatoes, crushed basil oil, 12-year balsamic pearls, and grilled sourdough.",
    likes: 870,
    ingredients: ["Pugliese Burrata", "Heirloom Tomatoes", "Aged Balsamic", "Wild Basil"],
    accent: "#10b981",
  },
];

export default function DishOrbitCarouselDemo() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#090d16]">
      <DishOrbitCarousel
        dishes={SAMPLE_DISHES}
        height="700px"
        loop={true}
        className="w-full"
      />
    </div>
  );
}
