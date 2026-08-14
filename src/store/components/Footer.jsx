import { Link } from "react-router-dom";
import {
  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";

function Footer() {
  return (
    <footer className="mt-24 bg-soki-dark text-white">

      {/* NEWSLETTER */}

      <section className="border-b border-white/10">

        <div className="mx-auto flex max-w-[1800px] flex-col items-center justify-between gap-12 px-8 py-20 lg:flex-row">

          <div className="max-w-2xl">

            <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.35em] text-soki-beige">
              SOKI CLUB
            </p>

            <h2 className="font-display text-6xl leading-none">
              No te pierdas
              <br />
              ninguna novedad.
            </h2>

            <p className="mt-8 max-w-xl font-body text-lg leading-8 text-zinc-300">
              Recibí lanzamientos, descuentos exclusivos y novedades antes que
              nadie.
            </p>

          </div>

          <div className="w-full max-w-xl">

            <div className="flex overflow-hidden rounded-full bg-white">

              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 bg-transparent px-8 py-5 text-black outline-none placeholder:text-zinc-400"
              />

              <button className="flex items-center gap-2 bg-soki-brown px-8 font-semibold transition hover:bg-[#755537]">

                Suscribirme

                <ArrowRight size={18} />

              </button>

            </div>

          </div>

        </div>

      </section>

      {/* CONTENIDO */}

      <section>

        <div className="mx-auto grid max-w-[1800px] gap-16 px-8 py-20 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* MARCA */}

          <div>

            <h2 className="font-display text-6xl text-soki-beige">
              SOKI
            </h2>

            <p className="mt-6 max-w-sm font-body leading-8 text-zinc-400">
              Diseñamos medias y accesorios para acompañarte todos los días con
              comodidad, calidad y un estilo propio.
            </p>

            <div className="mt-10 space-y-4">

              <div className="flex items-center gap-3 text-zinc-300">

                <MapPin size={18} />

                <span>San Rafael, Mendoza</span>

              </div>

              <div className="flex items-center gap-3 text-zinc-300">

                <Mail size={18} />

                <span>hola@soki.com.ar</span>

              </div>

              <div className="flex items-center gap-3 text-zinc-300">

                <Phone size={18} />

                <span>+54 9 2604 41-0877</span>

              </div>

            </div>

          </div>

          {/* COMPRAR */}

          <div>

            <h3 className="mb-6 font-semibold text-white">
              Comprar
            </h3>

            <div className="flex flex-col gap-4 text-zinc-400">

              <Link
                to="/productos"
                className="transition hover:text-white"
              >
                Productos
              </Link>

              <Link
                to="/mayorista"
                className="transition hover:text-white"
              >
                Mayorista
              </Link>

            </div>

          </div>

          {/* EMPRESA */}

<div>

  <h3 className="mb-6 font-semibold text-white">
    Empresa
  </h3>

  <div className="flex flex-col gap-4 text-zinc-400">

    <Link
      to="/nosotros"
      className="transition hover:text-white"
    >
      Nosotros
    </Link>

    <Link
      to="/faq"
      className="transition hover:text-white"
    >
      Preguntas frecuentes
    </Link>

    <Link
      to="/contacto"
      className="transition hover:text-white"
    >
      Contacto
    </Link>

  </div>

</div>

{/* SEGUINOS */}

<div>

  <h3 className="mb-6 font-semibold text-white">
    Seguinos
  </h3>

  <div className="flex flex-col gap-4 text-zinc-400">

    <a
      href="https://instagram.com/soki.sr"
      target="_blank"
      rel="noreferrer"
      className="transition hover:text-white"
    >
      Instagram
    </a>

    <a
      href="https://facebook.com/"
      target="_blank"
      rel="noreferrer"
      className="transition hover:text-white"
    >
      Facebook
    </a>

          </div>

        </div>

         </div>

      </section>

      {/* COPYRIGHT */}

      <section className="border-t border-white/10">

        <div className="mx-auto flex max-w-[1800px] flex-col items-center justify-between gap-4 px-8 py-8 text-sm text-zinc-500 lg:flex-row">

          <p>
            © 2026 SOKI. Todos los derechos reservados.
          </p>

          <p>
            Diseñado con ❤ en San Rafael, Mendoza.
          </p>

        </div>

      </section>

    </footer>
  );
}

export default Footer;