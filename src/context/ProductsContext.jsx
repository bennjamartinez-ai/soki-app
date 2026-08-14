import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import {
  getProducts,
  createProduct as createProductService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
} from "../services/products";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function reloadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error cargando productos:", error);
      toast.error(error.message || "Error cargando productos.");
    } finally {
      setLoading(false);
    }
  }

  async function createProduct(product) {
    try {
      await createProductService(product);
      await reloadProducts();
    } catch (error) {
      console.error("Error creando producto:", error);
      toast.error(error.message || "Error creando producto.");
      throw error;
    }
  }

  async function updateProduct(id, product) {
    try {
      await updateProductService(id, product);
      await reloadProducts();
    } catch (error) {
      console.error("Error actualizando producto:", error);
      toast.error(error.message || "Error actualizando producto.");
      throw error;
    }
  }

  async function deleteProduct(id) {
    try {
      await deleteProductService(id);
      await reloadProducts();
    } catch (error) {
      console.error("Error eliminando producto:", error);
      toast.error(error.message || "Error eliminando producto.");
      throw error;
    }
  }

  useEffect(() => {
    reloadProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        reloadProducts,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}