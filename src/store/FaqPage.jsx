import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "¿Realizan envíos a todo el país?",
    answer:
      "Sí. Realizamos envíos a toda Argentina mediante Correo Argentino. El costo del envío depende de la localidad de destino y se informa al momento de confirmar la compra. Los pedidos se despachan dentro de 1 a 2 días hábiles luego de acreditado el pago.",
  },
  {
    id: 2,
    question: "¿Qué medios de pago aceptan?",
    answer:
      "Aceptamos todos los medios de pago disponibles, incluyendo tarjetas de crédito y débito, transferencias bancarias y Mercado Pago.",
  },
  {
    id: 3,
    question: "¿Cómo solicito un cambio o reclamo?",
    answer:
      "Si tu pedido llega con un producto dañado o faltante, es indispensable grabar la apertura del paquete desde el momento en que se encuentra cerrado. El video debe mostrar claramente el estado del embalaje y el contenido recibido. Sin este registro no será posible gestionar el reclamo.",
  },
  {
    id: 4,
    question: "¿Tienen ventas mayoristas?",
    answer:
      "Sí. Contamos con precios mayoristas para compras desde $40.000. Para acceder a esta sección es necesario registrarse como cliente mayorista.",
  },
  {
    id: 5,
    question: "¿Los productos publicados tienen stock?",
    answer:
      "Sí. Todos los productos publicados en la tienda se encuentran disponibles para compra inmediata. Si necesitás una cantidad mayor a la disponible en la web, podés comunicarte con nosotros para coordinar una reposición o un pedido especial.",
  },
  {
    id: 6,
    question: "¿Cómo puedo comunicarme con Soki?",
    answer:
      "Podés escribirnos por WhatsApp, Instagram o mediante nuestros medios de contacto publicados en la tienda. Respondemos las consultas lo antes posible.",
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState(1);

  return (
    <main className="bg-soki-background">

      {/* HERO */}

      <section className="mx-auto max-w-5xl px-6 pt-24 text-center">

        <p className="font-body text-sm font-semibold uppercase tracking-[0.35em] text-soki-brown">
          AYUDA
        </p>

        <h1 className="mt-5 font-display text-7xl leading-none text-soki-dark">
          Preguntas
          <br />
          frecuentes
        </h1>

        <p className="mx-auto mt-8 max-w-2xl font-body text-lg leading-8 text-soki-muted">
          Encontrá respuestas a las consultas más habituales sobre compras,
          envíos, cambios y ventas mayoristas.
        </p>

      </section>

      {/* FAQ */}

<section className="mx-auto mb-24 mt-20 max-w-4xl px-6">

  <div className="overflow-hidden rounded-[32px] border border-soki-border bg-white shadow-sm">


          {questions.map((item) => {

            const isOpen = open === item.id;

            return (

              <div
                key={item.id}
                className="border-b border-soki-border last:border-b-0"
              >

                <button
                  onClick={() =>
                    setOpen(isOpen ? null : item.id)
                  }
                  className="flex w-full items-center justify-between px-8 py-7 text-left transition hover:bg-soki-surface"
                >

                  <span className="font-body text-lg font-semibold text-soki-dark">
                    {item.question}
                  </span>

                  <ChevronDown
                    size={22}
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />

                </button>

                <div
                  className={`grid overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >

                  <div className="overflow-hidden">

                    <div className="px-8 pb-8">

                      <p className="font-body leading-8 text-soki-muted">
                        {item.answer}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            );

          })}

        </div>
<div className="mt-12 flex justify-center">

  <Link
    to="/"
    className="rounded-full bg-soki-dark px-8 py-4 font-body font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-black"
  >
    Volver a la página principal
  </Link>

</div>
      </section>

    </main>
  );
}