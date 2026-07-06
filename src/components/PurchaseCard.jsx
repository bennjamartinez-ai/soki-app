export default function PurchaseCard({
  product,
  onAdd,
}) {
  const profit =
    (product.price || 0) - (product.cost || 0);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-green-500">

      <h3 className="text-lg font-bold">
        {product.name}
      </h3>

      <p className="mt-2 text-sm text-zinc-400">
        Categoría: {product.category}
      </p>

      <p className="mt-1 text-sm">
        Stock actual:
        <span className="ml-2 font-semibold text-amber-200">
          {product.stock}
        </span>
      </p>

      <div className="mt-4 space-y-1 text-sm">

        <div className="flex justify-between">
          <span>Costo</span>

          <span className="font-semibold">
            ${(product.cost || 0).toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Precio</span>

          <span className="font-semibold">
            ${product.price.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Ganancia</span>

          <span className="font-semibold text-green-400">
            ${profit.toLocaleString()}
          </span>
        </div>

      </div>

      <button
        onClick={() => onAdd(product)}
        className="mt-5 w-full rounded-xl bg-green-500 py-3 font-semibold text-white transition hover:bg-green-600"
      >
        Agregar
      </button>

    </div>
  );
}