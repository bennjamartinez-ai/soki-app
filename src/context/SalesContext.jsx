import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getSales,
  createSale,
  updateSale,
  deleteSale,
} from "../services/sales";

const SalesContext = createContext();

export function SalesProvider({ children }) {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadSales() {
    try {
      const data = await getSales();
      setSales(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSales();
  }, []);

  async function addSale(sale) {
    const newSale = await createSale(sale);

    setSales((current) => [
      newSale,
      ...current,
    ]);

    return newSale;
  }

  async function editSale(id, sale) {
    const updated = await updateSale(id, sale);

    setSales((current) =>
      current.map((item) =>
        item.id === id ? updated : item
      )
    );

    return updated;
  }

  async function removeSale(id) {
    await deleteSale(id);

    setSales((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  return (
    <SalesContext.Provider
      value={{
        sales,
        loading,
        loadSales,
        addSale,
        editSale,
        removeSale,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
}

export function useSales() {
  const context = useContext(SalesContext);

  if (!context) {
    throw new Error(
      "useSales debe utilizarse dentro de SalesProvider"
    );
  }

  return context;
}