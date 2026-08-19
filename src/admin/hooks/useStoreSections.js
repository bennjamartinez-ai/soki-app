import { useEffect, useMemo, useState } from "react";

import { useStore } from "../../context/StoreContext";
import { useProducts } from "../../context/ProductsContext";

export default function useStoreSections() {
  const {
    sections,
    loading,
    saveSectionProducts,
  } = useStore();

  const { products } = useProducts();

  const [selectedSection, setSelectedSection] =
    useState(null);

  const [selectedProducts, setSelectedProducts] =
    useState([]);

  const [search, setSearch] = useState("");

  const section =
    sections.find(
      (item) => item.id === selectedSection
    ) ?? sections[0];

  useEffect(() => {
    if (!section) return;

    setSelectedProducts(
      section.store_section_products.map(
        (item) => item.product_id
      )
    );
  }, [section]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [products, search]);

  const selectedList = useMemo(() => {
    return selectedProducts
      .map((id) =>
        products.find(
          (product) => product.id === id
        )
      )
      .filter(Boolean);
  }, [selectedProducts, products]);

  function toggleProduct(productId) {
    setSelectedProducts((prev) => {

      if (prev.includes(productId)) {
        return prev.filter(
          (id) => id !== productId
        );
      }

      return [...prev, productId];

    });
  }

  function moveProductUp(productId) {
    setSelectedProducts((prev) => {
      const index = prev.indexOf(productId);

      if (index <= 0) return prev;

      const copy = [...prev];

      [copy[index - 1], copy[index]] = [
        copy[index],
        copy[index - 1],
      ];

      return copy;
    });
  }

  function moveProductDown(productId) {
    setSelectedProducts((prev) => {
      const index = prev.indexOf(productId);

      if (
        index === -1 ||
        index === prev.length - 1
      ) {
        return prev;
      }

      const copy = [...prev];

      [copy[index], copy[index + 1]] = [
        copy[index + 1],
        copy[index],
      ];

      return copy;
    });
  }

  function removeProduct(productId) {
    setSelectedProducts((prev) =>
      prev.filter((id) => id !== productId)
    );
  }

  async function handleSave() {
    await saveSectionProducts(
      section.id,
      selectedProducts
    );
  }

  return {
    loading,

    sections,
    section,

    search,
    setSearch,

    filteredProducts,

    selectedProducts,
    selectedList,

    setSelectedSection,

    toggleProduct,

    moveProductUp,
    moveProductDown,
    removeProduct,

    handleSave,
  };
}