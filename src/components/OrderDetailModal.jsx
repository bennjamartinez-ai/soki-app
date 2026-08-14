import Modal from "./Modal";
import Button from "./Button";

export default function OrderDetailModal({
  order,
  isOpen,
  onClose,
}) {
  if (!isOpen || !order) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Detalle del pedido"
      description={new Date(order.created_at).toLocaleString("es-AR")}
    >
      <div className="space-y-4">

        <div className="rounded-xl bg-zinc-800/80 p-4">
          <p><strong>Cliente:</strong> {order.customer_name}</p>
          <p><strong>Teléfono:</strong> {order.customer_phone}</p>
          <p><strong>Email:</strong> {order.customer_email || "-"}</p>
          <p><strong>Dirección:</strong> {order.customer_address}</p>
        </div>

        <div className="space-y-3 max-h-72 overflow-y-auto">

          {(order.order_items ?? []).map((item) => (

            <div
              key={item.id}
              className="flex justify-between rounded-xl bg-zinc-800/80 p-4"
            >
              <div>
                <p className="font-semibold">
                  {item.product_name}
                </p>

                <p className="text-sm text-zinc-400">
                  {item.quantity} × ${Number(item.unit_price).toLocaleString()}
                </p>
              </div>

              <p className="font-bold">
                ${Number(item.subtotal).toLocaleString()}
              </p>

            </div>

          ))}

        </div>

        <div className="border-t border-zinc-800 pt-4">

          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>

            <span className="text-amber-200">
              ${Number(order.total).toLocaleString()}
            </span>

          </div>

        </div>

      </div>

      <div className="mt-6 flex justify-end">
        <Button
          variant="secondary"
          onClick={onClose}
        >
          Cerrar
        </Button>
      </div>

    </Modal>
  );
}