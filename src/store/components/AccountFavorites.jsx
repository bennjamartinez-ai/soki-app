import { useMemo } from "react";

import { useFavorites } from "../../context/FavoritesContext";
import { useProducts } from "../../context/ProductsContext";

import ProductCard from "./ProductCard";

export default function AccountFavorites() {
  const { favorites } = useFavorites();
  const { products } = useProducts();

  const favoriteProducts = useMemo(() => {
    return products.filter((product) =>
      favorites.includes(product.id)
    );
  }, [products, favorites]);

  if (favoriteProducts.length === 0) {
    return (
      <div className="py-14 text-center">

        <h2 className="text-2xl font-bold lg:text-3xl">
          Mis favoritos
        </h2>

        <p className="mt-3 text-zinc-500">
          Todavía no guardaste ningún producto.
        </p>

      </div>
    );
  }

  return (
    <>

      <h2 className="mb-6 text-2xl font-bold lg:mb-8 lg:text-3xl">
        Mis favoritos
      </h2>

      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">

        {favoriteProducts.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </>
  );
}