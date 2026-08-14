export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-8 py-16">

      <div className="max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
          Contacto
        </p>

        <h1 className="text-5xl font-bold text-zinc-900">
          Estamos para ayudarte
        </h1>

        <p className="mt-8 text-lg leading-8 text-zinc-600">
          Si tenés alguna consulta sobre nuestros productos, pedidos o envíos,
          podés comunicarte con nosotros por cualquiera de estos medios.
        </p>

        <div className="mt-10 space-y-6 rounded-3xl border border-zinc-200 bg-white p-8">

          <div>
            <h3 className="font-semibold text-zinc-900">
              WhatsApp
            </h3>

            <p className="text-zinc-600">
              +54 9 260 441 0877
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900">
              Instagram
            </h3>

            <p className="text-zinc-600">
              @soki.sr
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900">
              Email
            </h3>

            <p className="text-zinc-600">
              contacto@soki.com.ar
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900">
              Ubicación
            </h3>

            <p className="text-zinc-600">
              San Rafael, Mendoza, Argentina
            </p>
          </div>

        </div>

      </div>

    </main>
  );
}
