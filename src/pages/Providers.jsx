import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

import { useInventory } from "../context/InventoryContext";
import ProviderModal from "../components/ProviderModal";
import ConfirmModal from "../components/ConfirmModal";
import { toast } from "react-hot-toast";

export default function Providers() {

  const {
    providers,
    setProviders,
  } = useInventory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState(null);
const [providerToDelete, setProviderToDelete] = useState(null);

  function handleNewProvider() {
    setEditingProvider(null);
    setIsModalOpen(true);
  }

  function handleEdit(provider) {
    setEditingProvider(provider);
    setIsModalOpen(true);
  }

 function handleDelete(id) {
  setProviderToDelete(id);
}

function confirmDeleteProvider() {
  setProviders((prev) =>
    prev.filter(
      (provider) => provider.id !== providerToDelete
    )
  );

  toast.success("Proveedor eliminado.");
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

<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-200 px-5 py-3 font-semibold text-black transition hover:bg-amber-300 md:w-auto"        >
          <Plus size={18} />
          Nuevo proveedor
        </button>

      </div>

<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

  <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

    <p className="text-sm text-zinc-400">
      Total proveedores
    </p>

    <h2 className="mt-2 text-3xl font-bold text-amber-200">
      {providers.length}
    </h2>

  </div>

  <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

    <p className="text-sm text-zinc-400">
      Con Instagram
    </p>

    <h2 className="mt-2 text-3xl font-bold text-blue-400">
      {
        providers.filter(
          p => p.instagram?.trim()
        ).length
      }
    </h2>

  </div>

  <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

    <p className="text-sm text-zinc-400">
      Con teléfono
    </p>

    <h2 className="mt-2 text-3xl font-bold text-green-400">
      {
        providers.filter(
          p => p.phone?.trim()
        ).length
      }
    </h2>

  </div>

</div>

<div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900">
<table className="min-w-[900px] w-full">
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
className="rounded-lg p-2 text-blue-400 transition hover:bg-blue-500/10 hover:text-blue-300"                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(provider.id)}
className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10 hover:text-red-300"                    >
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

      <ConfirmModal
  isOpen={providerToDelete !== null}
  onClose={() => setProviderToDelete(null)}
  onConfirm={confirmDeleteProvider}
  title="Eliminar proveedor"
  message="¿Estás seguro de que querés eliminar este proveedor? Esta acción no se puede deshacer."
/>

    </div>
  );
}