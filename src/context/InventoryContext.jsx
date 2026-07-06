import purchasesData from "../data/purchases";
import { createContext, useContext, useEffect, useState } from "react";
import productsData from "../data/products";
import categoriesData from "../data/categories";
import providersData from "../data/providers";

const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const [products, setProducts] = useState(() => {
  const saved = localStorage.getItem("products");
  return saved ? JSON.parse(saved) : productsData;
});

const [categories, setCategories] = useState(() => {
  const saved = localStorage.getItem("categories");
  return saved ? JSON.parse(saved) : categoriesData;
});

const [sales, setSales] = useState(() => {
  const saved = localStorage.getItem("sales");
  return saved ? JSON.parse(saved) : [];
});
const [purchases, setPurchases] = useState(() => {
  const saved = localStorage.getItem("purchases");
  return saved ? JSON.parse(saved) : purchasesData;
});
const [providers, setProviders] = useState(() => {
  const saved = localStorage.getItem("providers");
  return saved ? JSON.parse(saved) : providersData;
});
useEffect(() => {
  localStorage.setItem(
    "products",
    JSON.stringify(products)
  );
}, [products]);
useEffect(() => {
  localStorage.setItem(
    "providers",
    JSON.stringify(providers)
  );
}, [providers]);

useEffect(() => {
  localStorage.setItem(
    "categories",
    JSON.stringify(categories)
  );
}, [categories]);

useEffect(() => {
  localStorage.setItem(
    "sales",
    JSON.stringify(sales)
  );
}, [sales]);
useEffect(() => {
  localStorage.setItem(
    "purchases",
    JSON.stringify(purchases)
  );
}, [purchases]);

  return (
    <InventoryContext.Provider
      value={{
  products,
  setProducts,

  categories,
  setCategories,

  sales,
  setSales,

  purchases,
  setPurchases,

  providers,
  setProviders,
}}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  return useContext(InventoryContext);
}