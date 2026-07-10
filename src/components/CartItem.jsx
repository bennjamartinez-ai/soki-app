import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {

  return (
  <div className="rounded-xl bg-zinc-800 p-3 md:p-4">

    <div className="flex items-start justify-between gap-3">

      <div className="min-w-0">

        <h3 className="truncate text-sm font-semibold md:text-base">
          {item.name}
        </h3>

        <p className="text-xs text-zinc-400 md:text-sm">
          ${item.price.toLocaleString()} c/u
        </p>

      </div>

      <button
        onClick={() => onRemove(item.id)}
        className="text-red-400 transition hover:text-red-300"
      >
        <Trash2 size={18} />
      </button>

    </div>

    <div className="mt-3 flex items-center justify-between">

      <div className="flex items-center gap-2">

        <button
          onClick={() => onDecrease(item.id)}
          className="rounded-lg bg-zinc-700 p-2 hover:bg-zinc-600"
        >
          <Minus size={16} />
        </button>

        <span className="w-8 text-center font-semibold">
          {item.quantity}
        </span>

        <button
          onClick={() => onIncrease(item.id)}
          className="rounded-lg bg-zinc-700 p-2 hover:bg-zinc-600"
        >
          <Plus size={16} />
        </button>

      </div>

      <div className="text-right">

        <p className="text-xs text-zinc-400">
          Subtotal
        </p>

        <p className="font-bold text-amber-200">
          ${(item.quantity * item.price).toLocaleString()}
        </p>

      </div>

    </div>

  </div>
);
}