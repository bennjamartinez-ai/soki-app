import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "react-hot-toast";

import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";
import ConfirmModal from "./ConfirmModal";

export default function CategoryModal({
  isOpen,
  onClose,
  categories,
  setCategories,
}) {
  const [newCategory, setNewCategory] = useState("");
const [editingCategory, setEditingCategory] = useState(null);
const [editingValue, setEditingValue] = useState("");
const [categoryToDelete, setCategoryToDelete] = useState(null);
  if (!isOpen) return null;

  function handleAdd() {
  const value = newCategory.trim();

  if (!value) {
    toast.error("Ingresá un nombre.");
    return;
  }

  if (categories.includes(value)) {
    toast.error("La categoría ya existe.");
    return;
  }

  setCategories((prev) => [...prev, value]);

  setNewCategory("");

  toast.success("Categoría agregada.");
}

  function handleDelete(category) {
  setCategoryToDelete(category);
}

function confirmDeleteCategory() {
  setCategories((prev) =>
    prev.filter(
      (item) => item !== categoryToDelete
    )
  );

  toast.success("Categoría eliminada.");

  setCategoryToDelete(null);
}

function confirmDeleteCategory() {
  setCategories((prev) =>
    prev.filter(
      (item) => item !== categoryToDelete
    )
  );

  toast.success("Categoría eliminada.");
}

  function handleEdit(category) {
  setEditingCategory(category);
  setEditingValue(category);
}

function saveEdition() {
  const value = editingValue.trim();

  if (!value) {
    toast.error("Ingresá un nombre.");
    return;
  }

  setCategories((prev) =>
    prev.map((item) =>
      item === editingCategory ? value : item
    )
  );

  toast.success("Categoría actualizada.");

  setEditingCategory(null);
}

  return (
    
<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="Categorías"
  description="Administrá las categorías de Soki."
>
      <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

        <h2 className="mb-6 text-2xl font-bold">
          Categorías
        </h2>

        <div className="mb-6 flex gap-3">

          <input
            value={newCategory}
            onChange={(e) =>
              setNewCategory(e.target.value)
            }
            placeholder="Nueva categoría..."
            className="flex-1 rounded-lg bg-zinc-800 p-3 outline-none"
          />

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 rounded-lg bg-amber-200 px-4 font-semibold text-black"
          >
            <Plus size={18} />
            Agregar
          </button>

        </div>

        <div className="space-y-2">

          {categories.map((category) => (

            <div
              key={category}
              className="flex items-center justify-between rounded-lg bg-zinc-800 px-4 py-3"
            >

              <span>{category}</span>

              <div className="flex gap-3">

                <button
                  onClick={() =>
                    handleEdit(category)
                  }
                  className="text-blue-400"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() =>
                    handleDelete(category)
                  }
                  className="text-red-400"
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </div>

          ))}

        </div>

        <div className="mt-6 flex justify-end">

          <Button
  variant="secondary"
  onClick={onClose}
>
  Cerrar
</Button>

          <ConfirmModal
          isOpen={categoryToDelete !== null}
          onClose={() => setCategoryToDelete(null)}
          onConfirm={confirmDeleteCategory}
          title="Eliminar categoría"
          message="¿Estás seguro de que querés eliminar esta categoría?"
          />

        </div>

      </div>
{editingCategory && (
  <Modal
    isOpen={true}
    onClose={() => setEditingCategory(null)}
    title="Editar categoría"
    description="Modificá el nombre."
  >
    <Input
      value={editingValue}
      onChange={(e) =>
        setEditingValue(e.target.value)
      }
    />

    <div className="mt-6 flex justify-end gap-3">
      <Button
        variant="secondary"
        onClick={() =>
          setEditingCategory(null)
        }
      >
        Cancelar
      </Button>

      <Button onClick={saveEdition}>
        Guardar
      </Button>
    </div>
  </Modal>
)}

{editingCategory && (
  <Modal
    isOpen={true}
    onClose={() => setEditingCategory(null)}
    title="Editar categoría"
    description="Modificá el nombre."
  >
    <Input
      value={editingValue}
      onChange={(e) =>
        setEditingValue(e.target.value)
      }
    />

    <div className="mt-6 flex justify-end gap-3">
      <Button
        variant="secondary"
        onClick={() =>
          setEditingCategory(null)
        }
      >
        Cancelar
      </Button>

      <Button onClick={saveEdition}>
        Guardar
      </Button>
    </div>
  </Modal>
)}

<ConfirmModal
  isOpen={categoryToDelete !== null}
  onClose={() =>
    setCategoryToDelete(null)
  }
  onConfirm={confirmDeleteCategory}
  title="Eliminar categoría"
  message="¿Seguro que querés eliminar esta categoría?"
/>
    </Modal>
  );
}