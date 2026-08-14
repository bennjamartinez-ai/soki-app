import { Link, useLocation } from "react-router-dom";

export default function OrderSuccessPage() {
  const { state } = useLocation();

  const orderId = state?.orderId;

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-6 py-16">
      <div className="w-full rounded-3xl border border-zinc-200 bg-white p-10 text-center shadow-sm">

        <div className="mb-6 text-6xl">
          🎉
        </div>

        <h1 className="text-4xl font-bold">
          ¡Pedido realizado!
        </h1>

        <p className="mt-4 text-zinc-600">
          Gracias por tu compra.
        </p>

        <div className="my-8 rounded-2xl bg-zinc-100 p-6">

          <p className="text-sm uppercase tracking-widest text-zinc-500">
            Número de pedido
          </p>

          <p className="mt-2 text-3xl font-bold">
            #{orderId}
          </p>

        </div>

        <p className="text-zinc-600">
          En los próximos minutos nos comunicaremos con vos para coordinar el pago y el envío.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block rounded-xl bg-black px-8 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Volver a la tienda
        </Link>

      </div>
    </section>
  );
}