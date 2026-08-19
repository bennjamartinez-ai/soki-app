import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getOrderByUser } from "../services/orders";
import { useAuth } from "../context/AuthContext";

import OrderProducts from "./components/OrderProducts";
import OrderStatusBadge from "./components/OrderStatusBadge";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setOrder(null);
      setLoading(false);
      return;
    }

    loadOrder();
  }, [id, user, authLoading]);

  async function loadOrder() {
    try {
      setLoading(true);
      setError(null);

      const data = await getOrderByUser(
        id,
        user.id
      );

      setOrder(data);
    } catch (error) {
      console.error(
        "Error cargando detalle del pedido:",
        error
      );

      setError(error);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  }

  if (authLoading || loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-zinc-500">
          Cargando pedido...
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">
          Iniciá sesión para ver este pedido
        </h1>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">
          Pedido no encontrado
        </h1>

        <p className="mt-3 text-zinc-500">
          No pudimos encontrar este pedido o no tenés permiso para verlo.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16">

      <div className="mb-10 flex flex-col gap-6 rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
            PEDIDO
          </p>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            #{order.id.slice(0, 8)}
          </h1>

          <p className="mt-2 text-zinc-500">
            {new Date(
              order.created_at
            ).toLocaleDateString("es-AR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="lg:text-right">

          <OrderStatusBadge
            status={order.status}
          />

          <p className="mt-6 text-sm text-zinc-500">
            Total
          </p>

          <p className="mt-2 text-3xl font-bold sm:text-4xl">
            $
            {Number(
              order.total
            ).toLocaleString("es-AR")}
          </p>

        </div>

      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr_380px]">

        <OrderProducts
          items={order.order_items || []}
        />

        <aside className="space-y-6">

          <section className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8">

            <h2 className="mb-6 text-2xl font-bold">
              Resumen
            </h2>

            <div className="space-y-5">

              <div className="flex items-center justify-between gap-4">

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
                  ).toLocaleDateString(
                    "es-AR"
                  )}
                </span>

              </div>

              <div className="border-t border-zinc-200 pt-5">

                <div className="flex justify-between text-xl font-bold">

                  <span>Total</span>

                  <span>
                    $
                    {Number(
                      order.total
                    ).toLocaleString("es-AR")}
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