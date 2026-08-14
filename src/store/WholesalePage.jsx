import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Package,
  Truck,
  Users,
} from "lucide-react";

import { createWholesaleRequest } from "../services/wholesaleService";

export default function WholesalePage() {
      const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    business_name: "",
    email: "",
    phone: "",
    message: "",
  });

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.full_name ||
      !form.email ||
      !form.phone
    ) {
      alert("Completá los campos obligatorios.");
      return;
    }

    try {
      setLoading(true);

      await createWholesaleRequest(form);

      setSuccess(true);

      setForm({
        full_name: "",
        business_name: "",
        email: "",
        phone: "",
        message: "",
      });

    } catch (error) {

      console.error(error);

      alert(
        "Ocurrió un error al enviar la solicitud."
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <main className="bg-soki-background">

      {/* HERO */}

      <section className="relative overflow-hidden">

        <div className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-soki-beige/25 blur-3xl" />
        <div className="absolute right-[-120px] bottom-[-120px] h-[320px] w-[320px] rounded-full bg-soki-brown/10 blur-3xl" />

        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center">

          <p className="font-body text-sm font-semibold uppercase tracking-[0.35em] text-soki-brown">
            SOKI MAYORISTAS
          </p>

          <h1 className="mt-6 font-display text-7xl leading-none text-soki-dark">
            Comprá para
            <br />
            tu negocio.
          </h1>

          <p className="mt-8 max-w-3xl font-body text-xl leading-9 text-soki-muted">
            Accedé a precios exclusivos para revendedores,
            negocios y emprendedores con stock permanente y
            envíos a todo el país.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">

            <a
              href="#registro"
              className="flex items-center gap-2 rounded-full bg-soki-dark px-8 py-4 font-semibold text-white transition hover:-translate-y-0.5"
            >
              Solicitar acceso

              <ArrowRight size={18} />

            </a>

            <Link
              to="/productos"
              className="rounded-full border border-soki-border bg-white px-8 py-4 font-semibold transition hover:border-soki-dark"
            >
              Ver productos
            </Link>

          </div>

        </div>

      </section>

      {/* BENEFICIOS */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-[32px] bg-white p-8 shadow-sm">

            <BadgeCheck
              size={34}
              className="text-soki-brown"
            />

            <h3 className="mt-6 text-2xl font-semibold">
              Compra mínima
            </h3>

            <p className="mt-4 leading-8 text-soki-muted">
              Accedé a precios mayoristas desde una compra de
              <strong> $40.000.</strong>
            </p>

          </div>

          <div className="rounded-[32px] bg-white p-8 shadow-sm">

            <Package
              size={34}
              className="text-soki-brown"
            />

            <h3 className="mt-6 text-2xl font-semibold">
              Stock permanente
            </h3>

            <p className="mt-4 leading-8 text-soki-muted">
              Todos nuestros productos publicados cuentan con
              disponibilidad inmediata.
            </p>

          </div>

          <div className="rounded-[32px] bg-white p-8 shadow-sm">

            <Truck
              size={34}
              className="text-soki-brown"
            />

            <h3 className="mt-6 text-2xl font-semibold">
              Envíos
            </h3>

            <p className="mt-4 leading-8 text-soki-muted">
              Realizamos envíos a toda Argentina mediante
              Correo Argentino.
            </p>

          </div>

          <div className="rounded-[32px] bg-white p-8 shadow-sm">

            <Users
              size={34}
              className="text-soki-brown"
            />

            <h3 className="mt-6 text-2xl font-semibold">
              Atención personalizada
            </h3>

            <p className="mt-4 leading-8 text-soki-muted">
              Te acompañamos durante todo el proceso de compra.
            </p>

          </div>

        </div>

      </section>

      {/* CÓMO FUNCIONA */}

      <section className="mx-auto max-w-6xl px-6 py-20">

        <div className="text-center">

          <p className="font-body text-sm font-semibold uppercase tracking-[0.35em] text-soki-brown">
            PASO A PASO
          </p>

          <h2 className="mt-4 font-display text-6xl text-soki-dark">
            ¿Cómo funciona?
          </h2>

        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-3">

          <div className="text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-soki-dark text-2xl font-bold text-white">
              1
            </div>

            <h3 className="mt-8 text-2xl font-semibold">
              Registrate
            </h3>

            <p className="mt-4 leading-8 text-soki-muted">
              Completá el formulario con tus datos.
            </p>

          </div>

          <div className="text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-soki-dark text-2xl font-bold text-white">
              2
            </div>

            <h3 className="mt-8 text-2xl font-semibold">
              Verificamos tu solicitud
            </h3>

            <p className="mt-4 leading-8 text-soki-muted">
              Revisaremos la información enviada.
            </p>

          </div>

          <div className="text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-soki-dark text-2xl font-bold text-white">
              3
            </div>

            <h3 className="mt-8 text-2xl font-semibold">
              Comprá al por mayor
            </h3>

            <p className="mt-4 leading-8 text-soki-muted">
              Accedé a precios exclusivos y comenzá a comprar.
            </p>

          </div>

        </div>

      </section>

      {/* FORMULARIO */}

      <section
        id="registro"
        className="mx-auto max-w-3xl px-6 pb-32"
      >

        <div className="rounded-[40px] bg-white p-10 shadow-sm">

          <h2 className="text-center font-display text-5xl text-soki-dark">
            Solicitar acceso
          </h2>

          <p className="mt-4 text-center leading-8 text-soki-muted">
            Completá tus datos y nos pondremos en contacto con vos.
          </p>

            <form
            onSubmit={handleSubmit}
            className="mt-12 space-y-6"
            >
                
            <input
  type="text"
  name="full_name"
  value={form.full_name}
  onChange={handleChange}
  placeholder="Nombre completo *"
  className="w-full rounded-2xl border border-soki-border px-6 py-4 outline-none transition focus:border-soki-dark"
/>

<input
  type="text"
  name="business_name"
  value={form.business_name}
  onChange={handleChange}
  placeholder="Nombre del negocio (opcional)"
  className="w-full rounded-2xl border border-soki-border px-6 py-4 outline-none transition focus:border-soki-dark"
/>

<input
  type="email"
  name="email"
  value={form.email}
  onChange={handleChange}
  placeholder="Correo electrónico *"
  className="w-full rounded-2xl border border-soki-border px-6 py-4 outline-none transition focus:border-soki-dark"
/>

<input
  type="tel"
  name="phone"
  value={form.phone}
  onChange={handleChange}
  placeholder="WhatsApp *"
  className="w-full rounded-2xl border border-soki-border px-6 py-4 outline-none transition focus:border-soki-dark"
/>

<textarea
  rows={5}
  name="message"
  value={form.message}
  onChange={handleChange}
  placeholder="Contanos brevemente sobre tu negocio..."
  className="w-full rounded-2xl border border-soki-border px-6 py-4 outline-none transition focus:border-soki-dark"
/>

{success && (
  <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-green-700">
    ¡Solicitud enviada correctamente! La revisaremos y nos pondremos en contacto con vos a la brevedad.
  </div>
)}

<button
  type="submit"
  disabled={loading}
  className="w-full rounded-full bg-soki-dark py-5 text-lg font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading
    ? "Enviando..."
    : "Enviar solicitud"}
</button>

          </form>

        </div>

      </section>

    </main>
  );
}