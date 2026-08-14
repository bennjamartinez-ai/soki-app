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
      <div className="py-12 text-center">

        <h2 className="text-3xl font-bold">
          Mis Favoritos
        </h2>

        <p className="mt-4 text-zinc-500">
          Todavía no guardaste ningún producto.
        </p>

      </div>
    );
  }

  return (
    <>
      <h2 className="mb-8 text-3xl font-bold">
        Mis Favoritos
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">

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