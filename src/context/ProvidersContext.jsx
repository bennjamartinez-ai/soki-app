import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getProviders,
  createProvider,
  updateProvider,
  deleteProvider,
} from "../services/providers";

const ProvidersContext = createContext();

export function ProvidersProvider({ children }) {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadProviders() {
    try {
      const data = await getProviders();
      setProviders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProviders();
  }, []);

  async function addProvider(provider) {
    const newProvider = await createProvider(provider);

    setProviders((current) => [
      ...current,
      newProvider,
    ]);

    return newProvider;
  }

  async function editProvider(id, provider) {
    const updated = await updateProvider(id, provider);

    setProviders((current) =>
      current.map((item) =>
        item.id === id ? updated : item
      )
    );

    return updated;
  }

  async function removeProvider(id) {
    await deleteProvider(id);

    setProviders((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  return (
    <ProvidersContext.Provider
      value={{
        providers,
        loading,
        loadProviders,
        addProvider,
        editProvider,
        removeProvider,
      }}
    >
      {children}
    </ProvidersContext.Provider>
  );
}

export function useProviders() {
  const context = useContext(ProvidersContext);

  if (!context) {
    throw new Error(
      "useProviders debe utilizarse dentro de ProvidersProvider"
    );
  }

  return context;
}