import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { getOrdersByUser } from "../../services/orders";

import OrderStatusBadge from "./OrderStatusBadge";

export default function AccountOrders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }

    loadOrders();
  }, [user]);

  async function loadOrders() {
    try {
      setLoading(true);

      const data = await getOrdersByUser(user.id);

      setOrders(data || []);
    } catch (error) {
      console.error(
        "Error cargando pedidos del usuario:",
        error
      );

      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="py-14 text-center">
        <p className="text-zinc-500">
          Cargando pedidos...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="py-14 text-center">
        <Package
          size={52}
          className="mx-auto text-zinc-300"
        />

        <h2 className="mt-6 text-2xl font-bold lg:text-3xl">
          Mis pedidos
        </h2>

        <p className="mt-3 text-zinc-500">
          Iniciá sesión para ver tus pedidos.
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="py-14 text-center">
        <Package
          size={52}
          className="mx-auto text-zinc-300"
        />

        <h2 className="mt-6 text-2xl font-bold lg:text-3xl">
          Mis pedidos
        </h2>

        <p className="mt-3 text-zinc-500">
          Todavía no realizaste ninguna compra.
        </p>
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-6 text-2xl font-bold lg:mb-8 lg:text-3xl">
        Mis pedidos
      </h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/pedido/${order.id}`}
            className="block rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-black hover:shadow-md lg:p-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                  Pedido
                </p>

                <h3 className="mt-1 text-xl font-bold">
                  #{order.id.slice(0, 8)}
                </h3>
              </div>

              <OrderStatusBadge
                status={order.status}
              />
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4">
              <span className="text-sm text-zinc-500">
                {new Date(
                  order.created_at
                ).toLocaleDateString("es-AR")}
              </span>

              <span className="text-lg font-bold">
                $
                {Number(
                  order.total
                ).toLocaleString("es-AR")}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}