import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getOrderByUser } from "../services/orders";
import { useAuth } from "../context/AuthContext";
import OrderProducts from "./components/OrderProducts";
import OrderStatusBadge from "./components/OrderStatusBadge";

export default function OrderDetailsPage() {
  const { id } = useParams();
const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (user) {
    loadOrder();
  }
}, [id, user]);

 async function loadOrder() {
  try {
    const data = await getOrderByUser(
      id,
      user.id
    );

    setOrder(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-8 py-16">
        <p className="text-zinc-500">
          Cargando pedido...
        </p>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="mx-auto max-w-6xl px-8 py-16">
        <h1 className="text-3xl font-bold">
          Pedido no encontrado
        </h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-8 py-16">

      <div className="mb-10 flex items-center justify-between rounded-3xl border border-zinc-200 bg-white p-8">

  <div>

    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
      PEDIDO
    </p>

    <h1 className="mt-3 text-4xl font-bold">
      #{order.id.slice(0, 8)}
    </h1>

    <p className="mt-2 text-zinc-500">
      {new Date(order.created_at).toLocaleDateString(
        "es-AR",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      )}
    </p>

  </div>

  <div className="text-right">

  <OrderStatusBadge
    status={order.status}
  />

  <p className="mt-6 text-sm text-zinc-500">
    Total
  </p>

  <p className="mt-2 text-4xl font-bold">
    $
    {Number(order.total).toLocaleString("es-AR")}
  </p>

</div>

</div>

      <div className="grid gap-8 lg:grid-cols-[2fr_380px]">

  <OrderProducts
    items={order.order_items}
  />

  <aside className="space-y-6">

    <section className="rounded-3xl border border-zinc-200 bg-white p-8">

      <h2 className="mb-6 text-2xl font-bold">
        Resumen
      </h2>

      <div className="space-y-5">

        <div className="flex justify-between">

          <span className="text-zinc-500">
            Estado
          </span>

          <OrderStatusBadge
            status={order.status}
          />

        </div>

        <div className="flex justify-between">

          <span className="text-zinc-500">
            Fecha
          </span>

          <span>
            {new Date(
              order.created_at
            ).toLocaleDateString("es-AR")}
          </span>

        </div>

        <div className="border-t border-zinc-200 pt-5">

          <div className="flex justify-between text-xl font-bold">

            <span>Total</span>

            <span>
              $
              {Number(order.total).toLocaleString("es-AR")}
            </span>

          </div>

        </div>

      </div>

    </section>

  </aside>

</div>

    </main>
  );
}