import { Plus } from "lucide-react";

export default function ProductCard({
  product,
  onAdd,
}) {
  const noStock = product.availableStock <= 0;

  return (
  <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 md:p-4">

    <h3 className="text-base font-semibold md:text-lg">
      {product.name}
    </h3>

    <p className="mt-1 text-sm text-zinc-400">
      {product.category}
    </p>

    <div className="mt-3 flex items-center justify-between md:mt-4">

      <div>

        <p className="text-base font-bold text-amber-200 md:text-lg">
          ${product.price.toLocaleString()}
        </p>

        <p
          className={`text-xs md:text-sm ${
            noStock
              ? "text-red-400"
              : "text-zinc-500"
          }`}
        >
          Stock: {product.availableStock}
        </p>

      </div>

      <button
        disabled={noStock}
        onClick={() => onAdd(product)}
        className={`rounded-lg p-2 md:p-3 transition ${
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