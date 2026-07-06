import { Plus } from "lucide-react";

export default function ProductCard({
  product,
  onAdd,
}) {
  const noStock = product.availableStock <= 0;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">

      <h3 className="text-lg font-semibold">
        {product.name}
      </h3>

      <p className="text-zinc-400">
        {product.category}
      </p>

      <div className="mt-4 flex items-center justify-between">

        <div>

          <p className="font-bold text-amber-200">
            ${product.price.toLocaleString()}
          </p>

          <p
            className={`text-sm ${
              noStock
                ? "text-red-400"
                : "text-zinc-500"
            }`}
          >
            Stock disponible: {product.availableStock}
          </p>

        </div>

        <button
          disabled={noStock}
          onClick={() => onAdd(product)}
          className={`rounded-lg p-2 transition ${
            noStock
              ? "cursor-not-allowed bg-zinc-700 text-zinc-500"
              : "bg-amber-200 text-black hover:bg-amber-300"
          }`}
        >
          <Plus size={18} />
        </button>

      </div>

    </div>
  );
}