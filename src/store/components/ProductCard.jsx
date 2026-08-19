import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { toast } from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";

function ProductCard({ product }) {
  const { user } = useAuth();

  const {
    isFavorite,
    toggleFavorite,
  } = useFavorites();

  const favorite = isFavorite(product.id);

  async function handleFavorite(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Iniciá sesión para guardar favoritos.");
      return;
    }

    try {
      await toggleFavorite(product.id);

      toast.success(
        favorite
          ? "Eliminado de favoritos."
          : "Agregado a favoritos."
      );
    } catch (error) {
      console.error(error);
      toast.error("No se pudo actualizar Favoritos.");
    }
  }

  return (
    <Link
      to={`/producto/${product.id}`}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-xl bg-zinc-100">

        <button
          onClick={handleFavorite}
          className={`absolute right-2 top-2 z-20 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition ${
            favorite
              ? "bg-red-500 text-white"
              : "bg-white/90 text-zinc-700 hover:bg-white"
          }`}
        >
          <Heart
            size={16}
            fill={favorite ? "currentColor" : "none"}
          />
        </button>

        <div className="aspect-[4/5] overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-zinc-400">
              Sin imagen
            </div>
          )}
        </div>

      </div>

      <div className="pt-3">

        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          {product.category}
        </p>

        <h3 className="mt-1 line-clamp-2 text-[15px] font-semibold leading-snug text-zinc-900 transition group-hover:text-zinc-700">
          {product.name}
        </h3>

        <p className="mt-2 text-lg font-bold text-zinc-900">
          ${Number(product.price).toLocaleString("es-AR")}
        </p>

        <p className="mt-1 text-sm text-zinc-500">
          Stock: {product.stock}
        </p>

      </div>

    </Link>
  );
}

export default ProductCard;