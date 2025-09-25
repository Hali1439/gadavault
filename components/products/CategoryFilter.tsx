// components/categories/CategoryFilter.tsx
"use client";

import { useState } from "react";
import { ProductCategory } from "@/types/product";

interface CategoryFilterProps {
  categories: ProductCategory[];
  onCategoryChange: (slug?: string) => void; // ✅ standardized to undefined
  variant?: "buttons" | "dropdown";
}

export default function CategoryFilter({
  categories,
  onCategoryChange,
  variant = "buttons",
}: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);

  const handleChange = (slug?: string) => {
    setActiveCategory(slug);
    onCategoryChange(slug);
  };

  if (variant === "dropdown") {
    return (
      <select
        onChange={(e) =>
          handleChange(e.target.value === "" ? undefined : e.target.value)
        }
        className="border rounded px-3 py-2"
        value={activeCategory ?? ""}
      >
        <option value="">All</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>
    );
  }

  // default: buttons
  return (
    <div className="flex gap-3 flex-wrap">
      <button
        onClick={() => handleChange(undefined)}
        className={`px-4 py-2 rounded ${
          activeCategory === undefined
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleChange(cat.slug)}
          className={`px-4 py-2 rounded ${
            activeCategory === cat.slug
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
