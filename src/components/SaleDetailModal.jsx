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
      description={
        sale.created_at
          ? new Date(sale.created_at).toLocaleString("es-AR")
          : "-"
      }
    >
      <div className="space-y-3 max-h-[50vh] overflow-y-auto">

        {(sale.sale_items ?? []).map((item) => (

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

      <div className="mt-6 space-y-3 border-t border-zinc-800 pt-5">

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${Number(sale.subtotal).toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span>Envío</span>
          <span>${Number(sale.shipping).toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span>Descuento</span>
          <span>-${Number(sale.discount).toLocaleString()}</span>
        </div>

        <div className="flex justify-between border-t border-zinc-700 pt-4 text-2xl font-bold">

          <span>Total</span>

          <span className="text-amber-200">
            ${Number(sale.total).toLocaleString()}
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