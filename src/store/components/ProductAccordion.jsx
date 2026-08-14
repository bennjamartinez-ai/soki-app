import {
  CreditCard,
  ChevronDown,
} from "lucide-react";

export default function ProductAccordion({
  sections,
  openSection,
  setOpenSection,
}) {
  return (
    <>
      {/* BENEFICIOS */}

      <div className="mt-10 space-y-3">

        <button className="flex w-full items-center justify-between rounded-2xl border border-zinc-200 p-5 transition hover:border-black hover:shadow-sm">

          <div className="flex items-center gap-4">

            <CreditCard size={22} />

            <div>

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

        <button className="flex w-full items-center justify-between rounded-2xl border border-zinc-200 p-5 transition hover:border-black hover:shadow-sm">

          <div>

            <p className="font-semibold">
              Envíos y retiro
            </p>

            <p className="text-sm text-zinc-500">
              Calculá costos y tiempos.
            </p>

          </div>

          <ChevronDown
            size={18}
            className="-rotate-90"
          />

        </button>

      </div>

      {/* ACORDEONES */}

      <div className="mt-12 border-y border-zinc-200">

        {sections.map((section) => (

          <div
            key={section.id}
            className="border-b border-zinc-200 last:border-b-0"
          >

            <button
              onClick={() =>
                setOpenSection(
                  openSection === section.id
                    ? null
                    : section.id
                )
              }
              className="flex w-full items-center justify-between py-6"
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

              <div className="pb-6 leading-7 text-zinc-600">

                {section.content}

              </div>

            )}

          </div>

        ))}

      </div>
    </>
  );
}