import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import {
  createOrder,
  createOrderItems,
} from "../services/orders";

import CustomerForm from "./checkout/components/CustomerForm";
import CheckoutSummary from "./checkout/components/CheckoutSummary";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();

  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleCheckout() {
    if (
      !customer.name ||
      !customer.phone ||
      !customer.address
    ) {
      alert("Completá los datos obligatorios.");
      return;
    }

    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    try {
      const order = await createOrder({
        user_id: user.id,
        customer_name: customer.name,
        customer_phone: customer.phone,
        customer_email: customer.email,
        customer_address: customer.address,
        customer_postal_code: customer.postalCode,
        total: subtotal,
        status: "pending",
      });

      await createOrderItems(order.id, cart);

      clearCart();

      navigate("/pedido-realizado", {
        state: {
          orderId: order.id,
        },
      });
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al crear el pedido.");
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16">

      <div className="mb-8 lg:mb-12">

        <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">
          Checkout
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight lg:text-5xl">
          Finalizar compra
        </h1>

        <p className="mt-3 max-w-2xl text-zinc-600">
          Completá tus datos para finalizar el pedido.
        </p>

      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

        <CustomerForm
          customer={customer}
          handleChange={handleChange}
        />

        <CheckoutSummary
          cart={cart}
          subtotal={subtotal}
          handleCheckout={handleCheckout}
        />

      </div>

    </section>
  );
}