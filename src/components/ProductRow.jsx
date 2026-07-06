import { Pencil, Trash2 } from "lucide-react";

export default function ProductRow({
  product,
  onEdit,
  onDelete,
}) {
  const stockColor =
    product.stock <= 3
      ? "text-red-400"
      : product.stock <= 10
      ? "text-yellow-400"
      : "text-green-400";

  const profit =
    (product.price || 0) - (product.cost || 0);

  return (
    <tr className="border-t border-zinc-800 transition hover:bg-zinc-800/50">

      <td className="px-6 py-4 font-medium">
        {product.name}
      </td>

      <td className="px-6 py-4 text-zinc-400">
        {product.category}
      </td>

      <td className="px-6 py-4">
        ${(product.cost || 0).toLocaleString()}
      </td>

      <td className="px-6 py-4">
        ${product.price.toLocaleString()}
      </td>

      <td className="px-6 py-4 font-semibold text-green-400">
        ${profit.toLocaleString()}
      </td>

      <td className={`px-6 py-4 font-semibold ${stockColor}`}>
        {product.stock}
      </td>

      <td className="px-6 py-4">

        <div className="flex justify-center gap-3">

          <button
            onClick={() => onEdit(product)}
            className="text-blue-400 hover:text-blue-300"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(product.id)}
            className="text-red-400 hover:text-red-300"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </td>

    </tr>
  );
}