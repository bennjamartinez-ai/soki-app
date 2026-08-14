import { Eye } from "lucide-react";
import { useState } from "react";

import { useOrders } from "../context/OrdersContext";
import { getOrderItems } from "../services/orders";

import OrderDetailsModal from "../components/orders/OrderDetailsModal";

export default function Orders() {
  const { orders, loading } = useOrders();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  async function handleView(order) {
    const items = await getOrderItems(order.id);

    setOrderItems(items);
    setSelectedOrder(order);
    setModalOpen(true);
  }

  function handleClose() {
    setModalOpen(false);
    setSelectedOrder(null);
    setOrderItems([]);
  }

  if (loading) {
    return <p>Cargando pedidos...</p>;
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            Pedidos
          </h1>

          <p className="mt-2 text-zinc-500">
            Pedidos realizados desde la tienda online.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          <table className="w-full">
            <thead className="bg-zinc-100">
              <tr>
                <th className="px-4 py-3 text-left">Pedido</th>
                <th className="px-4 py-3 text-left">Cliente</th>
                <th className="px-4 py-3 text-left">Teléfono</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="px-4 py-3 text-left">Estado</th>
                <th className="px-4 py-3 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-8 text-center text-zinc-500"
                  >
                    No hay pedidos.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-zinc-200 hover:bg-zinc-50"
                  >
                    <td className="px-4 py-3 font-medium">
                      #{order.id.slice(0, 8)}
                    </td>

                    <td className="px-4 py-3">
                      {order.customer_name}
                    </td>

                    <td className="px-4 py-3">
                      {order.customer_phone}
                    </td>

                    <td className="px-4 py-3">
                      ${Number(order.total).toLocaleString("es-AR")}
                    </td>

                    <td className="px-4 py-3">
                      {order.status}
                    </td>

                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleView(order)}
                        className="rounded-lg border border-zinc-300 p-2 transition hover:bg-zinc-100"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <OrderDetailsModal
        open={modalOpen}
        order={selectedOrder}
        items={orderItems}
        onClose={handleClose}
      />
    </>
  );
}