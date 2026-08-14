import { X } from "lucide-react";

export default function OrderDetailsModal({
  open,
  order,
  items,
  onClose,
}) {
  if (!open || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-bold">
              Pedido #{order.id.slice(0, 8)}
            </h2>

            <p className="text-sm text-zinc-500">
              Detalle del pedido
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-zinc-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-zinc-500">Cliente</p>
              <p className="font-medium">{order.customer_name}</p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">Teléfono</p>
              <p className="font-medium">{order.customer_phone}</p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">Dirección</p>
              <p className="font-medium">
                {order.address || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">Estado</p>
              <p className="font-medium">
                {order.status}
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold">
              Productos
            </h3>

            <div className="overflow-hidden rounded-xl border border-zinc-200">
              <table className="w-full">
                <thead className="bg-zinc-100">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      Producto
                    </th>

                    <th className="px-4 py-3 text-center">
                      Cantidad
                    </th>

                    <th className="px-4 py-3 text-right">
                      Precio
                    </th>

                    <th className="px-4 py-3 text-right">
                      Subtotal
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-zinc-200"
                    >
                      <td className="px-4 py-3">
                        {item.product_name}
                      </td>

                      <td className="px-4 py-3 text-center">
                        {item.quantity}
                      </td>

                      <td className="px-4 py-3 text-right">
                        $
                        {Number(item.price).toLocaleString(
                          "es-AR"
                        )}
                      </td>

                      <td className="px-4 py-3 text-right font-medium">
                        $
                        {(
                          item.quantity * item.price
                        ).toLocaleString("es-AR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end border-t border-zinc-200 pt-4">
            <p className="text-xl font-bold">
              Total: $
              {Number(order.total).toLocaleString("es-AR")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}