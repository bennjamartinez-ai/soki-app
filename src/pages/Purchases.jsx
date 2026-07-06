import { useState } from "react";
import { useInventory } from "../context/InventoryContext";
import PurchaseHeader from "../components/PurchaseHeader";
import AddPurchaseProduct from "../components/AddPurchaseProduct";
import PurchaseList from "../components/PurchaseList";
import PurchaseSummary from "../components/PurchaseSummary";

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
    alert("Seleccioná un proveedor.");
    return;
  }

  if (purchase.items.length === 0) {
    alert("Agregá al menos un producto.");
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

  alert("Compra registrada correctamente.");

  setPurchase({
    providerId: "",
    shipping: 0,
    expenses: 0,
    notes: "",
    items: [],
  });

}

function handleConfirmPurchase() {

  if (!purchase.providerId) {
    alert("Seleccioná un proveedor.");
    return;
  }

  if (purchase.items.length === 0) {
    alert("Agregá al menos un producto.");
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

  alert("Compra registrada correctamente.");

  setPurchase({
    providerId: "",
    shipping: 0,
    expenses: 0,
    notes: "",
    items: [],
  });

}

  return (

    <div className="space-y-6">

      <PurchaseHeader
        purchase={purchase}
        setPurchase={setPurchase}
      />

      <AddPurchaseProduct
        purchase={purchase}
        setPurchase={setPurchase}
      />

      <PurchaseList
        purchase={purchase}
        setPurchase={setPurchase}
      />

      <PurchaseSummary
      purchase={purchase}
      onConfirm={handleConfirmPurchase}
    />

    </div>

  );

}