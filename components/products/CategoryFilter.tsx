import { useState } from "react";

interface CategoryFilterProps {
  categories: { id: string; name: string; slug: string }[];
  onSelect: (slug: string | null) => void;
}

export default function CategoryFilter({
  categories,
  onSelect,
}: CategoryFilterProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value || null;
    setSelected(slug);
    onSelect(slug);
  };

  return (
    <div className="mb-6">
      <label
        htmlFor="category"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Filter by Category
      </label>
      <select
        id="category"
        value={selected || ""}
        onChange={handleChange}
        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}
