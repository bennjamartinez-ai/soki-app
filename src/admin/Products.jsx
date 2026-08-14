import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { toast } from "react-hot-toast";

import { useProducts } from "../context/ProductsContext";

import ProductModal from "../components/ProductModal";
import ProductTable from "../components/ProductTable";
import CategoryModal from "../components/CategoryModal";
import StatCard from "../components/StatCard";
import ConfirmModal from "../components/ConfirmModal";

export default function Products() {
  const {
    products,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

async function handleAddProduct(newProduct) {

  const duplicatedFeaturedOrder =
    newProduct.featured &&
    products.some(
      (product) =>
        product.id !== editingProduct?.id &&
        product.featured &&
        product.featured_order ===
          newProduct.featured_order
    );

  if (duplicatedFeaturedOrder) {

    toast.error(
      `Ya existe un producto con el orden #${newProduct.featured_order}.`
    );

    return;

  }

  try {

    if (editingProduct) {

      await updateProduct(
        editingProduct.id,
        newProduct
      );

    } else {

      await createProduct(
        newProduct
      );

    }

    setEditingProduct(null);

    setIsModalOpen(false);

  } catch (error) {

    console.error(error);

    toast.error(
      "No se pudo guardar el producto."
    );

  }

}

  function handleDeleteProduct(id) {
    setProductToDelete(id);
  }

  async function confirmDeleteProduct() {
    try {
      await deleteProduct(productToDelete);

      toast.success("Producto eliminado.");
      setProductToDelete(null);
    } catch (error) {
      console.error(error);
      toast.error("No se pudo eliminar el producto.");
    }
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
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-200 px-5 py-3 font-semibold text-black transition hover:bg-amber-300 md:w-auto"
        >
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
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-800 px-5 py-3 font-semibold text-white transition hover:bg-amber-200 hover:text-black md:w-auto"
        >
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
      />

      <ConfirmModal
        isOpen={productToDelete !== null}
        onClose={() => setProductToDelete(null)}
        onConfirm={confirmDeleteProduct}
        title="Eliminar producto"
        message="¿Estás seguro de que querés eliminar este producto? Esta acción no se puede deshacer."
      />
    </div>
  );
}