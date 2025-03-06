export type specialFoodData = {
  type: string;
  title: string;
  description: string;
  icon: string;
};

export const foodTypes = [
  {
    type: "vitalityBoost",
    title: "Vitality Boost Food",
    description: "Increases energy levels",
    icon: "flash",
  },
  {
    type: "happinessBoost",
    title: "Happiness Boost Food",
    description: "Improves your mood",
    icon: "happy",
  },
  {
    type: "cutenessBoost",
    title: "Cuteness Boost Food",
    description: "Adds an extra dose of cuteness",
    icon: "heart",
  },
  {
    type: "slowRelease",
    title: "Slow Release Food",
    description: "Provides long-lasting energy",
    icon: "timer",
  },
];
