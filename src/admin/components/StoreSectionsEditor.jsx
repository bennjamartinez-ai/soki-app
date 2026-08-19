import useStoreSections from "../hooks/useStoreSections";

import {
  StoreSectionTabs,
  StoreSearch,
  StoreProductsList,
  StoreSelectedProducts,
} from "./store-editor";

export default function StoreSectionsEditor() {
  const {
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
  } = useStoreSections();

  if (loading) {
    return (
      <div className="text-zinc-400">
        Cargando...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Secciones de productos
          </h1>

          <p className="mt-2 text-zinc-400">
            Elegí los productos que aparecerán en esta sección.
          </p>

        </div>

        <button
          onClick={handleSave}
          className="rounded-xl bg-amber-200 px-6 py-3 font-semibold text-black transition hover:bg-amber-300"
        >
          Guardar cambios
        </button>

      </div>

      <StoreSectionTabs
        sections={sections}
        section={section}
        setSelectedSection={setSelectedSection}
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">

        <div>

          <StoreSearch
            search={search}
            setSearch={setSearch}
          />

          <StoreProductsList
            products={filteredProducts}
            selectedProducts={selectedProducts}
            toggleProduct={toggleProduct}
          />

        </div>

        <StoreSelectedProducts
          products={selectedList}
          onMoveUp={moveProductUp}
          onMoveDown={moveProductDown}
          onRemove={removeProduct}
        />

      </div>

    </div>
  );
}