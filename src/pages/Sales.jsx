import { useState } from "react";
import { Eye } from "lucide-react";
import { useInventory } from "../context/InventoryContext";
import SaleDetailModal from "../components/SaleDetailModal";
import { toast } from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";

export default function Sales() {

  const {
  sales,
  setSales,
  products,
  setProducts,
} = useInventory();

  const [selectedSale, setSelectedSale] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
const [saleToCancel, setSaleToCancel] = useState(null);

  function handleOpenSale(sale) {
    setSelectedSale(sale);
    setIsModalOpen(true);
  }

  function handleCloseSale() {
    setSelectedSale(null);
    setIsModalOpen(false);
  }

 function handleCancelSale(sale) {
  if (sale.status === "cancelled") return;

  setSaleToCancel(sale);
}

function confirmCancelSale() {
  if (!saleToCancel) return;

  // Devolver stock
  setProducts((prev) =>
    prev.map((product) => {
      const sold = saleToCancel.items.find(
        (item) => item.id === product.id
      );

      if (!sold) return product;

      return {
        ...product,
        stock: product.stock + sold.quantity,
      };
    })
  );

  // Cambiar estado de la venta
  setSales((prev) =>
    prev.map((item) =>
      item.id === saleToCancel.id
        ? {
            ...item,
            status: "cancelled",
          }
        : item
    )
  );

  toast.success("Venta anulada correctamente.");

  setSaleToCancel(null);
}

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Ventas
        </h1>

        <p className="mt-1 text-zinc-400">
          Historial de ventas realizadas.
        </p>

      </div>

      {sales.length === 0 ? (

        <div className="flex h-80 items-center justify-center rounded-2xl border border-dashed border-zinc-700">

          <p className="text-zinc-500">
            Todavía no hay ventas registradas.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {sales
            .slice()
            .reverse()
            .map((sale) => (

              <div
                key={sale.id}
                className={`rounded-2xl border p-6 transition ${
  sale.status === "cancelled"
    ? "border-red-500 bg-red-950/20"
    : "border-zinc-800 bg-zinc-900 hover:border-amber-200"
}`}
              >

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-lg font-bold">
                      {sale.date}
                    </h2>

                    <p className="text-zinc-400">
                      {sale.items.length} productos
                    </p>

                  </div>

                 <div className="text-right">

  <p className="text-2xl font-bold text-amber-200">
    ${sale.total.toLocaleString()}
  </p>

  <button
    onClick={() => handleOpenSale(sale)}
    className="mt-3 flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm transition hover:bg-amber-200 hover:text-black"
  >
    <Eye size={16} />
    Ver detalle
  </button>

  {(sale.status ?? "completed") !== "cancelled" && (
    <button
      onClick={() => handleCancelSale(sale)}
      className="mt-2 w-full rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
    >
      Anular venta
    </button>
  )}

  {sale.status === "cancelled" && (
    <p className="mt-2 text-sm font-semibold text-red-400">
      🔴 Venta anulada
    </p>
  )}

</div>

                </div>

              </div>

            ))}

        </div>

      )}

      <SaleDetailModal
        sale={selectedSale}
        isOpen={isModalOpen}
        onClose={handleCloseSale}
      />
      <ConfirmModal
  isOpen={saleToCancel !== null}
  onClose={() => setSaleToCancel(null)}
  onConfirm={confirmCancelSale}
  title="Anular venta"
  message="¿Estás seguro de que querés anular esta venta? El stock se restaurará automáticamente."
/>

    </div>
  );
}