export default function OrderProducts({
  items = [],
}) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-8">

      <h2 className="mb-8 text-2xl font-bold">
        Productos
      </h2>

      {items.length === 0 ? (

        <p className="text-zinc-500">
          Este pedido no tiene productos.
        </p>

      ) : (

        <div className="space-y-6">

          {items.map((item) => (

            <div
              key={item.id}
              className="flex items-center justify-between border-b border-zinc-100 pb-6 last:border-b-0"
            >

              <div>

                <h3 className="text-lg font-semibold">
                  {item.product_name}
                </h3>

                <p className="mt-2 text-zinc-500">
                  Cantidad: {item.quantity}
                </p>

                <p className="text-zinc-500">
                  Precio unitario: $
                  {Number(item.unit_price).toLocaleString("es-AR")}
                </p>

              </div>

              <div className="text-right">

                <p className="text-sm text-zinc-500">
                  Subtotal
                </p>

                <p className="text-xl font-bold">
                  $
                  {Number(item.subtotal).toLocaleString("es-AR")}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}