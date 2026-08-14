import { Trash2 } from "lucide-react";
import QuantitySelector from "./QuantitySelector";

export default function CartItem({
  item,
  updateQuantity,
  removeFromCart,
}) {
  return (
    <article className="group rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex flex-col gap-6 md:flex-row">

        <div className="overflow-hidden rounded-2xl bg-zinc-100 self-center md:self-start">
          <img
            src={item.image}
            alt={item.name}
            className="h-48 w-48 object-cover transition duration-500 group-hover:scale-105 md:h-40 md:w-40"
          />
        </div>

        <div className="flex flex-1 flex-col">

          <div>

            <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">
              {item.category}
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              {item.name}
            </h2>

            <p className="mt-4 text-sm text-zinc-500">
              Precio unitario
            </p>

            <p className="text-xl font-bold text-zinc-900">
              ${item.price.toLocaleString("es-AR")}
            </p>

          </div>

          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div className="flex flex-col gap-4">

              <QuantitySelector
                quantity={item.quantity}
                onDecrease={() =>
                  updateQuantity(
                    item.id,
                    item.quantity - 1
                  )
                }
                onIncrease={() =>
                  updateQuantity(
                    item.id,
                    item.quantity + 1
                  )
                }
              />

              <button
                onClick={() =>
                  removeFromCart(item.id)
                }
                className="flex w-fit items-center gap-2 text-sm text-zinc-500 transition hover:text-red-600"
              >
                <Trash2 size={16} />
                Eliminar
              </button>

            </div>

            <div className="rounded-2xl bg-zinc-50 px-6 py-4 text-right">

              <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                Subtotal
              </p>

              <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">
                $
                {(item.price * item.quantity).toLocaleString("es-AR")}
              </p>

            </div>

          </div>

        </div>

      </div>

    </article>
  );
}