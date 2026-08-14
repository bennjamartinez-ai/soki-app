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
    <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8 sm:py-16">

      <div className="mb-10">

        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500 sm:text-sm">
          EXPLORÁ
        </p>

        <h2 className="mt-3 text-3xl font-bold text-zinc-900 sm:text-4xl">
          Comprá por categoría
        </h2>

      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">

        {featuredCategories.map((category) => {

          const Icon =
            icons[category.slug] || Package;

          return (

            <Link
              key={category.id}
              to={`/categoria/${category.slug}`}
              className="group flex h-40 flex-col items-center justify-center rounded-3xl border border-zinc-200 bg-white p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-black hover:shadow-xl sm:h-48 sm:p-8"
            >

              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 transition group-hover:bg-black">

                <Icon
                  size={28}
                  className="text-zinc-800 transition group-hover:text-white"
                />

              </div>

              <h3 className="text-base font-semibold text-zinc-900 sm:text-xl">
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