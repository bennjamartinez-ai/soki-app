import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CreditCard,
  ChevronDown,
  Heart,
} from "lucide-react";

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
    <main className="mx-auto max-w-[1850px] px-8 py-8">
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
      <div className="grid grid-cols-[95px_1fr_430px] gap-10">

        {/* MINIATURAS */}

        <aside className="sticky top-8 h-fit">

          <div className="flex flex-col gap-3">

            {images.map((image, index) => (

              <button
                key={index}
                onClick={() =>
                  setSelectedImage(index)
                }
                className={`overflow-hidden rounded-2xl transition-all duration-200 ${
                  selectedImage === index
                    ? "ring-2 ring-black"
                    : "hover:scale-[1.03] hover:shadow-md"
                }`}
              >

                <img
                  src={image}
                  alt=""
                  className="aspect-square w-full bg-[#f5f5f5] object-cover"
                />

              </button>

            ))}

          </div>

        </aside>

        {/* IMAGEN */}

        <section className="sticky top-0 h-screen">

          <div className="flex h-full items-center justify-center rounded-3xl bg-[#f5f5f5]">

            {images.length > 0 ? (

              <img
                src={images[selectedImage]}
                alt={product.name}
                className="max-h-[96vh] max-w-[92%] object-contain transition-transform duration-500 hover:scale-[1.04]"
              />

            ) : (

              <div className="text-zinc-400">
                Imagen próximamente
              </div>

            )}

          </div>

        </section>

        {/* PANEL DERECHO */}

        <aside className="sticky top-0 h-screen overflow-y-auto border-l border-zinc-200 bg-white px-8 py-8">

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

          {/* ACORDEONES */}

          <div className="mt-12 border-y border-zinc-200">

            {sections.map((section) => (

              <div
                key={section.id}
                className="border-b border-zinc-200 last:border-b-0"
              >

                <button
                  onClick={() =>
                    setOpenSection(
                      openSection === section.id
                        ? null
                        : section.id
                    )
                  }
                  className="flex w-full items-center justify-between py-6"
                >

                  <span className="font-medium">
                    {section.title}
                  </span>

                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      openSection === section.id
                        ? "rotate-180"
                        : ""
                    }`}
                  />

                </button>

                {openSection === section.id && (

                  <div className="pb-6 leading-7 text-zinc-600">

                    {section.content}

                  </div>

                )}

              </div>

            ))}

          </div>

        </aside>

            </div>

      <RelatedProducts
        currentProduct={product}
        products={products}
      />

    </main>

  );

}