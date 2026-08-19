import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { useStoreSettings } from "../../context/StoreSettingsContext";

function Hero() {
  const { settings } = useStoreSettings();

  const title =
    settings.hero_title ??
    "Tu estilo\nempieza por\nlos detalles.";

  return (
    <section className="relative overflow-hidden bg-soki-background">

      <div className="absolute left-[-180px] top-[-220px] h-[520px] w-[520px] rounded-full bg-soki-beige/30 blur-3xl" />

      <div className="absolute bottom-[-180px] right-[-120px] h-[420px] w-[420px] rounded-full bg-soki-brown/10 blur-3xl" />

      <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-4 py-10 sm:px-6 lg:min-h-[85vh] lg:grid-cols-2 lg:gap-20 lg:px-8">

        {/* TEXTO */}

        <div className="relative z-10 max-w-2xl">

          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-soki-brown">
            {settings.hero_badge}
          </p>

          <h1 className="text-5xl font-black leading-[0.92] whitespace-pre-line text-soki-dark sm:text-6xl lg:text-8xl">
            {title}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-soki-muted lg:mt-8 lg:text-xl lg:leading-9">
            {settings.hero_description}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">

            <Link
              to={
                settings.hero_button_link ??
                "/productos"
              }
              className="flex items-center justify-center gap-2 rounded-full bg-soki-dark px-8 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              {settings.hero_button_text}

              <ArrowRight size={18} />

            </Link>

            {settings.hero_show_secondary_button ===
              "true" && (
              <Link
                to={
                  settings.hero_secondary_button_link ??
                  "/nosotros"
                }
                className="flex items-center justify-center rounded-full border border-soki-border bg-white px-8 py-4 font-semibold text-soki-dark transition hover:border-black"
              >
                {
                  settings.hero_secondary_button_text
                }
              </Link>
            )}

          </div>

        </div>

        {/* MOCKUP */}

        {settings.hero_show_mockup ===
          "true" && (
          <div className="order-first flex justify-center lg:order-last">

            <div className="relative flex h-[320px] w-[260px] items-center justify-center sm:h-[420px] sm:w-[340px] lg:h-[560px] lg:w-[470px]">

              <div className="absolute h-[250px] w-[250px] rounded-full bg-soki-beige/30 blur-3xl sm:h-[340px] sm:w-[340px] lg:h-[430px] lg:w-[430px]" />

              <div className="relative flex h-[300px] w-[230px] items-center justify-center overflow-hidden rounded-[32px] bg-soki-surface sm:h-[390px] sm:w-[310px] lg:h-[520px] lg:w-[430px] lg:rounded-[48px]">

                <span className="text-5xl font-black tracking-[0.25em] text-soki-brown/60 lg:text-7xl">
                  {settings.hero_mockup_text}
                </span>

              </div>

            </div>

          </div>
        )}

      </div>

    </section>
  );
}

export default Hero;