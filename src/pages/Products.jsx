import { useState } from "react";
import { useInventory } from "../context/InventoryContext";
import { Plus, Search } from "lucide-react";

import ProductModal from "../components/ProductModal";
import ProductTable from "../components/ProductTable";
import CategoryModal from "../components/CategoryModal";
import StatCard from "../components/StatCard";

export default function Products() {

  const {
    products,
    setProducts,
    categories,
    setCategories,
  } = useInventory();

  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  function handleAddProduct(newProduct) {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingProduct.id
            ? { ...editingProduct, ...newProduct }
            : product
        )
      );

      setEditingProduct(null);
    } else {
      setProducts((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...newProduct,
        },
      ]);
    }

    setIsModalOpen(false);
  }

  function handleDeleteProduct(id) {
    if (!window.confirm("¿Eliminar este producto?")) return;

    setProducts((prev) =>
      prev.filter((product) => product.id !== id)
    );
  }

  function handleEditProduct(product) {
    setEditingProduct(product);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setEditingProduct(null);
    setIsModalOpen(false);
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalProducts = products.length;

  const lowStock = products.filter(
    (product) => product.stock <= 5
  ).length;

  const inventoryValue = products.reduce(
    (total, product) => total + product.price * product.stock,
    0
  );

  return (
    <div className="space-y-8">

<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>

          <h1 className="text-3xl font-bold">
            Productos
          </h1>

          <p className="mt-1 text-zinc-400">
            Gestioná el inventario de Soki.
          </p>

        </div>

        <button
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-200 px-5 py-3 font-semibold text-black transition hover:bg-amber-300 md:w-auto"        >
          <Plus size={18} />
          Nuevo Producto
        </button>

      </div>

<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard title="Productos" value={totalProducts} />

        <StatCard
          title="Stock Bajo"
          value={lowStock}
          color="text-red-400"
        />

        <StatCard
          title="Valor del Inventario"
          value={`$${inventoryValue.toLocaleString()}`}
          color="text-green-400"
        />

      </div>

<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
<div className="relative w-full md:max-w-md md:flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
          />

          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-11 pr-4 outline-none focus:border-amber-200"
          />

        </div>

        <button
          onClick={() => setIsCategoryModalOpen(true)}
className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-800 px-5 py-3 font-semibold text-white transition hover:bg-amber-200 hover:text-black md:w-auto"        >
          📂 Categorías
        </button>

      </div>

      <ProductTable
        products={filteredProducts}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleAddProduct}
        product={editingProduct}
      />

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        categories={categories}
        setCategories={setCategories}
      />

    </div>
  );
}