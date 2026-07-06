export default function PurchaseSummary({
  purchase,
}) {
    const merchandiseTotal = purchase.items.reduce(
  (sum, item) => sum + item.quantity * item.cost,
  0
);

const onConfirm = () => {};
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

    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-2xl font-bold">
        Resumen
      </h2>

      <div className="space-y-3">

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

        <div className="flex justify-between text-2xl font-bold">

          <span>Total</span>

          <span className="text-green-400">
            ${total.toLocaleString()}
          </span>

        </div>

      </div>

      <button
        onClick={onConfirm}
        className="mt-8 w-full rounded-xl bg-green-500 py-3 font-semibold hover:bg-green-600"
      >
        Confirmar compra
      </button>

    </div>

  );

}