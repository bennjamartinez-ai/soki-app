import { Link } from "react-router-dom";

export default function SearchSuggestions({
  products,
  search,
  onSelect,
}) {
  const text = search.trim().toLowerCase();

  if (!text) return null;

  const startsWith = products.filter((product) =>
    product.name.toLowerCase().startsWith(text)
  );

  const contains = products.filter(
    (product) =>
      !product.name.toLowerCase().startsWith(text) &&
      product.name.toLowerCase().includes(text)
  );

  const suggestions = [
    ...startsWith,
    ...contains,
  ].slice(0, 5);

  if (suggestions.length === 0) {
    return (
      <div className="absolute left-0 right-0 top-[105%] z-50 rounded-2xl border border-zinc-200 bg-white p-5 shadow-xl">

        <p className="text-center text-sm text-zinc-500">
          No se encontraron productos.
        </p>

      </div>
    );
  }

  return (
    <div className="absolute left-0 right-0 top-[105%] z-50 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl">

      {suggestions.map((product) => (

        <Link
          key={product.id}
          to={`/producto/${product.id}`}
          onClick={onSelect}
          className="flex items-center gap-3 border-b border-zinc-100 px-4 py-3 transition hover:bg-zinc-50 last:border-b-0"
        >

          <div className="h-14 w-14 overflow-hidden rounded-xl bg-zinc-100">

            {product.image ? (

              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />

            ) : (

              <div className="flex h-full items-center justify-center text-[10px] text-zinc-400">
                Sin imagen
              </div>

            )}

          </div>

          <div className="min-w-0 flex-1">

            <p className="truncate font-medium text-zinc-900">
              {product.name}
            </p>

            <p className="text-sm text-zinc-500">
              {product.category}
            </p>

          </div>

          <span className="text-sm font-semibold whitespace-nowrap">
            $
            {Number(product.price).toLocaleString("es-AR")}
          </span>

        </Link>

      ))}

      <Link
        to={`/productos?search=${encodeURIComponent(search)}`}
        onClick={onSelect}
        className="block bg-zinc-50 px-4 py-3 text-center text-sm font-semibold transition hover:bg-zinc-100"
      >
        Ver todos los resultados →
      </Link>

    </div>
  );
}