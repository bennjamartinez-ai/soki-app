import { useParams } from "react-router-dom";

import { useCategories } from "../context/CategoriesContext";

import ProductsPage from "./ProductsPage";

export default function CategoryPage() {

  const { slug } = useParams();

  const { categories } = useCategories();

  const category = categories.find(
    (item) => item.slug === slug
  );

  if (!category) {

    return (

      <main className="mx-auto max-w-7xl px-8 py-24">

        <h1 className="text-4xl font-bold">

          Categoría no encontrada

        </h1>

      </main>

    );

  }

  return (

    <ProductsPage
      initialCategory={category.id}
    />

  );

}