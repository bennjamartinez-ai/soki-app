import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";

export default function Cart({
  cart,
  subtotal,
  shipping,
  discount,
  total,
  onIncrease,
  onDecrease,
  onRemove,
  onShippingChange,
  onDiscountChange,
  onConfirm,
}) {
  return (
    <div className="sticky top-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-2xl font-bold">
        Presupuesto
      </h2>

      <div className="space-y-3">

        {cart.length === 0 ? (

          <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-zinc-700">

            <p className="text-zinc-500">
              Todavía no agregaste productos.
            </p>

          </div>

        ) : (

          cart.map((item) => (

            <CartItem
              key={item.id}
              item={item}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              onRemove={onRemove}
            />

          ))

        )}

      </div>

      <OrderSummary
        subtotal={subtotal}
        shipping={shipping}
        discount={discount}
        total={total}
        onShippingChange={onShippingChange}
        onDiscountChange={onDiscountChange}
        onConfirm={onConfirm}
      />

    </div>
  );
}