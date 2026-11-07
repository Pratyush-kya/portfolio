"use client";

import { useState } from "react";
import DishOrbitCarousel, { type Dish } from "@/components/ui/dish-orbit-carousel";
import { Sparkles, Terminal, Compass, Layers, ChefHat } from "lucide-react";

const CULINARY_DISHES: Dish[] = [
  {
    title: "Dry-Aged",
    subtitle: "Black Angus Ribeye",
    eyebrow: "#1 Signature Grill",
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
    title: "Wild-Caught",
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

export function DishOrbitShowcase() {
  const [activeDishIndex, setActiveDishIndex] = useState(0);

  return (
    <section id="smart-display" className="mb-24 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 font-mono text-xs mb-3">
            <Compass className="w-3.5 h-3.5 animate-spin text-purple-400" />
            <span>Interactive Display Physics</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <span>Smart Device Orbit Interface</span>
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            GSAP-driven orbital mechanics engineered for smart kitchen displays and interactive hardware tablets. Features SVG parametric band deformation and scroll/drag pinning.
          </p>
        </div>

        {/* Live HUD Readout */}
        <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-900/80 border border-white/10 font-mono text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <ChefHat className="w-4 h-4 text-purple-400" />
            <span>Active Plate:</span>
            <span className="text-white font-bold">{CULINARY_DISHES[activeDishIndex].subtitle}</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 font-semibold">{CULINARY_DISHES[activeDishIndex].rating} ★</span>
        </div>
      </div>

      {/* Orbit Carousel Stage */}
      <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-slate-950 shadow-2xl shadow-purple-950/20">
        <DishOrbitCarousel
          dishes={CULINARY_DISHES}
          height="620px"
          loop={true}
          onChange={(idx) => setActiveDishIndex(idx)}
          className="w-full"
        />

        {/* Bottom Technical HUD Bar */}
        <div className="p-3 bg-slate-950/95 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-slate-300">Physics:</span>
            <span className="text-purple-300 font-semibold">GSAP ScrollTrigger &amp; Polar Transformations</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-slate-400">Swipe, click arrows, or scroll to rotate plates</span>
            <span className="px-2.5 py-0.5 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300">
              60 FPS GPU Composited
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
