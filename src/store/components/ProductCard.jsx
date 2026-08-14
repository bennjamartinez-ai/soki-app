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
      toast.error(
        "Iniciá sesión para guardar favoritos."
      );
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

      toast.error(
        "No se pudo actualizar Favoritos."
      );
    }
  }

  return (
    <Link
      to={`/producto/${product.id}`}
      className="group relative block overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
    >
      {/* FAVORITO */}

      <button
        onClick={handleFavorite}
        className={`absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full shadow-sm transition ${
          favorite
            ? "bg-red-500 text-white"
            : "bg-white text-zinc-700 hover:bg-zinc-100"
        }`}
      >
        <Heart
          size={20}
          fill={favorite ? "currentColor" : "none"}
        />
      </button>

      {/* IMAGEN */}

      <div className="aspect-square overflow-hidden bg-zinc-100">

        {product.image ? (

          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />

        ) : (

          <div className="flex h-full items-center justify-center text-zinc-400">

            Sin imagen

          </div>

        )}

      </div>

      {/* INFO */}

      <div className="p-5">

        <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">

          {product.category}

        </span>

        <h3 className="mt-4 text-lg font-semibold text-zinc-900">

          {product.name}

        </h3>

        <p className="mt-3 text-2xl font-bold text-zinc-900">

          ${Number(product.price).toLocaleString("es-AR")}

        </p>

        <p className="mt-1 text-sm text-zinc-500">

          Stock: {product.stock}

        </p>

        <div className="mt-5 rounded-xl bg-black py-3 text-center font-medium text-white transition group-hover:bg-zinc-800">

          Ver producto

        </div>

      </div>

    </Link>
  );
}

export default ProductCard;