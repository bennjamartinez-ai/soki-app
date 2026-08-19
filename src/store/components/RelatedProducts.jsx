import ProductCard from "./ProductCard";

export default function RelatedProducts({
  currentProduct,
  products,
}) {
  const sameCategory = products.filter(
    (product) =>
      product.id !== currentProduct.id &&
      product.visible &&
      product.category_id ===
        currentProduct.category_id
  );

  const others = products.filter(
    (product) =>
      product.id !== currentProduct.id &&
      product.visible &&
      product.category_id !==
        currentProduct.category_id
  );

  const relatedProducts = [
    ...sameCategory,
    ...others,
  ].slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 lg:mt-24">

      <div className="mb-8 lg:mb-10">

        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
          DESCUBRÍ MÁS
        </p>

        <h2 className="mt-3 text-3xl font-bold text-zinc-900 lg:text-4xl">
          También te puede interesar
        </h2>

      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">

        {relatedProducts.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </section>
  );
}