import {
  CreditCard,
  ChevronDown,
  Truck,
} from "lucide-react";

export default function ProductAccordion({
  sections,
  openSection,
  setOpenSection,
}) {
  return (
    <>
      {/* BENEFICIOS */}

      <div className="mt-8 space-y-3 lg:mt-10">

        <button className="flex w-full items-center justify-between rounded-2xl border border-zinc-200 p-4 transition hover:border-black hover:shadow-sm lg:p-5">

          <div className="flex items-center gap-4">

            <CreditCard size={22} />

            <div className="text-left">

              <p className="font-semibold">
                Pagá en cuotas
              </p>

              <p className="text-sm text-zinc-500">
                Hasta 6 pagos sin interés.
              </p>

            </div>

          </div>

          <ChevronDown
            size={18}
            className="-rotate-90"
          />

        </button>

        <button className="flex w-full items-center justify-between rounded-2xl border border-zinc-200 p-4 transition hover:border-black hover:shadow-sm lg:p-5">

          <div className="flex items-center gap-4">

            <Truck size={22} />

            <div className="text-left">

              <p className="font-semibold">
                Envíos y retiro
              </p>

              <p className="text-sm text-zinc-500">
                Calculá costos y tiempos.
              </p>

            </div>

          </div>

          <ChevronDown
            size={18}
            className="-rotate-90"
          />

        </button>

      </div>

      {/* ACORDEÓN */}

      <div className="mt-8 border-y border-zinc-200 lg:mt-10">

        {sections.map((section) => (

          <div
            key={section.id}
            className="border-b border-zinc-200 last:border-0"
          >

            <button
              onClick={() =>
                setOpenSection(
                  openSection === section.id
                    ? null
                    : section.id
                )
              }
              className="flex w-full items-center justify-between py-5 text-left"
            >

              <span className="font-medium">
                {section.title}
              </span>

              <ChevronDown
                size={18}
                className={`transition-transform ${
                  openSection === section.id
                    ? "rotate-180"
                    : ""
                }`}
              />

            </button>

            {openSection === section.id && (

              <div className="pb-5 text-sm leading-7 text-zinc-600 lg:text-base">

                {section.content}

              </div>

            )}

          </div>

        ))}

      </div>

    </>
  );
}