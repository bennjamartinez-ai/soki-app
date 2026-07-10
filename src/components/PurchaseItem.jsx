import { Minus, Plus, Trash2 } from "lucide-react";

export default function PurchaseItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  onCostChange,
}) 
{
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-800 p-4">

      <div className="flex items-center justify-between">

        <div>

          <h3 className="font-semibold">
            {item.name}
          </h3>

          <p className="text-sm text-zinc-400">
            {item.category}
          </p>

        </div>

        <button
          onClick={() => onRemove(item.id)}
          className="text-red-400 hover:text-red-300"
        >
          <Trash2 size={18}/>
        </button>

      </div>

      <div className="mt-4 flex items-center gap-3">

        <button
          onClick={() => onDecrease(item.id)}
          className="rounded-lg bg-zinc-700 p-2 hover:bg-zinc-600"
        >
          <Minus size={16}/>
        </button>

        <span className="w-8 text-center font-bold">
          {item.quantity}
        </span>

        <button
          onClick={() => onIncrease(item.id)}
          className="rounded-lg bg-zinc-700 p-2 hover:bg-zinc-600"
        >
          <Plus size={16}/>
        </button>

      </div>
<div className="mt-4">

  <label className="mb-1 block text-sm text-zinc-400">
    Costo unitario
  </label>

  <input
    type="number"
    value={item.cost ?? 0}
    onChange={(e) =>
      updateCost(
        item.id,
        Number(e.target.value)
      )
    }
    className="w-full rounded-lg bg-zinc-700 p-2 outline-none"
  />

</div>

    </div>
  );
}