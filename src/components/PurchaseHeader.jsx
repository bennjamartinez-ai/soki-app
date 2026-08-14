import { useProviders } from "../context/ProvidersContext";

export default function PurchaseHeader({
  purchase,
  setPurchase,
}) {

const { providers } = useProviders();

  function update(field, value) {
    setPurchase((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-2xl font-bold">
        Datos de la compra
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <div>

          <label className="mb-2 block text-sm text-zinc-400">
            Proveedor
          </label>

          <select
            value={purchase.providerId}
            onChange={(e) =>
              update("providerId", Number(e.target.value))
            }
            className="w-full rounded-lg bg-zinc-800 p-3"
          >

            <option value="">
              Seleccionar proveedor
            </option>

            {providers.map((provider) => (

              <option
                key={provider.id}
                value={provider.id}
              >
                {provider.name}
              </option>

            ))}

          </select>

        </div>

        <div>

          <label className="mb-2 block text-sm text-zinc-400">
            Fecha
          </label>

          <input
            disabled
            value={new Date().toLocaleDateString()}
            className="w-full rounded-lg bg-zinc-800 p-3"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm text-zinc-400">
            Envío
          </label>

          <input
            type="number"
            value={purchase.shipping}
            onChange={(e) =>
              update("shipping", Number(e.target.value))
            }
            className="w-full rounded-lg bg-zinc-800 p-3"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm text-zinc-400">
            Otros gastos
          </label>

          <input
            type="number"
            value={purchase.expenses}
            onChange={(e) =>
              update("expenses", Number(e.target.value))
            }
            className="w-full rounded-lg bg-zinc-800 p-3"
          />

        </div>

      </div>

      <div className="mt-4">

        <label className="mb-2 block text-sm text-zinc-400">
          Observaciones
        </label>

        <textarea
          value={purchase.notes}
          onChange={(e) =>
            update("notes", e.target.value)
          }
          rows={3}
          className="w-full rounded-lg bg-zinc-800 p-3"
        />

      </div>

    </div>
  );
}