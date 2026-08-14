import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import ProductCard from "./ProductCard";

function FeaturedProducts({ products }) {
  const slider = useRef(null);

  function previous() {
    slider.current?.scrollBy({
      left: -420,
      behavior: "smooth",
    });
  }

  function next() {
    slider.current?.scrollBy({
      left: 420,
      behavior: "smooth",
    });
  }

  return (
    <section className="pb-24">

      <div className="mx-auto max-w-[1800px] px-8">

        <div className="mb-10 flex items-end justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
              DESTACADOS
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Productos populares
            </h2>

          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={previous}
              className="rounded-full bg-zinc-100 p-3 transition hover:bg-zinc-200"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={next}
              className="rounded-full bg-zinc-100 p-3 transition hover:bg-zinc-200"
            >
              <ChevronRight size={22} />
            </button>

            <Link
              to="/productos"
              className="ml-4 text-sm font-semibold hover:underline"
            >
              Ver todos
            </Link>

          </div>

        </div>

        <div
          ref={slider}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
        >

          {products.map((product) => (

            <div
              key={product.id}
              className="w-[320px] min-w-[320px]"
            >

              <ProductCard product={product} />

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default FeaturedProducts;