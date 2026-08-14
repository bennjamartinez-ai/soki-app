import { useState } from "react";
import { useCart } from "../context/CartContext";
import { createOrder, createOrderItems } from "../services/orders";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
const { user } = useAuth();

  const subtotal = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
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
  if (!customer.name || !customer.phone || !customer.address) {
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
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12">
        <p className="text-sm uppercase tracking-[0.35em] text-zinc-400">
          Checkout
        </p>

        <h1 className="mt-3 text-5xl font-bold tracking-tight">
          Finalizar compra
        </h1>

        <p className="mt-4 max-w-2xl text-zinc-600">
          Completá tus datos para finalizar el pedido.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <Card className="p-8">
          <h2 className="mb-8 text-2xl font-semibold">
            Datos del cliente
          </h2>

          <div className="grid gap-5">
            <Input
              name="name"
              value={customer.name}
              onChange={handleChange}
              placeholder="Nombre y apellido"
            />

            <Input
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              placeholder="Teléfono"
            />

            <Input
              type="email"
              name="email"
              value={customer.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
            />

            <Input
              name="address"
              value={customer.address}
              onChange={handleChange}
              placeholder="Dirección"
            />

            <Input
              name="city"
              value={customer.city}
              onChange={handleChange}
              placeholder="Ciudad"
            />

            <Input
              name="postalCode"
              value={customer.postalCode}
              onChange={handleChange}
              placeholder="Código postal"
            />
          </div>
        </Card>

        <Card className="sticky top-8 h-fit p-8">
          <h2 className="text-2xl font-semibold">
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
                    <p className="font-medium">{item.name}</p>

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

              <span className="text-3xl font-bold">
                ${subtotal.toLocaleString("es-AR")}
              </span>
            </div>
          </div>

          <Button
            className="mt-8 w-full"
            disabled={cart.length === 0}
            onClick={handleCheckout}
          >
            Confirmar pedido
          </Button>
        </Card>
      </div>
    </section>
  );
}