import ProductRow from "./ProductRow";

export default function ProductTable({
  products,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900">

      <table className="min-w-[900px] w-full">

        <thead className="bg-zinc-800">

          <tr className="text-left text-sm md:text-base">

            <th className="px-4 py-3 md:px-6 md:py-4">
              Producto
            </th>

            <th className="px-4 py-3 md:px-6 md:py-4">
              Categoría
            </th>

            <th className="px-4 py-3 md:px-6 md:py-4">
              Costo
            </th>

            <th className="px-4 py-3 md:px-6 md:py-4">
              Precio
            </th>

            <th className="px-4 py-3 md:px-6 md:py-4">
              Ganancia
            </th>

            <th className="px-4 py-3 md:px-6 md:py-4">
              Stock
            </th>

            <th className="px-4 py-3 text-center md:px-6 md:py-4">
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