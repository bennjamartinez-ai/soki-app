import { useEffect, useState } from "react";
import { Package } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { getOrdersByUser } from "../../services/orders";
import { Link } from "react-router-dom";
import OrderStatusBadge from "./OrderStatusBadge";

export default function AccountOrders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    if (!user) return;

    try {
      const data = await getOrdersByUser(user.id);

      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <p className="text-zinc-500">
        Cargando pedidos...
      </p>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="py-12 text-center">

        <Package
          size={48}
          className="mx-auto text-zinc-300"
        />

        <h2 className="mt-6 text-3xl font-bold">
          Mis Pedidos
        </h2>

        <p className="mt-3 text-zinc-500">
          Todavía no realizaste ninguna compra.
        </p>

      </div>
    );
  }

  return (
    <>
      <h2 className="mb-8 text-3xl font-bold">
        Mis Pedidos
      </h2>

      <div className="space-y-5">

        {orders.map((order) => {

          return (

  <Link
    key={order.id}
    to={`/pedido/${order.id}`}
    className="block rounded-2xl border border-zinc-200 p-6 transition hover:-translate-y-1 hover:border-black hover:shadow-lg"
  >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-zinc-500">
                    Pedido
                  </p>

                  <h3 className="text-xl font-bold">
                    #{order.id.slice(0, 8)}
                  </h3>

                </div>

                <OrderStatusBadge
                status={order.status} 
                />

              </div>

              <div className="mt-6 flex justify-between text-zinc-600">

                <span>

                  {new Date(
                    order.created_at
                  ).toLocaleDateString("es-AR")}

                </span>

                <span className="font-semibold">

                  $
                  {Number(order.total).toLocaleString("es-AR")}

                </span>

              </div>

            </Link>

          );

        })}

      </div>
    </>
  );
}