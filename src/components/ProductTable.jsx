import ProductRow from "./ProductRow";

export default function ProductTable({
  products,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
      <table className="w-full">
        <thead className="bg-zinc-800">

  <tr className="text-left">

    <th className="px-6 py-4">Producto</th>

    <th className="px-6 py-4">Categoría</th>

    <th className="px-6 py-4">Costo</th>

    <th className="px-6 py-4">Precio</th>

    <th className="px-6 py-4">Ganancia</th>

    <th className="px-6 py-4">Stock</th>

    <th className="px-6 py-4 text-center">
      Acciones
    </th>

  </tr>

</thead>

        <tbody>
          {products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}