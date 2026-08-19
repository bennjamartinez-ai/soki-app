import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useProducts } from "../context/ProductsContext";
import { useCategories } from "../context/CategoriesContext";

import ProductCard from "./components/ProductCard";

export default function ProductsPage({
  initialCategory = "all",
}) {
  const { products, loading } = useProducts();
  const { categories } = useCategories();

  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState(initialCategory);

  useEffect(() => {
    const query =
      searchParams.get("search");

    if (query) {
  setSearch(query);
}
  }, [searchParams]);

  const visibleCategories = [...categories]
    .filter((category) => category.is_active)
    .sort(
      (a, b) =>
        a.display_order - b.display_order
    );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!product.visible) return false;

      const matchesCategory =
        selectedCategory === "all"
          ? true
          : product.category_id === selectedCategory;

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase());

      return (
        matchesCategory &&
        matchesSearch
      );
    });
  }, [
    products,
    search,
    selectedCategory,
  ]);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-center text-zinc-500">
          Cargando productos...
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-20">

      <div className="mb-8">

     <div>

          <div>
            <h1 className="text-4xl font-bold lg:text-5xl">
              Productos
            </h1>

            <p className="mt-3 text-zinc-500">
              Encontrá todos nuestros productos.
            </p>
          </div>

        </div>

      </div>

      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">

        <aside>

          <div className="flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-2">

            <button
              onClick={() =>
                setSelectedCategory("all")
              }
              className={`whitespace-nowrap rounded-xl px-4 py-3 text-left transition lg:block lg:w-full ${
                selectedCategory === "all"
                  ? "bg-black text-white"
                  : "hover:bg-zinc-100"
              }`}
            >
              Todas
            </button>

            {visibleCategories.map(
              (category) => (
                <button
                  key={category.id}
                  onClick={() =>
                    setSelectedCategory(
                      category.id
                    )
                  }
                  className={`whitespace-nowrap rounded-xl px-4 py-3 text-left transition lg:block lg:w-full ${
                    selectedCategory ===
                    category.id
                      ? "bg-black text-white"
                      : "hover:bg-zinc-100"
                  }`}
                >
                  {category.name}
                </button>
              )
            )}

          </div>

        </aside>

        <section>

          {filteredProducts.length === 0 ? (

            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 py-24 text-center text-zinc-500">
              No encontramos productos.
            </div>

          ) : (

            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">

              {filteredProducts.map(
                (product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                )
              )}

            </div>

          )}

        </section>

      </div>

    </main>
  );
}