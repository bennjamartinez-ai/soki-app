import { useState } from "react";
import { toast } from "react-hot-toast";

import { useProducts } from "../context/ProductsContext";

import PurchaseHeader from "../components/PurchaseHeader";
import AddPurchaseProduct from "../components/AddPurchaseProduct";
import PurchaseList from "../components/PurchaseList";
import PurchaseSummary from "../components/PurchaseSummary";

export default function Purchases() {
  const { products, updateProduct } = useProducts();

  const [purchase, setPurchase] = useState({
    providerId: "",
    shipping: 0,
    expenses: 0,
    notes: "",
    items: [],
  });

  async function handleConfirmPurchase() {
    if (!purchase.providerId) {
      toast.error("Seleccioná un proveedor.");
      return;
    }

    if (purchase.items.length === 0) {
      toast.error("Agregá al menos un producto.");
      return;
    }

    try {
      for (const item of purchase.items) {
        const product = products.find(
          (p) => p.id === item.id
        );

        if (!product) continue;

        await updateProduct(product.id, {
          ...product,
          stock: Number(product.stock) + Number(item.quantity),
          cost: Number(item.cost),
        });
      }

      toast.success("Compra registrada correctamente.");

      setPurchase({
        providerId: "",
        shipping: 0,
        expenses: 0,
        notes: "",
        items: [],
      });

    } catch (error) {
      console.error(error);
      toast.error("No se pudo registrar la compra.");
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">

      <PurchaseHeader
        purchase={purchase}
        setPurchase={setPurchase}
      />

      <AddPurchaseProduct
        purchase={purchase}
        setPurchase={setPurchase}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <PurchaseList
            purchase={purchase}
            setPurchase={setPurchase}
          />
        </div>

        <div>
          <PurchaseSummary
            purchase={purchase}
            onConfirm={handleConfirmPurchase}
          />
        </div>

      </div>

    </div>
  );
}