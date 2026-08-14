import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { toast } from "react-hot-toast";

import { useCategories } from "../context/CategoriesContext";

import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";
import ConfirmModal from "./ConfirmModal";

export default function CategoryModal({
  isOpen,
  onClose,
}) {
const {
  categories,
  addCategory,
  editCategory,
  removeCategory,
  moveCategory,
} = useCategories();

const [newCategory, setNewCategory] = useState({
  name: "",
  slug: "",
  is_active: true,
  is_featured: false,
  display_order: categories.length + 1,
});

  const [editingCategory, setEditingCategory] = useState(null);

const [editingValue, setEditingValue] = useState({
  name: "",
  slug: "",
  is_active: true,
  is_featured: false,
  display_order: 0,
});

  const [categoryToDelete, setCategoryToDelete] = useState(null);

  if (!isOpen) return null;

 async function handleAdd() {

  if (!newCategory.name.trim()) {

    toast.error("Ingresá un nombre.");

    return;

  }

  if (

    categories.some(

      (c) =>

        c.name.toLowerCase() ===

        newCategory.name.toLowerCase()

    )

  ) {

    toast.error("La categoría ya existe.");

    return;

  }

  try {

    await addCategory(newCategory);

    toast.success("Categoría agregada.");

    setNewCategory({

      name: "",

      slug: "",

      is_active: true,

      is_featured: false,

      display_order: categories.length + 2,

    });

  } catch (error) {

    console.error(error);

    toast.error("No se pudo agregar.");

  }

}

  function handleEdit(category) {

  setEditingCategory(category);

  setEditingValue({

    name: category.name,

    slug: category.slug,

    is_active: category.is_active,

    is_featured: category.is_featured,

    display_order: category.display_order,

  });

}

 async function saveEdition() {

  if (!editingValue.name.trim()) {

    toast.error("Ingresá un nombre.");

    return;

  }

  try {

    await editCategory(

      editingCategory.id,

      editingValue

    );

    toast.success("Categoría actualizada.");

    setEditingCategory(null);

    setEditingValue({

      name: "",

      slug: "",

      is_active: true,

      is_featured: false,

      display_order: 0,

    });

  } catch (error) {

    console.error(error);

    toast.error("No se pudo actualizar.");

  }

}

  function handleDelete(category) {
    setCategoryToDelete(category);
  }

  async function confirmDeleteCategory() {
    try {
      await removeCategory(categoryToDelete.id);

      toast.success("Categoría eliminada.");

      setCategoryToDelete(null);
    } catch (error) {
      console.error(error);
      toast.error("No se pudo eliminar.");
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Categorías"
        description="Administrá las categorías."
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">

  <Input
    label="Nombre"
    value={newCategory.name}
    onChange={(e) =>
      setNewCategory({
        ...newCategory,
        name: e.target.value,
        slug: e.target.value
          .toLowerCase()
          .replace(/\s+/g, "-"),
      })
    }
  />

  <Input
    label="Slug"
    value={newCategory.slug}
    onChange={(e) =>
      setNewCategory({
        ...newCategory,
        slug: e.target.value,
      })
    }
  />

  <Input
    label="Orden"
    type="number"
    value={newCategory.display_order}
    onChange={(e) =>
      setNewCategory({
        ...newCategory,
        display_order: Number(e.target.value),
      })
    }
  />

  <div className="flex items-end">

    <button
      onClick={handleAdd}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-200 py-3 font-semibold text-black transition hover:bg-amber-300"
    >

      <Plus size={18} />

      Agregar

    </button>

  </div>

</div>

<div className="mt-4 flex gap-8">

  <label className="flex items-center gap-2">

    <input
      type="checkbox"
      checked={newCategory.is_active}
      onChange={(e) =>
        setNewCategory({
          ...newCategory,
          is_active: e.target.checked,
        })
      }
    />

    Activa

  </label>

  <label className="flex items-center gap-2">

    <input
      type="checkbox"
      checked={newCategory.is_featured}
      onChange={(e) =>
        setNewCategory({
          ...newCategory,
          is_featured: e.target.checked,
        })
      }
    />

    Destacada

  </label>

</div>
          <div className="space-y-4">

  {[...categories]
    .sort(
      (a, b) =>
        a.display_order - b.display_order
    )
    .map((category) => (

      <div
        key={category.id}
        className="rounded-2xl bg-zinc-800 p-5"
      >

        <div className="flex items-start justify-between">

          <div>

            <div className="flex items-center gap-3">

              <span className="text-lg font-semibold">

                {category.name}

              </span>

              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                  category.is_active
                    ? "bg-green-500/20 text-green-400"
                    : "bg-zinc-700 text-zinc-400"
                }`}
              >

                {category.is_active
                  ? "Activa"
                  : "Oculta"}

              </span>

              {category.is_featured && (

                <span className="rounded-full bg-amber-500/20 px-2 py-1 text-xs font-semibold text-amber-300">

                  Destacada

                </span>

              )}

            </div>

            <p className="mt-2 text-sm text-zinc-400">

              Slug: {category.slug}

            </p>

            <p className="mt-1 text-sm text-zinc-500">

              Orden: {category.display_order}

            </p>

          </div>

          <div className="flex items-center gap-2">

          <button
  onClick={() =>
    moveCategory(category.id, "up")
  }
  className="rounded-lg p-2 transition hover:bg-zinc-700"
  title="Subir"
>
  <ChevronUp size={18} />
</button>

           <button
  onClick={() =>
    moveCategory(category.id, "down")
  }
  className="rounded-lg p-2 transition hover:bg-zinc-700"
  title="Bajar"
>
  <ChevronDown size={18} />
</button>
            <button
              onClick={() =>
                handleEdit(category)
              }
              className="rounded-lg p-2 text-blue-400 transition hover:bg-zinc-700"
            >

              <Pencil size={18} />

            </button>

            <button
              onClick={() =>
                handleDelete(category)
              }
              className="rounded-lg p-2 text-red-400 transition hover:bg-zinc-700"
            >

              <Trash2 size={18} />

            </button>

          </div>

        </div>

      </div>

    ))}

</div>

          <div className="flex justify-end">
            <Button
              variant="secondary"
              onClick={onClose}
            >
              Cerrar
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={editingCategory !== null}
        onClose={() => setEditingCategory(null)}
        title="Editar categoría"
        description="Modificá el nombre."
      >
        <div className="space-y-5">

  <Input
    label="Nombre"
    value={editingValue.name}
    onChange={(e) =>
      setEditingValue({
        ...editingValue,
        name: e.target.value,
        slug: e.target.value
          .toLowerCase()
          .replace(/\s+/g, "-"),
      })
    }
  />

  <Input
    label="Slug"
    value={editingValue.slug}
    onChange={(e) =>
      setEditingValue({
        ...editingValue,
        slug: e.target.value,
      })
    }
  />

  <Input
    label="Orden"
    type="number"
    value={editingValue.display_order}
    onChange={(e) =>
      setEditingValue({
        ...editingValue,
        display_order: Number(e.target.value),
      })
    }
  />

  <div className="flex gap-8">

    <label className="flex items-center gap-2">

      <input
        type="checkbox"
        checked={editingValue.is_active}
        onChange={(e) =>
          setEditingValue({
            ...editingValue,
            is_active: e.target.checked,
          })
        }
      />

      Activa

    </label>

    <label className="flex items-center gap-2">

      <input
        type="checkbox"
        checked={editingValue.is_featured}
        onChange={(e) =>
          setEditingValue({
            ...editingValue,
            is_featured: e.target.checked,
          })
        }
      />

      Destacada

    </label>

  </div>

</div>

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

      <ConfirmModal
        isOpen={categoryToDelete !== null}
        onClose={() =>
          setCategoryToDelete(null)
        }
        onConfirm={confirmDeleteCategory}
        title="Eliminar categoría"
        message="¿Seguro que querés eliminar esta categoría?"
      />
    </>
  );
}