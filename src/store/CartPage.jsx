import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

import CartItem from "./components/CartItem";
import OrderSummary from "./components/OrderSummary";

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
  } = useCart();

  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-8 py-20">
        <h1 className="text-4xl font-bold">
          Carrito
        </h1>

        <p className="mt-6 text-zinc-600">
          Tu carrito está vacío.
        </p>

        <Link
          to="/productos"
          className="mt-8 inline-block rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Ver productos
        </Link>
      </main>
    );
  }

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <main className="mx-auto max-w-7xl px-8 py-16">
      <h1 className="mb-10 text-4xl font-bold">
        Carrito
      </h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          ))}
        </div>

        <OrderSummary subtotal={subtotal} />
      </div>
    </main>
  );
}