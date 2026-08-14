import ProductCard from "./ProductCard";

export default function RelatedProducts({
  currentProduct,
  products,
}) {
  // Productos de la misma categoría
  const sameCategory = products.filter(
    (product) =>
      product.id !== currentProduct.id &&
      product.visible &&
      product.category_id ===
        currentProduct.category_id
  );

  // Si no alcanzan, completar con otros productos visibles
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
    <section className="mt-28">

      <div className="mb-10">

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
          DESCUBRÍ MÁS
        </p>

        <h2 className="mt-2 text-4xl font-bold text-zinc-900">
          También te puede interesar
        </h2>

      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

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