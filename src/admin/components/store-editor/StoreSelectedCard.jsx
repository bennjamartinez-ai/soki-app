import {
  ArrowUp,
  ArrowDown,
  Trash2,
} from "lucide-react";

export default function StoreSelectedCard({
  product,
  index,
  total,
  onMoveUp,
  onMoveDown,
  onRemove,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-zinc-800 p-3">

      <span className="w-6 text-center font-bold text-amber-200">
        {index + 1}
      </span>

      <img
        src={product.image}
        alt={product.name}
        className="h-12 w-12 rounded-lg object-cover"
      />

      <div className="flex-1">

        <p className="font-medium">
          {product.name}
        </p>

        <p className="text-xs text-zinc-500">
          {product.category}
        </p>

      </div>

      <div className="flex items-center gap-1">

        <button
          disabled={index === 0}
          onClick={() =>
            onMoveUp(product.id)
          }
          className="rounded-lg p-2 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ArrowUp size={16} />
        </button>

        <button
          disabled={index === total - 1}
          onClick={() =>
            onMoveDown(product.id)
          }
          className="rounded-lg p-2 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ArrowDown size={16} />
        </button>

        <button
          onClick={() =>
            onRemove(product.id)
          }
          className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10"
        >
          <Trash2 size={16} />
        </button>

      </div>

    </div>
  );
}