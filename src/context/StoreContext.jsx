import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";

import {
  getStoreSections,
  updateStoreSectionProducts,
} from "../services/store";

const StoreContext = createContext();

export function StoreProvider({
  children,
}) {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  async function reloadSections() {
    try {
      const data =
        await getStoreSections();

      setSections(data);
    } catch (error) {
      console.error(error);

      toast.error(
        "No se pudo cargar el Editor de Tienda."
      );
    } finally {
      setLoading(false);
    }
  }

  async function saveSectionProducts(
    sectionId,
    products
  ) {
    try {
      await updateStoreSectionProducts(
        sectionId,
        products
      );

      await reloadSections();

      toast.success(
        "Sección actualizada."
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "No se pudo guardar la sección."
      );

      throw error;
    }
  }

  useEffect(() => {
    reloadSections();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        sections,
        loading,
        reloadSections,
        saveSectionProducts,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}