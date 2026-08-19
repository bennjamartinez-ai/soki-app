import { useStoreSettings } from "../../../context/StoreSettingsContext";

export default function BannerEditor() {
  const {
    settings,
    saveSetting,
  } = useStoreSettings();

  function update(key, value) {
    saveSetting(key, value);
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Banner promocional
        </h1>

        <p className="mt-2 text-zinc-400">
          Editá el banner que aparece debajo de los productos destacados.
        </p>

      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

        <div className="space-y-6">

          <div>

            <label className="mb-2 block text-sm font-medium">
              Badge
            </label>

            <input
              value={settings.banner_badge ?? ""}
              onChange={(e) =>
                update(
                  "banner_badge",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Título
            </label>

            <textarea
              rows={3}
              value={settings.banner_title ?? ""}
              onChange={(e) =>
                update(
                  "banner_title",
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

            <textarea
              rows={5}
              value={
                settings.banner_description ?? ""
              }
              onChange={(e) =>
                update(
                  "banner_description",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
            />

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-medium">
                Texto del botón
              </label>

              <input
                value={
                  settings.banner_button_text ?? ""
                }
                onChange={(e) =>
                  update(
                    "banner_button_text",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">
                Link del botón
              </label>

              <input
                value={
                  settings.banner_button_link ?? ""
                }
                onChange={(e) =>
                  update(
                    "banner_button_link",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
              />

            </div>

          </div>

          <label className="flex items-center gap-3 rounded-xl border border-zinc-700 p-4">

            <input
              type="checkbox"
              checked={
                settings.banner_show_button ===
                "true"
              }
              onChange={(e) =>
                update(
                  "banner_show_button",
                  e.target.checked
                    ? "true"
                    : "false"
                )
              }
            />

            Mostrar botón

          </label>

        </div>

      </div>

    </div>
  );
}