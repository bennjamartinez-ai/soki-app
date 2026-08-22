import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { toast } from "react-hot-toast";

import { useProducts } from "./ProductsContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { products, loading: productsLoading } =
    useProducts();

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");

      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error(
        "Error cargando carrito:",
        error
      );

      return [];
    }
  });

  /*
  ==========================================
  PERSISTIR CARRITO
  ==========================================
  */

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  /*
  ==========================================
  SINCRONIZAR CON PRODUCTOS ACTUALES
  ==========================================
  */

  useEffect(() => {
    if (productsLoading) return;

    setCart((currentCart) => {
      let changed = false;

      const updatedCart = currentCart
        .map((cartItem) => {
          const currentProduct =
            products.find(
              (product) =>
                product.id === cartItem.id
            );

          /*
          Producto eliminado
          */

          if (!currentProduct) {
            changed = true;

            return null;
          }

          /*
          Producto sin stock
          */

          if (
            Number(currentProduct.stock) <= 0
          ) {
            changed = true;

            return null;
          }

          /*
          La cantidad guardada supera
          el stock actual
          */

          const currentQuantity =
            Math.min(
              Number(cartItem.quantity),
              Number(currentProduct.stock)
            );

          /*
          Comprobamos si cambió
          cualquier dato importante
          */

          const productChanged =
            cartItem.name !==
              currentProduct.name ||
            Number(cartItem.price) !==
              Number(currentProduct.price) ||
            Number(cartItem.stock) !==
              Number(currentProduct.stock) ||
            cartItem.image !==
              currentProduct.image ||
            cartItem.category_id !==
              currentProduct.category_id ||
            cartItem.visible !==
              currentProduct.visible ||
            Number(cartItem.quantity) !==
              currentQuantity;

          if (productChanged) {
            changed = true;
          }

          /*
          Conservamos solamente la
          cantidad del carrito y usamos
          los datos actuales del producto.
          */

          return {
            ...currentProduct,
            quantity: currentQuantity,
          };
        })
        .filter(Boolean);

      return changed
        ? updatedCart
        : currentCart;
    });
  }, [products, productsLoading]);

  /*
  ==========================================
  AGREGAR AL CARRITO
  ==========================================
  */

  function addToCart(
    product,
    quantity = 1
  ) {
    let message = "";
    let isError = false;

    setCart((current) => {
      const existing = current.find(
        (item) =>
          item.id === product.id
      );

      const currentQuantity =
        existing?.quantity ?? 0;

      if (
        currentQuantity + quantity >
        Number(product.stock)
      ) {
        isError = true;
        message =
          "No hay suficiente stock disponible.";

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
                ...product,
                quantity:
                  item.quantity +
                  quantity,
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

  /*
  ==========================================
  ELIMINAR PRODUCTO
  ==========================================
  */

  function removeFromCart(id) {
    setCart((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );
  }

  /*
  ==========================================
  ACTUALIZAR CANTIDAD
  ==========================================
  */

  function updateQuantity(
    id,
    quantity
  ) {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    const product = products.find(
      (item) => item.id === id
    );

    if (!product) {
      removeFromCart(id);
      return;
    }

    const maxStock = Number(
      product.stock
    );

    if (quantity > maxStock) {
      toast.error(
        "No hay suficiente stock disponible."
      );

      quantity = maxStock;
    }

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

  /*
  ==========================================
  VACIAR CARRITO
  ==========================================
  */

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