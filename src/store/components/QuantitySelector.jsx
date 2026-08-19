import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({
  quantity,
  onDecrease,
  onIncrease,
}) {
  return (
    <div className="inline-flex h-11 items-center overflow-hidden rounded-xl border border-zinc-200 bg-white lg:h-12 lg:rounded-2xl">

      <button
        onClick={onDecrease}
        className="flex h-full w-11 items-center justify-center text-zinc-600 transition hover:bg-zinc-100 hover:text-black lg:w-12"
      >
        <Minus
          size={17}
          strokeWidth={2.3}
        />
      </button>

      <div className="flex h-full min-w-[52px] items-center justify-center border-x border-zinc-200 text-sm font-semibold lg:min-w-[60px] lg:text-base">
        {quantity}
      </div>

      <button
        onClick={onIncrease}
        className="flex h-full w-11 items-center justify-center text-zinc-600 transition hover:bg-zinc-100 hover:text-black lg:w-12"
      >
        <Plus
          size={17}
          strokeWidth={2.3}
        />
      </button>

    </div>
  );
}