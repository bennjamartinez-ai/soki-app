import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { useStoreSettings } from "../../context/StoreSettingsContext";

export default function PromoBanner() {
  const { settings } = useStoreSettings();

  if (settings.banner_show !== "true") {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">

      <div className="grid overflow-hidden rounded-3xl bg-zinc-100 lg:grid-cols-2">

        {/* Imagen */}

        <div className="flex min-h-[320px] items-center justify-center bg-zinc-200">

          <span className="text-5xl font-black tracking-[0.25em] text-zinc-400">
            SOKI
          </span>

        </div>

        {/* Texto */}

        <div className="flex flex-col justify-center p-8 lg:p-14">

          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
            {settings.banner_badge}
          </p>

          <h2 className="mt-4 text-4xl font-bold leading-tight lg:text-5xl">
            {settings.banner_title}
          </h2>

          <p className="mt-6 max-w-md leading-7 text-zinc-600">
            {settings.banner_description}
          </p>

          {settings.banner_show_button === "true" && (
            <Link
              to={
                settings.banner_button_link ||
                "/productos"
              }
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-black px-7 py-4 font-semibold text-white transition hover:bg-zinc-800"
            >
              {settings.banner_button_text}

              <ArrowRight size={18} />
            </Link>
          )}

        </div>

      </div>

    </section>
  );
}