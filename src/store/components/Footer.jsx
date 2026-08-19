import { Link } from "react-router-dom";
import {
  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";

function Footer() {
  return (
    <footer className="mt-20 bg-soki-dark text-white">

      {/* NEWSLETTER */}

      <section className="border-b border-white/10">

        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-20">

          <div className="max-w-2xl">

            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-soki-beige">
              SOKI CLUB
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight lg:text-6xl">
              No te pierdas
              <br />
              ninguna novedad.
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-zinc-300 lg:text-lg">
              Recibí lanzamientos, descuentos exclusivos y novedades antes que nadie.
            </p>

          </div>

          <div className="w-full max-w-xl">

            <div className="flex flex-col overflow-hidden rounded-2xl bg-white sm:flex-row sm:rounded-full">

              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-6 py-4 text-black outline-none placeholder:text-zinc-400"
              />

              <button className="flex items-center justify-center gap-2 bg-soki-brown px-8 py-4 font-semibold transition hover:bg-[#755537]">

                Suscribirme

                <ArrowRight size={18} />

              </button>

            </div>

          </div>

        </div>

      </section>

      {/* CONTENIDO */}

      <section>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:px-8 lg:py-20">

          {/* MARCA */}

          <div>

            <h2 className="text-5xl font-black tracking-[0.25em] text-soki-beige">
              SOKI
            </h2>

            <p className="mt-6 max-w-sm leading-7 text-zinc-400">
              Diseñamos medias y accesorios para acompañarte todos los días con comodidad, calidad y un estilo propio.
            </p>

            <div className="mt-8 space-y-4">

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

            <h3 className="mb-5 font-semibold">
              Comprar
            </h3>

            <div className="flex flex-col gap-3 text-zinc-400">

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

            <h3 className="mb-5 font-semibold">
              Empresa
            </h3>

            <div className="flex flex-col gap-3 text-zinc-400">

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

          {/* REDES */}

          <div>

            <h3 className="mb-5 font-semibold">
              Seguinos
            </h3>

            <div className="flex flex-col gap-3 text-zinc-400">

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

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-center text-sm text-zinc-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:text-left">

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