import { useEffect, useState } from "react";

export default function ProviderModal({
  isOpen,
  onClose,
  onSave,
  provider,
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (provider) {
      setName(provider.name);
      setPhone(provider.phone);
      setInstagram(provider.instagram);
      setNotes(provider.notes);
    } else {
      setName("");
      setPhone("");
      setInstagram("");
      setNotes("");
    }
  }, [provider, isOpen]);

  if (!isOpen) return null;

  function handleSave() {
    if (!name.trim()) {
      alert("Ingresá un nombre.");
      return;
    }

    onSave({
      name,
      phone,
      instagram,
      notes,
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

        <h2 className="mb-6 text-2xl font-bold">
          {provider ? "Editar proveedor" : "Nuevo proveedor"}
        </h2>

        <div className="space-y-4">

          <input
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 p-3 outline-none"
          />

          <input
            placeholder="Teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 p-3 outline-none"
          />

          <input
            placeholder="Instagram"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 p-3 outline-none"
          />

          <textarea
            placeholder="Observaciones"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full rounded-lg bg-zinc-800 p-3 outline-none resize-none"
          />

        </div>

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg bg-zinc-700 px-4 py-2"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            className="rounded-lg bg-amber-200 px-4 py-2 font-semibold text-black"
          >
            {provider ? "Actualizar" : "Guardar"}
          </button>

        </div>

      </div>

    </div>
  );
}