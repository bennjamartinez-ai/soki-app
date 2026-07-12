import Modal from "./Modal";
import Button from "./Button";

export default function SaleDetailModal({
  sale,
  isOpen,
  onClose,
}) {
  if (!isOpen || !sale) return null;

  return (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Detalle de Venta"
    description={sale.date}
  >
    <div className="space-y-3 max-h-[50vh] overflow-y-auto">

      {sale.items.map((item) => (

        <div
          key={item.id}
          className="flex justify-between rounded-xl bg-zinc-800/80 p-4"
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

    <div className="mt-6 space-y-3 border-t border-zinc-800 pt-5">

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

      <div className="flex justify-between border-t border-zinc-700 pt-4 text-2xl font-bold">

        <span>Total</span>

        <span className="text-amber-200">
          ${sale.total.toLocaleString()}
        </span>

      </div>

    </div>

    <div className="mt-8 flex justify-end">

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