import { Link } from "react-router-dom";

import {
  Shirt,
  Shield,
  Backpack,
  Package,
} from "lucide-react";

import { useCategories } from "../../context/CategoriesContext";

function Categories() {
  const { categories } = useCategories();

  const icons = {
    medias: Shirt,
    termicos: Shield,
    accesorios: Backpack,
    todos: Package,
  };

  const featuredCategories = [...categories]
    .filter(
      (category) =>
        category.is_active &&
        category.is_featured
    )
    .sort(
      (a, b) =>
        a.display_order - b.display_order
    );

  return (
    <section className="mx-auto max-w-7xl px-8 py-16">
      <h2 className="mb-8 text-3xl font-bold text-zinc-900">
        Categorías
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featuredCategories.map((category) => {
          const Icon =
            icons[category.slug] || Package;

          return (
            <Link
              key={category.id}
              to={`/categoria/${category.slug}`}
              className="flex h-48 flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-white p-8 text-center transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Icon
                size={40}
                className="mb-5 text-zinc-800"
              />

              <h3 className="text-xl font-semibold text-zinc-900">
                {category.name}
              </h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Categories;