import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import ProductCard from "./ProductCard";

function FeaturedProducts({
  products = [],
  title = "Productos populares",
  subtitle = "DESTACADOS",
}) {
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

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="pb-24">

      <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-8">

        <div className="mb-8 flex flex-col gap-6 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500 sm:text-sm">
              {subtitle}
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              {title}
            </h2>

          </div>

          <div className="flex items-center gap-3">

            <div className="hidden items-center gap-3 md:flex">

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

            </div>

            <Link
              to="/productos"
              className="text-sm font-semibold hover:underline md:ml-4"
            >
              Ver todos
            </Link>

          </div>

        </div>

        <div
          ref={slider}
          className="flex gap-4 overflow-x-auto scroll-smooth px-4 pb-4 scrollbar-hide sm:gap-6 sm:px-0"
        >

          {products.map((product) => (

            <div
              key={product.id}
              className="w-[260px] min-w-[260px] sm:w-[300px] sm:min-w-[300px] lg:w-[320px] lg:min-w-[320px]"
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