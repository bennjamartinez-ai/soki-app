import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">

      <div>

        <h3 className="font-semibold">
          {item.name}
        </h3>

        <p className="text-sm text-zinc-400">
          ${item.price.toLocaleString()} c/u
        </p>

      </div>

      <div className="flex items-center gap-3">

        <button
          onClick={() => onDecrease(item.id)}
          className="rounded bg-zinc-700 p-1"
        >
          <Minus size={16} />
        </button>

        <span className="w-6 text-center">
          {item.quantity}
        </span>

        <button
          onClick={() => onIncrease(item.id)}
          className="rounded bg-zinc-700 p-1"
        >
          <Plus size={16} />
        </button>

        <button
          onClick={() => onRemove(item.id)}
          className="ml-2 text-red-400"
        >
          <Trash2 size={18} />
        </button>

      </div>

    </div>
  );
}