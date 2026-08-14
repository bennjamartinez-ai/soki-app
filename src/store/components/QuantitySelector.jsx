import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({
  quantity,
  onDecrease,
  onIncrease,
}) {
  return (
    <div className="inline-flex h-12 items-center overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">

      <button
        onClick={onDecrease}
        className="flex h-full w-12 items-center justify-center text-zinc-600 transition hover:bg-zinc-100 hover:text-black"
      >
        <Minus size={18} strokeWidth={2.3} />
      </button>

      <div className="flex h-full min-w-[60px] items-center justify-center border-x border-zinc-200 text-base font-semibold">
        {quantity}
      </div>

      <button
        onClick={onIncrease}
        className="flex h-full w-12 items-center justify-center text-zinc-600 transition hover:bg-zinc-100 hover:text-black"
      >
        <Plus size={18} strokeWidth={2.3} />
      </button>

    </div>
  );
}