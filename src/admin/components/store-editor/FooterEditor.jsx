import { useStoreSettings } from "../../../context/StoreSettingsContext";

import {
  TextField,
  TextareaField,
} from "./fields";

export default function FooterEditor() {
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
            Footer
          </h1>

          <p className="mt-2 text-zinc-400">
            Editá la información del pie de página.
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

        <TextareaField
          label="Descripción"
          rows={4}
          value={settings.footer_description}
          onChange={(value) =>
            update(
              "footer_description",
              value
            )
          }
        />

        <div className="grid gap-6 md:grid-cols-2">

          <TextField
            label="Ubicación"
            value={settings.footer_location}
            onChange={(value) =>
              update(
                "footer_location",
                value
              )
            }
          />

          <TextField
            label="Teléfono"
            value={settings.footer_phone}
            onChange={(value) =>
              update(
                "footer_phone",
                value
              )
            }
          />

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <TextField
            label="Email"
            value={settings.footer_email}
            onChange={(value) =>
              update(
                "footer_email",
                value
              )
            }
          />

          <TextField
            label="Instagram"
            value={settings.footer_instagram}
            onChange={(value) =>
              update(
                "footer_instagram",
                value
              )
            }
          />

        </div>

        <TextField
          label="Facebook"
          value={settings.footer_facebook}
          onChange={(value) =>
            update(
              "footer_facebook",
              value
            )
          }
        />

        <TextField
          label="Copyright"
          value={settings.footer_copyright}
          onChange={(value) =>
            update(
              "footer_copyright",
              value
            )
          }
        />

        <TextField
          label="Firma"
          value={settings.footer_signature}
          onChange={(value) =>
            update(
              "footer_signature",
              value
            )
          }
        />

      </div>

    </div>
  );
}