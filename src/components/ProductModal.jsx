import { useEffect, useState } from "react";
import categories from "../data/categories";

export default function ProductModal({
  isOpen,
  onClose,
  onSave,
  product,
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setCost(product.cost || "");
      setPrice(product.price);
      setStock(product.stock);
    } else {
      setName("");
      setCategory(categories[0]);
      setCost("");
      setPrice("");
      setStock("");
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  function handleSave() {
    if (!name || !cost || !price || !stock) {
      alert("Completá todos los campos.");
      return;
    }

    onSave({
      name,
      category,
      cost: Number(cost),
      price: Number(price),
      stock: Number(stock),
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

        <h2 className="mb-6 text-2xl font-bold">
          {product ? "Editar Producto" : "Nuevo Producto"}
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 p-3 outline-none focus:ring-2 focus:ring-amber-200"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 p-3 outline-none focus:ring-2 focus:ring-amber-200"
          >
            {categories.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Costo"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 p-3 outline-none focus:ring-2 focus:ring-amber-200"
          />

          <input
            type="number"
            placeholder="Precio de venta"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 p-3 outline-none focus:ring-2 focus:ring-amber-200"
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 p-3 outline-none focus:ring-2 focus:ring-amber-200"
          />

        </div>

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg bg-zinc-700 px-4 py-2 hover:bg-zinc-600"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            className="rounded-lg bg-amber-200 px-4 py-2 font-semibold text-black hover:bg-amber-300"
          >
            {product ? "Actualizar" : "Guardar"}
          </button>

        </div>

      </div>

    </div>
  );
}