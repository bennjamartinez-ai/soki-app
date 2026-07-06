import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

import { useInventory } from "../context/InventoryContext";
import ProviderModal from "../components/ProviderModal";

export default function Providers() {

  const {
    providers,
    setProviders,
  } = useInventory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState(null);

  function handleNewProvider() {
    setEditingProvider(null);
    setIsModalOpen(true);
  }

  function handleEdit(provider) {
    setEditingProvider(provider);
    setIsModalOpen(true);
  }

  function handleDelete(id) {

    if (!confirm("¿Eliminar proveedor?")) return;

    setProviders((prev) =>
      prev.filter((provider) => provider.id !== id)
    );

  }

  function handleSave(providerData) {

    if (editingProvider) {

      setProviders((prev) =>
        prev.map((provider) =>
          provider.id === editingProvider.id
            ? {
                ...provider,
                ...providerData,
              }
            : provider
        )
      );

    } else {

      setProviders((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...providerData,
        },
      ]);

    }

    setIsModalOpen(false);
    setEditingProvider(null);

  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Proveedores
          </h1>

          <p className="mt-1 text-zinc-400">
            Administrá los proveedores.
          </p>

        </div>

        <button
          onClick={handleNewProvider}
          className="flex items-center gap-2 rounded-xl bg-amber-200 px-5 py-3 font-semibold text-black hover:bg-amber-300"
        >
          <Plus size={18} />
          Nuevo proveedor
        </button>

      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">

        <table className="w-full">

          <thead className="bg-zinc-800">

            <tr>

              <th className="px-6 py-4 text-left">
                Nombre
              </th>

              <th className="px-6 py-4 text-left">
                Teléfono
              </th>

              <th className="px-6 py-4 text-left">
                Instagram
              </th>

              <th className="px-6 py-4 text-left">
                Observaciones
              </th>

              <th className="px-6 py-4 text-center">
                Acciones
              </th>

            </tr>

          </thead>

          <tbody>

            {providers.map((provider) => (

              <tr
                key={provider.id}
                className="border-t border-zinc-800 hover:bg-zinc-800/40"
              >

                <td className="px-6 py-4">
                  {provider.name}
                </td>

                <td className="px-6 py-4">
                  {provider.phone}
                </td>

                <td className="px-6 py-4">
                  {provider.instagram}
                </td>

                <td className="px-6 py-4">
                  {provider.notes}
                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() => handleEdit(provider)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(provider.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <ProviderModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProvider(null);
        }}
        onSave={handleSave}
        provider={editingProvider}
      />

    </div>
  );
}