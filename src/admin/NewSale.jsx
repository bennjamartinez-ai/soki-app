import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { toast } from "react-hot-toast";

import { useProducts } from "../context/ProductsContext";
import { useSales } from "../context/SalesContext";

import ProductCard from "../components/ProductCard";
import CartItem from "../components/CartItem";
import SaleCompletedModal from "../components/SaleCompletedModal";

import generateSalePdf from "../utils/generateSalePdf";

export default function NewSale() {
  const { products, reloadProducts } = useProducts();
  const { addSale } = useSales();

  const [search, setSearch] = useState("");

  const [cart, setCart] = useState([]);

  const [shipping, setShipping] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [completedSale, setCompletedSale] =
    useState(null);

  const [
    isCompletedModalOpen,
    setIsCompletedModalOpen,
  ] = useState(false);

  const filteredProducts = products
    .map((product) => {
      const cartItem = cart.find(
        (item) => item.id === product.id
      );

      return {
        ...product,
        availableStock:
          product.stock -
          (cartItem?.quantity || 0),
      };
    })
    .filter((product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  function handleAddProduct(product) {
    if (product.availableStock <= 0) return;

    setCart((prev) => {
      const exists = prev.find(
        (item) => item.id === product.id
      );

      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  }

  function increaseQuantity(id) {
    const product = products.find(
      (p) => p.id === id
    );

    const cartItem = cart.find(
      (item) => item.id === id
    );

    if (
      !product ||
      cartItem.quantity >= product.stock
    ) {
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  function decreaseQuantity(id) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  }

  function removeProduct(id) {
    setCart((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  }
    const subtotal = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }, [cart]);

  const total = subtotal + shipping - discount;

  async function handleConfirmSale() {
    if (cart.length === 0) {
      toast.error("Agregá al menos un producto.");
      return;
    }

    try {
      const newSale = {
        status: "completed",
        subtotal,
        shipping,
        discount,
        total,
        items: cart,
      };

      const savedSale = await addSale(newSale);

      setCompletedSale({
        ...savedSale,
        items: cart,
      });

      setIsCompletedModalOpen(true);

      setCart([]);
      setShipping(0);
      setDiscount(0);

      await reloadProducts();

      toast.success("Venta registrada correctamente.");
    } catch (error) {
      console.error(error);
      toast.error("Error al registrar la venta.");
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">

      <div className="xl:col-span-7">

        <h1 className="mb-6 text-3xl font-bold">
          Nueva Venta
        </h1>

        <div className="relative mb-6">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar producto..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-11 pr-4 outline-none focus:border-amber-200"
          />

        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={handleAddProduct}
            />
          ))}

        </div>

      </div>

      <div className="xl:col-span-5">

        <div className="sticky top-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <h2 className="mb-6 text-2xl font-bold">
            PRESUPUESTO
          </h2>

          <div className="space-y-3">

            {cart.length === 0 ? (
              <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-zinc-700">
                <p className="text-zinc-500">
                  Todavía no agregaste productos.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={increaseQuantity}
                  onDecrease={decreaseQuantity}
                  onRemove={removeProduct}
                />
              ))
            )}

          </div>

          <div className="mt-6 space-y-4 border-t border-zinc-800 pt-6">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>
                ${subtotal.toLocaleString("es-AR")}
              </span>
            </div>

            <div className="flex items-center justify-between">

              <span>Envío</span>

              <input
                type="number"
                value={shipping}
                onChange={(e) =>
                  setShipping(Number(e.target.value))
                }
                className="w-24 rounded-lg bg-zinc-800 p-2 text-right outline-none"
              />

            </div>

            <div className="flex items-center justify-between">

              <span>Descuento</span>

              <input
                type="number"
                value={discount}
                onChange={(e) =>
                  setDiscount(Number(e.target.value))
                }
                className="w-24 rounded-lg bg-zinc-800 p-2 text-right outline-none"
              />

            </div>

            <div className="border-t border-zinc-800 pt-4">

              <div className="flex items-center justify-between">

                <span className="text-2xl font-bold">
                  Total
                </span>

                <span className="text-3xl font-bold text-amber-200">
                  ${total.toLocaleString("es-AR")}
                </span>

              </div>

            </div>

          </div>

          <button
            onClick={handleConfirmSale}
            className="mt-6 w-full rounded-xl bg-amber-200 py-4 text-lg font-semibold text-black transition hover:bg-amber-300"
          >
            Confirmar Venta
          </button>

        </div>

      </div>

      <SaleCompletedModal
        isOpen={isCompletedModalOpen}
        sale={completedSale}
        onClose={() => {
          setIsCompletedModalOpen(false);
          setCompletedSale(null);
        }}
        onDownload={() =>
          generateSalePdf(completedSale)
        }
      />

    </div>
  );
}