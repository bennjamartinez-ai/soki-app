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
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

      <div className="mb-8 lg:mb-10">

        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
          EXPLORÁ
        </p>

        <h2 className="mt-3 text-3xl font-bold text-zinc-900 lg:text-4xl">
          Comprá por categoría
        </h2>

      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">

        {featuredCategories.map((category) => {

          const Icon =
            icons[category.slug] || Package;

          return (

            <Link
              key={category.id}
              to={`/categoria/${category.slug}`}
              className="group flex h-36 flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-white p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-black hover:shadow-lg lg:h-44 lg:rounded-3xl lg:p-8"
            >

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 transition group-hover:bg-black lg:h-14 lg:w-14">

                <Icon
                  size={24}
                  className="text-zinc-800 transition group-hover:text-white lg:h-7 lg:w-7"
                />

              </div>

              <h3 className="text-sm font-semibold text-zinc-900 lg:text-xl">
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