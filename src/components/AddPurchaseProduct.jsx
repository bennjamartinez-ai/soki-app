import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { useProducts } from "../context/ProductsContext";
import ProductModal from "./ProductModal";

export default function AddPurchaseProduct({
  purchase,
  setPurchase,
}) {
const {
  products,
  createProduct,
} = useProducts();
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cost, setCost] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleSelect(product) {
    setSelectedProduct(product);
    setSearch(product.name);
    setCost(product.cost || 0);
  }

  async function handleCreateProduct(product) {
  try {
    await createProduct(product);

    const newProduct = {
      ...product,
    };

    setPurchase((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          ...newProduct,
          quantity: 1,
          cost: newProduct.cost,
        },
      ],
    }));

    setIsModalOpen(false);
  } catch (error) {
    console.error(error);
  }
}

  function handleAddProduct() {

  if (!selectedProduct) return;

  setPurchase((prev) => {

    const existing = prev.items.find(
      (item) => item.id === selectedProduct.id
    );

    if (existing) {

      return {

        ...prev,

        items: prev.items.map((item) =>

          item.id === selectedProduct.id

            ? {

                ...item,

                quantity: item.quantity + quantity,

                cost,

              }

            : item

        ),

      };

    }

    return {

      ...prev,

      items: [

        ...prev.items,

        {

          id: selectedProduct.id,

          name: selectedProduct.name,

          category: selectedProduct.category,

          quantity,

          cost,

        },

      ],

    };

  });

  setSearch("");

  setSelectedProduct(null);

  setQuantity(1);

  setCost(0);

}
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-5 text-2xl font-bold">
        Agregar producto
      </h2>

      <div className="relative">

        <Search
          size={18}
          className="absolute left-3 top-3.5 text-zinc-400"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar producto..."
          className="w-full rounded-lg bg-zinc-800 py-3 pl-10 pr-3 outline-none"
        />

      </div>

      {search !== "" && !selectedProduct && (

        <div className="mt-3 rounded-xl bg-zinc-800">

          {filteredProducts.length > 0 ? (

            filteredProducts.map((product) => (

              <button
                key={product.id}
                onClick={() => handleSelect(product)}
                className="flex w-full justify-between px-4 py-3 hover:bg-zinc-700"
              >

                <span>{product.name}</span>

                <span className="text-zinc-400">
                  {product.category}
                </span>

              </button>

            ))

          ) : (

            <div className="p-4">

              <p className="text-zinc-400">
                Producto no encontrado
              </p>

              <button
              onClick={() => setIsModalOpen(true)}
                className="mt-3 flex items-center gap-2 rounded-lg bg-amber-200 px-4 py-2 font-semibold text-black hover:bg-amber-300"
              >
                <Plus size={18} />
                Crear producto nuevo
              </button>

            </div>

          )}

        </div>

      )}

      {selectedProduct && (

        <div className="mt-5 grid grid-cols-2 gap-4">

          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) =>
              setQuantity(Number(e.target.value))
            }
            className="rounded-lg bg-zinc-800 p-3"
            placeholder="Cantidad"
          />

          <input
            type="number"
            value={cost}
            onChange={(e) =>
              setCost(Number(e.target.value))
            }
            className="rounded-lg bg-zinc-800 p-3"
            placeholder="Costo"
          />

          <button
            onClick={handleAddProduct}
            className="col-span-2 rounded-xl bg-green-500 py-3 font-semibold hover:bg-green-600"
          >
            Agregar al pedido
          </button>

        </div>

      )}
      <ProductModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSave={handleCreateProduct}
    />

    </div>
  );
}