import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  swapCategoryOrder,
} from "../services/categories";

const CategoriesContext = createContext();

export function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadCategories() {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function addCategory(category) {
    const newCategory = await createCategory(category);

    setCategories((current) => [
      ...current,
      newCategory,
    ]);

    return newCategory;
  }

  async function editCategory(id, category) {
    const updated = await updateCategory(id, category);

    setCategories((current) =>
      current.map((item) =>
        item.id === id ? updated : item
      )
    );

    return updated;
  }

  async function removeCategory(id) {
    await deleteCategory(id);

    setCategories((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  async function moveCategory(id, direction) {

  const ordered = [...categories].sort(
    (a, b) => a.display_order - b.display_order
  );

  const index = ordered.findIndex(
    (c) => c.id === id
  );

  if (index === -1) return;

  const otherIndex =
    direction === "up"
      ? index - 1
      : index + 1;

  if (
    otherIndex < 0 ||
    otherIndex >= ordered.length
  ) {
    return;
  }

  const current = ordered[index];

  const other = ordered[otherIndex];

  await swapCategoryOrder(
    current,
    other
  );

  await loadCategories();

}
  return (
    <CategoriesContext.Provider
      value={{
        categories,
        loading,
        loadCategories,
        addCategory,
        editCategory,
        removeCategory,
        moveCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error(
      "useCategories debe utilizarse dentro de CategoriesProvider"
    );
  }

  return context;
}