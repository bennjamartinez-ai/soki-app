import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-soki-background">

      {/* Formas decorativas */}

      <div className="absolute left-[-180px] top-[-220px] h-[520px] w-[520px] rounded-full bg-soki-beige/30 blur-3xl" />

      <div className="absolute right-[-120px] bottom-[-180px] h-[420px] w-[420px] rounded-full bg-soki-brown/10 blur-3xl" />

<div className="mx-auto grid min-h-[70vh] max-w-[1800px] items-center gap-12 px-6 py-12 lg:min-h-[85vh] lg:grid-cols-2 lg:gap-24 lg:px-8">
        {/* TEXTO */}

        <div className="relative z-10 max-w-2xl">

          <p className="mb-6 font-body text-sm font-semibold uppercase tracking-[0.35em] text-soki-brown">
            NUEVA COLECCIÓN
          </p>

<h1 className="font-display text-5xl leading-[0.95] text-soki-dark sm:text-6xl lg:text-8xl">            Tu estilo
            <br />
            empieza por
            <br />
            los detalles.
          </h1>

<p className="mt-8 max-w-xl font-body text-base leading-7 text-soki-muted sm:text-lg lg:mt-10 lg:text-xl lg:leading-9">            Medias y accesorios diseñados para acompañarte
            todos los días con comodidad, calidad y un estilo
            que se adapta a vos.
          </p>

<div className="mt-10 flex flex-col gap-4 sm:flex-row lg:mt-14">
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

       <div className="order-first flex items-center justify-center lg:order-last">

  <div className="relative flex h-[300px] w-[280px] items-center justify-center sm:h-[420px] sm:w-[360px] lg:h-[560px] lg:w-[500px]">

            {/* Mancha */}

<div className="absolute h-[240px] w-[240px] rounded-full bg-soki-beige/30 blur-3xl sm:h-[340px] sm:w-[340px] lg:h-[460px] lg:w-[460px]" />
            {/* Contenedor */}

<div className="relative flex h-[280px] w-[240px] items-center justify-center overflow-hidden rounded-[32px] bg-soki-surface sm:h-[380px] sm:w-[320px] lg:h-[520px] lg:w-[460px] lg:rounded-[48px]">
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