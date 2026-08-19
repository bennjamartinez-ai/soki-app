import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useStoreSettings } from "../../context/StoreSettingsContext";

import Newsletter from "./Newsletter";

function normalizeUrl(url) {
  if (!url) return "#";

  if (
    url.startsWith("http://") ||
    url.startsWith("https://")
  ) {
    return url;
  }

  return `https://${url}`;
}

function Footer() {
  const { settings } = useStoreSettings();

  return (
    <footer className="mt-20 bg-soki-dark text-white">

      <Newsletter />

      <section>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:px-8 lg:py-20">

          {/* Marca */}

          <div>

            <h2 className="text-5xl font-black tracking-[0.25em] text-soki-beige">
              SOKI
            </h2>

            <p className="mt-6 max-w-sm leading-7 text-zinc-400">
              {settings.footer_description}
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3 text-zinc-300">
                <MapPin size={18} />

                <span>
                  {settings.footer_location}
                </span>
              </div>

              <div className="flex items-center gap-3 text-zinc-300">
                <Mail size={18} />

                <span>
                  {settings.footer_email}
                </span>
              </div>

              <div className="flex items-center gap-3 text-zinc-300">
                <Phone size={18} />

                <span>
                  {settings.footer_phone}
                </span>
              </div>

            </div>

          </div>

          {/* Comprar */}

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

          {/* Empresa */}

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

          {/* Redes */}

          <div>

            <h3 className="mb-5 font-semibold">
              Seguinos
            </h3>

            <div className="flex flex-col gap-3 text-zinc-400">

              <a
                href={normalizeUrl(
                  settings.footer_instagram
                )}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white"
              >
                Instagram
              </a>

              <a
                href={normalizeUrl(
                  settings.footer_facebook
                )}
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

      {/* Copyright */}

      <section className="border-t border-white/10">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-center text-sm text-zinc-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:text-left">

          <p>
            {settings.footer_copyright}
          </p>

          <p>
            {settings.footer_signature}
          </p>

        </div>

      </section>

    </footer>
  );
}

export default Footer;