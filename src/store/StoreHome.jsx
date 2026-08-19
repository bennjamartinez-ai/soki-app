import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import Categories from "./components/Categories";
import FeaturedProducts from "./components/FeaturedProducts";
import PromoBanner from "./components/PromoBanner";
import CollectionSection from "./components/CollectionSection";
import Footer from "./components/Footer";

import { useStore } from "../context/StoreContext";

function StoreHome() {
  const { sections, loading } = useStore();

  const featuredSection = sections.find(
    (section) => section.slug === "featured"
  );

  const recommendedSection = sections.find(
    (section) => section.slug === "recommended"
  );

  if (loading) {
    return null;
  }

  return (
    <main className="bg-white">

      <Hero />

      <Benefits />

      <Categories />

      {featuredSection && (
        <FeaturedProducts
          title={featuredSection.title}
          subtitle={featuredSection.subtitle}
          products={featuredSection.store_section_products.map(
            (item) => item.products
          )}
        />
      )}

      <PromoBanner />

      {recommendedSection && (
        <CollectionSection
          title={recommendedSection.title}
          subtitle={recommendedSection.subtitle}
          products={recommendedSection.store_section_products.map(
            (item) => item.products
          )}
        />
      )}

      <Footer />

    </main>
  );
}

export default StoreHome;