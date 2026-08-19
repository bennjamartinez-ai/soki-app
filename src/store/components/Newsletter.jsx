import { ArrowRight } from "lucide-react";

import { useStoreSettings } from "../../context/StoreSettingsContext";

export default function Newsletter() {
  const { settings } = useStoreSettings();

  return (
    <section className="border-b border-white/10">

      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-20">

        <div className="max-w-2xl">

          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-soki-beige">
            {settings.newsletter_badge}
          </p>

          <h2 className="mt-4 whitespace-pre-line text-4xl font-bold leading-tight lg:text-6xl">
            {settings.newsletter_title}
          </h2>

          <p className="mt-6 max-w-lg text-base leading-7 text-zinc-300 lg:text-lg">
            {settings.newsletter_description}
          </p>

        </div>

        <div className="w-full max-w-xl">

          <div className="flex flex-col overflow-hidden rounded-2xl bg-white sm:flex-row sm:rounded-full">

            <input
              type="email"
              placeholder={
                settings.newsletter_placeholder
              }
              className="flex-1 px-6 py-4 text-black outline-none placeholder:text-zinc-400"
            />

            <button className="flex items-center justify-center gap-2 bg-soki-brown px-8 py-4 font-semibold transition hover:bg-[#755537]">

              {settings.newsletter_button_text}

              <ArrowRight size={18} />

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}