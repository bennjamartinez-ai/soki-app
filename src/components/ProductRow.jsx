import { Pencil, Trash2 } from "lucide-react";

export default function ProductRow({
  product,
  onEdit,
  onDelete,
}) {

  const profit =
    (product.price || 0) - (product.cost || 0);

  const stockColor =
    product.stock <= 0
      ? "bg-red-500/20 text-red-400"
      : product.stock <= 5
      ? "bg-yellow-500/20 text-yellow-400"
      : "bg-green-500/20 text-green-400";

  return (

    <tr className="border-t border-zinc-800 transition hover:bg-zinc-800/40">

      <td className="px-4 py-4 md:px-6">

        <div className="font-semibold">
          {product.name}
        </div>

      </td>

      <td className="px-4 py-4 md:px-6">

        <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">
          {product.category}
        </span>

      </td>

      <td className="px-4 py-4 md:px-6 text-sm md:text-base">

        ${(product.cost || 0).toLocaleString()}

      </td>

      <td className="px-4 py-4 md:px-6 font-medium text-sm md:text-base">

        ${product.price.toLocaleString()}

      </td>

      <td className="px-4 py-4 md:px-6">

        <span className="font-semibold text-green-400">

          +${profit.toLocaleString()}

        </span>

      </td>

      <td className="px-4 py-4 md:px-6">

        <span
          className={`inline-flex min-w-[52px] justify-center rounded-full px-3 py-1 text-sm font-semibold ${stockColor}`}
        >

          {product.stock}

        </span>

      </td>

      <td className="px-4 py-4 md:px-6">

        <div className="flex justify-center gap-2">

          <button
            onClick={() => onEdit(product)}
            className="rounded-lg p-2 text-blue-400 transition hover:bg-blue-500/10 hover:text-blue-300"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(product.id)}
            className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </td>

    </tr>

  );
}