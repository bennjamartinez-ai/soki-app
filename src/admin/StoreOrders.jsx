import { useState } from "react";
import { Eye } from "lucide-react";
import { toast } from "react-hot-toast";

import { useOrders } from "../context/OrdersContext";
import { confirmOrderPayment } from "../services/orders";
import OrderDetailModal from "../components/OrderDetailModal";
import { useSales } from "../context/SalesContext";

export default function StoreOrders() {
  const {
    orders,
    loading,
    editOrder,
    loadOrders,
  } = useOrders();

  const { loadSales } = useSales();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpen(order) {
    setSelectedOrder(order);
    setIsModalOpen(true);
  }

  function handleClose() {
    setSelectedOrder(null);
    setIsModalOpen(false);
  }

  async function handleStatusChange(order, status) {
    try {
      if (status === "paid" && order.status !== "paid") {
       await confirmOrderPayment(order);

        await loadOrders();
        await loadSales();

        toast.success("Pago confirmado correctamente.");
        return;
      }

      await editOrder(order.id, {
        status,
      });

      await loadOrders();

      toast.success("Estado actualizado.");
    } catch (error) {
      console.error(error);
      toast.error("No se pudo actualizar el pedido.");
    }
  }

  if (loading) {
    return (
      <div className="flex h-80 items-center justify-center">
        Cargando pedidos...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Pedidos
        </h1>

        <p className="mt-1 text-zinc-400">
          Pedidos realizados desde la tienda.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="flex h-80 items-center justify-center rounded-2xl border border-dashed border-zinc-700">
          <p className="text-zinc-500">
            Todavía no hay pedidos.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold">
                    {order.customer_name}
                  </h2>

                  <p className="text-sm text-zinc-400">
                    {new Date(order.created_at).toLocaleString("es-AR")}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-amber-200">
                    ${Number(order.total).toLocaleString("es-AR")}
                  </p>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(
                        order,
                        e.target.value
                      )
                    }
                    className="mt-2 rounded-lg bg-zinc-800 px-3 py-2 text-sm outline-none"
                  >
                    <option value="pending">
                      Pendiente
                    </option>
                    <option value="contacted">
                      Contactado
                    </option>
                    <option value="paid">
                      Pagado
                    </option>
                    <option value="shipped">
                      Enviado
                    </option>
                    <option value="completed">
                      Finalizado
                    </option>
                    <option value="cancelled">
                      Cancelado
                    </option>
                  </select>

                  <button
                    onClick={() => handleOpen(order)}
                    className="mt-3 flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm transition hover:bg-amber-200 hover:text-black"
                  >
                    <Eye size={16} />
                    Ver detalle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <OrderDetailModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={handleClose}
      />
    </div>
  );
}