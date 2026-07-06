export default function OrderSummary({
  subtotal,
  shipping,
  discount,
  total,
  onShippingChange,
  onDiscountChange,
  onConfirm,
}) {
  return (
    <>
      <div className="mt-6 space-y-4">

        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between gap-4">

          <span>Envío</span>

          <input
            type="number"
            value={shipping}
            onChange={(e) =>
              onShippingChange(Number(e.target.value))
            }
            className="w-28 rounded-lg bg-zinc-800 p-2 text-right outline-none"
          />

        </div>

        <div className="flex items-center justify-between gap-4">

          <span>Descuento</span>

          <input
            type="number"
            value={discount}
            onChange={(e) =>
              onDiscountChange(Number(e.target.value))
            }
            className="w-28 rounded-lg bg-zinc-800 p-2 text-right outline-none"
          />

        </div>

        <div className="border-t border-zinc-800 pt-4">

          <div className="flex items-center justify-between text-2xl font-bold">

            <span>Total</span>

            <span className="text-amber-200">
              ${total.toLocaleString()}
            </span>

          </div>

        </div>

      </div>

      <button
        onClick={onConfirm}
        className="mt-6 w-full rounded-xl bg-amber-200 py-3 font-semibold text-black transition hover:bg-amber-300"
      >
        Confirmar Venta
      </button>
    </>
  );
}