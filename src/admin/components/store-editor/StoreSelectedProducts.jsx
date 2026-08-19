import { StoreSelectedCard } from ".";

export default function StoreSelectedProducts({
  products,
  onMoveUp,
  onMoveDown,
  onRemove,
}) {
  return (
    <aside className="h-fit rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="text-xl font-semibold">
        Productos seleccionados
      </h2>

      <p className="mt-2 text-sm text-zinc-500">
        {products.length} producto(s)
      </p>

      <div className="mt-6 space-y-3">

        {products.length === 0 && (
          <p className="text-sm text-zinc-500">
            No hay productos.
          </p>
        )}

        {products.map((product, index) => (

          <StoreSelectedCard
            key={product.id}
            product={product}
            index={index}
            total={products.length}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            onRemove={onRemove}
          />

        ))}

      </div>

    </aside>
  );
}