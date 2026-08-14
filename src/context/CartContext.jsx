import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { toast } from "react-hot-toast";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

function addToCart(product, quantity = 1) {
  let message = "";
  let isError = false;

  setCart((current) => {
    const existing = current.find(
      (item) => item.id === product.id
    );

    const currentQuantity = existing?.quantity ?? 0;

    if (currentQuantity + quantity > product.stock) {
      isError = true;
      message = "No hay suficiente stock disponible.";
      return current;
    }

    message =
      quantity === 1
        ? "Producto agregado al carrito."
        : `${quantity} productos agregados al carrito.`;

    if (existing) {
      return current.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item
      );
    }

    return [
      ...current,
      {
        ...product,
        quantity,
      },
    ];
  });

  setTimeout(() => {
    if (!message) return;

    if (isError) {
      toast.error(message);
    } else {
      toast.success(message);
    }
  }, 0);
}

  function removeFromCart(id) {
    setCart((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  function updateQuantity(id, quantity) {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}