import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function CategoryModal({
  isOpen,
  onClose,
  categories,
  setCategories,
}) {
  const [newCategory, setNewCategory] = useState("");

  if (!isOpen) return null;

  function handleAdd() {
    if (!newCategory.trim()) return;

    setCategories((prev) => [
      ...prev,
      newCategory,
    ]);

    setNewCategory("");
  }

  function handleDelete(category) {
    if (!window.confirm("¿Eliminar categoría?")) return;

    setCategories((prev) =>
      prev.filter((item) => item !== category)
    );
  }

  function handleEdit(category) {
    const value = prompt(
      "Editar categoría",
      category
    );

    if (!value) return;

    setCategories((prev) =>
      prev.map((item) =>
        item === category ? value : item
      )
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

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

          <button
            onClick={onClose}
            className="rounded-lg bg-zinc-700 px-4 py-2"
          >
            Cerrar
          </button>

        </div>

      </div>

    </div>
  );
}