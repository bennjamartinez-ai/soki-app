import { Heart } from "lucide-react";
import { toast } from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";

export default function ProductPurchase({
  product,
  quantity,
  increase,
  decrease,
  handleAdd,
}) {
  const { user } = useAuth();

  const {
    isFavorite,
    toggleFavorite,
  } = useFavorites();

  const favorite = isFavorite(product.id);

  async function handleFavorite() {
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
          ? "Producto eliminado de favoritos."
          : "Producto agregado a favoritos."
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "No se pudo actualizar Favoritos."
      );
    }
  }

  return (
    <>
      {/* Cantidad */}

      <div className="mt-8">

        <div className="flex h-14 items-center justify-between rounded-full border border-zinc-300 px-2 lg:h-16">

          <button
            onClick={decrease}
            className="flex h-10 w-10 items-center justify-center rounded-full text-2xl transition hover:bg-zinc-100 lg:h-12 lg:w-12"
          >
            −
          </button>

          <span className="text-lg font-semibold">
            {quantity}
          </span>

          <button
            onClick={increase}
            className="flex h-10 w-10 items-center justify-center rounded-full text-2xl transition hover:bg-zinc-100 lg:h-12 lg:w-12"
          >
            +
          </button>

        </div>

      </div>

      {/* Agregar al carrito */}

      <button
        disabled={product.stock === 0}
        onClick={handleAdd}
        className={`mt-6 flex h-14 w-full items-center justify-center rounded-full text-base font-semibold text-white transition lg:mt-8 lg:h-16 lg:text-lg ${
          product.stock === 0
            ? "cursor-not-allowed bg-zinc-400"
            : "bg-black hover:bg-zinc-800 active:scale-[.98]"
        }`}
      >
        Agregar al carrito
      </button>

      {/* Favoritos */}

      <button
        onClick={handleFavorite}
        className={`mt-3 flex h-14 w-full items-center justify-center gap-3 rounded-full border text-base font-medium transition lg:h-16 lg:text-lg ${
          favorite
            ? "border-red-500 bg-red-50 text-red-600 hover:bg-red-100"
            : "border-zinc-300 hover:border-black"
        }`}
      >
        <Heart
          size={18}
          fill={favorite ? "currentColor" : "none"}
        />

        {favorite
          ? "En favoritos"
          : "Favoritos"}

      </button>
    </>
  );
}