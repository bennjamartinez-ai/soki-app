import { useStoreSettings } from "../../../context/StoreSettingsContext";

import {
  TextField,
  TextareaField,
  SwitchField,
} from "./fields";

export default function HeroEditor() {
  const {
    settings,
    updateDraft,
    saveChanges,
    discardChanges,
    hasChanges,
    saving,
  } = useStoreSettings();

  function update(key, value) {
    updateDraft(key, value);
  }

  return (
    <div className="space-y-8">

      <div className="flex items-start justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Hero
          </h1>

          <p className="mt-2 text-zinc-400">
            Editá el contenido principal de la portada.
          </p>

        </div>

        {hasChanges && (

          <div className="flex gap-3">

            <button
              onClick={discardChanges}
              className="rounded-xl border border-zinc-700 px-5 py-3 transition hover:bg-zinc-800"
            >
              Descartar
            </button>

            <button
              onClick={saveChanges}
              disabled={saving}
              className="rounded-xl bg-amber-200 px-5 py-3 font-semibold text-black transition hover:bg-amber-300 disabled:opacity-50"
            >
              {saving
                ? "Guardando..."
                : "Guardar cambios"}
            </button>

          </div>

        )}

      </div>

      <div className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

        <TextField
          label="Badge"
          value={settings.hero_badge}
          onChange={(value) =>
            update("hero_badge", value)
          }
        />

        <TextareaField
          label="Título"
          rows={4}
          value={settings.hero_title}
          onChange={(value) =>
            update("hero_title", value)
          }
        />

        <TextareaField
          label="Descripción"
          rows={5}
          value={settings.hero_description}
          onChange={(value) =>
            update(
              "hero_description",
              value
            )
          }
        />

        <div className="grid gap-6 md:grid-cols-2">

          <TextField
            label="Texto botón principal"
            value={settings.hero_button_text}
            onChange={(value) =>
              update(
                "hero_button_text",
                value
              )
            }
          />

          <TextField
            label="Link botón principal"
            value={settings.hero_button_link}
            onChange={(value) =>
              update(
                "hero_button_link",
                value
              )
            }
          />

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <TextField
            label="Texto botón secundario"
            value={settings.hero_secondary_button_text}
            onChange={(value) =>
              update(
                "hero_secondary_button_text",
                value
              )
            }
          />

          <TextField
            label="Link botón secundario"
            value={settings.hero_secondary_button_link}
            onChange={(value) =>
              update(
                "hero_secondary_button_link",
                value
              )
            }
          />

        </div>

        <TextField
          label="Texto del mockup"
          value={settings.hero_mockup_text}
          onChange={(value) =>
            update(
              "hero_mockup_text",
              value
            )
          }
        />

        <div className="grid gap-4 md:grid-cols-2">

          <SwitchField
            label="Mostrar botón secundario"
            checked={
              settings.hero_show_secondary_button ===
              "true"
            }
            onChange={(checked) =>
              update(
                "hero_show_secondary_button",
                checked
                  ? "true"
                  : "false"
              )
            }
          />

          <SwitchField
            label="Mostrar mockup"
            checked={
              settings.hero_show_mockup ===
              "true"
            }
            onChange={(checked) =>
              update(
                "hero_show_mockup",
                checked
                  ? "true"
                  : "false"
              )
            }
          />

        </div>

      </div>

    </div>
  );
}