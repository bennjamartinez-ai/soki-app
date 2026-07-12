import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";

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
      setName(provider.name || "");
      setPhone(provider.phone || "");
      setInstagram(provider.instagram || "");
      setNotes(provider.notes || "");
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
      toast.error("Ingresá un nombre.");
      return;
    }

    onSave({
      name,
      phone,
      instagram,
      notes,
    });

    toast.success(
      provider
        ? "Proveedor actualizado."
        : "Proveedor creado."
    );

    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        provider
          ? "Editar proveedor"
          : "Nuevo proveedor"
      }
      description="Completá la información del proveedor."
    >
      <div className="space-y-4">

        <Input
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          placeholder="Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Input
          placeholder="Instagram"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />

        <textarea
          placeholder="Observaciones"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="w-full rounded-xl bg-zinc-800/80 p-3 outline-none resize-none focus:ring-2 focus:ring-amber-200"
        />

      </div>

      <div className="mt-6 flex justify-end gap-3">

        <Button
          variant="secondary"
          onClick={onClose}
        >
          Cancelar
        </Button>

        <Button
          onClick={handleSave}
        >
          {provider ? "Actualizar" : "Guardar"}
        </Button>

      </div>
    </Modal>
  );
}