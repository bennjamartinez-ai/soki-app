import { StoreProductCard } from ".";

export default function StoreProductsList({
  products,
  selectedProducts,
  toggleProduct,
}) {
  return (
    <div className="grid gap-3">

      {products.map((product) => {

        const order =
          selectedProducts.indexOf(product.id) + 1;

        return (

          <StoreProductCard
            key={product.id}
            product={product}
            selected={order > 0}
            order={order}
            toggleProduct={toggleProduct}
          />

        );

      })}

    </div>
  );
}