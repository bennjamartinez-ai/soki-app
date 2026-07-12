import { useInventory } from "../context/InventoryContext";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";
import { toast } from "react-hot-toast";

export default function ProductModal({
  isOpen,
  onClose,
  onSave,
  product,
}) {
  const { categories } = useInventory();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
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
  setCategory(categories[0] || "");
  setCost("");
  setPrice("");
  setStock("");
}
  }, [product, isOpen]);

  if (!isOpen) return null;

  function handleSave() {
  if (!name || !cost || !price || !stock) {
    toast.error("Completá todos los campos.");
    return;
  }

  onSave({
    name,
    category,
    cost: Number(cost),
    price: Number(price),
    stock: Number(stock),
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
    title={product ? "Editar Producto" : "Nuevo Producto"}
    description="Completá la información del producto."
  >
    <div className="space-y-4">

      <Input
  type="text"
  placeholder="Nombre"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full rounded-xl bg-zinc-800/80 p-3 outline-none focus:ring-2 focus:ring-amber-200"
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
        className="w-full rounded-xl bg-zinc-800/80 p-3 outline-none focus:ring-2 focus:ring-amber-200"
      />

      <input
        type="number"
        placeholder="Precio de venta"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full rounded-xl bg-zinc-800/80 p-3 outline-none focus:ring-2 focus:ring-amber-200"
      />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="w-full rounded-xl bg-zinc-800/80 p-3 outline-none focus:ring-2 focus:ring-amber-200"
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
  variant="primary"
  onClick={handleSave}
>
  {product ? "Actualizar" : "Guardar"}
</Button>

    </div>

  </Modal>
);
}