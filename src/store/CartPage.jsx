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
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">

        <h1 className="text-3xl font-bold lg:text-4xl">
          Carrito
        </h1>

        <p className="mt-4 text-zinc-600">
          Tu carrito está vacío.
        </p>

        <Link
          to="/productos"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-black px-8 font-semibold text-white transition hover:bg-zinc-800"
        >
          Ver productos
        </Link>

      </main>
    );
  }

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16">

      <h1 className="mb-8 text-3xl font-bold lg:mb-10 lg:text-4xl">
        Carrito
      </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:gap-10">

        <div className="space-y-4 lg:space-y-6">

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