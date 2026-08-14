import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import { useCategories } from "../context/CategoriesContext";

import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";

export default function ProductModal({
  isOpen,
  onClose,
  onSave,
  product,
}) {
  const { categories } = useCategories();

  const activeCategories = useMemo(
    () =>
      [...categories]
        .filter((category) => category.is_active)
        .sort(
          (a, b) =>
            a.display_order - b.display_order
        ),
    [categories]
  );

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [featured, setFeatured] =
    useState(false);

  const [featuredOrder, setFeaturedOrder] =
    useState("");

  useEffect(() => {
    if (!isOpen) return;

    if (product) {
      setName(product.name || "");
      setCategoryId(
        product.category_id || ""
      );
      setDescription(
        product.description || ""
      );
      setImage(product.image || "");
      setCost(product.cost || "");
      setPrice(product.price || "");
      setStock(product.stock ?? "");

      setFeatured(
        product.featured ?? false
      );

      setFeaturedOrder(
        product.featured_order ?? ""
      );
    } else {
      setName("");
      setCategoryId(
        activeCategories[0]?.id || ""
      );
      setDescription("");
      setImage("");
      setCost("");
      setPrice("");
      setStock("");
      setFeatured(false);
      setFeaturedOrder("");
    }
  }, [
    product,
    isOpen,
    categories,
  ]);

  function handleSave() {
    if (
      !name ||
      !categoryId ||
      !cost ||
      !price ||
      stock === ""
    ) {
      toast.error(
        "Completá todos los campos."
      );
      return;
    }

    const selectedCategory =
      categories.find(
        (category) =>
          category.id === categoryId
      );

    onSave({
      name,
      category_id: categoryId,

      // Temporal
      category:
        selectedCategory?.name || "",

      description,
      image,

      cost: Number(cost),
      price: Number(price),
      stock: Number(stock),

      featured,

      featured_order:
        featured &&
        featuredOrder !== ""
          ? Number(featuredOrder)
          : null,
    });

    toast.success(
      product
        ? "Producto actualizado."
        : "Producto creado."
    );

    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        product
          ? "Editar Producto"
          : "Nuevo Producto"
      }
      description="Completá la información del producto."
    >
      <div className="space-y-4">

        <Input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <select
          value={categoryId}
          onChange={(e) =>
            setCategoryId(
              e.target.value
            )
          }
          className="w-full rounded-xl bg-zinc-800/80 p-3 outline-none focus:ring-2 focus:ring-amber-200"
        >
          {activeCategories.map(
            (category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            )
          )}
        </select>

        <div className="grid grid-cols-2 gap-4">

          <label className="flex items-center gap-3 rounded-xl border border-zinc-700 p-3">

            <input
              type="checkbox"
              checked={featured}
              onChange={(e) =>
                setFeatured(
                  e.target.checked
                )
              }
            />

            <span className="font-medium">
              Producto destacado
            </span>

          </label>

          <Input
            type="number"
            placeholder="Orden destacado"
            value={featuredOrder}
            onChange={(e) =>
              setFeaturedOrder(
                e.target.value
              )
            }
            disabled={!featured}
          />

        </div>

        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          rows={4}
          className="w-full resize-none rounded-xl bg-zinc-800/80 p-3 outline-none focus:ring-2 focus:ring-amber-200"
        />

        <Input
          type="text"
          placeholder="URL imagen"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
        />

        <Input
          type="number"
          placeholder="Costo"
          value={cost}
          onChange={(e) =>
            setCost(e.target.value)
          }
        />

        <Input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <Input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
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
          {product
            ? "Actualizar"
            : "Guardar"}
        </Button>

      </div>
    </Modal>
  );
}