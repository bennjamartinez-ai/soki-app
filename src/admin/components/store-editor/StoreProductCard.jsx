export default function StoreProductCard({
  product,
  selected,
  order,
  toggleProduct,
}) {
  return (
    <button
      onClick={() =>
        toggleProduct(product.id)
      }
      className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${
        selected
          ? "border-amber-200 bg-amber-200/10"
          : "border-zinc-800 bg-zinc-900 hover:border-zinc-600"
      }`}
    >

      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 font-semibold">

        {selected ? (
          <span className="text-amber-200">
            {order}
          </span>
        ) : (
          <span className="text-zinc-500">
            +
          </span>
        )}

      </div>

      <img
        src={product.image}
        alt={product.name}
        className="h-16 w-16 rounded-xl object-cover"
      />

      <div className="flex-1">

        <h3 className="font-semibold">
          {product.name}
        </h3>

        <p className="text-sm text-zinc-500">
          {product.category}
        </p>

      </div>

      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition ${
          selected
            ? "border-amber-200 bg-amber-200 text-black"
            : "border-zinc-700"
        }`}
      >
        {selected && "✓"}
      </div>

    </button>
  );
}