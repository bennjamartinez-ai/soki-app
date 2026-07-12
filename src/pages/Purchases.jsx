import { useState } from "react";
import { useInventory } from "../context/InventoryContext";
import PurchaseHeader from "../components/PurchaseHeader";
import AddPurchaseProduct from "../components/AddPurchaseProduct";
import PurchaseList from "../components/PurchaseList";
import PurchaseSummary from "../components/PurchaseSummary";
import { toast } from "react-hot-toast";

export default function Purchases() {

  const [purchase, setPurchase] = useState({
    providerId: "",
    shipping: 0,
    expenses: 0,
    notes: "",
    items: [],
  });
const {
  products,
  setProducts,
  purchases,
  setPurchases,
} = useInventory();

function handleConfirmPurchase() {

  if (!purchase.providerId) {
    toast.error("Seleccioná un proveedor.");
    return;
  }

  if (purchase.items.length === 0) {
   toast.error("Agregá al menos un producto.");
    return;
  }

  // Actualizar stock y costo
  setProducts((prev) =>
    prev.map((product) => {

      const purchased = purchase.items.find(
        (item) => item.id === product.id
      );

      if (!purchased) return product;

      return {
        ...product,
        stock: product.stock + purchased.quantity,
        cost: purchased.cost,
      };

    })
  );

  // Guardar compra
  setPurchases((prev) => [

    ...prev,

    {
      id: Date.now(),
      createdAt: Date.now(),
      providerId: purchase.providerId,
      shipping: purchase.shipping,
      expenses: purchase.expenses,
      notes: purchase.notes,
      items: purchase.items,
    },

  ]);

toast.success("Compra registrada correctamente.");

  setPurchase({
    providerId: "",
    shipping: 0,
    expenses: 0,
    notes: "",
    items: [],
  });

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