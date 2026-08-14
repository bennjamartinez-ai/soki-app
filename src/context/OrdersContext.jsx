import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getOrders,
  createOrder,
  updateOrder,
} from "../services/orders";

const OrdersContext = createContext();

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadOrders() {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function addOrder(order) {
    const newOrder = await createOrder(order);

    setOrders((current) => [
      newOrder,
      ...current,
    ]);

    return newOrder;
  }

  async function editOrder(id, order) {
    const updated = await updateOrder(id, order);

    setOrders((current) =>
      current.map((item) =>
        item.id === id ? updated : item
      )
    );

    return updated;
  }

  return (
    <OrdersContext.Provider
      value={{
        orders,
        loading,
        loadOrders,
        addOrder,
        editOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);

  if (!context) {
    throw new Error(
      "useOrders debe utilizarse dentro de OrdersProvider"
    );
  }

  return context;
}