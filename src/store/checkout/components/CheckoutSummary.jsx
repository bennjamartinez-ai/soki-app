import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

export default function CheckoutSummary({
  cart,
  subtotal,
  handleCheckout,
}) {
  return (
    <Card className="h-fit p-5 lg:sticky lg:top-8 lg:p-8">

      <h2 className="text-xl font-semibold lg:text-2xl">
        Resumen del pedido
      </h2>

      <div className="mt-6 space-y-4">

        {cart.length === 0 ? (
          <p className="text-zinc-500">
            Tu carrito está vacío.
          </p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-zinc-100 pb-4"
            >
              <div>

                <p className="font-medium">
                  {item.name}
                </p>

                <p className="text-sm text-zinc-500">
                  {item.quantity} × $
                  {Number(item.price).toLocaleString("es-AR")}
                </p>

              </div>

              <p className="font-semibold">
                $
                {(Number(item.price) * item.quantity).toLocaleString("es-AR")}
              </p>

            </div>
          ))
        )}

      </div>

      <div className="my-6 border-t border-zinc-200" />

      <div className="space-y-3">

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toLocaleString("es-AR")}</span>
        </div>

        <div className="flex justify-between">
          <span>Envío</span>
          <span>A calcular</span>
        </div>

        <div className="flex justify-between border-t border-zinc-200 pt-4">

          <span className="text-lg font-semibold">
            Total
          </span>

          <span className="text-2xl font-bold lg:text-3xl">
            ${subtotal.toLocaleString("es-AR")}
          </span>

        </div>

      </div>

      <Button
        className="mt-6 w-full lg:mt-8"
        disabled={cart.length === 0}
        onClick={handleCheckout}
      >
        Confirmar pedido
      </Button>

    </Card>
  );
}