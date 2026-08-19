import { Link } from "react-router-dom";

import ProductCard from "./ProductCard";

export default function CollectionSection({
  title,
  subtitle,
  products = [],
  buttonText,
  buttonLink,
}) {
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">

      <div className="mb-8 flex flex-col gap-6 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
            {subtitle}
          </p>

          <h2 className="mt-3 text-3xl font-bold lg:text-4xl">
            {title}
          </h2>

        </div>

        {buttonText && buttonLink && (
          <Link
            to={buttonLink}
            className="text-sm font-semibold hover:underline"
          >
            {buttonText}
          </Link>
        )}

      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">

        {products.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </section>
  );
}