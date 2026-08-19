import { useStoreSettings } from "../../../context/StoreSettingsContext";

export default function BenefitsEditor() {
  const {
    settings,
    saveSetting,
  } = useStoreSettings();

  function update(key, value) {
    saveSetting(key, value);
  }

  const benefits = [1, 2, 3, 4];

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Beneficios
        </h1>

        <p className="mt-2 text-zinc-400">
          Editá los beneficios que aparecen debajo del Hero.
        </p>

      </div>

      <div className="space-y-6">

        {benefits.map((index) => (

          <div
            key={index}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
          >

            <h2 className="mb-6 text-lg font-semibold">
              Beneficio {index}
            </h2>

            <div className="grid gap-6">

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Título
                </label>

                <input
                  value={
                    settings[`benefit_${index}_title`] ??
                    ""
                  }
                  onChange={(e) =>
                    update(
                      `benefit_${index}_title`,
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Descripción
                </label>

                <input
                  value={
                    settings[
                      `benefit_${index}_description`
                    ] ?? ""
                  }
                  onChange={(e) =>
                    update(
                      `benefit_${index}_description`,
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
                />

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}