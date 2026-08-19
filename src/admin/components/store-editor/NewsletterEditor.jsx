import { useStoreSettings } from "../../../context/StoreSettingsContext";

import {
  TextField,
  TextareaField,
} from "./fields";

export default function NewsletterEditor() {
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
            Newsletter
          </h1>

          <p className="mt-2 text-zinc-400">
            Editá la sección de suscripción.
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
          value={settings.newsletter_badge}
          onChange={(value) =>
            update(
              "newsletter_badge",
              value
            )
          }
        />

        <TextareaField
          label="Título"
          rows={3}
          value={settings.newsletter_title}
          onChange={(value) =>
            update(
              "newsletter_title",
              value
            )
          }
        />

        <TextareaField
          label="Descripción"
          rows={4}
          value={
            settings.newsletter_description
          }
          onChange={(value) =>
            update(
              "newsletter_description",
              value
            )
          }
        />

        <TextField
          label="Placeholder"
          value={
            settings.newsletter_placeholder
          }
          onChange={(value) =>
            update(
              "newsletter_placeholder",
              value
            )
          }
        />

        <TextField
          label="Texto del botón"
          value={
            settings.newsletter_button_text
          }
          onChange={(value) =>
            update(
              "newsletter_button_text",
              value
            )
          }
        />

      </div>

    </div>
  );
}