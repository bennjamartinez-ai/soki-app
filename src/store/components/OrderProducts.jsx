export default function OrderProducts({
  items = [],
}) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 lg:rounded-3xl lg:p-8">

      <h2 className="mb-6 text-2xl font-bold">
        Productos
      </h2>

      {items.length === 0 ? (

        <p className="text-zinc-500">
          Este pedido no tiene productos.
        </p>

      ) : (

        <div className="space-y-5">

          {items.map((item) => (

            <article
              key={item.id}
              className="border-b border-zinc-100 pb-5 last:border-b-0 last:pb-0"
            >

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <h3 className="text-lg font-semibold">
                    {item.product_name}
                  </h3>

                  <div className="mt-3 space-y-1 text-sm text-zinc-500">

                    <p>
                      Cantidad: {item.quantity}
                    </p>

                    <p>
                      Precio unitario: $
                      {Number(item.unit_price).toLocaleString("es-AR")}
                    </p>

                  </div>

                </div>

                <div className="sm:text-right">

                  <p className="text-sm text-zinc-500">
                    Subtotal
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    $
                    {Number(item.subtotal).toLocaleString("es-AR")}
                  </p>

                </div>

              </div>

            </article>

          ))}

        </div>

      )}

    </section>
  );
}