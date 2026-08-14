import Hero from "./components/Hero";
import Categories from "./components/Categories";
import FeaturedProducts from "./components/FeaturedProducts";
import Footer from "./components/Footer";

import { useProducts } from "../context/ProductsContext";

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

      <Hero />

      <Categories />

      <FeaturedProducts
        products={featured}
      />

      <Footer />

    </main>
  );
}

export default StoreHome;