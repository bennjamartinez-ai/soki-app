import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

import categoriesData from "../data/categories";

export default function Categories() {
  const [categories, setCategories] = useState(
    categoriesData.map((name, index) => ({
      id: index + 1,
      name,
    }))
  );

  function handleAddCategory() {
    const name = prompt("Nombre de la categoría");

    if (!name) return;

    setCategories((prev) => [
      ...prev,
      {
        id: Date.now(),
        name,
      },
    ]);
  }

  function handleEditCategory(category) {
    const name = prompt(
      "Editar categoría",
      category.name
    );

    if (!name) return;

    setCategories((prev) =>
      prev.map((item) =>
        item.id === category.id
          ? { ...item, name }
          : item
      )
    );
  }

  function handleDeleteCategory(id) {
    if (!window.confirm("¿Eliminar categoría?")) return;

    setCategories((prev) =>
      prev.filter((item) => item.id !== id)
    );
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Categorías
          </h1>

          <p className="mt-1 text-zinc-400">
            Administrá las categorías de tus productos.
          </p>

        </div>

        <button
          onClick={handleAddCategory}
          className="flex items-center gap-2 rounded-xl bg-amber-200 px-5 py-3 font-semibold text-black"
        >
          <Plus size={18} />
          Nueva Categoría
        </button>

      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">

        <table className="w-full">

          <thead className="bg-zinc-800">

            <tr>

              <th className="px-6 py-4 text-left">
                Categoría
              </th>

              <th className="px-6 py-4 text-center">
                Acciones
              </th>

            </tr>

          </thead>

          <tbody>

            {categories.map((category) => (

              <tr
                key={category.id}
                className="border-t border-zinc-800 hover:bg-zinc-800/40"
              >

                <td className="px-6 py-4">
                  {category.name}
                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() =>
                        handleEditCategory(category)
                      }
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteCategory(category.id)
                      }
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

    </div>
  );
}