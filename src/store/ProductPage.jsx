import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";

import Breadcrumbs from "./components/Breadcrumbs";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import ProductPurchase from "./components/ProductPurchase";
import ProductAccordion from "./components/ProductAccordion";
import RelatedProducts from "./components/RelatedProducts";

export default function ProductPage() {
  const { id } = useParams();

  const { products, loading } = useProducts();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [openSection, setOpenSection] =
    useState("description");

  const product = useMemo(
    () =>
      products.find(
        (p) => String(p.id) === String(id)
      ),
    [products, id]
  );

  const images = useMemo(() => {
    if (!product) return [];

    if (
      product.images &&
      product.images.length > 0
    ) {
      return product.images;
    }

    if (product.image) {
      return [product.image];
    }

    return [];
  }, [product]);

  const sections = [
    {
      id: "description",
      title: "Descripción",
      content:
        product?.description ??
        "Descripción próximamente.",
    },
    {
      id: "materials",
      title: "Materiales",
      content:
        "Producto confeccionado con materiales seleccionados para brindar comodidad y durabilidad.",
    },
    {
      id: "shipping",
      title: "Envíos y devoluciones",
      content:
        "Realizamos envíos a todo el país. Podrás consultar el costo durante el proceso de compra.",
    },
    {
      id: "care",
      title: "Cuidados",
      content:
        "Lavar con agua fría. No usar lavandina. No secar a altas temperaturas.",
    },
  ];

  if (loading) {
    return (
      <main className="mx-auto flex min-h-[70vh] items-center justify-center">
        <h1 className="text-3xl font-bold">
          Cargando...
        </h1>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="mx-auto flex min-h-[70vh] items-center justify-center">
        <h1 className="text-3xl font-bold">
          Producto no encontrado
        </h1>
      </main>
    );
  }

  function increase() {
    if (quantity < product.stock) {
      setQuantity((q) => q + 1);
    }
  }

  function decrease() {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  }

  function handleAdd() {
    addToCart(product, quantity);
  }

  return (
    <main className="mx-auto max-w-[1850px] px-4 py-6 lg:px-8 lg:py-8">

      <div className="hidden lg:block">
        <Breadcrumbs
          items={[
            {
              label: "Inicio",
              href: "/",
            },
            {
              label: "Productos",
              href: "/productos",
            },
            {
              label: product.category,
              href: "/productos",
            },
            {
              label: product.name,
            },
          ]}
        />
      </div>

      <div className="mt-4 grid gap-8 lg:mt-6 lg:grid-cols-[95px_1fr_430px] lg:gap-10">

        <ProductGallery
          images={images}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          product={product}
        />

        <aside className="lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:border-l lg:border-zinc-200 lg:bg-white lg:px-8 lg:py-8">

          <ProductInfo
            product={product}
            images={images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />

          <ProductPurchase
            product={product}
            quantity={quantity}
            increase={increase}
            decrease={decrease}
            handleAdd={handleAdd}
          />

          <ProductAccordion
            sections={sections}
            openSection={openSection}
            setOpenSection={setOpenSection}
          />

        </aside>

      </div>

      <RelatedProducts
        currentProduct={product}
        products={products}
      />

    </main>
  );
}
