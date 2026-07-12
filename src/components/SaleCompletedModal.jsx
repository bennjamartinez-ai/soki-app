import Modal from "./Modal";
import Button from "./Button";

export default function SaleCompletedModal({
  isOpen,
  onClose,
  onDownload,
  sale,
}) {
  if (!sale) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="✅ Venta registrada"
      description={`Venta #${sale.id}`}
    >
      <div className="space-y-4">

        <div className="rounded-xl bg-zinc-800 p-4">

          <div className="flex justify-between">
            <span>Total</span>
            <span className="font-bold text-amber-200">
              ${sale.total.toLocaleString()}
            </span>
          </div>

          <div className="mt-2 flex justify-between">
            <span>Productos</span>
            <span>{sale.items.length}</span>
          </div>

          <div className="mt-2 flex justify-between">
            <span>Fecha</span>
            <span>{sale.date}</span>
          </div>

        </div>

        <Button
          className="w-full"
          onClick={onDownload}
        >
          📄 Descargar PDF
        </Button>

        <Button
          variant="secondary"
          className="w-full"
          onClick={onClose}
        >
          Cerrar
        </Button>

      </div>

    </Modal>
  );
}