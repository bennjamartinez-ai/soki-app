import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-soki-background">

      {/* Formas decorativas */}

      <div className="absolute left-[-180px] top-[-220px] h-[520px] w-[520px] rounded-full bg-soki-beige/30 blur-3xl" />

      <div className="absolute right-[-120px] bottom-[-180px] h-[420px] w-[420px] rounded-full bg-soki-brown/10 blur-3xl" />

      <div className="mx-auto grid min-h-[85vh] max-w-[1800px] items-center gap-24 px-8 lg:grid-cols-2">

        {/* TEXTO */}

        <div className="relative z-10 max-w-2xl">

          <p className="mb-6 font-body text-sm font-semibold uppercase tracking-[0.35em] text-soki-brown">
            NUEVA COLECCIÓN
          </p>

          <h1 className="font-display text-7xl leading-[0.95] text-soki-dark lg:text-8xl">
            Tu estilo
            <br />
            empieza por
            <br />
            los detalles.
          </h1>

          <p className="mt-10 max-w-xl font-body text-xl leading-9 text-soki-muted">
            Medias y accesorios diseñados para acompañarte
            todos los días con comodidad, calidad y un estilo
            que se adapta a vos.
          </p>

          <div className="mt-14 flex flex-wrap gap-4">

            <Link
              to="/productos"
              className="flex items-center gap-2 rounded-full bg-soki-dark px-8 py-4 font-body font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Comprar ahora
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/nosotros"
              className="rounded-full border border-soki-border bg-white/60 px-8 py-4 font-body font-semibold text-soki-dark backdrop-blur transition duration-300 hover:border-soki-dark"
            >
              Conocer Soki
            </Link>

          </div>

        </div>

        {/* IMAGEN */}

        <div className="flex items-center justify-center">

          <div className="relative flex h-[560px] w-[500px] items-center justify-center">

            {/* Mancha */}

            <div className="absolute h-[460px] w-[460px] rounded-full bg-soki-beige/30 blur-3xl" />

            {/* Contenedor */}

            <div className="relative flex h-[520px] w-[460px] items-center justify-center overflow-hidden rounded-[48px] bg-soki-surface">

              <span className="font-editorial text-6xl text-soki-brown/60">
                SOKI
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;