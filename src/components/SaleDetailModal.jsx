export default function SaleDetailModal({
  sale,
  isOpen,
  onClose,
}) {
  if (!isOpen || !sale) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      <div className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Detalle de Venta
            </h2>

            <p className="text-zinc-400">
              {sale.date}
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg bg-zinc-700 px-4 py-2"
          >
            Cerrar
          </button>

        </div>

        <div className="space-y-3">

          {sale.items.map((item) => (

            <div
              key={item.id}
              className="flex justify-between rounded-lg bg-zinc-800 p-4"
            >

              <div>

                <p className="font-semibold">
                  {item.name}
                </p>

                <p className="text-sm text-zinc-400">
                  {item.quantity} × ${item.price.toLocaleString()}
                </p>

              </div>

              <p className="font-bold">
                ${(item.quantity * item.price).toLocaleString()}
              </p>

            </div>

          ))}

        </div>

        <div className="mt-6 space-y-2 border-t border-zinc-800 pt-4">

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${sale.subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Envío</span>
            <span>${sale.shipping.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Descuento</span>
            <span>-${sale.discount.toLocaleString()}</span>
          </div>

          <div className="mt-3 flex justify-between border-t border-zinc-700 pt-3 text-2xl font-bold">

            <span>Total</span>

            <span className="text-amber-200">
              ${sale.total.toLocaleString()}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}