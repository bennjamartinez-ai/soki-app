export default function PurchaseSummary({
  purchase,
  onConfirm,
}) {
    const merchandiseTotal = purchase.items.reduce(
  (sum, item) => sum + item.quantity * item.cost,
  0
);

  const totalUnits = purchase.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const shippingPerUnit =
    totalUnits === 0
      ? 0
      : purchase.shipping / totalUnits;

  const total =
    merchandiseTotal +
    purchase.shipping +
    purchase.expenses;

  return (

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 md:p-6">
      <h2 className="mb-4 text-xl font-bold md:mb-6 md:text-2xl">        Resumen
      </h2>

      <div className="space-y-2 md:space-y-3">
        <div className="flex justify-between">
          <span>Productos</span>
          <span>{purchase.items.length}</span>
        </div>

        <div className="flex justify-between">
          <span>Unidades</span>
          <span>{totalUnits}</span>
        </div>

        <hr className="border-zinc-700"/>

        <div className="flex justify-between">
          <span>Mercadería</span>
          <span>
            ${merchandiseTotal.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Envío</span>
          <span>
            ${purchase.shipping.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Otros gastos</span>
          <span>
            ${purchase.expenses.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Envío por unidad</span>
          <span>
            ${shippingPerUnit.toFixed(2)}
          </span>
        </div>

        <hr className="border-zinc-700"/>

<div className="flex items-center justify-between text-xl font-bold md:text-2xl">
          <span>Total</span>

          <span className="text-green-400">
            ${total.toLocaleString()}
          </span>

        </div>

      </div>

            <button
      onClick={onConfirm}
className="mt-6 w-full rounded-xl bg-green-500 py-3 text-base font-semibold transition hover:bg-green-600 md:mt-8 md:py-4 md:text-lg"    >
      Confirmar compra
    </button>
        </div>

  );

}