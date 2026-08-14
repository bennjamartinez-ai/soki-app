import { Link } from "react-router-dom";

import Hero from "./components/Hero";
import Categories from "./components/Categories";
import FeaturedProducts from "./components/FeaturedProducts";
import { useProducts } from "../context/ProductsContext";
import Footer from "./components/Footer";

function StoreHome() {
  const { products } = useProducts();

 const featured = [...products]
  .filter(
    (product) =>
      product.visible &&
      product.featured
  )
  .sort(
    (a, b) =>
      (a.featured_order ?? 999) -
      (b.featured_order ?? 999)
  );

  return (
    <main className="bg-white">

      {/* HERO */}

      <Hero />

      {/* CATEGORÍAS */}

      <section className="py-20">

        <div className="mx-auto max-w-[1800px] px-8">

          <div className="mb-12">

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
              EXPLORÁ
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Comprá por categoría
            </h2>

          </div>

          <Categories />

        </div>

      </section>

      {/* DESTACADOS */}

          <FeaturedProducts
      products={featured}
    />

    {/* FOOTER */}

    <Footer />

    </main>
  );
}

export default StoreHome;